import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/guard";
import { toUserInfo } from "@/lib/auth/user-info";

export async function GET() {
  const currentUser = await getCurrentUser();

  return NextResponse.json(
    { user: currentUser ? toUserInfo(currentUser) : null },
    { headers: { "Cache-Control": "no-store" } }
  );
}
