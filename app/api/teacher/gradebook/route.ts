import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/guard";
import { getTeacherGradebookContext } from "@/lib/gradebook-service";
import { prisma } from "@/lib/prisma";

export async function GET() {
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

  const [subjects, students] = await Promise.all([
    prisma.subject.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      select: { id: true, code: true, name: true, sortOrder: true },
    }),
    prisma.student.findMany({
      where: { classId: context.teacher.classId, status: "ACTIVE" },
      orderBy: [{ surname: "asc" }, { firstName: "asc" }],
      select: {
        id: true,
        firstName: true,
        otherName: true,
        surname: true,
        admissionNumber: true,
        sex: true,
        dateOfBirth: true,
        results: {
          where: { termId: context.term.id },
          select: {
            status: true,
            teacherRemark: true,
            rejectionReason: true,
            psychomotor: true,
            subjects: {
              select: {
                subjectId: true,
                caScore: true,
                examScore: true,
                totalScore: true,
                grade: true,
              },
            },
          },
        },
      },
    }),
  ]);

  return NextResponse.json(
    {
      class: context.teacher.schoolClass,
      term: {
        id: context.term.id,
        name: context.term.name,
        sessionName: context.term.session.name,
      },
      subjects,
      students: students.map((student) => {
        const result = student.results[0];
        return {
          id: student.id,
          firstName: student.firstName,
          otherName: student.otherName,
          surname: student.surname,
          admissionNumber: student.admissionNumber,
          sex: student.sex,
          dateOfBirth: student.dateOfBirth.toISOString(),
          status: result?.status ?? null,
          teacherRemark: result?.teacherRemark ?? "",
          psychomotor: result?.psychomotor ?? {},
          rejectionReason: result?.rejectionReason ?? null,
          scores:
            result?.subjects.map((score) => ({
              subjectId: score.subjectId,
              caScore: score.caScore === null ? null : Number(score.caScore),
              examScore:
                score.examScore === null ? null : Number(score.examScore),
              totalScore:
                score.totalScore === null ? null : Number(score.totalScore),
              grade: score.grade,
            })) ?? [],
        };
      }),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
