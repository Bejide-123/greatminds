"use client";

import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import type { BroadsheetData, BroadsheetStudent } from "@/lib/broadsheet/types";

type Props = {
  data: BroadsheetData;
  onViewPupil: (student: BroadsheetStudent) => void;
  onPageChange: (page: number) => void;
};

function gradeColor(grade: string | null) {
  if (!grade) return "text-outline";
  if (grade.startsWith("A")) return "text-tertiary-container";
  if (grade.startsWith("B")) return "text-primary";
  if (grade.startsWith("C")) return "text-secondary";
  return "text-error";
}

function tierChipClass(tier: string) {
  if (tier === "Distinction")
    return "bg-tertiary-fixed text-tertiary-fixed-variant";
  if (tier === "Merit") return "bg-primary-fixed text-primary";
  if (tier === "Credit B+") return "bg-surface-container-high text-on-surface";
  if (tier === "Credit B") return "bg-surface-container-high text-on-surface";
  if (tier === "Pass") return "bg-secondary-fixed text-secondary";
  return "bg-error-container text-on-error-container";
}

function initials(s: BroadsheetStudent) {
  return [s.firstName, s.surname]
    .map((p) => p[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function BroadsheetTable({
  data,
  onViewPupil,
  onPageChange,
}: Props) {
  const { subjects, students, subjectStats, pagination } = data;

  return (
    <div className="w-full bg-surface-container-lowest shadow-sm rounded-xl overflow-hidden mb-space-xl">
      <div className="overflow-x-auto relative max-w-full">
        <table className="w-full border-collapse text-left font-tabular-data text-tabular-data whitespace-nowrap">
          <thead>
            <tr className="bg-surface-container-high text-on-surface font-label-sm text-[11px] uppercase tracking-wider">
              {/* Sticky rank */}
              <th className="sticky left-0 z-30 bg-surface-container-high px-space-sm py-3 w-12 text-center shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">
                Rank
              </th>
              {/* Sticky adm no */}
              <th className="sticky left-12 z-30 bg-surface-container-high px-space-sm py-3 w-28 shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">
                Adm No.
              </th>
              {/* Sticky name */}
              <th className="sticky left-40 z-30 bg-surface-container-high px-space-md py-3 min-w-[210px] shadow-[2px_0_5px_0_rgba(0,0,0,0.08)]">
                Pupil Name
              </th>
              <th className="px-space-xs py-3 w-8 text-center">Sex</th>

              {/* Subject columns */}
              {subjects.map((subj) => (
                <th
                  key={subj.id}
                  className="px-2.5 py-3 text-center bg-surface-container font-bold text-primary min-w-[76px]"
                  title={subj.name}
                >
                  <div>{subj.code}</div>
                  <div className="text-[9px] text-on-surface-variant font-normal">
                    Tot/Grd
                  </div>
                </th>
              ))}

              {/* Summary columns */}
              <th className="px-space-sm py-3 text-center bg-surface-container-highest font-bold text-primary min-w-[90px]">
                Aggregate
              </th>
              <th className="px-space-sm py-3 text-center bg-surface-container-highest font-bold text-primary min-w-[80px]">
                Average
              </th>
              <th className="px-space-sm py-3 text-center bg-surface-container-highest min-w-[70px]">
                Pos
              </th>
              <th className="px-space-sm py-3 text-left bg-surface-container-highest min-w-[120px]">
                Tier
              </th>
              <th className="px-space-md py-3 text-left min-w-[170px]">
                Tutor Remark
              </th>
              <th className="px-space-sm py-3 text-center w-20">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high font-body-sm text-body-sm text-on-surface">
            {students.length === 0 && (
              <tr>
                <td
                  colSpan={subjects.length + 10}
                  className="px-space-lg py-space-md text-center text-on-surface-variant"
                >
                  No pupils or results recorded for this class and term yet.
                </td>
              </tr>
            )}
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-surface-container-low transition-colors bg-surface-container-lowest group"
              >
                {/* Sticky rank */}
                <td className="sticky left-0 z-20 bg-inherit px-space-sm py-2.5 text-center font-bold text-on-surface shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-surface-container-high font-bold text-[11px]">
                    {student.position ?? "—"}
                  </span>
                </td>
                {/* Sticky adm */}
                <td className="sticky left-12 z-20 bg-inherit px-space-sm py-2.5 text-on-surface-variant font-medium text-[12px] shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">
                  {student.admissionNumber}
                </td>
                {/* Sticky name */}
                <td className="sticky left-40 z-20 bg-inherit px-space-md py-2.5 shadow-[2px_0_5px_0_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-space-sm">
                    <span className="w-7 h-7 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center shrink-0">
                      {initials(student)}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-title-md text-[13px] text-on-surface font-bold truncate">
                        {student.surname}, {student.firstName}
                        {student.otherName ? ` ${student.otherName[0]}.` : ""}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-space-xs py-2.5 text-center text-on-surface-variant font-medium">
                  {student.sex === "MALE" ? "M" : "F"}
                </td>

                {/* Subject cells */}
                {student.scores.map((score, i) => (
                  <td
                    key={score.subjectId}
                    className={`px-2 py-2 text-center ${
                      i % 2 === 0 ? "bg-surface-container-low/40" : ""
                    }`}
                  >
                    <div className={`font-bold ${gradeColor(score.grade)}`}>
                      {score.totalScore != null ? score.totalScore : "—"}
                    </div>
                    {score.grade && (
                      <div className={`text-[10px] font-bold ${gradeColor(score.grade)}`}>
                        {score.grade}
                      </div>
                    )}
                  </td>
                ))}

                {/* Summary */}
                <td className="px-space-sm py-2 text-center font-bold text-primary bg-surface-container-low">
                  {student.aggregate ?? "—"}
                </td>
                <td className="px-space-sm py-2 text-center font-bold text-tertiary-container bg-surface-container-low text-[14px]">
                  {student.overallAverage != null
                    ? `${student.overallAverage.toFixed(1)}%`
                    : "—"}
                </td>
                <td className="px-space-sm py-2 text-center font-bold text-on-surface bg-surface-container-low">
                  {student.position ?? "—"}
                </td>
                <td className="px-space-sm py-2 bg-surface-container-low">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${tierChipClass(
                      student.tier,
                    )}`}
                  >
                    {student.tier}
                  </span>
                </td>
                <td className="px-space-md py-2 text-[12px] text-on-surface-variant italic truncate max-w-[190px]">
                  {student.teacherRemark ?? "—"}
                </td>
                <td className="px-space-sm py-2 text-center">
                  <button
                    type="button"
                    onClick={() => onViewPupil(student)}
                    className="p-1 rounded hover:bg-surface-container text-primary"
                    title="View pupil result"
                  >
                    <Eye className="w-[18px] h-[18px]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-surface-container text-on-surface font-semibold text-[11px]">
            <tr className="border-t-2 border-primary/20">
              <td
                className="sticky left-0 z-20 bg-surface-container px-space-md py-2.5 text-right font-bold text-primary shadow-[2px_0_5px_0_rgba(0,0,0,0.08)]"
                colSpan={4}
              >
                SUBJECT MEAN (%):
              </td>
              {subjects.map((subj) => {
                const stat = subjectStats.find((s) => s.subjectId === subj.id);
                return (
                  <td
                    key={subj.id}
                    className="px-2 py-2 text-center text-primary font-bold"
                  >
                    {stat?.mean != null ? `${stat.mean}%` : "—"}
                  </td>
                );
              })}
              <td
                className="px-space-md py-2 text-on-surface-variant font-normal italic"
                colSpan={6}
              >
                Mean calculated across pupils on current page
              </td>
            </tr>
            <tr className="bg-surface-container-low text-on-surface-variant text-[10px]">
              <td
                className="sticky left-0 z-20 bg-surface-container-low px-space-md py-2 text-right font-bold shadow-[2px_0_5px_0_rgba(0,0,0,0.08)]"
                colSpan={4}
              >
                HIGHEST / LOWEST:
              </td>
              {subjects.map((subj) => {
                const stat = subjectStats.find((s) => s.subjectId === subj.id);
                return (
                  <td key={subj.id} className="px-2 py-1.5 text-center">
                    {stat?.highest != null ? stat.highest : "—"} /{" "}
                    {stat?.lowest != null ? stat.lowest : "—"}
                  </td>
                );
              })}
              <td className="px-space-md py-1.5 text-right font-bold text-on-surface" colSpan={6}>
                Class-wide data across {pagination.total} pupils
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pagination strip */}
      <div className="px-space-lg py-space-sm bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between text-body-sm text-on-surface-variant gap-2">
        <span>
          Showing{" "}
          <strong>
            {(pagination.page - 1) * pagination.perPage + 1} to{" "}
            {Math.min(
              pagination.page * pagination.perPage,
              pagination.total,
            )}
          </strong>{" "}
          of {pagination.total} pupils
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="px-2 py-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high disabled:opacity-40 flex items-center gap-1"
          >
            <ChevronLeft className="w-3 h-3" />
            Previous
          </button>
          {Array.from({ length: pagination.totalPages }).map((_, i) => {
            const p = i + 1;
            const isActive = p === pagination.page;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  isActive
                    ? "bg-primary text-on-primary font-bold"
                    : "hover:bg-surface-container text-on-surface"
                }`}
              >
                {p}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className="px-2 py-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high disabled:opacity-40 flex items-center gap-1"
          >
            Next
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}