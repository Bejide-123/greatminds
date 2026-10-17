// lib/auth/guards.ts
// Use these inside pages, server components and server actions.
// The proxy is only a quick gate; THIS is the real check (it hits the database,
// so a deactivated user loses access immediately, not when the JWT expires).
import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { readSession } from "./session";
import { HOME_BY_ROLE, type Role } from "./jwt";

export const getCurrentUser = cache(async () => {
  const session = await readSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: {
      id: true,
      username: true,
      role: true,
      isActive: true,
      mustChangePassword: true,
      student: {
        select: {
          firstName: true,
          otherName: true,
          surname: true,
          admissionNumber: true,
          schoolClass: { select: { name: true } },
        },
      },
      teacher: {
        select: {
          firstName: true,
          otherName: true,
          surname: true,
          schoolClass: { select: { name: true } },
        },
      },
    },
  });

  return user && user.isActive ? user : null;
});

export async function requireRole(...roles: Role[]) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");
  if (!roles.includes(user.role)) redirect(HOME_BY_ROLE[user.role]);
  return user;
}