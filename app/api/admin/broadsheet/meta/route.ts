import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/guard";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Forbidden." },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  const [classes, terms] = await Promise.all([
    prisma.schoolClass.findMany({
      select: { id: true, name: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.term.findMany({
      select: {
        id: true,
        name: true,
        isCurrent: true,
        session: { select: { name: true } },
      },
      orderBy: [{ session: { name: "desc" } }, { name: "asc" }],
    }),
  ]);

  return NextResponse.json(
    {
      classes,
      terms: terms.map((t) => ({
        id: t.id,
        name: t.name,
        sessionName: t.session.name,
        isCurrent: t.isCurrent,
      })),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}