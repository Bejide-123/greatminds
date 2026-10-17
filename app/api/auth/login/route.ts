// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations/auth";
import { authenticate } from "@/lib/auth/auth-service";
import { createSession } from "@/lib/auth/session";
import { HOME_BY_ROLE } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const user = await authenticate(parsed.data.username, parsed.data.password);
  if (!user) {
    // One generic message for every failure.
    return NextResponse.json({ error: "Invalid login details" }, { status: 401 });
  }

  await createSession({ sub: user.id, role: user.role });

  return NextResponse.json({
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      displayName: user.displayName,
      className: user.className,
      admissionNumber: user.admissionNumber,
    },
    role: user.role,
    redirectTo: HOME_BY_ROLE[user.role],
    mustChangePassword: user.mustChangePassword,
  });
}