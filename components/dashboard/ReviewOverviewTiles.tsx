import { BarChart3, Trophy, Flag } from "lucide-react";
import { ReviewClass } from "@/lib/review-data";

type Props = {
  activeClass: ReviewClass;
};

export default function ReviewOverviewTiles({ activeClass }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container flex items-center justify-between">
        <div>
          <span className="text-label-sm uppercase font-semibold text-on-surface-variant">
            Class Average
          </span>
          <div className="text-headline-lg font-bold text-primary mt-1">
            {activeClass.avg}%
          </div>
          <span className="text-body-sm text-emerald-700 flex items-center gap-0.5 mt-0.5">
            <BarChart3 className="w-4 h-4" /> Good performance
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
          <BarChart3 className="w-[26px] h-[26px]" />
        </div>
      </div>

      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container flex items-center justify-between">
        <div>
          <span className="text-label-sm uppercase font-semibold text-on-surface-variant">
            Highest Score
          </span>
          <div className="text-headline-lg font-bold text-emerald-700 mt-1">
            {activeClass.highest}%
          </div>
          <span className="text-body-sm text-on-surface-variant mt-0.5">
            {activeClass.highestPupil}
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
          <Trophy className="w-[26px] h-[26px]" />
        </div>
      </div>

      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container flex items-center justify-between">
        <div>
          <span className="text-label-sm uppercase font-semibold text-on-surface-variant">
            Lowest Score
          </span>
          <div className="text-headline-lg font-bold text-secondary mt-1">
            {activeClass.lowest}%
          </div>
          <span className="text-body-sm text-on-surface-variant mt-0.5">
            Above pass threshold (40%)
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-secondary-fixed/50 flex items-center justify-center text-secondary">
          <Flag className="w-[26px] h-[26px]" />
        </div>
      </div>
    </div>
  );
}