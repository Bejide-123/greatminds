// lib/auth/auth.service.ts
import "server-only";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { toUserInfo } from "./user-info";

const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 10);

export async function authenticate(usernameInput: string, passwordInput: string) {
  const username = usernameInput.trim();

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
          id: true,
          firstName: true,
          otherName: true,
          surname: true,
          admissionNumber: true,
          schoolClass: { select: { id: true, name: true } },  // ✅ fixed
        },
      },
      teacher: {
        select: {
          id: true,
          firstName: true,
          otherName: true,
          surname: true,
          classId: true,                                       // ✅ added
          schoolClass: { select: { id: true, name: true } },  // ✅ fixed
        },
      },
    },
  });

  const password =
    user?.role === "STUDENT" ? passwordInput.trim().toLowerCase() : passwordInput;

  const passwordOk = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);

  if (!user || !passwordOk || !user.isActive) return null;

  return {
    ...toUserInfo(user),
    mustChangePassword: user.mustChangePassword,
  };
}