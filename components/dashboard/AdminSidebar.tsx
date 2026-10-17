"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  ClipboardCheck,
  Users,
  BadgeCheck,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { CREST, NAV_ITEMS } from "@/lib/admin-data";
import LogoutButton from "./LogoutButton";

const ICON_MAP: Record<string, LucideIcon> = {
  grid: LayoutGrid,
  fact_check: ClipboardCheck,
  users: Users,
  badge: BadgeCheck,
  payments: CreditCard,
};

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0B1D3A] z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col">
        <div className="h-16 px-space-lg flex items-center gap-space-sm bg-[#08152b]">
          <Image
            src={CREST}
            alt="Great Minds International School Crest"
            width={36}
            height={36}
            className="h-8 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="font-title-md text-headline-sm text-surface-container-lowest leading-tight tracking-tight">
              Great Minds
            </span>
            <span className="font-label-sm text-label-sm text-primary-fixed-dim tracking-wider uppercase">
              International School
            </span>
          </div>
        </div>

        <div className="px-space-md pt-space-md pb-space-sm">
          <div className="flex items-center justify-between bg-[#122B55] p-space-xs rounded-lg">
            <Link
              href="/dashboard/pupil"
              className="flex-1 text-center py-space-xs font-label-sm text-label-sm text-primary-fixed-dim hover:text-surface-container-lowest transition-colors"
            >
              Student
            </Link>
            <Link
              href="/dashboard/teacher"
              className="flex-1 text-center py-space-xs font-label-sm text-label-sm text-primary-fixed-dim hover:text-surface-container-lowest transition-colors"
            >
              Staff
            </Link>
            <Link
              href="/dashboard/admin"
              className="flex-1 text-center py-space-xs font-label-sm text-label-sm text-surface-container-lowest bg-[#1e3a8a] rounded font-bold"
            >
              Admin
            </Link>
          </div>
        </div>

        <div className="px-space-lg pt-space-xs pb-space-xs">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline-variant">
            Admin Portal
          </span>
        </div>

        <nav className="flex flex-col gap-space-xs px-space-sm overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon];
            const isActive =
              pathname === item.href ||
              (item.key === "results" && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "flex items-center justify-between px-space-md py-space-xs text-surface-container-lowest bg-[#122B55] rounded-lg border-l-4 border-secondary-container transition-colors"
                    : "flex items-center justify-between px-space-md py-space-xs text-primary-fixed-dim hover:bg-[#122B55] hover:text-surface-container-lowest rounded-lg transition-colors group"
                }
              >
                <div className="flex items-center gap-space-md">
                  <Icon
                    className={
                      isActive
                        ? "text-secondary-container w-5 h-5"
                        : "text-outline-variant group-hover:text-primary-fixed w-5 h-5"
                    }
                  />
                  <span
                    className={
                      isActive
                        ? "font-headline-sm text-body-sm font-semibold"
                        : "font-body-md text-body-sm"
                    }
                  >
                    {item.label}
                  </span>
                </div>
                {"badge" in item && item.badge && (
                  <span
                    className={`font-label-sm text-label-sm px-space-xs py-[1px] rounded ${item.badge.color}`}
                  >
                    {item.badge.text}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-space-md bg-[#08152b]">
        <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-[#122B55]/50">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-surface-container-lowest font-medium">
              System Online
            </span>
            <span className="font-body-sm text-[11px] text-primary-fixed-dim">
              All services operational
            </span>
          </div>
        </div>
        <LogoutButton />
      </div>
    </aside>
  );
}