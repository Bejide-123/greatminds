import { BarChart3, CheckCircle2, Trophy, Lock } from "lucide-react";
import type { BroadsheetData } from "@/lib/broadsheet/types";

type Props = { data: BroadsheetData };

export default function BroadsheetKPIs({ data }: Props) {
  const { stats } = data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">
              Class Average
            </span>
            <div className="mt-1">
              <span className="font-headline-xl text-headline-xl text-primary font-bold">
                {stats.classAverage != null ? `${stats.classAverage}%` : "—"}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
            <BarChart3 className="w-[22px] h-[22px]" />
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">
              Pass Benchmark Met
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline-xl text-headline-xl text-tertiary-container font-bold">
                {stats.passRate}%
              </span>
              <span className="font-label-sm text-label-sm text-on-surface font-medium">
                Pass rate
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
            <CheckCircle2 className="w-[22px] h-[22px]" />
          </div>
        </div>
      </div>

      {/* <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">
              Distinctions
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline-xl text-headline-xl text-secondary font-bold">
                {stats.distinctionCount}
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">
                pupils
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
            <Trophy className="w-[22px] h-[22px]" />
          </div>
        </div>
      </div> */}

      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">
              Subject Columns
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline-xl text-headline-xl text-primary font-bold">
                {stats.subjectCount}
              </span>
              <span className="font-label-sm text-label-sm text-tertiary font-semibold">
                active
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
            <Lock className="w-[22px] h-[22px]" />
          </div>
        </div>
      </div>
    </div>
  );
}