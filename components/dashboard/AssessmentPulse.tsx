"use client";

import { BookOpen, AlertCircle } from "lucide-react";
import { ASSESSMENT_METRICS } from "@/lib/teacher-data";
import { useUser } from "@/components/auth/UserProvider";

export default function AssessmentPulse() {
  const { user } = useUser();

  return (
    <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-0 right-0 w-36 h-36 bg-secondary-container/5 rounded-bl-full pointer-events-none" />

      <div>
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="p-2 bg-secondary-fixed text-secondary rounded-lg">
              <BookOpen className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  Primary Continuous Assessment &amp; Exams
                </span>
                <span className="font-label-sm text-label-sm bg-tertiary-container text-on-tertiary-container px-space-xs py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active Cycle
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {user?.className ?? "Staff"} • First Term 2024/2025
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-xs bg-secondary-fixed/40 px-space-md py-1 rounded-full">
            <span className="font-label-sm text-label-sm text-secondary uppercase font-bold">
              Evaluation Progress
            </span>
            <span className="font-headline-sm text-headline-sm text-secondary font-bold">
              92%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md mt-space-lg">
          {ASSESSMENT_METRICS.map((m) => {
            const pct = (m.value / m.total) * 100;
            return (
              <div
                key={m.label}
                className={`p-space-md rounded-lg flex flex-col ${("bg" in m && m.bg) || "bg-surface-container-low"}`}
              >
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  {m.label}
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span
                    className={`font-headline-md text-headline-md font-bold ${("valueColor" in m && m.valueColor) || "text-primary"}`}
                  >
                    {m.value}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    / {m.total}
                    {m.label === "Awaiting Check" ? "" : " Pupils"}
                  </span>
                </div>
                <div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className={`${m.barColor} h-full`} style={{ width: `${pct}%` }} />
                </div>
                <span
                  className={`font-label-sm text-[11px] font-semibold mt-1.5 ${m.noteColor}`}
                >
                  {m.note}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-space-lg pt-space-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-low/70 p-space-sm rounded-lg">
        <div className="flex items-center gap-space-xs">
          <AlertCircle className="w-[18px] h-[18px] text-secondary-container" />
          <span className="font-body-sm text-body-sm text-on-surface">
            <strong>Primary Head Notice:</strong> Final scores and psychomotor
            traits lock on Friday 15th Nov, 4:00 PM.
          </span>
        </div>
        <div className="flex items-center gap-space-sm">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
            REG-ID: GMIS-PRI-B4D-T1
          </span>
        </div>
      </div>
    </div>
  );
}