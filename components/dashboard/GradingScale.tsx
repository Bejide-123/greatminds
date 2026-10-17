import { Award } from "lucide-react";
import { GRADING_SCALE } from "@/lib/results-data";

export default function GradingScale() {
  return (
    <div className="lg:col-span-5 bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between border border-surface-container-high/60">
      <div>
        <div className="flex items-center gap-space-xs mb-space-sm">
          <Award className="text-primary w-[18px] h-[18px]" />
          <h3 className="font-headline-sm text-title-md text-primary">
            Primary Grading Scale (British-Nigerian Standard)
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center font-label-sm text-label-sm">
          {GRADING_SCALE.map((g) => (
            <div
              key={g.grade}
              className="bg-surface-container-lowest p-2 rounded-lg flex flex-col border border-surface-container"
            >
              <div className="flex items-center justify-between">
                <span className={`font-bold ${g.gradeColor ?? "text-primary"}`}>
                  {g.grade}
                </span>
                <span className={`${g.tierColor} font-semibold`}>{g.tier}</span>
              </div>
              <span className="text-left text-[11px] text-outline mt-0.5">
                {g.note}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-space-sm pt-space-xs bg-surface-container p-space-xs rounded-lg flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
        <span>Primary Benchmark: 60% (Good)</span>
        <span className="font-bold text-primary">Distinction Honor: ≥90%</span>
      </div>
    </div>
  );
}