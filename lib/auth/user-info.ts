import type { Role } from "./jwt";

export type UserInfo = {
  id: string;
  username: string;
  role: Role;
  displayName: string;
  className: string | null;
  admissionNumber: string | null;
};

type UserProfileSource = {
  id: string;
  username: string;
  role: Role;
  student?: {
    firstName: string;
    otherName: string | null;
    surname: string;
    admissionNumber: string;
    schoolClass: { name: string };
  } | null;
  teacher?: {
    firstName: string;
    otherName: string | null;
    surname: string;
    schoolClass: { name: string };
  } | null;
};

export function toUserInfo(user: UserProfileSource): UserInfo {
  const profile = user.student ?? user.teacher;
  const displayName = profile
    ? [profile.firstName, profile.otherName, profile.surname]
        .filter(Boolean)
        .join(" ")
    : user.username;

  return {
    id: user.id,
    username: user.username,
    role: user.role,
    displayName,
    className: profile?.schoolClass.name ?? null,
    admissionNumber: user.student?.admissionNumber ?? null,
  };
}

export function isUserInfo(value: unknown): value is UserInfo {
  if (typeof value !== "object" || value === null) return false;

  const user = value as Record<string, unknown>;
  return (
    typeof user.id === "string" &&
    typeof user.username === "string" &&
    typeof user.displayName === "string" &&
    (user.role === "ADMIN" ||
      user.role === "TEACHER" ||
      user.role === "STUDENT") &&
    (typeof user.className === "string" || user.className === null) &&
    (typeof user.admissionNumber === "string" ||
      user.admissionNumber === null)
  );
}
