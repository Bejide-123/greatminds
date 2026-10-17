"use client";

import {
  Smile,
  BadgeCheck,
  CalendarDays,
  Baby,
} from "lucide-react";
import { useUser } from "@/components/auth/UserProvider";

export default function TeacherWelcomeBanner() {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden rounded-xl bg-primary text-on-primary shadow-xl">
      <div className="absolute -right-16 -top-20 w-80 h-80 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" />
      <div className="absolute right-40 bottom-0 w-64 h-64 rounded-full bg-surface-tint/20 blur-2xl pointer-events-none" />

      <div className="relative p-space-xl lg:p-space-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
        <div className="flex items-center gap-space-lg">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-tr from-secondary-container via-amber-400 to-primary-container p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#1e3a8a] flex items-center justify-center text-surface-container-lowest">
                <Smile className="w-[42px] h-[42px] text-secondary-fixed" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-tertiary-container text-on-tertiary-container p-1 rounded-full shadow-sm flex items-center justify-center">
              <BadgeCheck className="w-[18px] h-[18px]" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs mb-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed bg-secondary-container/20 px-space-xs py-0.5 rounded">
                Primary Department Faculty
              </span>
              <span className="font-label-sm text-label-sm text-primary-fixed-dim">
                • Staff ID: {user?.username}
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg lg:text-headline-xl text-surface-container-lowest leading-tight">
              Good morning, {user?.displayName}
            </h1>
            <p className="font-body-md text-body-md text-primary-fixed-dim mt-0.5">
              Class Teacher &amp; Coordinator — {user?.className ?? "Staff"} •
              First Term Academic Portal
            </p>

            <div className="flex flex-wrap items-center gap-space-sm mt-space-sm">
              <span className="font-label-md text-label-sm bg-surface-container-lowest/10 text-surface-container-lowest px-space-sm py-1 rounded-full flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-secondary-fixed" />
                2024/2025 Session • First Term
              </span>
              <span className="font-label-md text-label-sm bg-tertiary-container text-on-tertiary-container px-space-sm py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Active Term Ledger: Day 64 of 85
              </span>
              <span className="font-label-md text-label-sm bg-secondary-container/20 text-secondary-fixed px-space-sm py-1 rounded-full flex items-center gap-1.5">
                <Baby className="w-4 h-4" />
                24 Pupils on Roll
              </span>
            </div>
          </div>
        </div>

        {/* Milestone box */}
        <div className="flex lg:flex-col items-center lg:items-end justify-between gap-space-sm bg-primary-container/60 p-space-md rounded-xl backdrop-blur-md">
          <div className="flex flex-col text-left lg:text-right">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-fixed-dim">
              Next Key Milestone
            </span>
            <span className="font-title-md text-surface-container-lowest">
              Terminal Broadsheet Submission
            </span>
            <span className="font-body-sm text-label-sm text-secondary-fixed">
              Head of Primary Review in 4 days
            </span>
          </div>
          <button
            type="button"
            className="px-space-md py-1.5 bg-secondary-container text-on-primary font-label-md text-label-sm rounded-lg hover:bg-secondary transition-colors flex items-center gap-1 shadow-sm"
          >
            <CalendarDays className="w-4 h-4" />
            Download Class Roster
          </button>
        </div>
      </div>
    </div>
  );
}