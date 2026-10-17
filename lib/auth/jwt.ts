// lib/auth/jwt.ts
// Pure JWT helpers (no next/headers) so proxy.ts can use them too.
import { SignJWT, jwtVerify } from "jose";

export type Role = "ADMIN" | "TEACHER" | "STUDENT";
export type SessionPayload = { sub: string; role: Role };

export const SESSION_COOKIE = "gmis_session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours, in seconds

export const HOME_BY_ROLE: Record<Role, string> = {
  ADMIN: "/dashboard/admin",
  TEACHER: "/dashboard/teacher",
  STUDENT: "/dashboard/pupil",
};

function secret() {
  const s = process.env.JWT_SECRET;
  if (!s || s.length < 32) {
    throw new Error("JWT_SECRET must be set and at least 32 characters long");
  }
  return new TextEncoder().encode(s);
}

export async function signSession({ sub, role }: SessionPayload) {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(sub)
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
    const role = payload.role as Role;
    if (!payload.sub || !(role in HOME_BY_ROLE)) return null;
    return { sub: payload.sub, role };
  } catch {
    return null; // expired, tampered, malformed
  }
}