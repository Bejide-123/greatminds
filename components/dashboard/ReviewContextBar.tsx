"use client";

import {
  CalendarDays,
  Undo2,
  CheckCircle2,
  ChevronDown,
  User,
} from "lucide-react";
import { ReviewClass } from "@/lib/review-data";

type Props = {
  activeClass: ReviewClass;
  onReturnToTeacher: () => void;
  onApprove: () => void;
};

export default function ReviewContextBar({
  activeClass,
  onReturnToTeacher,
  onApprove,
}: Props) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container flex flex-wrap items-center justify-between gap-space-md">
      <div className="flex flex-wrap items-center gap-space-md">
        <div className="flex items-center gap-space-xs">
          <label className="text-label-sm text-on-surface-variant font-semibold uppercase">
            Class:
          </label>
          <div className="relative">
            <select
              defaultValue={activeClass.className}
              className="appearance-none bg-surface-container-low text-on-surface text-body-sm rounded-lg pl-space-sm pr-8 py-1.5 font-medium focus:ring-1 focus:ring-primary outline-none cursor-pointer"
            >
              <option>{activeClass.className}</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-space-xs">
          <label className="text-label-sm text-on-surface-variant font-semibold uppercase">
            Subject:
          </label>
          <div className="relative">
            <select
              defaultValue={activeClass.subject}
              className="appearance-none bg-surface-container-low text-on-surface text-body-sm rounded-lg pl-space-sm pr-8 py-1.5 font-medium focus:ring-1 focus:ring-primary outline-none cursor-pointer"
            >
              <option>{activeClass.subject}</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-space-xs">
          <label className="text-label-sm text-on-surface-variant font-semibold uppercase">
            Term:
          </label>
          <div className="relative">
            <select className="appearance-none bg-surface-container-low text-on-surface text-body-sm rounded-lg pl-space-sm pr-8 py-1.5 font-medium focus:ring-1 focus:ring-primary outline-none cursor-pointer">
              <option>First Term</option>
              <option>Second Term</option>
              <option>Third Term</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-space-sm">
        <div className="inline-flex items-center gap-space-xs bg-surface-container px-space-md py-1.5 rounded-full text-body-sm text-on-surface">
          <User className="w-4 h-4 text-primary" />
          <span>
            Submitted by: <strong>{activeClass.teacher}</strong>
          </span>
          <span className="text-outline-variant">•</span>
          <span className="text-primary font-semibold">
            {activeClass.pupilsCount} Students
          </span>
        </div>

        <button
          type="button"
          onClick={onReturnToTeacher}
          className="px-space-md py-2.5 rounded-lg border border-outline-variant text-on-surface font-label-md hover:bg-surface-container-low transition-colors flex items-center gap-1.5"
        >
          <Undo2 className="w-[18px] h-[18px] text-secondary" />
          Return to Teacher
        </button>

        <button
          type="button"
          onClick={onApprove}
          className="px-space-lg py-2.5 rounded-lg bg-secondary-container hover:bg-secondary text-white font-label-md font-semibold transition-colors shadow-sm flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-[18px] h-[18px]" />
          Approve &amp; Publish Results
        </button>
      </div>
    </div>
  );
}