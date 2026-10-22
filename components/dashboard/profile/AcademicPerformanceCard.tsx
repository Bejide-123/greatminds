import { BarChart3, ArrowRight } from "lucide-react";
import type { ProfileResult } from "@/lib/pupils/profile-types";

type Props = {
  result: ProfileResult | null;
};

function gradeColor(grade: string | null) {
  if (!grade) return "text-on-surface-variant";
  if (grade.startsWith("A")) return "text-primary";
  if (grade.startsWith("B")) return "text-secondary";
  if (grade.startsWith("C")) return "text-tertiary";
  return "text-on-surface";
}

export default function AcademicPerformanceCard({ result }: Props) {
  const subjects = result?.subjects ?? [];
  const hasResult = result !== null && subjects.length > 0;

  return (
    <section id="academic" className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-space-lg shadow-sm scroll-mt-24">
      <div className="flex items-center justify-between pb-space-md border-b border-outline-variant/30">
        <div className="flex items-center gap-space-sm">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-on-surface">
              Academic Performance &amp; Terminal Standing
            </h2>
            <p className="text-xs text-on-surface-variant">
              {result
                ? `${result.termName.charAt(0)}${result.termName
                    .slice(1)
                    .toLowerCase()} Term • ${result.sessionName}`
                : "No result available yet"}
            </p>
          </div>
        </div>
        {hasResult && (
          <a
            href="#"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            Full Report Sheet <ArrowRight className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-3 gap-space-sm my-space-md">
        <div className="bg-surface-container-low p-space-sm rounded-xl border border-outline-variant/40">
          <span className="text-xs text-on-surface-variant font-medium block">
            Term Average
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-primary font-tabular-data">
              {result?.overallAverage != null
                ? `${result.overallAverage.toFixed(1)}%`
                : "—"}
            </span>
          </div>
        </div>
        <div className="bg-surface-container-low p-space-sm rounded-xl border border-outline-variant/40">
          <span className="text-xs text-on-surface-variant font-medium block">
            Class Standing
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-secondary font-tabular-data">
              {result?.classPosition != null ? `${result.classPosition}th` : "—"}
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              {result?.classSize != null ? `of ${result.classSize}` : ""}
            </span>
          </div>
        </div>
        <div className="bg-surface-container-low p-space-sm rounded-xl border border-outline-variant/40">
          <span className="text-xs text-on-surface-variant font-medium block">
            Subjects
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-on-surface font-tabular-data">
              {subjects.length}
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              recorded
            </span>
          </div>
        </div>
      </div>

      {/* Subject table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-tabular-data">
          <thead className="bg-surface-container text-on-surface-variant uppercase text-[11px] tracking-wider">
            <tr>
              <th className="py-2.5 px-3 rounded-l">Subject</th>
              <th className="py-2.5 px-3">CA (40%)</th>
              <th className="py-2.5 px-3">Exam (60%)</th>
              <th className="py-2.5 px-3">Total (100%)</th>
              <th className="py-2.5 px-3 rounded-r">Benchmark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30 font-body-sm">
            {!hasResult && (
              <tr>
                <td
                  colSpan={5}
                  className="py-space-md px-3 text-center text-on-surface-variant"
                >
                  No subject scores recorded yet.
                </td>
              </tr>
            )}
            {subjects.map((s) => (
              <tr key={s.subjectId} className="hover:bg-surface-container-low/50 transition">
                <td className="py-2.5 px-3 font-semibold text-on-surface flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {s.subjectName}
                </td>
                <td className="py-2.5 px-3 text-on-surface">
                  {s.caScore != null ? `${s.caScore} / 40` : "—"}
                </td>
                <td className="py-2.5 px-3 text-on-surface">
                  {s.examScore != null ? `${s.examScore} / 60` : "—"}
                </td>
                <td
                  className={`py-2.5 px-3 font-bold ${gradeColor(s.grade)}`}
                >
                  {s.totalScore != null
                    ? `${s.totalScore}% ${s.grade ? `(${s.grade})` : ""}`
                    : "—"}
                </td>
                <td className="py-2.5 px-3">
                  <div className="w-full bg-surface-container rounded-full h-1.5 max-w-[100px]">
                    <div
                      className="bg-primary h-1.5 rounded-full"
                      style={{ width: `${s.totalScore ?? 0}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}