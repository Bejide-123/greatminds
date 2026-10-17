"use client";

import { BookOpen } from "lucide-react";
import { computeGrade } from "@/lib/gradebook-data";
import {
  type GradebookScore,
  type GradebookSubject,
} from "@/lib/gradebook-api";

type SubjectEntryTableProps = {
  subjects: GradebookSubject[];
  scores: GradebookScore[];
  onChange: (subjectId: string, field: "caScore" | "examScore", value: number | null) => void;
  disabled: boolean;
};

export default function SubjectEntryTable({
  subjects,
  scores,
  onChange,
  disabled,
}: SubjectEntryTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-surface-container-high/60 bg-surface-container-lowest shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-container bg-surface-container-low px-space-lg py-space-md">
        <div className="flex items-center gap-space-xs">
          <BookOpen className="h-5 w-5 text-primary" />
          <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Subject Grades &amp; Continuous Assessment
          </h4>
        </div>
        <div className="flex items-center gap-space-xs font-medium text-label-sm text-on-surface-variant">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" />
          <span>CA: 40%</span>
          <span className="text-outline">|</span>
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-secondary-container" />
          <span>Exam: 60%</span>
          <span className="text-outline">|</span>
          <span>Total: 100%</span>
        </div>
      </div>

      {subjects.length === 0 ? (
        <p className="p-space-lg text-sm text-on-surface-variant">
          No active subjects are configured. Ask an administrator to add subjects.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead className="bg-[#0B1D3A] font-label-sm text-label-sm uppercase tracking-wider text-surface-container-lowest">
              <tr>
                <th className="w-12 px-space-md py-3 text-center">#</th>
                <th className="min-w-[220px] px-space-md py-3">Subject Name</th>
                <th className="w-24 bg-[#122B55] px-space-sm py-3 text-center">
                  CA <span className="block text-[10px] text-primary-fixed-dim">(Max 40)</span>
                </th>
                <th className="w-24 px-space-sm py-3 text-center">
                  Exam <span className="block text-[10px] text-secondary-fixed-dim">(Max 60)</span>
                </th>
                <th className="w-24 bg-[#122B55] px-space-sm py-3 text-center">
                  Total <span className="block text-[10px] text-primary-fixed-dim">(100%)</span>
                </th>
                <th className="w-28 px-space-sm py-3 text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
              {subjects.map((subject, index) => {
                const score = scores.find((row) => row.subjectId === subject.id);
                const total =
                  score && score.caScore !== null && score.examScore !== null
                  ? score.caScore + score.examScore
                  : null;
                const grade = total === null ? null : computeGrade(total);

                return (
                  <tr key={subject.id} className="transition-colors hover:bg-surface-container-low/60">
                    <td className="px-space-md py-2.5 text-center font-bold text-outline">
                      {index + 1}
                    </td>
                    <td className="px-space-md py-2.5">
                      <span className="block font-title-md text-body-sm font-bold text-primary">
                        {subject.name}
                      </span>
                      <span className="text-[11px] text-on-surface-variant">
                        {subject.code}
                      </span>
                    </td>
                    <td className="px-space-sm py-2.5 text-center">
                      <input
                        type="number"
                        min={0}
                        max={40}
                        step="0.01"
                        value={score?.caScore ?? ""}
                        onChange={(event) =>
                          onChange(
                            subject.id,
                            "caScore",
                            event.target.value === "" ? null : Number(event.target.value)
                          )
                        }
                        disabled={disabled}
                        aria-label={`${subject.name} CA score`}
                        className="w-16 rounded border border-surface-container bg-surface-container-low py-1 text-center font-tabular-data text-body-sm font-bold focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </td>
                    <td className="px-space-sm py-2.5 text-center">
                      <input
                        type="number"
                        min={0}
                        max={60}
                        step="0.01"
                        value={score?.examScore ?? ""}
                        onChange={(event) =>
                          onChange(
                            subject.id,
                            "examScore",
                            event.target.value === "" ? null : Number(event.target.value)
                          )
                        }
                        disabled={disabled}
                        aria-label={`${subject.name} exam score`}
                        className="w-16 rounded border border-surface-container bg-surface-container-low py-1 text-center font-tabular-data text-body-sm font-bold text-secondary focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary-container disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </td>
                    <td className="bg-surface-container-low/50 px-space-sm py-2.5 text-center">
                      {total === null ? "—" : total}
                    </td>
                    <td className="px-space-sm py-2.5 text-center">
                      {grade ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-tertiary-container px-2 py-0.5 font-label-md text-label-md font-bold text-on-tertiary-container">
                          {grade.grade}
                          <span className="text-[10px] font-normal opacity-80">
                            ({grade.label})
                          </span>
                        </span>
                      ) : (
                        <span className="text-outline">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
