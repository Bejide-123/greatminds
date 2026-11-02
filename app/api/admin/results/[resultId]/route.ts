import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/guard";
import { prisma } from "@/lib/prisma";
import { tryFinalizeClassPositions } from "@/lib/results/rankings";

const reviewSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("approve"),
    headTeacherRemark: z.string().max(1500).optional(),
  }),
  z.object({
    action: z.literal("saveRemark"),
    headTeacherRemark: z.string().max(1500),
  }),
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
    select: { status: true, classId: true, termId: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "Result not found." }, { status: 404 });
  }

  // Admin saving comment / headteacher remark without approving
  if (parsed.data.action === "saveRemark") {
    const updated = await prisma.result.update({
      where: { id: resultId },
      data: {
        headTeacherRemark: parsed.data.headTeacherRemark.trim() || null,
      },
      select: {
        id: true,
        status: true,
        headTeacherRemark: true,
      },
    });

    return NextResponse.json({
      status: updated.status,
      headTeacherRemark: updated.headTeacherRemark,
      message: "Comment saved successfully.",
    });
  }

  // Approval or return requires submitted or under_review state
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
            ...(parsed.data.headTeacherRemark !== undefined
              ? { headTeacherRemark: parsed.data.headTeacherRemark.trim() || null }
              : {}),
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

  if (parsed.data.action === "approve") {
    const ranking = await tryFinalizeClassPositions(
      existing.classId,
      existing.termId
    );
    return NextResponse.json({
      status: "APPROVED",
      ranking,
    });
  }

  return NextResponse.json({
    status: "REJECTED",
    ranking: null,
  });
}
