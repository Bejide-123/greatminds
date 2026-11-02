import { Users, Phone, Mail, ShieldCheck } from "lucide-react";
import type { PupilProfile } from "@/lib/pupils/profile-types";

type Props = {
  guardian: PupilProfile["guardian"] | null;
};

export default function GuardiansCard({ guardian }: Props) {
  return (
    <section
      id="guardians"
      className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-space-lg shadow-sm scroll-mt-24"
    >
      <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/30">
        <div className="flex items-center gap-space-sm">
          <Users className="text-secondary w-5 h-5" />
          <h3 className="text-sm font-bold text-on-surface">
            Parents &amp; Guardians
          </h3>
        </div>
        {guardian && (
          <span className="text-[11px] font-bold text-tertiary bg-tertiary-fixed px-1.5 py-0.5 rounded">
            Verified
          </span>
        )}
      </div>

      {!guardian ? (
        <p className="text-xs text-on-surface-variant mt-space-md text-center py-space-md">
          No guardian contact on file.
        </p>
      ) : (
        <div className="mt-space-md p-space-sm bg-surface-container-low rounded-lg border border-outline-variant/40">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-secondary tracking-wider block">
                Primary Guardian
              </span>
              <h4 className="text-xs font-bold text-on-surface mt-0.5">
                {guardian.name}
              </h4>
            </div>
            <ShieldCheck className="text-tertiary w-4 h-4" />
          </div>
          <div className="mt-space-sm space-y-1 text-xs font-tabular-data">
            <div className="flex items-center gap-2 text-on-surface">
              <Phone className="w-3 h-3 text-outline" />
              <a href={`tel:${guardian.phone}`} className="hover:underline">
                {guardian.phone}
              </a>
            </div>
            {guardian.email && (
              <div className="flex items-center gap-2 text-on-surface">
                <Mail className="w-3 h-3 text-outline" />
                <a
                  href={`mailto:${guardian.email}`}
                  className="hover:underline truncate"
                >
                  {guardian.email}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}