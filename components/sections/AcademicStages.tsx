"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BedDouble,
  SpellCheck,
  BookOpen,
  Award,
  CheckCircle2,
  Download,
} from "lucide-react";
import { STAGES } from "@/lib/data";
import type { Stage, StageChipColor, StageKey } from "@/lib/types";

const CHIP_ICON_MAP = {
  crib: BedDouble,
  spellcheck: SpellCheck,
  book: BookOpen,
  award: Award,
} as const;

const CHIP_COLORS: Record<StageChipColor, string> = {
  amber: "bg-amber-100 text-amber-900",
  orange: "bg-orange-100 text-orange-900",
  blue: "bg-blue-100 text-blue-900",
  emerald: "bg-emerald-100 text-emerald-900",
};

const CAPTION_COLORS = {
  primary: "bg-primary/90",
  secondary: "bg-secondary/90",
} as const;

type AcademicStagesProps = {
  onOpenTour: () => void;
};

export default function AcademicStages({ onOpenTour }: AcademicStagesProps) {
  const [activeTab, setActiveTab] = useState<StageKey>("creche");
  const activeStage = STAGES.find((s) => s.key === activeTab)!;
  const ChipIcon = CHIP_ICON_MAP[activeStage.chipIcon];

  return (
    <section
      id="curriculum-section"
      className="w-full py-space-2xl bg-surface-container-low"
    >
      <div className="max-w-7xl mx-auto px-gutter-lg flex flex-col gap-space-xl">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            Child Development Milestones
          </span>
          <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
            Academic Stages from Crèche to Basic 6
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Discover our age-appropriate learning pathways designed to inspire
            creativity, independent thinking, and academic confidence at every
            growth step.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-surface-container-highest rounded-2xl self-center shadow-inner max-w-full">
          {STAGES.map((stage) => {
            const isActive = stage.key === activeTab;
            return (
              <button
                key={stage.key}
                onClick={() => setActiveTab(stage.key)}
                className={`px-4 py-2.5 rounded-xl font-label-md text-label-md transition-all ${
                  isActive
                    ? "bg-primary text-on-primary shadow-sm font-bold"
                    : "text-on-surface-variant hover:text-on-surface font-medium"
                }`}
              >
                {stage.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center bg-surface-container-lowest p-space-xl rounded-3xl shadow-sm border border-surface-container">
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <div
              className={`inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full font-label-sm text-label-sm font-semibold self-start ${CHIP_COLORS[activeStage.chipColor]}`}
            >
              <ChipIcon className="w-4 h-4" />
              {activeStage.chipLabel}
            </div>

            <h3 className="font-headline-lg text-headline-lg text-primary font-bold">
              {activeStage.title}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {activeStage.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
              {activeStage.bullets.map((b) => (
                <div key={b} className="flex items-start gap-space-xs">
                  <CheckCircle2 className="text-secondary w-5 h-5 shrink-0" />
                  <span className="font-body-sm text-body-sm text-on-surface">
                    {b}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-space-sm">
              <button
                onClick={onOpenTour}
                className="inline-flex items-center gap-space-xs px-space-lg py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all font-semibold"
              >
                {activeStage.ctaLabel}
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[16/10] bg-surface-container relative">
              <Image
                key={activeStage.key}
                src={activeStage.imageSrc}
                alt={activeStage.imageAlt}
                loading="eager"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className={`absolute bottom-3 left-3 ${CAPTION_COLORS[activeStage.captionColor]} backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-semibold`}
              >
                {activeStage.imageCaption}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}