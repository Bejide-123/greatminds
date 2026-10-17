import Image from "next/image";
import { Palette, Waves, Music, Bot } from "lucide-react";
import { FACILITIES } from "@/lib/data";
import type { Facility } from "@/lib/types";

const CHIP_ICON_MAP = {
  waves: Waves,
  music: Music,
  bot: Bot,
} as const;

const CHIP_BG = {
  secondary: "bg-secondary",
  primary: "bg-primary",
  emerald: "bg-emerald-700",
} as const;

function FacilityCard({ facility }: { facility: Facility }) {
  const Icon = CHIP_ICON_MAP[facility.chipIcon];

  return (
    <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm border border-surface-container flex flex-col group hover:shadow-md transition-all">
      <div className="h-56 overflow-hidden relative">
        <Image
          src={facility.imageSrc}
          alt={facility.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div
          className={`absolute top-3 left-3 ${CHIP_BG[facility.chipColor]} text-white font-label-sm text-label-sm px-space-sm py-1 rounded-full shadow flex items-center gap-1 font-bold`}
        >
          <Icon className="w-[14px] h-[14px]" />
          {facility.chipLabel}
        </div>
      </div>
      <div className="p-space-lg flex flex-col gap-space-xs">
        <h3 className="font-title-md text-title-md text-primary font-bold">
          {facility.title}
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {facility.description}
        </p>
      </div>
    </div>
  );
}

export default function CampusLife() {
  return (
    <section id="pupil-life" className="w-full py-space-2xl bg-surface">
      <div className="max-w-7xl mx-auto px-gutter-lg flex flex-col gap-space-xl">
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold flex items-center gap-1">
            <Palette className="w-4 h-4" /> Safe &amp; Vibrant Campus
          </span>
          <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
            Child-Friendly Spaces Built for Growing Explorers
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Every inch of our campus is designed with child safety, natural
            sunlight, interactive play structures, and inspiring creative
            spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg">
          {FACILITIES.map((f) => (
            <FacilityCard key={f.title} facility={f} />
          ))}
        </div>
      </div>
    </section>
  );
}