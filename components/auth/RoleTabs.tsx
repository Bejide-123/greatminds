"use client";

import { User, BookOpen, ShieldCheck } from "lucide-react";

export type Role = "student" | "teacher" | "admin";

type RoleTabsProps = {
  activeRole: Role;
  onRoleChange: (role: Role) => void;
};

const ROLES: { key: Role; label: string; icon: typeof User }[] = [
  { key: "student", label: "Pupil / Student", icon: User },
  { key: "teacher", label: "Teacher", icon: BookOpen },
  { key: "admin", label: "Admin", icon: ShieldCheck },
];

export default function RoleTabs({ activeRole, onRoleChange }: RoleTabsProps) {
  return (
    <div className="mb-6">
      <label className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-2">
        Select Portal Directory
      </label>
      <div
        className="grid grid-cols-3 gap-1.5 p-1 bg-surface-container rounded-lg"
        role="tablist"
      >
        {ROLES.map(({ key, label, icon: Icon }) => {
          const isActive = key === activeRole;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onRoleChange(key)}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-md font-label-md text-label-md transition-all duration-200 ${
                isActive
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <Icon className="w-[18px] h-[18px]" />
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}