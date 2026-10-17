import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/guard";
import { fullName } from "@/lib/admin-results";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }
  if (user.role !== "STUDENT") {
    return NextResponse.json(
      { error: "Student access required." },
      { status: 403 },
    );
  }

  const student = await prisma.student.findUnique({
    where: { userId: user.id },
    select: {
      id: true,
      firstName: true,
      otherName: true,
      surname: true,
      admissionNumber: true,
      schoolClass: { select: { name: true } },
    },
  });
  if (!student) {
    return NextResponse.json(
      { error: "No student profile is linked to this account." },
      { status: 409 },
    );
  }

  const results = await prisma.result.findMany({
    where: { studentId: student.id },
    orderBy: [{ updatedAt: "desc" }],
    select: {
      id: true,
      status: true,
      reviewedAt: true,
      teacherRemark: true,
      headTeacherRemark: true,

      teacher: {
        select: {
          firstName: true,
          otherName: true,
          surname: true,
        },
      },
      schoolClass: { select: { name: true } },
      term: {
        select: {
          id: true,
          name: true,
          isCurrent: true,
          session: { select: { name: true, isCurrent: true } },
        },
      },
      subjects: {
        orderBy: { subject: { sortOrder: "asc" } },
        select: {
          id: true,
          caScore: true,
          examScore: true,
          totalScore: true,
          grade: true,
          remark: true,
          subject: { select: { name: true, code: true } },
        },
      },
    },
  });

  return NextResponse.json(
    {
      student: {
        name: fullName(student),
        admissionNumber: student.admissionNumber,
        className: student.schoolClass.name,
      },
      results: results.map((result) => {
        const approved =
          result.status === "APPROVED" || result.status === "PUBLISHED";

        return {
          id: result.id,
          status: result.status,
          reviewedAt: result.reviewedAt?.toISOString() ?? null,
          schoolClass: result.schoolClass.name,

          teacherRemark: result.teacherRemark ?? "",
          headTeacherRemark: result.headTeacherRemark ?? "",
          teacherName: [
            result.teacher.firstName,
            result.teacher.otherName,
            result.teacher.surname,
          ]
            .filter(Boolean)
            .join(" "),
          term: {
            id: result.term.id,
            name: result.term.name,
            sessionName: result.term.session.name,
            isCurrent: result.term.isCurrent,
            sessionIsCurrent: result.term.session.isCurrent,
          },
          subjects: approved
            ? result.subjects.flatMap((subject) => {
                if (
                  subject.caScore === null ||
                  subject.examScore === null ||
                  subject.totalScore === null
                ) {
                  return [];
                }
                return [
                  {
                    id: subject.id,
                    subjectName: subject.subject.name,
                    subjectCode: subject.subject.code,
                    caScore: Number(subject.caScore),
                    examScore: Number(subject.examScore),
                    totalScore: Number(subject.totalScore),
                    grade: subject.grade,
                    remark: subject.remark,
                  },
                ];
              })
            : [],
        };
      }),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
