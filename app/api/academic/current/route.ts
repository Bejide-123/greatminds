import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/guard";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  const currentTerm = await prisma.term.findFirst({
    where: {
      isCurrent: true,
      session: {
        isCurrent: true,
      },
    },
    select: {
      id: true,
      name: true,
      nextTermBegins: true,
      session: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!currentTerm) {
    return NextResponse.json(
      { error: "No current academic session and term have been configured." },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      session: currentTerm.session,
      term: {
        id: currentTerm.id,
        name: currentTerm.name,
        nextTermBegins: currentTerm.nextTermBegins,
      },
    },
    {
      headers: { "Cache-Control": "no-store" },
    }
  );
}