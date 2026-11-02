import { BarChart3, ClipboardCheck, Trophy } from "lucide-react";
import { type GradebookScore, type GradebookSubject } from "@/lib/gradebook-api";
import { formatClassPosition } from "@/lib/results/format";

type PupilKPITilesProps = {
  subjects: GradebookSubject[];
  scores: GradebookScore[];
  overallAverage?: number | null;
  classPosition?: number | null;
  classSize?: number | null;
};

export default function PupilKPITiles({
  subjects,
  scores,
  overallAverage,
  classPosition,
  classSize,
}: PupilKPITilesProps) {
  const enteredScores = scores.filter(
    (score) => score.caScore !== null && score.examScore !== null
  );
  const total = enteredScores.reduce((sum, score) => {
    if (score.caScore === null || score.examScore === null) return sum;
    return sum + score.caScore + score.examScore;
  }, 0);
  const possible = enteredScores.length * 100;
  const computedAverage =
    enteredScores.length === 0
      ? null
      : Number((total / enteredScores.length).toFixed(2));
  const average = overallAverage ?? computedAverage;
  const position = formatClassPosition(classPosition, classSize);
  const tiles = [
    {
      Icon: BarChart3,
      iconBg: "bg-primary text-surface-container-lowest",
      label: "Current Aggregate",
      value: `${total}`,
      suffix: `/ ${possible}`,
      valueColor: "text-primary",
    },
    {
      Icon: Trophy,
      iconBg: "bg-tertiary-container text-on-tertiary-container",
      label: "Term Average",
      value: average === null ? "—" : `${average.toFixed(1)}%`,
      suffix: average === null ? "No scores yet" : position === "—" ? "of entered subjects" : position,
      valueColor: "text-on-tertiary-container",
    },
    {
      Icon: ClipboardCheck,
      iconBg: "bg-surface-container-high text-primary",
      label: "Curriculum Progress",
      value: `${enteredScores.length} / ${subjects.length}`,
      suffix: "Subjects scored",
      valueColor: "text-on-surface",
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-space-md pt-space-md sm:grid-cols-3">
      {tiles.map(({ Icon, iconBg, label, value, suffix, valueColor }) => (
        <div
          key={label}
          className="flex items-center gap-space-md rounded-xl border border-surface-container bg-surface-container-low p-space-sm"
        >
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              {label}
            </span>
            <span className={`font-headline-md text-headline-md font-bold ${valueColor}`}>
              {value}{" "}
              <span className="text-body-sm font-normal opacity-80">
                {suffix}
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
