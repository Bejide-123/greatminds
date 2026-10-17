"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import RoleTabs, { type Role } from "./RoleTabs";
import StudentPanel from "./StudentPanel";
import TeacherPanel from "./TeacherPanel";
import AdminPanel from "./AdminPanel";
import { useUser } from "./UserProvider";
import { isUserInfo } from "@/lib/auth/user-info";

const LOGIN_DESTINATIONS = new Set([
  "/dashboard/pupil",
  "/dashboard/teacher",
  "/dashboard/admin",
]);

export default function AuthCard() {
  const [role, setRole] = useState<Role>("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useUser();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
      });
      const result: unknown = await response.json();

      if (typeof result !== "object" || result === null) {
        throw new Error("The login service returned an invalid response.");
      }

      const payload = result as Record<string, unknown>;
      if (!response.ok) {
        setError(
          typeof payload.error === "string"
            ? payload.error
            : "Unable to sign in. Please check your login details."
        );
        return;
      }

      if (
        typeof payload.redirectTo !== "string" ||
        !LOGIN_DESTINATIONS.has(payload.redirectTo)
      ) {
        throw new Error("The login service returned an invalid destination.");
      }

      if (!isUserInfo(payload.user)) {
        throw new Error("The login service returned invalid user information.");
      }

      setUser(payload.user);
      router.replace(payload.redirectTo);
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl shadow-xl shadow-surface-tint/5 p-6 sm:p-8 flex flex-col">
      <RoleTabs
        activeRole={role}
        onRoleChange={(nextRole) => {
          setRole(nextRole);
          setError("");
        }}
      />

      {error && (
        <p className="mb-4 rounded-lg bg-error-container px-3 py-2 text-body-sm text-on-error-container" role="alert">
          {error}
        </p>
      )}

      {role === "student" && <StudentPanel onSubmit={handleSubmit} loading={loading} />}
      {role === "teacher" && <TeacherPanel onSubmit={handleSubmit} loading={loading} />}
      {role === "admin" && <AdminPanel onSubmit={handleSubmit} loading={loading} />}

      <div className="mt-6 pt-4 flex items-center justify-between text-on-surface-variant">
        <div className="flex items-center gap-2">
          <Lock className="w-[18px] h-[18px] text-tertiary-container fill-current" />
          <span className="font-label-sm text-label-sm tracking-tight text-on-surface-variant">
            256-bit Encrypted SSL Academic Database Connection
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse" />
          <span className="font-label-sm text-label-sm uppercase font-semibold text-tertiary">
            Live Node
          </span>
        </div>
      </div>
    </div>
  );
}