// proxy.ts  (project root, same level as /app)
// Next.js 16 name for middleware. On Next 15 or older, name the file
// middleware.ts and rename the function to `middleware`.
import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, HOME_BY_ROLE, verifySession, type Role } from "@/lib/auth/jwt";

const ROLE_BY_PREFIX: Record<string, Role> = {
  "/dashboard/admin": "ADMIN",
  "/dashboard/teacher": "TEACHER",
  "/dashboard/pupil": "STUDENT",
  "/dashboard/gradebook": "TEACHER",
  "/dashboard/attendance": "TEACHER",
  "/dashboard/psychomotor": "TEACHER",
  "/dashboard/homework": "TEACHER",
  "/dashboard/timetable": "TEACHER",
};

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  if (pathname === "/auth") {
    return session
      ? NextResponse.redirect(new URL(HOME_BY_ROLE[session.role], req.url))
      : NextResponse.next();
  }

  const prefix = Object.keys(ROLE_BY_PREFIX).find(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  if (!prefix) return NextResponse.next();

  if (!session) return NextResponse.redirect(new URL("/auth", req.url));
  if (session.role !== ROLE_BY_PREFIX[prefix]) {
    return NextResponse.redirect(new URL(HOME_BY_ROLE[session.role], req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth",
    "/dashboard/admin/:path*",
    "/dashboard/teacher/:path*",
    "/dashboard/pupil/:path*",
    "/dashboard/gradebook/:path*",
    "/dashboard/attendance/:path*",
    "/dashboard/psychomotor/:path*",
    "/dashboard/homework/:path*",
    "/dashboard/timetable/:path*",
  ],
};