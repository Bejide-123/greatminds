import { ShieldCheck } from "lucide-react";

export default function ValidationStrip() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
      <div className="flex items-center gap-space-md">
        <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
          <ShieldCheck className="w-[22px] h-[22px]" />
        </div>
        <div className="flex flex-col">
          <span className="font-title-md text-body-md text-on-surface">
            Primary Section Academic Seal • Great Minds Nursery &amp; Primary
            School
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Class evaluations, behavioral trait ratings, and broadsheets
            subject to Head of Primary endorsement prior to parent portal
            release.
          </span>
        </div>
      </div>
      <div className="flex items-center gap-space-sm shrink-0">
        <span className="font-label-sm text-label-sm bg-tertiary-container text-on-tertiary-container px-space-sm py-1 rounded font-mono">
          PRIMARY WING VERIFIED
        </span>
        <span className="font-label-sm text-label-sm text-outline font-mono">
          NODE GMIS-PRI-042
        </span>
      </div>
    </div>
  );
}