import { FileEdit, ArrowRight } from "lucide-react";
import { HOMEWORK } from "@/lib/dashboard-data";

export default function HomeworkLog() {
  return (
    <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-high flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-space-xs mb-space-md border-b border-surface-container-high">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary-container">
              <FileEdit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold">
                Homework &amp; Reading Log
              </h3>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Home tasks for parent review
              </span>
            </div>
          </div>
          <span className="font-label-sm text-label-sm bg-secondary-container/15 text-secondary font-bold px-2 py-0.5 rounded-full">
            3 Tasks
          </span>
        </div>

        <div className="space-y-space-md">
          {HOMEWORK.map((hw) => (
            <div
              key={hw.title}
              className="p-space-sm rounded-lg bg-surface-container-low border border-surface-container-high"
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`font-label-sm text-[11px] font-bold px-2 py-0.5 rounded ${hw.subjectColor}`}
                >
                  {hw.subject}
                </span>
                <span className={`font-label-sm text-[11px] ${hw.dueColor}`}>
                  {hw.due}
                </span>
              </div>
              <h4 className="font-title-md text-[13px] font-semibold text-on-surface">
                {hw.title}
              </h4>
              <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                {hw.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-space-md pt-space-xs flex items-center justify-between">
        <span className="font-body-sm text-[12px] text-outline">
          Parent Signature Verified
        </span>
        <button
          type="button"
          className="font-label-sm text-label-sm text-primary font-bold hover:underline inline-flex items-center gap-1"
        >
          Open Full Homework Diary <ArrowRight className="w-[14px] h-[14px]" />
        </button>
      </div>
    </div>
  );
}