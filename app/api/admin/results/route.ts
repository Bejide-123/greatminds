import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/guard";
import { fullName } from "@/lib/admin-results";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }
  if (user.role !== "ADMIN") {
    return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  }

  const limitParam = new URL(request.url).searchParams.get("limit");
  const parsedLimit = limitParam === null ? 100 : Number(limitParam);
  if (!Number.isInteger(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
    return NextResponse.json({ error: "Limit must be an integer from 1 to 100." }, { status: 400 });
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
          submittedAt: true,
          reviewedAt: true,
          updatedAt: true,
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
            orderBy: { subject: { sortOrder: "asc" } },
            select: {
              id: true,
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

  return NextResponse.json(
    {
      results: results.map((result) => ({
        id: result.id,
        status: result.status,
        rejectionReason: result.rejectionReason,
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
        subjects: result.subjects.map((row) => ({
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
    { headers: { "Cache-Control": "no-store" } }
  );
}
