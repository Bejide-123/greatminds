"use client";

import { CalendarDays, Bell } from "lucide-react";
import { useUser } from "@/components/auth/UserProvider";

export default function AdminHeader() {
  const { user } = useUser();
  const initials =
    user?.displayName
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "";

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter-lg">
      <div className="flex items-center gap-space-md">
        <span className="text-primary font-title-md font-bold text-headline-sm">
          Administrator Dashboard
        </span>
        <div className="h-4 w-px bg-surface-container-highest" />
        <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-space-xs rounded-full">
          <CalendarDays className="w-4 h-4 text-primary-container" />
          <span className="font-label-md text-label-sm text-primary font-bold">
            2024/2025 • First Term
          </span>
        </div>
      </div>

      <div className="flex items-center gap-space-lg">
        <button
          type="button"
          className="relative p-space-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary-container rounded-full" />
        </button>

        <div className="flex items-center gap-space-sm pl-space-sm">
          <div className="flex flex-col text-right">
            <span className="font-title-md text-body-sm text-on-surface leading-tight font-semibold">
              {user?.displayName}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {user?.role === "ADMIN" ? "Administrator" : user?.role}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-label-md">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}