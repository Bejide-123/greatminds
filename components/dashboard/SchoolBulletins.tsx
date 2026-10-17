import { Megaphone, ChevronRight } from "lucide-react";
import { BULLETINS } from "@/lib/dashboard-data";

export default function SchoolBulletins() {
  return (
    <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-high flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-space-xs mb-space-md border-b border-surface-container-high">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary-container">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold">
                Official Primary School Bulletins
              </h3>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Office of the Headteacher &amp; Registrar
              </span>
            </div>
          </div>
          <span className="font-label-sm text-label-sm bg-secondary-container/15 text-secondary font-bold px-2 py-0.5 rounded-full">
            Parent Notices
          </span>
        </div>

        {BULLETINS.map((b, i) => (
          <div
            key={b.title}
            className={`p-space-md rounded-lg bg-surface-container-low border border-surface-container-high ${
              i < BULLETINS.length - 1 ? "mb-space-sm" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span
                className={`font-label-sm text-label-sm font-bold px-2 py-0.5 rounded ${b.tagColor}`}
              >
                {b.tag}
              </span>
              <span className="font-body-sm text-body-sm text-outline">
                {b.date}
              </span>
            </div>
            <h4 className="font-headline-sm text-body-md font-bold text-on-surface mb-1">
              {b.title}
            </h4>
            <p className="font-body-md text-body-sm text-on-surface-variant">
              {b.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-space-md pt-space-xs flex items-center justify-between">
        <span className="font-body-sm text-[12px] text-outline">
          Showing bulletins for Basic 4 Section
        </span>
        <a
          href="#"
          className="font-title-md text-body-sm text-primary font-bold hover:underline inline-flex items-center gap-1"
        >
          School Noticeboard Archive <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}