import "server-only";
import { prisma } from "@/lib/prisma";

type Order = Map<string, number>; // subjectId -> sortOrder

export async function getClassSubjectOrders(classIds: string[]) {
  const ids = [...new Set(classIds)];
  const byClass = new Map<string, Order>();
  if (ids.length === 0) return byClass;

  const rows = await prisma.classSubject.findMany({
    where: { classId: { in: ids } },
    select: { classId: true, subjectId: true, sortOrder: true },
  });
  for (const r of rows) {
    if (!byClass.has(r.classId)) byClass.set(r.classId, new Map());
    byClass.get(r.classId)!.set(r.subjectId, r.sortOrder);
  }
  return byClass;
}

export async function getClassSubjectOrder(classId: string): Promise<Order> {
  return (await getClassSubjectOrders([classId])).get(classId) ?? new Map();
}

export function sortBySubjectOrder<
  T extends { subjectId: string; subject: { name: string } },
>(rows: T[], order: Order): T[] {
  const rank = (id: string) => order.get(id) ?? Number.MAX_SAFE_INTEGER;
  return [...rows].sort(
    (a, b) =>
      rank(a.subjectId) - rank(b.subjectId) ||
      a.subject.name.localeCompare(b.subject.name),
  );
}