"use client";

import { FileText, ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import { HERO_STATS } from "@/lib/dashboard-data";
import { useUser } from "@/components/auth/UserProvider";

export default function WelcomeHero() {
  const { user } = useUser();
  const initials =
    user?.displayName
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "";

  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0B1D3A] via-[#122B55] to-[#0B1D3A] text-surface-container-lowest p-space-xl md:p-space-2xl shadow-md mb-space-xl border border-primary-fixed-dim/20">
      <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-lg">
        <div className="flex flex-col md:flex-row md:items-center gap-space-lg">
          {/* Avatar */}
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-xl shrink-0 ring-4 ring-secondary-container/40">
            <div className="flex h-full w-full items-center justify-center bg-primary text-xl font-bold text-on-primary">
              {initials}
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-tertiary-fixed rounded-full shadow flex items-center justify-center">
              <BadgeCheck className="text-tertiary w-4 h-4 fill-current" />
            </div>
          </div>

          <div className="flex flex-col">
            {user?.admissionNumber && (
              <span className="bg-[#122B55] text-primary-fixed font-label-sm text-label-sm px-space-sm py-0.5 rounded-full uppercase tracking-wider font-semibold border border-primary-fixed-dim/30 self-start mb-space-xs">
                Admission: {user.admissionNumber}
              </span>
            )}
            <h1 className="font-headline-xl text-headline-xl text-surface-container-lowest tracking-tight flex items-center gap-2">
              Welcome back, {user?.displayName}!{" "}
              <Sparkles className="w-7 h-7 text-secondary-container" />
            </h1>
            <p className="font-body-md text-body-md text-primary-fixed-dim mt-0.5">
              {user?.className ?? "Pupil Portal"} • First Term Academic Portal
            </p>

            <div className="flex flex-wrap items-center gap-space-sm mt-space-md">
              <a
                href="#"
                className="inline-flex items-center gap-space-xs bg-secondary-container hover:bg-secondary text-on-secondary px-space-lg py-2 rounded-lg font-title-md text-body-md font-bold shadow-md transition-colors"
              >
                <FileText className="w-[18px] h-[18px]" />
                <span>View Primary Terminal Report Sheet</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-3 gap-space-sm bg-[#122B55]/80 backdrop-blur-md p-space-md rounded-xl border border-primary-fixed-dim/20 shadow-inner self-stretch lg:self-auto">
          {HERO_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col text-center px-space-xs ${
                i === 1 ? "border-x border-primary-fixed-dim/20" : ""
              }`}
            >
              <span className="font-label-sm text-[11px] text-primary-fixed-dim uppercase tracking-wider font-medium">
                {stat.label}
              </span>
              <span
                className={`font-headline-md text-headline-md font-bold mt-0.5 ${stat.color}`}
              >
                {stat.value}
              </span>
              <span className="font-label-sm text-[11px] text-primary-fixed-dim">
                {stat.sub}
              </span>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}