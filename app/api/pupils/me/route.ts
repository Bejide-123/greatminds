import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/guard";
import { fetchPupilProfile } from "@/lib/pupils/fetch-profile";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { error: "Not signed in." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (user.role !== "STUDENT" || !user.student) {
    return NextResponse.json(
      { error: "Only signed-in pupils can access their own profile." },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  const profile = await fetchPupilProfile(user.student.id);

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