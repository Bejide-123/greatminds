import { Sparkles, School, GraduationCap, Trophy } from "lucide-react";
import { KPI_TILES } from "@/lib/results-data";
import { useStudentResult } from "@/components/dashboard/StudentResultContext";
import { computeGrade } from "@/lib/gradebook-data";

const ICON_MAP = {
  auto_awesome: Sparkles,
  school: School,
  grade: GraduationCap,
  workspace_premium: Trophy,
} as const;

export default function KPITiles() {
  const { selectedResult } = useStudentResult();
  const subjects = selectedResult?.subjects ?? [];
  const aggregate = subjects.reduce(
    (sum, subject) => sum + subject.totalScore,
    0
  );
  const average = subjects.length > 0 ? aggregate / subjects.length : 0;
  const averageGrade =
    subjects.length > 0 ? computeGrade(average).grade : "—";
  const tiles = KPI_TILES.map((tile, index) => {
    if (index === 0) {
      return {
        ...tile,
        value: `${average.toFixed(1)}%`,
        note: "Overall subject average",
      };
    }
    if (index === 1) {
      return {
        ...tile,
        value: String(aggregate),
        suffix: `/ ${subjects.length * 100}`,
        note: `${subjects.length} subjects evaluated`,
      };
    }
    if (index === 2) {
      return { ...tile, value: averageGrade, note: "Overall grade" };
    }
    return {
      ...tile,
      value: "—",
      suffix: "Not available",
      note: "Class position is not recorded",
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
      {tiles.map((tile) => {
        const Icon = ICON_MAP[tile.icon];
        return (
          <div
            key={tile.label}
            className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between border border-surface-container-high/40"
          >
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                {tile.label}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-headline-xl text-headline-lg text-primary font-bold">
                  {tile.value}
                </span>
                <span className="font-tabular-data text-tabular-data text-on-surface-variant">
                  {tile.suffix}
                </span>
              </div>
              <span
                className={`font-label-sm text-label-sm mt-1 flex items-center gap-1 font-semibold ${tile.noteColor}`}
              >
                <Icon className="w-[14px] h-[14px]" />
                {tile.note}
              </span>
            </div>

            {tile.variant === "ring" ? (
              <div className="w-14 h-14 relative flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-high"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-secondary-container"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={`${Math.min(average, 100)}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <span className="absolute font-headline-sm text-[12px] text-primary font-bold">
                  {average.toFixed(1)}%
                </span>
              </div>
            ) : (
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${tile.iconBg}`}
              >
                <Icon className="w-[26px] h-[26px]" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}