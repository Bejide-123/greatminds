"use client";

import {
  School,
  CalendarDays,
  Badge,
  Save,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useUser } from "@/components/auth/UserProvider";
import {
  completedSubjectCount,
  type GradebookScore,
  type GradebookSubject,
} from "@/lib/gradebook-api";

type GradebookContextBarProps = {
  className: string;
  classSize: number;
  classCompletedCount: number;
  hasSelectedStudent: boolean;
  termLabel: string;
  subjects: GradebookSubject[];
  scores: GradebookScore[];
  resultStatus: string | null;
  disabled: boolean;
  isSaving: boolean;
  isSubmitting: boolean;
  onSave: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export default function GradebookContextBar({
  className,
  classSize,
  classCompletedCount,
  hasSelectedStudent,
  termLabel,
  subjects,
  scores,
  resultStatus,
  disabled,
  isSaving,
  isSubmitting,
  onSave,
  onNext,
  onSubmit,
}: GradebookContextBarProps) {
  const { user } = useUser();
  const completed = completedSubjectCount(subjects, scores);
  const canSubmit =
    subjects.length > 0 && completed === subjects.length && !disabled;

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container-high/60">
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
          <span className="hover:text-primary transition-colors cursor-pointer">
            Primary Section
          </span>
          <ChevronRight className="w-[14px] h-[14px] text-outline" />
          <span className="hover:text-primary transition-colors cursor-pointer">
            Results Entry
          </span>
          <ChevronRight className="w-[14px] h-[14px] text-outline" />
          <span className="text-on-surface font-title-md font-semibold">
            {className}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
          <div className="flex items-center gap-space-xs bg-[#0B1D3A] text-surface-container-lowest px-space-md py-1.5 rounded-lg shadow-sm">
            <School className="w-5 h-5 text-secondary-container" />
            <span className="font-headline-sm text-headline-sm font-bold tracking-tight">
              {className}
            </span>
            <span className="font-label-sm text-primary-fixed-dim text-[12px]">
              ({classSize} Pupils)
            </span>
          </div>

          <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-1.5 rounded-lg border border-surface-container">
            <CalendarDays className="w-[18px] h-[18px] text-primary" />
            <span className="font-label-md text-label-md font-semibold text-on-surface">
              {termLabel}
            </span>
          </div>

          <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-1.5 rounded-lg border border-surface-container">
            <Badge className="w-[18px] h-[18px] text-outline" />
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Homeroom Lead:{" "}
              <strong className="text-on-surface font-semibold">
                {user?.displayName}
              </strong>
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-space-md py-1.5 rounded-full bg-tertiary-container/15 text-on-tertiary-container border border-on-tertiary-container/20">
            <span className="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse" />
            <span className="font-label-md text-label-md font-bold">
              {classCompletedCount} of {classSize} Students Complete
            </span>
            <span className="font-label-sm text-[11px] text-outline">
              • {Math.max(classSize - classCompletedCount, 0)} Pending
            </span>
          </div>
          {resultStatus && (
            <span className="rounded-full bg-primary-fixed px-2 py-1 text-xs font-semibold text-primary">
              {resultStatus.replaceAll("_", " ")}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-space-sm self-start lg:self-center">
        <button
          type="button"
          onClick={onSave}
          disabled={disabled || isSaving || isSubmitting}
          className="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container transition-all font-title-md text-body-sm border border-surface-container shadow-sm"
        >
          <Save className="w-[18px] h-[18px]" />
          <span>{isSaving ? "Saving..." : "Save Draft"}</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!hasSelectedStudent || isSaving || isSubmitting || classSize < 2}
          className="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-primary-container text-surface-container-lowest hover:bg-[#122B55] transition-all font-title-md text-body-sm shadow-sm"
        >
          <span>Save &amp; Next Pupil</span>
          <ArrowRight className="w-[18px] h-[18px]" />
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit || isSaving || isSubmitting}
          className="flex items-center gap-1.5 px-space-lg py-2 rounded-lg bg-secondary-container hover:bg-secondary text-on-secondary transition-all font-title-md text-body-sm shadow-sm font-semibold"
        >
          <ShieldCheck className="w-[18px] h-[18px]" />
          <span>{isSubmitting ? "Submitting..." : "Submit for Review"}</span>
        </button>
      </div>
    </div>
  );
}