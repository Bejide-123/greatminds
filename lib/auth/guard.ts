// lib/auth/guards.ts
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
          id: true,                     // ← ADD
          firstName: true,
          otherName: true,
          surname: true,
          admissionNumber: true,
          schoolClass: { select: { id: true, name: true } }, // ← add id
        },
      },
      teacher: {
        select: {
          id: true,                     // ← ADD
          firstName: true,
          otherName: true,
          surname: true,
          classId: true,                // ← ADD
          schoolClass: { select: { id: true, name: true } }, // ← add id
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