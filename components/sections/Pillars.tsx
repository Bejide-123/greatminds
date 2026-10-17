import { Leaf, ShieldCheck, ArrowRight, Puzzle, BookOpen, Bot, Heart } from "lucide-react";
import { PILLARS } from "@/lib/data";
import type { Pillar, PillarColor, PillarIcon } from "@/lib/types";

const ICON_MAP: Record<PillarIcon, typeof Puzzle> = {
  extension: Puzzle,
  book: BookOpen,
  bot: Bot,
  heart: Heart,
};

const ICON_COLORS: Record<PillarColor, { base: string; hover: string }> = {
  amber: {
    base: "bg-amber-100 text-amber-800",
    hover: "group-hover:bg-secondary group-hover:text-white",
  },
  blue: {
    base: "bg-blue-100 text-blue-800",
    hover: "group-hover:bg-primary group-hover:text-white",
  },
  emerald: {
    base: "bg-emerald-100 text-emerald-800",
    hover: "group-hover:bg-emerald-600 group-hover:text-white",
  },
  orange: {
    base: "bg-orange-100 text-orange-800",
    hover: "group-hover:bg-secondary group-hover:text-white",
  },
};

function PillarCard({ pillar }: { pillar: Pillar }) {
  const Icon = ICON_MAP[pillar.icon];
  const colors = ICON_COLORS[pillar.color];

  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container shadow-sm hover:shadow-md transition-all flex flex-col gap-space-md group hover:-translate-y-1">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${colors.base} ${colors.hover}`}
      >
        <Icon className="w-7 h-7" />
      </div>
      <div className="flex flex-col gap-space-xs">
        <h3 className="font-title-md text-title-md text-primary font-bold">
          {pillar.title}
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          {pillar.description}
        </p>
      </div>
      <div className="mt-auto pt-space-xs flex items-center gap-space-xs text-secondary font-label-md text-label-md font-semibold">
        <span>{pillar.ctaLabel}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

export default function Pillars() {
  return (
    <section className="w-full py-space-2xl bg-surface">
      <div className="max-w-7xl mx-auto px-gutter-lg flex flex-col gap-space-xl">
        {/* Heading row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold flex items-center gap-1">
              <Leaf className="w-4 h-4" /> Foundational Excellence
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
              Why Parents Entrust Their Little Ones to Us
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              We foster wonder, joyful literacy, strong moral roots, and
              interactive discovery that prepare pupils for academic
              distinction and life happiness.
            </p>
          </div>
          <div className="flex items-center gap-space-xs text-primary bg-surface-container px-space-md py-2 rounded-xl border border-outline-variant/30 font-title-md text-title-md font-semibold">
            <ShieldCheck className="w-[22px] h-[22px] text-secondary" />
            <span>Certified British EYFS &amp; Cambridge Primary</span>
          </div>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-lg">
          {PILLARS.map((p) => (
            <PillarCard key={p.title} pillar={p} />
          ))}
        </div>
      </div>
    </section>
  );
}