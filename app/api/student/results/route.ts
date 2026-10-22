import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/guard";
import { fullName } from "@/lib/admin-results";
import { prisma } from "@/lib/prisma";
import {
  getClassAverage,
  getClassSubjectMetrics,
} from "@/lib/results/rankings";

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
      classId: true,
      termId: true,
      status: true,
      reviewedAt: true,
      teacherRemark: true,
      headTeacherRemark: true,
      overallAverage: true,
      classPosition: true,
      classSize: true,
      psychomotor: true,

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
          subjectId: true,
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

  const finalizedPairs = Array.from(
    new Set(
      results
        .filter(
          (r) =>
            (r.status === "APPROVED" || r.status === "PUBLISHED") &&
            r.classPosition !== null
        )
        .map((r) => `${r.classId}:::${r.termId}`)
    )
  ).map((key) => {
    const [classId, termId] = key.split(":::");
    return { classId, termId, key };
  });

  const pairMetricsList = await Promise.all(
    finalizedPairs.map(async ({ classId, termId, key }) => {
      const [classAverage, subjectMetrics] = await Promise.all([
        getClassAverage(classId, termId),
        getClassSubjectMetrics(classId, termId),
      ]);
      return { key, classAverage, subjectMetrics };
    })
  );

  const metricsMap = new Map(pairMetricsList.map((m) => [m.key, m]));

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
        const finalized = approved && result.classPosition !== null;
        const metrics = finalized
          ? metricsMap.get(`${result.classId}:::${result.termId}`) ?? null
          : null;

        return {
          id: result.id,
          status: result.status,
          reviewedAt: result.reviewedAt?.toISOString() ?? null,
          schoolClass: result.schoolClass.name,

          teacherRemark: result.teacherRemark ?? "",
          headTeacherRemark: result.headTeacherRemark ?? "",
          overallAverage:
            approved && result.overallAverage !== null
              ? Number(result.overallAverage)
              : null,
          classAverage: metrics?.classAverage ?? null,
          classPosition: approved ? result.classPosition : null,
          classSize: approved ? result.classSize : null,
          psychomotor: approved
            ? (result.psychomotor as Record<string, number | null> | null)
            : null,
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

                const subjectMetric =
                  metrics?.subjectMetrics.metricsByResultSubject.get(
                    `${result.id}:${subject.subjectId}`
                  );

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
                    classAverage: subjectMetric?.classAverage ?? null,
                    subjectPosition: subjectMetric?.subjectPosition ?? null,
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
