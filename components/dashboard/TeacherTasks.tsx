import Link from "next/link";
import {
  Zap,
  CalendarDays,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Send,
  ClipboardCheck,
} from "lucide-react";
import { TASKS } from "@/lib/teacher-data";

const ICON_MAP = {
  edit_calendar: CalendarDays,
  stars: Sparkles,
  verified_user: ShieldCheck,
} as const;

const BTN_ICON_MAP = {
  rate_review: ClipboardCheck,
  send: Send,
} as const;

export default function TeacherTasks() {
  return (
    <div className="flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <Zap className="text-primary w-5 h-5" />
          <h2 className="font-headline-md text-headline-sm text-on-surface">
            Class Teacher Master Tasks &amp; Actions
          </h2>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
          3 Priority Steps for Term 1
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
        {TASKS.map((task) => {
          const Icon = ICON_MAP[task.icon];
          const buttonIcon =
            "icon" in task.button ? task.button.icon : undefined;
          const BtnIcon = buttonIcon ? BTN_ICON_MAP[buttonIcon] : ArrowRight;

          return (
            <div
              key={task.title}
              className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-space-md ${task.iconBg}`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                {"tagBadge" in task && task.tagBadge ? (
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-label-sm text-label-sm uppercase tracking-wider font-bold ${task.tagColor}`}
                    >
                      {task.tag}
                    </span>
                    <span
                      className={`font-label-sm text-label-sm px-space-xs py-0.5 rounded-full font-bold ${task.tagBadge.color}`}
                    >
                      {task.tagBadge.text}
                    </span>
                  </div>
                ) : (
                  <span
                    className={`font-label-sm text-label-sm uppercase tracking-wider font-bold ${task.tagColor}`}
                  >
                    {task.tag}
                  </span>
                )}

                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                  {task.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                  {task.description}
                </p>

                <div className="mt-space-md flex items-center gap-space-xs">
                  <span
                    className={`font-label-sm text-label-sm px-space-xs py-0.5 rounded ${task.badge.color}`}
                  >
                    {task.badge.text}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {task.badgeNote}
                  </span>
                </div>
              </div>

              <Link
                href={task.href}
                className={`mt-space-lg w-full py-2.5 px-space-md ${task.button.bg} ${task.button.color} font-title-md text-label-md rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm`}
              >
                {buttonIcon && <BtnIcon className="w-[18px] h-[18px]" />}
                <span>{task.button.label}</span>
                {!buttonIcon && <ArrowRight className="w-[18px] h-[18px]" />}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}