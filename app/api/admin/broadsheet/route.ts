import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/guard";
import { prisma } from "@/lib/prisma";
import { transformBroadsheet } from "@/lib/broadsheet/transform";

const PER_PAGE = 10;
const NO_STORE = { "Cache-Control": "no-store" };

export async function GET(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { error: "Not signed in." },
      { status: 401, headers: NO_STORE },
    );
  }
  if (user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Only administrators can view class broadsheets." },
      { status: 403, headers: NO_STORE },
    );
  }

  const url = new URL(request.url);
  const classId = url.searchParams.get("classId");
  const termId = url.searchParams.get("termId");
  const pageRaw = Number(url.searchParams.get("page") ?? "1");
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;

  if (!classId) {
    return NextResponse.json(
      { error: "classId is required." },
      { status: 400, headers: NO_STORE },
    );
  }

  // Class
  const schoolClass = await prisma.schoolClass.findUnique({
    where: { id: classId },
    select: { id: true, name: true },
  });
  if (!schoolClass) {
    return NextResponse.json(
      { error: "Class not found." },
      { status: 404, headers: NO_STORE },
    );
  }

  // Term
  const resolvedTermId = termId
    ? termId
    : (
        await prisma.term.findFirst({
          where: { isCurrent: true },
          select: { id: true },
        })
      )?.id;

  if (!resolvedTermId) {
    return NextResponse.json(
      { error: "No term specified and no current term set." },
      { status: 400, headers: NO_STORE },
    );
  }

  const term = await prisma.term.findUnique({
    where: { id: resolvedTermId },
    select: {
      id: true,
      name: true,
      session: { select: { name: true } },
    },
  });
  if (!term) {
    return NextResponse.json(
      { error: "Term not found." },
      { status: 404, headers: NO_STORE },
    );
  }

  // These four don't depend on each other, so run them together.
  const [classSubjects, homeroom, totalCount, results] = await Promise.all([
    // CHANGED: subjects come from ClassSubject (this class only, in this
    // class's report-card order). Subject.sortOrder no longer exists.
    prisma.classSubject.findMany({
      where: { classId: schoolClass.id, subject: { isActive: true } },
      orderBy: { sortOrder: "asc" },
      select: {
        sortOrder: true,
        subject: { select: { id: true, code: true, name: true } },
      },
    }),

    // Homeroom teacher
    prisma.teacher.findFirst({
      where: { classId: schoolClass.id, status: "ACTIVE" },
      select: { firstName: true, surname: true },
      orderBy: { createdAt: "asc" },
    }),

    // Total count
    prisma.result.count({
      where: { classId: schoolClass.id, termId: resolvedTermId },
    }),

    // Paginated results
    prisma.result.findMany({
      where: { classId: schoolClass.id, termId: resolvedTermId },
      include: {
        student: {
          select: {
            id: true,
            admissionNumber: true,
            firstName: true,
            otherName: true,
            surname: true,
            sex: true,
          },
        },
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
      orderBy: [{ classPosition: "asc" }, { student: { surname: "asc" } }],
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
  ]);

  // Same shape transformBroadsheet already expects: { id, code, name, sortOrder }
  const subjects = classSubjects.map((cs) => ({
    ...cs.subject,
    sortOrder: cs.sortOrder,
  }));

  const data = transformBroadsheet({
    classInfo: schoolClass,
    term: {
      id: term.id,
      name: term.name,
      sessionName: term.session.name,
    },
    homeroomTeacher: homeroom,
    subjects,
    results,
    page,
    perPage: PER_PAGE,
    totalCount,
  });

  return NextResponse.json(data, { headers: NO_STORE });
}