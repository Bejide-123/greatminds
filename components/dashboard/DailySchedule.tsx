import { Clock, CheckCircle2, FlaskConical, Terminal } from "lucide-react";
import { SCHEDULE } from "@/lib/dashboard-data";

const ICON_MAP = {
  check: CheckCircle2,
  apple: null,
  science: FlaskConical,
  terminal: Terminal,
} as const;

export default function DailySchedule() {
  return (
    <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-high flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-space-xs mb-space-md border-b border-surface-container-high">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold">
                Daily Classroom Schedule &amp; Routine
              </h3>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Basic 4 Diamond • Today&apos;s Learning Fun
              </span>
            </div>
          </div>
          <span className="font-label-sm text-label-sm bg-surface-container-low text-primary font-bold px-space-sm py-1 rounded-full">
            Week 9 • Friday
          </span>
        </div>

        <div className="space-y-space-sm">
          {SCHEDULE.map((period) => {
            const Icon = ICON_MAP[period.icon];
            return (
              <div
                key={period.time}
                className={`flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low border-l-4 ${period.borderColor}`}
              >
                <div className="flex items-center gap-space-sm">
                  {period.icon === "apple" ? (
                    <span className="text-[18px]">🍎</span>
                  ) : Icon ? (
                    <Icon
                      className={`w-[18px] h-[18px] ${
                        period.icon === "science"
                          ? "text-primary animate-pulse"
                          : period.icon === "terminal"
                          ? "text-outline"
                          : "text-tertiary"
                      }`}
                    />
                  ) : null}
                  <div>
                    <span className="font-body-sm text-[13px] font-bold text-on-surface block">
                      {period.time}: {period.title}
                    </span>
                    <span className="font-label-sm text-[11px] text-on-surface-variant">
                      {period.sub}
                    </span>
                  </div>
                </div>
                <span
                  className={`font-label-sm text-[10px] px-2 py-0.5 rounded font-bold ${period.statusColor}`}
                >
                  {period.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-space-md pt-space-xs flex items-center justify-between text-on-surface-variant">
        <span className="font-body-sm text-[12px]">
          12:00 - 01:00 PM: Hot Lunch &amp; Quiet Reading Corner
        </span>
        <span className="font-label-sm text-[11px] text-primary font-bold">
          Supervised by Mrs. Danladi
        </span>
      </div>
    </div>
  );
}