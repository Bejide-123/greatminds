import { Brain } from "lucide-react";
import type { ProfilePsychomotor } from "@/lib/pupils/profile-types";

const TRAITS: { key: string; label: string }[] = [
  { key: "handwriting", label: "Handwriting & Neatness" },
  { key: "punctuality", label: "Punctuality & Attendance" },
  { key: "attentiveness", label: "Attentiveness & Participation" },
  { key: "politeness", label: "Politeness, Empathy & Honesty" },
  { key: "teamwork", label: "Teamwork & Social Play" },
  { key: "curiosity", label: "Curiosity & Independent Thinking" },
  { key: "materials", label: "Handling Materials & Care of Books" },
  { key: "sports", label: "Sports, Motor Skills & Agility" },
  { key: "music", label: "Music & Creative Arts Expression" },
];

type Props = {
  psychomotor: ProfilePsychomotor | null;
};

function StarRow({ rating }: { rating: number | null }) {
  const value = rating ?? 0;
  return (
    <div className="flex items-center gap-0.5 text-amber-500 text-sm leading-none">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={n <= value ? "text-amber-500" : "text-amber-500/30"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function PsychomotorCard({ psychomotor }: Props) {
  const hasAny =
    psychomotor != null &&
    Object.values(psychomotor).some((v) => typeof v === "number");

  return (
    <section
      id="psychomotor"
      className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-space-lg shadow-sm scroll-mt-24"
    >
      <div className="flex items-center justify-between pb-space-md border-b border-outline-variant/30">
        <div className="flex items-center gap-space-sm">
          <div className="p-2 bg-tertiary-fixed text-on-tertiary-fixed rounded-lg">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-on-surface">
              Psychomotor &amp; Character Development
            </h2>
            <p className="text-xs text-on-surface-variant">
              Affective &amp; behavioral assessment rubric
            </p>
          </div>
        </div>
      </div>

      {!hasAny ? (
        <p className="text-xs text-on-surface-variant mt-space-md text-center py-space-md">
          No psychomotor ratings recorded for this term yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space-sm mt-space-md">
          {TRAITS.map((t) => {
            const rating = psychomotor?.[t.key] ?? null;
            return (
              <div
                key={t.key}
                className="bg-surface-container-low p-space-sm rounded-lg border border-outline-variant/30"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-on-surface">
                    {t.label}
                  </span>
                  <span className="text-xs font-bold text-primary font-tabular-data">
                    {rating != null ? `${rating}.0 / 5` : "—"}
                  </span>
                </div>
                <StarRow rating={rating} />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}