import Image from "next/image";
import { Smile, Trophy, ShieldCheck } from "lucide-react";
import { CREST, REPORT_META, SIGNOFFS } from "@/lib/results-data";
import { useStudentResult } from "./StudentResultContext";

const BADGE_ICON_MAP = {
  sentiment_very_satisfied: Smile,
  military_tech: Trophy,
} as const;

type SignatureCardProps = {
  data: typeof SIGNOFFS.teacher | typeof SIGNOFFS.head;
  badgeColor: string;
};

function SignatureCard({ data, badgeColor }: SignatureCardProps) {
  const { selectedResult } = useStudentResult();

  const isTeacher = data.heading === SIGNOFFS.teacher.heading;

  const quote = isTeacher
    ? selectedResult?.teacherRemark
    : selectedResult?.headTeacherRemark;

  const name = isTeacher ? selectedResult?.teacherName : data.name;

  const role = isTeacher
    ? `Class Teacher • ${selectedResult?.schoolClass ?? ""}`
    : data.role;

  const BadgeIcon = BADGE_ICON_MAP[data.badge.icon];

  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between border border-surface-container">
      <div>
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
            {data.heading}
          </span>
          <span
            className={`inline-flex items-center gap-1 text-[11px] ${badgeColor} font-semibold`}
          >
            <BadgeIcon className="w-[14px] h-[14px]" />
            {data.badge.text}
          </span>
        </div>
        <p className="font-body-md text-body-sm text-on-surface italic mt-2 leading-relaxed">
          {quote?.trim() ? `“${quote.trim()}”` : "No remark available."}
        </p>
      </div>
      <div className="pt-space-md mt-space-sm border-t border-surface-container/50">
        <div className="h-10 flex items-end">
          <svg
            className="w-36 h-8 text-primary"
            fill="none"
            viewBox="0 0 160 35"
          >
            <path
              d={data.signaturePath}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="flex flex-col mt-1">
          <span className="font-headline-sm text-body-sm text-primary font-bold">
            {name}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {role}
          </span>
          <span className="font-tabular-data text-label-sm text-outline">
            {data.date}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SignoffRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg bg-surface-container-low p-space-lg rounded-xl border border-surface-container-high/60">
      <SignatureCard data={SIGNOFFS.teacher} badgeColor="text-emerald-600" />
      <SignatureCard
        data={SIGNOFFS.head}
        badgeColor="text-secondary-container"
      />

      {/* Official Seal */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden border border-surface-container">
        <div className="w-28 h-28 rounded-full bg-surface-container-high/60 flex flex-col items-center justify-center p-2 relative shadow-inner">
          <div className="w-24 h-24 rounded-full bg-surface-container-low flex flex-col items-center justify-center text-primary relative border border-dashed border-primary/30">
            <span className="font-label-sm text-[8px] font-bold uppercase tracking-widest text-primary">
              GREATMINDS PRIMARY
            </span>
            <div className="w-7 h-7 my-0.5">
              <Image
                src={CREST}
                alt="Emblem"
                width={28}
                height={28}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-label-sm text-[8px] font-bold text-secondary-container uppercase tracking-wider">
              OFFICIAL SEAL
            </span>
            <span className="font-tabular-data text-[7px] text-outline">
              2024/2025
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center mt-space-sm">
          <div className="inline-flex items-center gap-1 text-emerald-600 font-label-md text-label-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Certified Official Academic Record</span>
          </div>
          <span className="font-tabular-data text-[10px] text-outline font-mono mt-0.5">
            AUTH: {REPORT_META.authCode}
          </span>
          <div className="mt-2 px-space-sm py-1 bg-surface-container-low rounded-lg border border-surface-container">
            <span className="font-title-md text-[11px] text-primary font-bold">
              Next Term Resumption: {REPORT_META.resumption}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
