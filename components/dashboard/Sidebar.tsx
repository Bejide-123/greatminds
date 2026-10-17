
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  ClipboardCheck,
  BookOpen,
  Clock,
  Award,
  Utensils,
  MessageCircle,
  School,
  CreditCard,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { CREST, NAV_ITEMS } from "@/lib/dashboard-data";
import LogoutButton from "./LogoutButton";
import { useUser } from "@/components/auth/UserProvider";

const ICON_MAP: Record<string, LucideIcon> = {
  stars: Sparkles,
  fact_check: ClipboardCheck,
  book: BookOpen,
  clock: Clock,
  award: Award,
  utensils: Utensils,
  message: MessageCircle,
  credit_card: CreditCard,
  person: UserRound,
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-[#0B1D3A] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center gap-3 bg-[#08152b] px-4">
        <Image
          src={CREST}
          alt="Great Minds Nursery & Primary Crest"
          width={36}
          height={36}
          className="h-9 w-9 shrink-0 object-contain"
        />

        <div>
          <p className="text-[15px] font-bold leading-tight tracking-tight text-surface-container-lowest">
            Greatminds
          </p>
          <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-secondary-fixed-dim">
            International School
          </p>
        </div>
      </div>

      {/* Role switcher */}
      <div className="shrink-0 px-3 py-3">
        <div className="flex items-center rounded-lg bg-[#122B55] p-1">
          {["Pupil / Parent", "Teacher", "Admin"].map((role, index) => (
            <button
              key={role}
              type="button"
              className={`flex-1 rounded-md px-0.5 py-1.5 text-[10px] font-semibold transition-colors ${
                index === 0
                  ? "bg-[#1e3a8a] text-surface-container-lowest shadow-sm"
                  : "text-primary-fixed-dim hover:text-surface-container-lowest"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Section label */}
      <div className="px-4 pb-2 pt-1">
        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary-fixed-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary-container" />
          Primary Pupil Portal
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon];
          if (!Icon) return null;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                isActive
                  ? "border-l-[3px] border-secondary-container bg-[#122B55] text-surface-container-lowest"
                  : "border-l-[3px] border-transparent text-primary-fixed-dim hover:bg-[#122B55] hover:text-surface-container-lowest"
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] shrink-0 ${
                  isActive
                    ? "text-secondary-container"
                    : "text-outline-variant"
                }`}
                strokeWidth={1.8}
              />

              <span
                className={`min-w-0 flex-1 text-[13px] ${
                  isActive ? "font-semibold" : "font-medium"
                }`}
              >
                {item.label}
              </span>

              {"badge" in item && item.badge && (
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${item.badge.color}`}
                >
                  {item.badge.text}
                </span>
              )}

              {"dot" in item && item.dot && (
                <span className="h-2 w-2 rounded-full bg-secondary-container" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Class information */}
      <div className="shrink-0 bg-[#08152b] p-3">
        <div className="flex items-center gap-2.5 rounded-lg border border-primary-fixed-dim/20 bg-[#122B55]/70 px-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary">
            <School className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[11px] font-bold text-surface-container-lowest">
              {user?.className ?? "Pupil Portal"}
            </p>
            <p className="truncate text-[10px] text-primary-fixed-dim">
              {user?.admissionNumber ?? user?.username ?? ""}
            </p>
          </div>
        </div>
        <LogoutButton />
      </div>
    </aside>
  );
}
