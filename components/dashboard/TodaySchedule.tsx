import { CalendarDays } from "lucide-react";
import { SCHEDULE } from "@/lib/teacher-data";

export default function TodaySchedule() {
  return (
    <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-space-xs pb-space-sm">
          <CalendarDays className="text-primary w-[22px] h-[22px]" />
          <h3 className="font-title-md text-title-md text-on-surface">
            Today&apos;s Class Schedule
          </h3>
        </div>

        <div className="mt-space-md space-y-space-sm">
          {SCHEDULE.map((p, i) => {
            const isPrimary = "isPrimary" in p && p.isPrimary;
            return (
              <div
                key={i}
                className={`p-space-sm rounded-lg flex ${
                  isPrimary
                    ? "flex-col bg-primary-container text-on-primary"
                    : "items-center justify-between " + p.cardBg
                }`}
              >
                {isPrimary ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-fixed-dim">
                        Next Lesson (10:15 AM)
                      </span>
                      <span className="font-label-sm text-label-sm bg-surface-container-lowest/20 px-space-xs py-0.5 rounded">
                        {p.status}
                      </span>
                    </div>
                    <p className="font-title-md text-body-lg text-surface-container-lowest mt-1">
                      {p.title}
                    </p>
                    <p className="font-body-sm text-body-sm text-primary-fixed-dim">
                      {p.subtitle}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col">
                      <span
                        className={`font-title-md text-body-md ${"titleColor" in p && p.titleColor ? p.titleColor : "text-on-surface"}`}
                      >
                        {p.time}
                      </span>
                      <span
                        className={`font-body-sm text-body-sm ${"subColor" in p && p.subColor ? p.subColor : "text-on-surface-variant"}`}
                      >
                        {p.title}
                      </span>
                    </div>
                    <span
                      className={`font-label-sm text-label-sm px-space-xs py-0.5 rounded ${p.statusColor}`}
                    >
                      {p.status}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-space-md pt-space-xs flex items-center justify-between text-body-sm">
        <span className="font-label-sm text-label-sm text-on-surface-variant">
          Homeroom Duty: Mrs. Danladi
        </span>
        <span className="font-label-sm text-label-sm text-tertiary-container font-semibold">
          On Schedule
        </span>
      </div>
    </div>
  );
}