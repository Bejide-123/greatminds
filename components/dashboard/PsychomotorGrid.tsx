import { Brain, CheckCircle2, Star } from "lucide-react";
import { PSYCHOMOTOR } from "@/lib/results-data";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5 text-secondary-container">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-[15px] h-[15px] ${
              i < rating
                ? "fill-secondary-container text-secondary-container"
                : "text-surface-container-highest"
            }`}
          />
        ))}
      </div>
      <span className="font-headline-sm text-label-sm text-primary font-bold ml-1">
        {rating}/5
      </span>
    </div>
  );
}

export default function PsychomotorGrid() {
  return (
    <div className="lg:col-span-7 bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between border border-surface-container-high/60">
      <div>
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-space-xs">
            <Brain className="text-primary w-[18px] h-[18px]" />
            <h3 className="font-headline-sm text-title-md text-primary">
              Affective &amp; Psychomotor Child Development
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-outline">
            Rating: 1 (Emerging) to 5 (Exemplary)
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xs font-body-sm text-body-sm">
          {PSYCHOMOTOR.map((row) => (
            <div
              key={row.label}
              className={`flex items-center justify-between bg-surface-container-lowest px-space-md py-1.5 rounded-lg border border-surface-container ${
                row.wide ? "md:col-span-2" : ""
              }`}
            >
              <span className="font-medium text-on-surface text-[12px]">
                {row.label}
              </span>
              <StarRow rating={row.rating} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-space-sm pt-space-xs flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
        <span>Developmental Score: 44 / 45 (97.8%)</span>
        <span className="text-emerald-600 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-[15px] h-[15px]" /> Exemplary Child Conduct
          Standing
        </span>
      </div>
    </div>
  );
}