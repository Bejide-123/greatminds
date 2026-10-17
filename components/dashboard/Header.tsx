"use client";

"use client";

import { ChevronRight, CalendarDays, Bell } from "lucide-react";
import { CURRENT_TERM } from "@/lib/dashboard-data";
import { useUser } from "@/components/auth/UserProvider";

export default function Header() {
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
        <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
          <span className="hover:text-on-surface">Primary Section</span>
          <ChevronRight className="w-4 h-4 text-outline" />
          <span className="hover:text-on-surface">Pupil Desk</span>
          <ChevronRight className="w-4 h-4 text-outline" />
          <span className="text-primary font-bold">
            {user?.className ?? "Pupil Portal"}
          </span>
        </div>
        <div className="h-4 w-px bg-surface-container-highest" />
        <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1 rounded-full border border-surface-container-highest">
          <CalendarDays className="w-4 h-4 text-secondary-container" />
          <span className="font-label-md text-label-sm text-primary font-bold">
            {CURRENT_TERM}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-space-lg">
        <button
          type="button"
          title="School notifications"
          className="relative p-space-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary-container rounded-full animate-pulse" />
        </button>
        <div className="flex items-center gap-space-sm pl-space-sm">
          <div className="flex flex-col text-right">
            <span className="font-title-md text-body-sm text-on-surface leading-tight font-bold">
              {user?.displayName}
            </span>
            <span className="font-label-sm text-[11px] text-secondary font-semibold">
              {user?.admissionNumber ?? user?.username}
            </span>
          </div>
          <div
            aria-label={`${user?.displayName ?? "User"} profile`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary ring-2 ring-secondary-container/40"
          >
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}