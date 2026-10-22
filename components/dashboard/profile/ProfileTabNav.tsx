"use client";

import {
  User,
  BarChart3,
  Calendar,
  Brain,
  Users,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

const TABS: { key: string; label: string; icon: LucideIcon; target?: string }[] = [
  { key: "overview", label: "Overview & Bio", icon: User },
  { key: "academic", label: "Academic Performance & Reports", icon: BarChart3, target: "academic" },
  { key: "attendance", label: "Attendance & Punctuality", icon: Calendar },
  { key: "psychomotor", label: "Psychomotor & Character Traits", icon: Brain, target: "psychomotor" },
  { key: "guardians", label: "Parents & Guardians", icon: Users, target: "guardians" },
  { key: "fees", label: "Fees & Medical Records", icon: CreditCard },
];

export default function ProfileTabNav() {
  const [active, setActive] = useState("overview");

  function handleClick(tab: (typeof TABS)[number]) {
    setActive(tab.key);
    if (tab.target) {
      const el = document.getElementById(tab.target);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="border-b border-outline-variant mb-space-lg flex overflow-x-auto gap-4 sm:gap-6 text-sm font-semibold">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => handleClick(tab)}
            className={`pb-3 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}