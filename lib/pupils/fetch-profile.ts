import { prisma } from "@/lib/prisma";
import {
  getClassSubjectOrder,
  sortBySubjectOrder,
} from "@/lib/results/subject-order";
import { buildPupilProfile } from "./build-profile";
import type { PupilProfile } from "./profile-types";

const STUDENT_INCLUDE = {
  schoolClass: { select: { id: true, name: true } },
} as const;

const RESULT_INCLUDE = {
  term: { include: { session: { select: { name: true } } } },
  teacher: { select: { firstName: true, surname: true } },
  // No orderBy: the subject order depends on the class (ClassSubject),
  // so the rows are sorted after the query.
  subjects: {
    include: { subject: { select: { id: true, name: true, code: true } } },
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

  // Put the subjects in this class's report-card order
  const orderedResult = result
    ? {
        ...result,
        subjects: sortBySubjectOrder(
          result.subjects,
          await getClassSubjectOrder(result.classId),
        ),
      }
    : null;

  // Homeroom teacher = any active teacher assigned to this class
  const homeroom = await prisma.teacher.findFirst({
    where: { classId: student.schoolClass.id, status: "ACTIVE" },
    select: { firstName: true, surname: true },
    orderBy: { createdAt: "asc" },
  });

  return buildPupilProfile(student, orderedResult, homeroom);
}