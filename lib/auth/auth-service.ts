// lib/auth/auth.service.ts
import "server-only";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { toUserInfo } from "./user-info";

// Compared against when the username doesn't exist, so a wrong username and a
// wrong password take about the same time (no user enumeration).
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 10);

export async function authenticate(usernameInput: string, passwordInput: string) {
  const username = usernameInput.trim();

  // Case-insensitive: "gmis/2027/123" finds "GMIS/2027/123".
  const user = await prisma.user.findFirst({
    where: { username: { equals: username, mode: "insensitive" } },
    select: {
      id: true,
      username: true,
      role: true,
      isActive: true,
      mustChangePassword: true,
      passwordHash: true,
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

  // Students log in with their surname, so ignore case and stray spaces.
  const password =
    user?.role === "STUDENT" ? passwordInput.trim().toLowerCase() : passwordInput;

  const passwordOk = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);

  if (!user || !passwordOk || !user.isActive) return null;

  return {
    ...toUserInfo(user),
    mustChangePassword: user.mustChangePassword,
  };
}