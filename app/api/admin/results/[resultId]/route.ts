import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/guard";
import { prisma } from "@/lib/prisma";

const reviewSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("approve") }),
  z.object({
    action: z.literal("return"),
    rejectionReason: z.string().trim().min(1).max(1000),
  }),
]);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ resultId: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }
  if (user.role !== "ADMIN") {
    return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid review action." },
      { status: 400 }
    );
  }

  const { resultId } = await params;
  const existing = await prisma.result.findUnique({
    where: { id: resultId },
    select: { status: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "Result not found." }, { status: 404 });
  }
  if (existing.status !== "SUBMITTED" && existing.status !== "UNDER_REVIEW") {
    return NextResponse.json(
      { error: "Only submitted results can be reviewed." },
      { status: 409 }
    );
  }

  const update = await prisma.result.updateMany({
    where: {
      id: resultId,
      status: { in: ["SUBMITTED", "UNDER_REVIEW"] },
    },
    data:
      parsed.data.action === "approve"
        ? {
            status: "APPROVED",
            reviewedAt: new Date(),
            reviewedById: user.id,
            rejectionReason: null,
          }
        : {
            status: "REJECTED",
            reviewedAt: new Date(),
            reviewedById: user.id,
            rejectionReason: parsed.data.rejectionReason,
          },
  });
  if (update.count !== 1) {
    return NextResponse.json(
      { error: "This result was already reviewed. Refresh and try again." },
      { status: 409 }
    );
  }

  return NextResponse.json({
    status: parsed.data.action === "approve" ? "APPROVED" : "REJECTED",
  });
}
