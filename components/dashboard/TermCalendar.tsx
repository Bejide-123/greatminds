import { CalendarDays, PartyPopper } from "lucide-react";
import { CALENDAR } from "@/lib/dashboard-data";

export default function TermCalendar() {
  return (
    <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-high flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-space-xs mb-space-md border-b border-surface-container-high">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold">
                Term Calendar
              </h3>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Primary Academic Milestones
              </span>
            </div>
          </div>
          <span className="font-label-sm text-label-sm text-outline font-semibold">
            Final Weeks
          </span>
        </div>

        <div className="space-y-space-md pl-1">
          {CALENDAR.map((event) => (
            <div key={event.title} className="relative pl-5">
              <div
                className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full ${event.dot}`}
              />
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-body-sm text-on-surface font-bold">
                    {event.title}
                  </span>
                  <span
                    className={`font-label-sm text-label-sm font-bold ${event.dateColor}`}
                  >
                    {event.date}
                  </span>
                </div>
                <span className="font-body-sm text-[12px] text-on-surface-variant">
                  {event.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-space-md p-space-sm bg-surface-container-low rounded-lg flex items-center gap-space-sm border border-surface-container-high">
        <PartyPopper className="w-5 h-5 text-secondary-container" />
        <span className="font-body-sm text-[12px] text-on-surface font-medium">
          Congratulations Amina on a stellar First Term in Basic 4 Diamond!
        </span>
      </div>
    </div>
  );
}