"use client";

import { useMemo, useState } from "react";
import { Check, Clock3, Search, Users } from "lucide-react";
import {
  completedSubjectCount,
  studentName,
  type GradebookStudent,
  type GradebookSubject,
} from "@/lib/gradebook-api";

type PupilRosterProps = {
  students: GradebookStudent[];
  subjects: GradebookSubject[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

type Filter = "all" | "complete" | "pending";

export default function PupilRoster({
  students,
  subjects,
  selectedId,
  onSelect,
}: PupilRosterProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const roster = useMemo(
    () =>
      students.map((student) => ({
        student,
        completed: completedSubjectCount(subjects, student.scores),
      })),
    [students, subjects]
  );
  const completeCount = roster.filter(
    ({ completed }) => completed === subjects.length && subjects.length > 0
  ).length;
  const visibleStudents = roster.filter(({ student, completed }) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "complete" && completed === subjects.length && subjects.length > 0) ||
      (filter === "pending" &&
        (subjects.length === 0 || completed < subjects.length));
    const query = search.trim().toLocaleLowerCase();
    const matchesSearch =
      query.length === 0 ||
      `${studentName(student)} ${student.admissionNumber}`
        .toLocaleLowerCase()
        .includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container-high/60">
      <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
        <div className="flex items-center gap-space-xs">
          <Users className="text-primary w-5 h-5" />
          <h2 className="font-title-md text-title-md font-bold text-on-surface">
            Class Roster
          </h2>
        </div>
        <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold">
          {students.length} Students
        </span>
      </div>

      <div className="relative flex items-center">
        <Search className="absolute left-3 text-outline w-[18px] h-[18px]" />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search name or admission no."
          aria-label="Search students"
          className="bg-surface-container-low text-on-surface font-body-sm text-body-sm pl-9 pr-space-md py-2 rounded-lg w-full focus:outline-none focus:bg-surface-container border border-surface-container transition-all placeholder:text-outline"
        />
      </div>

      <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-surface-container">
        {(
          [
            ["all", `All (${students.length})`],
            ["complete", `Complete (${completeCount})`],
            ["pending", `In progress (${students.length - completeCount})`],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={`flex-1 rounded py-1 text-center text-[10px] font-bold transition-all ${
              filter === value
                ? "bg-surface-container-lowest text-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {students.length === 0 ? (
        <p className="rounded-lg bg-surface-container-low p-4 text-sm text-on-surface-variant">
          There are no active students in this class.
        </p>
      ) : visibleStudents.length === 0 ? (
        <p className="rounded-lg bg-surface-container-low p-4 text-sm text-on-surface-variant">
          No students match your search.
        </p>
      ) : (
        <div className="flex max-h-[720px] flex-col gap-1.5 overflow-y-auto pr-0.5">
          {visibleStudents.map(({ student, completed }, index) => {
            const isActive = student.id === selectedId;
            const isComplete = subjects.length > 0 && completed === subjects.length;
            const StatusIcon = isComplete ? Check : Clock3;

            return (
              <button
                key={student.id}
                type="button"
                onClick={() => onSelect(student.id)}
                aria-current={isActive ? "true" : undefined}
                className={`flex w-full items-center justify-between rounded-xl p-2.5 text-left transition-all ${
                  isActive
                    ? "border-2 border-primary bg-primary-fixed/40"
                    : "border border-surface-container bg-surface-container-low/50 hover:bg-surface-container-low"
                }`}
              >
                <span className="flex min-w-0 items-center gap-space-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-container/20 text-sm font-bold text-primary">
                    {student.firstName[0]}
                    {student.surname[0]}
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span
                      className={`truncate text-sm font-semibold ${
                        isActive ? "text-primary" : "text-on-surface"
                      }`}
                    >
                      {studentName(student)}
                    </span>
                    <span className="truncate text-[11px] text-on-surface-variant">
                      #{index + 1} · {student.admissionNumber}
                    </span>
                  </span>
                </span>
                <span className="ml-2 flex shrink-0 flex-col items-end gap-1">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isComplete
                        ? "bg-tertiary-container/20 text-on-tertiary-container"
                        : "bg-secondary-fixed text-secondary"
                    }`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {student.status === "SUBMITTED"
                      ? "Submitted"
                      : student.status === "REJECTED"
                        ? "Returned"
                        : isComplete
                          ? "Complete"
                          : "In progress"}
                  </span>
                  <span className="text-[10px] text-outline">
                    {completed}/{subjects.length} subjects
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
