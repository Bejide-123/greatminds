"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Clock3, Search, Users } from "lucide-react";
import {
  REVIEW_CLASSES,
  STUDENT_ROWS,
  type ReviewClass,
} from "@/lib/review-data";

type Props = {
  selectedId: string;
  onSelect: (id: string) => void;
  activeClass: ReviewClass;
};

export default function ReviewStudentRoster({
  selectedId,
  onSelect,
  activeClass,
}: Props) {
  const [search, setSearch] = useState("");
  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return STUDENT_ROWS;
    return STUDENT_ROWS.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.admissionNo.toLowerCase().includes(query)
    );
  }, [search]);
  const pendingCount = REVIEW_CLASSES.filter(
    (item) => item.status === "pending"
  ).length;

  return (
    <aside className="flex flex-col gap-space-md rounded-xl border border-surface-container-high/60 bg-surface-container-lowest p-space-md shadow-sm lg:col-span-4 xl:col-span-3">
      <div className="flex items-center justify-between border-b border-surface-container pb-space-xs">
        <div className="flex items-center gap-space-xs">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="font-title-md text-title-md font-bold text-on-surface">
            Students
          </h2>
        </div>
        <span className="rounded-full bg-primary-fixed px-2 py-0.5 font-label-sm text-label-sm font-bold text-primary">
          {STUDENT_ROWS.length}
        </span>
      </div>

      <div className="rounded-lg bg-surface-container-low p-space-sm">
        <span className="font-label-sm text-label-sm font-semibold uppercase text-on-surface-variant">
          {activeClass.className}
        </span>
        <p className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
          Submitted by {activeClass.teacher}
        </p>
      </div>

      <label className="relative flex items-center">
        <Search className="absolute left-3 h-[18px] w-[18px] text-outline" />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search student or ID..."
          className="w-full rounded-lg border border-surface-container bg-surface-container-low py-2 pl-9 pr-space-md font-body-sm text-body-sm text-on-surface outline-none transition-colors placeholder:text-outline focus:border-primary focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
        />
      </label>

      <div className="flex flex-col gap-1.5 lg:max-h-[720px] lg:overflow-y-auto lg:pr-0.5">
        {filteredStudents.map((student) => {
          const isActive = student.admissionNo === selectedId;
          const isFlagged = student.status === "flagged";
          const StatusIcon = isFlagged ? Clock3 : CheckCircle2;

          return (
            <button
              key={student.admissionNo}
              type="button"
              onClick={() => onSelect(student.admissionNo)}
              className={`w-full rounded-xl border p-3 text-left transition-colors ${
                isActive
                  ? "border-primary bg-primary-fixed/40"
                  : "border-surface-container bg-surface-container-low/50 hover:bg-surface-container-low"
              }`}
            >
              <span
                className={`block truncate font-title-md text-body-sm font-bold ${
                  isActive ? "text-primary" : "text-on-surface"
                }`}
              >
                {student.name}
              </span>
              <span className="mt-0.5 block truncate font-body-sm text-[11px] text-on-surface-variant">
                {student.admissionNo}
              </span>
              <span
                className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-label-sm text-[11px] font-bold ${
                  isFlagged
                    ? "bg-secondary-fixed text-secondary"
                    : "bg-tertiary-container/20 text-on-tertiary-container"
                }`}
              >
                <StatusIcon className="h-[13px] w-[13px]" />
                {isFlagged ? "Needs attention" : "Submitted"}
              </span>
            </button>
          );
        })}

        {filteredStudents.length === 0 && (
          <p className="rounded-lg bg-surface-container-low p-space-md text-center font-body-sm text-body-sm text-on-surface-variant">
            No students match that search.
          </p>
        )}
      </div>

      <div className="border-t border-surface-container pt-space-sm font-body-sm text-body-sm text-on-surface-variant">
        <span className="font-semibold text-primary">{pendingCount}</span>{" "}
        classes awaiting review
      </div>
    </aside>
  );
}
