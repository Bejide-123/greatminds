import { BarChart3, ClipboardCheck, Trophy } from "lucide-react";
import { type GradebookScore, type GradebookSubject } from "@/lib/gradebook-api";

type PupilKPITilesProps = {
  subjects: GradebookSubject[];
  scores: GradebookScore[];
};

export default function PupilKPITiles({
  subjects,
  scores,
}: PupilKPITilesProps) {
  const enteredScores = scores.filter(
    (score) => score.caScore !== null && score.examScore !== null
  );
  const total = enteredScores.reduce((sum, score) => {
    if (score.caScore === null || score.examScore === null) return sum;
    return sum + score.caScore + score.examScore;
  }, 0);
  const possible = enteredScores.length * 100;
  const average = possible === 0 ? null : Math.round((total / possible) * 100);
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
      value: average === null ? "—" : `${average}%`,
      suffix: average === null ? "No scores yet" : "of entered subjects",
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
