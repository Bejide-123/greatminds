"use client";

import { Users, CheckCircle2, ArrowRight } from "lucide-react";
import { COHORT } from "@/lib/teacher-data";
import { useUser } from "@/components/auth/UserProvider";

export default function ClassCohortCard() {
  const { user } = useUser();

  return (
    <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-space-sm">
          <div className="flex items-center gap-space-xs">
            <Users className="text-primary w-[22px] h-[22px]" />
            <span className="font-title-md text-title-md text-on-surface">
              Assigned Cohort
            </span>
          </div>
          <span className="font-label-sm text-label-sm uppercase bg-surface-container text-primary font-bold px-space-sm py-0.5 rounded-full">
            {user?.className ?? "Staff"}
          </span>
        </div>

        <div className="mt-space-md flex items-baseline gap-space-xs">
          <span className="font-headline-xl text-headline-xl text-primary font-bold">
            {COHORT.total}
          </span>
          <span className="font-body-md text-body-sm text-on-surface-variant">
            Pupils Enrolled in {COHORT.classroom}
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
          {COHORT.subtitle}
        </p>
      </div>

      <div className="mt-space-lg pt-space-md bg-surface-container-low rounded-lg p-space-md">
        <div className="flex justify-between items-center mb-space-xs">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            Demographic Breakdown
          </span>
          <span className="font-label-sm text-label-sm text-primary font-bold">
            100% Attendance Rate
          </span>
        </div>

        <div className="w-full h-3 rounded-full bg-surface-container overflow-hidden flex">
          <div
            className="bg-secondary-container h-full transition-all duration-500"
            style={{ width: `${COHORT.girls.percent}%` }}
            title={`Girls: ${COHORT.girls.count} (${COHORT.girls.percent}%)`}
          />
          <div
            className="bg-primary h-full transition-all duration-500"
            style={{ width: `${COHORT.boys.percent}%` }}
            title={`Boys: ${COHORT.boys.count} (${COHORT.boys.percent}%)`}
          />
        </div>

        <div className="flex justify-between items-center mt-space-sm text-body-sm font-label-md">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container inline-block" />
            <span className="text-on-surface font-title-md">
              {COHORT.girls.count} Girls
            </span>
            <span className="text-on-surface-variant font-body-sm">
              ({COHORT.girls.percent}%)
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
            <span className="text-on-surface font-title-md">
              {COHORT.boys.count} Boys
            </span>
            <span className="text-on-surface-variant font-body-sm">
              ({COHORT.boys.percent}%)
            </span>
          </div>
        </div>

        <div className="mt-space-sm pt-space-xs border-t border-surface-container flex flex-wrap items-center justify-between gap-1 text-[11px] text-on-surface-variant">
          {COHORT.houses.map((h) => (
            <span key={h.name} className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${h.color}`} />
              {h.name}: {h.count}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-space-md flex items-center justify-between text-body-sm text-on-surface-variant pt-space-xs">
        <span className="flex items-center gap-1 font-label-sm text-label-sm">
          <CheckCircle2 className="w-4 h-4 text-tertiary-container" />
          Daily Roll Completed
        </span>
        <a
          href="#"
          className="font-label-md text-label-sm text-primary hover:text-secondary-container transition-colors flex items-center gap-0.5"
        >
          View Pupil Profiles <ArrowRight className="w-[14px] h-[14px]" />
        </a>
      </div>
    </div>
  );
}