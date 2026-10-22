import { prisma } from "@/lib/prisma"; // ← adjust path to your Prisma client singleton
import { buildPupilProfile } from "./build-profile";
import type { PupilProfile } from "./profile-types";

const STUDENT_INCLUDE = {
  schoolClass: { select: { id: true, name: true } },
} as const;

const RESULT_INCLUDE = {
  term: { include: { session: { select: { name: true } } } },
  teacher: { select: { firstName: true, surname: true } },
  subjects: {
    include: { subject: { select: { id: true, name: true, code: true } } },
    orderBy: { subject: { sortOrder: "asc" as const } },
  },
} as const;

export async function fetchPupilProfile(
  studentId: string,
): Promise<PupilProfile | null> {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: STUDENT_INCLUDE,
  });

  if (!student) return null;

  // Current term's result (fallback to latest if none marked current yet)
  const currentTerm = await prisma.term.findFirst({
    where: { isCurrent: true },
    select: { id: true },
  });

  const result = await prisma.result.findFirst({
    where: {
      studentId,
      ...(currentTerm ? { termId: currentTerm.id } : {}),
    },
    include: RESULT_INCLUDE,
    orderBy: { createdAt: "desc" },
  });

  // Homeroom teacher = any active teacher assigned to this class
  const homeroom = await prisma.teacher.findFirst({
    where: { classId: student.schoolClass.id, status: "ACTIVE" },
    select: { firstName: true, surname: true },
    orderBy: { createdAt: "asc" },
  });

  return buildPupilProfile(student, result, homeroom);
}