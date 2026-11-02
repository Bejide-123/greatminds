import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/guard";
import { fullName } from "@/lib/admin-results";
import { prisma } from "@/lib/prisma";

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401, headers: NO_STORE },
    );
  }
  if (user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Administrator access required." },
      { status: 403, headers: NO_STORE },
    );
  }

  const limitParam = new URL(request.url).searchParams.get("limit");
  const parsedLimit = limitParam === null ? 100 : Number(limitParam);
  if (!Number.isInteger(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
    return NextResponse.json(
      { error: "Limit must be an integer from 1 to 100." },
      { status: 400, headers: NO_STORE },
    );
  }

  const [results, activeStudents, activeTeachers, classes, pendingResults, approvedResults] =
    await Promise.all([
      prisma.result.findMany({
        where: {
          status: { in: ["SUBMITTED", "UNDER_REVIEW", "APPROVED", "PUBLISHED"] },
        },
        orderBy: [{ submittedAt: "desc" }, { updatedAt: "desc" }],
        take: parsedLimit,
        select: {
          id: true,
          status: true,
          rejectionReason: true,
          teacherRemark: true,
          headTeacherRemark: true,
          submittedAt: true,
          reviewedAt: true,
          updatedAt: true,
          overallAverage: true,
          classPosition: true,
          classSize: true,
          attendance: true,
          student: {
            select: {
              id: true,
              firstName: true,
              otherName: true,
              surname: true,
              admissionNumber: true,
            },
          },
          schoolClass: { select: { id: true, name: true } },
          teacher: {
            select: { id: true, firstName: true, otherName: true, surname: true },
          },
          term: {
            select: { id: true, name: true, session: { select: { name: true } } },
          },
          subjects: {
            // CHANGED: no orderBy here. Subject.sortOrder is gone, and the
            // order depends on the result's class, so we sort below.
            select: {
              id: true,
              subjectId: true, // CHANGED: needed for the sort
              caScore: true,
              examScore: true,
              totalScore: true,
              grade: true,
              subject: { select: { name: true, code: true } },
            },
          },
        },
      }),
      prisma.student.count({ where: { status: "ACTIVE" } }),
      prisma.teacher.count({ where: { status: "ACTIVE" } }),
      prisma.schoolClass.count(),
      prisma.result.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] } } }),
      prisma.result.count({ where: { status: { in: ["APPROVED", "PUBLISHED"] } } }),
    ]);

  // CHANGED: report-card order per class, from ClassSubject (one extra query
  // for just the classes that appear in this page of results).
  const classIds = [...new Set(results.map((r) => r.schoolClass.id))];
  const classSubjects = classIds.length
    ? await prisma.classSubject.findMany({
        where: { classId: { in: classIds } },
        select: { classId: true, subjectId: true, sortOrder: true },
      })
    : [];
  const orderMap = new Map(
    classSubjects.map((cs) => [`${cs.classId}:${cs.subjectId}`, cs.sortOrder]),
  );
  const orderOf = (classId: string, subjectId: string) =>
    orderMap.get(`${classId}:${subjectId}`) ?? Number.MAX_SAFE_INTEGER;

  return NextResponse.json(
    {
      results: results.map((result) => ({
        id: result.id,
        status: result.status,
        rejectionReason: result.rejectionReason,
        teacherRemark: result.teacherRemark,
        headTeacherRemark: result.headTeacherRemark,
        submittedAt: result.submittedAt?.toISOString() ?? null,
        reviewedAt: result.reviewedAt?.toISOString() ?? null,
        updatedAt: result.updatedAt.toISOString(),
        student: {
          id: result.student.id,
          name: fullName(result.student),
          admissionNumber: result.student.admissionNumber,
        },
        schoolClass: result.schoolClass,
        teacher: {
          id: result.teacher.id,
          name: fullName(result.teacher),
        },
        term: {
          id: result.term.id,
          name: result.term.name,
          sessionName: result.term.session.name,
        },
        overallAverage:
          result.overallAverage === null ? null : Number(result.overallAverage),
        classPosition: result.classPosition,
        classSize: result.classSize,
        attendance: result.attendance,
        subjects: [...result.subjects]
          .sort(
            (a, b) =>
              orderOf(result.schoolClass.id, a.subjectId) -
                orderOf(result.schoolClass.id, b.subjectId) ||
              a.subject.name.localeCompare(b.subject.name),
          )
          .map((row) => ({
            id: row.id,
            subjectName: row.subject.name,
            subjectCode: row.subject.code,
            caScore: row.caScore === null ? null : Number(row.caScore),
            examScore: row.examScore === null ? null : Number(row.examScore),
            totalScore: row.totalScore === null ? null : Number(row.totalScore),
            grade: row.grade,
          })),
      })),
      summary: {
        activeStudents,
        activeTeachers,
        classes,
        pendingResults,
        approvedResults,
      },
    },
    { headers: NO_STORE },
  );
}