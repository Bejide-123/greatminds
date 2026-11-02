import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/guard";
import { fetchPupilProfile } from "@/lib/pupils/fetch-profile";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { error: "Not signed in." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  const { id } = await params;

  // Authorization:
  // - ADMIN can view anyone
  // - TEACHER can view pupils in their class (adjust if you want school-wide)
  // - STUDENT can only view themselves
  if (user.role === "STUDENT") {
    if (!user.student || user.student.id !== id) {
      return NextResponse.json(
        { error: "You can only view your own profile." },
        { status: 403, headers: { "Cache-Control": "no-store" } },
      );
    }
  } else if (user.role === "TEACHER") {
    const target = await (
      await import("@/lib/prisma")
    ).prisma.student.findUnique({
      where: { id },
      select: { classId: true },
    });
    if (!target || !user.teacher || user.teacher.classId !== target.classId) {
      return NextResponse.json(
        { error: "Not authorized to view this pupil." },
        { status: 403, headers: { "Cache-Control": "no-store" } },
      );
    }
  }

  const profile = await fetchPupilProfile(id);

  if (!profile) {
    return NextResponse.json(
      { error: "Profile not found." },
      { status: 404, headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(profile, {
    headers: { "Cache-Control": "no-store" },
  });
}