import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/guard";
import { computeGrade } from "@/lib/gradebook-data";
import { getTeacherGradebookContext } from "@/lib/gradebook-service";
import { prisma } from "@/lib/prisma";
import { PSYCHOMOTOR_KEYS } from "@/lib/gradebook-api";


const psychomotorRatingSchema = z
  .number()
  .int()
  .min(1)
  .max(5)
  .nullable();

const psychomotorSchema = z
  .record(z.string(), psychomotorRatingSchema)
  .superRefine((ratings, ctx) => {
    // Reject keys that are not part of the canonical trait list.
    for (const key of Object.keys(ratings)) {
      if (!PSYCHOMOTOR_KEYS.includes(key)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Unknown psychomotor trait: ${key}`,
          path: [key],
        });
      }
    }

    // Require all nine configured traits.
    for (const key of PSYCHOMOTOR_KEYS) {
      if (!(key in ratings)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Missing psychomotor trait: ${key}`,
          path: [key],
        });
      }
    }
  });

const scoreSchema = z.object({
  action: z.enum(["save", "submit"]),

  teacherRemark: z.string().max(1500).default(""),

  psychomotor: psychomotorSchema,

  scores: z
    .array(
      z.object({
        subjectId: z.string().min(1),
        caScore: z
          .number()
          .min(0)
          .max(40)
          .refine((score) => Math.abs(score * 100 - Math.round(score * 100)) < 1e-8)
          .nullable(),
        examScore: z
          .number()
          .min(0)
          .max(60)
          .refine((score) => Math.abs(score * 100 - Math.round(score * 100)) < 1e-8)
          .nullable(),
      })
    )
    .max(200),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ studentId: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }
  if (user.role !== "TEACHER") {
    return NextResponse.json({ error: "Teacher access required." }, { status: 403 });
  }

  const context = await getTeacherGradebookContext(user.id);
  if ("error" in context) {
    return NextResponse.json({ error: context.error }, { status: 409 });
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = scoreSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid score data." },
      { status: 400 }
    );
  }

  const { studentId } = await params;
  const student = await prisma.student.findFirst({
    where: {
      id: studentId,
      classId: context.teacher.classId,
      status: "ACTIVE",
    },
    select: { id: true },
  });
  if (!student) {
    return NextResponse.json(
      { error: "Student not found in your assigned class." },
      { status: 404 }
    );
  }

  const subjects = await prisma.subject.findMany({
    where: { isActive: true },
    select: { id: true },
  });
  const activeSubjectIds = new Set(subjects.map((subject) => subject.id));
  const receivedSubjectIds = new Set<string>();

  for (const score of parsed.data.scores) {
    if (!activeSubjectIds.has(score.subjectId)) {
      return NextResponse.json(
        { error: "One or more selected subjects are not active." },
        { status: 400 }
      );
    }
    if (receivedSubjectIds.has(score.subjectId)) {
      return NextResponse.json(
        { error: "A subject score was provided more than once." },
        { status: 400 }
      );
    }
    receivedSubjectIds.add(score.subjectId);
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.result.findUnique({
        where: {
          studentId_termId: {
            studentId,
            termId: context.term.id,
          },
        },
        select: {
          id: true,
          teacherId: true,
          classId: true,
          status: true,
          subjects: {
            select: {
              subjectId: true,
              caScore: true,
              examScore: true,
            },
          },
        },
      });

      if (existing && existing.teacherId !== context.teacher.id) {
        throw new GradebookRequestError(
          "This student's result is managed by another teacher.",
          403
        );
      }
      if (existing && existing.classId !== context.teacher.classId) {
        throw new GradebookRequestError(
          "This result belongs to a different class and cannot be edited here.",
          409
        );
      }
      if (
        existing &&
        existing.status !== "DRAFT" &&
        existing.status !== "REJECTED"
      ) {
        throw new GradebookRequestError(
          "This result has already been submitted and can no longer be edited.",
          409
        );
      }

      const resultId = existing
        ? existing.id
        : (
            await tx.result.create({
              data: {
                studentId,
                termId: context.term.id,
                classId: context.teacher.classId,
                teacherId: context.teacher.id,
                status: "DRAFT",
              },
            select: { id: true },
          })
          ).id;

      const scoreBySubject = new Map(
        existing?.subjects.map((score) => [
          score.subjectId,
          {
          caScore: score.caScore === null ? null : Number(score.caScore),
          examScore: score.examScore === null ? null : Number(score.examScore),
          },
        ])
      );
      for (const score of parsed.data.scores) {
        scoreBySubject.set(score.subjectId, {
          caScore: score.caScore,
          examScore: score.examScore,
        });
      }

      if (parsed.data.action === "submit") {
        const allSubjectsScored =
          subjects.length > 0 &&
          subjects.every((subject) => {
          const score = scoreBySubject.get(subject.id);
          return (
            score?.caScore !== null &&
            score?.caScore !== undefined &&
            score?.examScore !== null &&
            score?.examScore !== undefined
          );
          });

        if (!allSubjectsScored) {
          throw new GradebookRequestError(
            "Enter both CA and exam scores for every active subject before submitting.",
            400
          );
        }
      }

      const activeScores = subjects.flatMap((subject) => {
        const score = scoreBySubject.get(subject.id);
        if (!score) return [];
        const totalScore =
          score.caScore !== null && score.examScore !== null
            ? score.caScore + score.examScore
            : null;

        return [
          {
            resultId,
            subjectId: subject.id,
            caScore: score.caScore,
            examScore: score.examScore,
            totalScore,
            grade: totalScore === null ? null : computeGrade(totalScore).grade,
          },
        ];
      });

      await tx.resultSubject.deleteMany({
        where: { resultId, subjectId: { in: [...activeSubjectIds] } },
      });
      if (activeScores.length > 0) {
        await tx.resultSubject.createMany({ data: activeScores });
      }

      return tx.result.update({
        where: { id: resultId },
        

        data: {
          psychomotor: parsed.data.psychomotor,
          teacherRemark: parsed.data.teacherRemark.trim() || null,
          status: parsed.data.action === "submit" ? "SUBMITTED" : "DRAFT",
          submittedAt: parsed.data.action === "submit" ? new Date() : null,
          rejectionReason: null,
        },
        select: { status: true, teacherRemark: true },
      });
    }, { timeout: 15_000 });

    return NextResponse.json({ status: result.status });
  } catch (error) {
    if (error instanceof GradebookRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}

class GradebookRequestError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
  }
}
