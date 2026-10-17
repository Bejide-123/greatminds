import { Flag, Check, BookOpen } from "lucide-react";
import { STUDENT_ROWS, GRADE_STYLES } from "@/lib/review-data";

export default function ClassBroadsheet() {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container overflow-hidden">
      <div className="p-space-md border-b border-surface-container flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-space-sm">
          <BookOpen className="text-primary w-5 h-5" />
          <span className="font-title-md text-body-lg text-primary">
            Class Broadsheet
          </span>
          <span className="text-label-sm bg-surface-container-low text-on-surface px-2 py-0.5 rounded-full font-medium">
            SS2 Gold • Mathematics
          </span>
        </div>
        <span className="text-body-sm text-on-surface-variant">
          Showing 5 of 42 records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant font-label-sm uppercase tracking-wider text-label-sm">
              <th className="py-space-md px-space-lg">Student Name</th>
              <th className="py-space-md px-space-md">Roll No / ID</th>
              <th className="py-space-md px-space-md text-center">CA (40)</th>
              <th className="py-space-md px-space-md text-center">Exam (60)</th>
              <th className="py-space-md px-space-md text-center font-bold text-primary">
                Total (100)
              </th>
              <th className="py-space-md px-space-md text-center">Grade</th>
              <th className="py-space-md px-space-lg text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container text-body-md text-on-surface">
            {STUDENT_ROWS.map((s) => {
              const flagged = s.status === "flagged";
              return (
                <tr
                  key={s.admissionNo}
                  className={
                    flagged
                      ? "bg-secondary-fixed/15 hover:bg-secondary-fixed/25 transition-colors"
                      : "hover:bg-surface-container-low/60 transition-colors"
                  }
                >
                  <td className="py-space-md px-space-lg font-medium">
                    {s.name}
                  </td>
                  <td className="py-space-md px-space-md text-on-surface-variant text-body-sm">
                    {s.admissionNo}
                  </td>
                  <td className="py-space-md px-space-md text-center">
                    {s.ca}
                  </td>
                  <td className="py-space-md px-space-md text-center">
                    {s.exam}
                  </td>
                  <td
                    className={`py-space-md px-space-md text-center font-bold ${
                      flagged ? "text-secondary" : "text-primary"
                    }`}
                  >
                    {s.total}
                  </td>
                  <td className="py-space-md px-space-md text-center">
                    <span
                      className={`inline-block font-bold px-2.5 py-0.5 rounded text-xs ${
                        GRADE_STYLES[s.grade] ?? "bg-surface-container text-on-surface"
                      }`}
                    >
                      {s.grade}
                    </span>
                  </td>
                  <td className="py-space-md px-space-lg text-center">
                    {flagged ? (
                      <span className="inline-flex items-center gap-1 text-secondary text-body-sm font-medium">
                        <Flag className="w-4 h-4" />
                        Flagged
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-emerald-700 text-body-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Ready
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-space-md bg-surface-container-low flex items-center justify-between text-body-sm text-on-surface-variant">
        <span>Showing 1 to 5 of 42 student marks</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container text-xs"
          >
            Previous
          </button>
          <button
            type="button"
            className="px-2.5 py-1 rounded bg-primary text-white font-medium text-xs"
          >
            1
          </button>
          <button
            type="button"
            className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container text-xs"
          >
            2
          </button>
          <button
            type="button"
            className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container text-xs"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}