import { Megaphone, ExternalLink, Timer, PartyPopper } from "lucide-react";
import { NOTICES } from "@/lib/teacher-data";

const ICON_MAP = {
  timer: Timer,
  party: PartyPopper,
} as const;

export default function TeacherNotices() {
  return (
    <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-space-sm">
          <div className="flex items-center gap-space-xs">
            <Megaphone className="text-secondary-container w-[22px] h-[22px]" />
            <h3 className="font-title-md text-title-md text-on-surface">
              Primary Section Academic Notices
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-primary font-bold bg-surface-container px-space-sm py-0.5 rounded-full">
            Head of Primary Desk
          </span>
        </div>

        <div className="mt-space-md space-y-space-md">
          {NOTICES.map((n) => {
            const Icon = ICON_MAP[n.icon];
            return (
              <div
                key={n.title}
                className="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-md"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${n.iconBg}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-space-xs">
                    <span className="font-title-md text-body-md text-on-surface">
                      {n.title}
                    </span>
                    <span
                      className={`font-label-sm text-label-sm ${n.tagColor} px-space-xs py-0.5 rounded font-semibold`}
                    >
                      {n.tag}
                    </span>
                  </div>
                  <p className="font-body-md text-body-sm text-on-surface-variant mt-1">
                    {n.body}
                  </p>
                  <div className="mt-space-sm flex items-center gap-space-md text-body-sm">
                    <span className="font-label-sm text-[11px] text-on-surface-variant flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
                      {n.author}
                    </span>
                    <span className="font-label-sm text-[11px] text-on-surface-variant flex items-center gap-1">
                      <Timer className="w-[14px] h-[14px]" />
                      {n.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-space-md pt-space-xs flex justify-end">
        <button
          type="button"
          className="font-label-md text-label-sm text-primary hover:text-secondary-container transition-colors flex items-center gap-1"
        >
          View All Primary Notices <ExternalLink className="w-[14px] h-[14px]" />
        </button>
      </div>
    </div>
  );
}