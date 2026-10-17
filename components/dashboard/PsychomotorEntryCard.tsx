"use client";

import { Brain, CheckCircle2, Star, Sparkles } from "lucide-react";

export type PsychomotorTrait = {
  key: string;
  label: string;
  wide?: boolean;
};

export type PsychomotorRatings = Record<string, number | null>;

type Props = {
  traits: PsychomotorTrait[];
  ratings: PsychomotorRatings;
  onChange: (key: string, rating: number | null) => void;
  disabled?: boolean;
};

function StarPicker({
  value,
  onChange,
  disabled,
}: {
  value: number | null;
  onChange: (rating: number | null) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => {
          const active = typeof value === "number" && n <= value;
          return (
            <button
              key={n}
              type="button"
              disabled={disabled}
              onClick={() => onChange(value === n ? null : n)}
              aria-label={`Set rating ${n} of 5`}
              className={`transition-transform ${
                disabled ? "cursor-not-allowed opacity-60" : "hover:scale-110"
              }`}
            >
              <Star
                className={`w-[18px] h-[18px] ${
                  active
                    ? "fill-secondary-container text-secondary-container"
                    : "text-surface-container-highest"
                }`}
              />
            </button>
          );
        })}
      </div>
      <span
        className={`font-headline-sm text-label-sm font-bold ml-1 min-w-[34px] ${
          value ? "text-primary" : "text-outline"
        }`}
      >
        {value ? `${value}/5` : "—"}
      </span>
    </div>
  );
}

function computeSummary(traits: PsychomotorTrait[], ratings: PsychomotorRatings) {
  const values = traits
    .map((t) => ratings[t.key])
    .filter((v): v is number => typeof v === "number");
  const earned = values.reduce((sum, v) => sum + v, 0);
  const max = traits.length * 5;
  const pct = max > 0 ? Math.round((earned / max) * 1000) / 10 : 0;
  return {
    earned,
    max,
    pct,
    filled: values.length,
    total: traits.length,
  };
}

export default function PsychomotorEntryCard({
  traits,
  ratings,
  onChange,
  disabled,
}: Props) {
  const summary = computeSummary(traits, ratings);

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-high/60 overflow-hidden">
      {/* Header */}
      <div className="px-space-lg py-space-md bg-surface-container-low border-b border-surface-container flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-space-xs">
          <Brain className="text-secondary-container w-5 h-5" />
          <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Affective &amp; Psychomotor Child Development
          </h4>
        </div>
        <div className="flex items-center gap-space-xs text-label-sm text-on-surface-variant font-medium">
          <span>Rating:</span>
          <span className="inline-block w-2 h-2 rounded-full bg-secondary-container" />
          <span>1 (Emerging)</span>
          <span className="text-outline">→</span>
          <span className="inline-block w-2 h-2 rounded-full bg-tertiary-container" />
          <span>5 (Exemplary)</span>
        </div>
      </div>

      {/* Rows */}
      <div className="p-space-lg grid grid-cols-1 md:grid-cols-2 gap-space-xs font-body-sm text-body-sm">
        {traits.map((trait) => (
          <div
            key={trait.key}
            className={`flex items-center justify-between bg-surface-container-low px-space-md py-2 rounded-lg border border-surface-container ${
              trait.wide ? "md:col-span-2" : ""
            }`}
          >
            <span className="font-medium text-on-surface text-[12px] pr-2">
              {trait.label}
            </span>
            <StarPicker
              value={ratings[trait.key] ?? null}
              onChange={(r) => onChange(trait.key, r)}
              disabled={disabled}
            />
          </div>
        ))}
      </div>

      {/* Footer — live summary */}
      <div className="px-space-lg pb-space-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm text-on-surface-variant font-label-sm text-label-sm border-t border-surface-container pt-space-md">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-secondary-container" />
          Developmental Score:{" "}
          <strong className="text-primary font-bold">
            {summary.earned} / {summary.max}
          </strong>{" "}
          ({summary.pct}%)
          <span className="text-outline ml-2">
            • {summary.filled} of {summary.total} rated
          </span>
        </span>
        {summary.filled === summary.total ? (
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-[15px] h-[15px]" /> All traits rated
          </span>
        ) : (
          <span className="text-secondary font-semibold">
            {summary.total - summary.filled} trait
            {summary.total - summary.filled === 1 ? "" : "s"} remaining
          </span>
        )}
      </div>
    </div>
  );
}