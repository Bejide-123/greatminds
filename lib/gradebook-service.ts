import "server-only";
import { prisma } from "@/lib/prisma";

export async function getTeacherGradebookContext(userId: string) {
  const teacher = await prisma.teacher.findUnique({
    where: { userId },
    select: {
      id: true,
      classId: true,
      status: true,
      schoolClass: { select: { id: true, name: true } },
    },
  });

  if (!teacher || teacher.status !== "ACTIVE") {
    return { error: "No active teacher profile is linked to this account." } as const;
  }

  const term = await prisma.term.findFirst({
    where: {
      isCurrent: true,
      session: { isCurrent: true },
    },
    select: {
      id: true,
      name: true,
      session: { select: { name: true } },
    },
  });

  if (!term) {
    return { error: "There is no current academic term configured." } as const;
  }

  return {
    teacher,
    term,
  } as const;
}
