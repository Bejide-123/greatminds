import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/guard";
import { getTeacherGradebookContext } from "@/lib/gradebook-service";
import { prisma } from "@/lib/prisma";

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401, headers: NO_STORE },
    );
  }
  if (user.role !== "TEACHER") {
    return NextResponse.json(
      { error: "Teacher access required." },
      { status: 403, headers: NO_STORE },
    );
  }

  const context = await getTeacherGradebookContext(user.id);
  if ("error" in context) {
    return NextResponse.json(
      { error: context.error },
      { status: 409, headers: NO_STORE },
    );
  }

  const classId = context.teacher.classId;

  const [classSubjects, students] = await Promise.all([
    // CHANGED: only the subjects this teacher's class takes, in report-card
    // order, instead of every active subject in the school.
    prisma.classSubject.findMany({
      where: { classId, subject: { isActive: true } },
      orderBy: { sortOrder: "asc" },
      select: {
        sortOrder: true,
        isCompulsory: true,
        subject: { select: { id: true, code: true, name: true } },
      },
    }),
    prisma.student.findMany({
      where: { classId, status: "ACTIVE" },
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
            overallAverage: true,
            classPosition: true,
            classSize: true,
            attendance: true,
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

  // CHANGED: isCompulsory is sent so the screen can mark required subjects
  // and warn before submit. The server must still re-check on submit.
  const subjects = classSubjects.map((cs) => ({
    ...cs.subject,
    isCompulsory: cs.isCompulsory,
    sortOrder: cs.sortOrder,
  }));

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
          overallAverage:
            result?.overallAverage === null || result?.overallAverage === undefined
              ? null
              : Number(result.overallAverage),
          classPosition: result?.classPosition ?? null,
          classSize: result?.classSize ?? null,
          attendance: result?.attendance ?? null,
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
    { headers: NO_STORE },
  );
}