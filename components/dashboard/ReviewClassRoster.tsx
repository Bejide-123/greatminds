"use client";

import {
  Layers,
  Search,
  CheckCircle2,
  Clock,
  ChevronsRight,
  MoreVertical,
} from "lucide-react";
import { REVIEW_CLASSES, ReviewClass } from "@/lib/review-data";

type Props = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function ReviewClassRoster({ selectedId, onSelect }: Props) {
  return (
    <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container-high/60">
      <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
        <div className="flex items-center gap-space-xs">
          <Layers className="text-primary w-5 h-5" />
          <h2 className="font-title-md text-title-md font-bold text-on-surface">
            Classes Awaiting Review
          </h2>
        </div>
        <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold">
          {REVIEW_CLASSES.filter((c) => c.status === "pending").length} Pending
        </span>
      </div>

      <div className="relative flex items-center">
        <Search className="absolute left-3 text-outline w-[18px] h-[18px]" />
        <input
          type="text"
          placeholder="Search class or subject..."
          className="bg-surface-container-low text-on-surface font-body-sm text-body-sm pl-9 pr-space-md py-2 rounded-lg w-full focus:outline-none focus:bg-surface-container border border-surface-container transition-all placeholder:text-outline"
        />
      </div>

      <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-surface-container">
        <button
          type="button"
          className="flex-1 py-1 rounded text-center font-label-sm text-label-sm font-bold bg-surface-container-lowest text-primary shadow-xs"
        >
          All (4)
        </button>
        <button
          type="button"
          className="flex-1 py-1 rounded text-center font-label-sm text-label-sm font-medium text-on-surface-variant hover:text-on-surface"
        >
          Pending (3)
        </button>
        <button
          type="button"
          className="flex-1 py-1 rounded text-center font-label-sm text-label-sm font-medium text-on-surface-variant hover:text-on-surface"
        >
          Approved (1)
        </button>
      </div>

      <div className="flex flex-col gap-1.5 max-h-[720px] overflow-y-auto pr-0.5">
        {REVIEW_CLASSES.map((cls: ReviewClass) => {
          const isActive = cls.id === selectedId;
          const isPending = cls.status === "pending";
          return (
            <button
              key={cls.id}
              type="button"
              onClick={() => onSelect(cls.id)}
              className={`text-left p-2.5 rounded-xl cursor-pointer transition-all w-full ${
                isActive
                  ? "bg-primary-fixed/40 border-2 border-primary"
                  : "bg-surface-container-low/50 hover:bg-surface-container-low border border-surface-container"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col min-w-0">
                  <span
                    className={`font-title-md text-body-sm font-bold ${
                      isActive ? "text-primary" : "text-on-surface font-semibold"
                    }`}
                  >
                    {cls.className}
                  </span>
                  <span className="text-[11px] text-on-surface-variant truncate">
                    {cls.subject} • {cls.teacher}
                  </span>
                </div>
                <MoreVertical className="w-4 h-4 text-outline shrink-0" />
              </div>

              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] text-outline">
                  {cls.submittedAt}
                </span>
                <span
                  className={`inline-flex items-center gap-1 font-label-sm text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isPending
                      ? "text-secondary bg-secondary-fixed"
                      : "text-on-tertiary-container bg-tertiary-container/20"
                  }`}
                >
                  {isPending ? (
                    <>
                      <Clock className="w-[13px] h-[13px]" />
                      Pending
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-[13px] h-[13px]" />
                      Approved
                    </>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-on-surface-variant">
                  {cls.pupilsCount} pupils
                </span>
                <span className="text-[10px] text-on-surface-variant">
                  Avg {cls.avg}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-space-xs border-t border-surface-container">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2 px-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md transition-colors border border-surface-container"
        >
          <ChevronsRight className="w-4 h-4" />
          <span>
            Quick Nav: Next Pending Class{" "}
            <kbd className="font-mono text-[10px] bg-surface-container-lowest px-1 py-0.5 rounded border border-surface-container">
              Alt + N
            </kbd>
          </span>
        </button>
      </div>
    </div>
  );
}