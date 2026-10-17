import {
  School,
  UserCog,
  CreditCard,
  Clock,
  Megaphone,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";
import { MODULES } from "@/lib/admin-data";

const ICON_MAP: Record<string, LucideIcon> = {
  school: School,
  teacher: UserCog,
  payments: CreditCard,
  clock: Clock,
  campaign: Megaphone,
  attendance: CalendarCheck,
};

export default function AdminModules() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm border border-surface-container">
      <div className="mb-space-lg">
        <h2 className="font-headline-md text-headline-md text-primary font-bold">
          Other School Modules
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
          Additional management features planned for upcoming releases.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {MODULES.map((m) => {
          const Icon = ICON_MAP[m.icon];
          return (
            <div
              key={m.title}
              className="bg-surface-container-low/50 p-space-lg rounded-xl border border-surface-container flex items-center justify-between"
            >
              <div className="flex items-center gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">
                    {m.title}
                  </h3>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {m.subtitle}
                  </span>
                </div>
              </div>
              <span className="font-label-sm text-label-sm bg-surface-container text-on-surface-variant px-space-sm py-1 rounded font-semibold">
                Coming Soon
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}