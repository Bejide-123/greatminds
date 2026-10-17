import { FileText } from "lucide-react";

export default function ResultsManagement({
  pendingCount,
}: {
  pendingCount: number;
}) {
  return (
    <div
      id="pending-results"
      className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm border border-surface-container"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-lg border-b border-surface-container">
        <div>
          <div className="flex items-center gap-space-xs mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
              Active Module
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            Results Management
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Review teacher submissions and sign off on terminal report cards.
          </p>
        </div>

        <div className="bg-secondary-fixed/50 border border-secondary-container/20 rounded-xl p-space-md flex flex-wrap items-center gap-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary flex items-center justify-center font-bold">
              <FileText className="w-[22px] h-[22px]" />
            </div>
            <div>
              <div className="font-title-md text-title-md text-primary font-bold">
                {pendingCount} Results Pending Approval
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">
                Submitted by subject teachers
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-xs">
            <a
              href="/dashboard/admin/results"
              className="px-space-md py-2 bg-secondary-container hover:bg-secondary text-on-secondary rounded-lg font-label-md text-label-md font-semibold transition-colors shadow-sm"
            >
              Review Pending Results
            </a>
            <button
              type="button"
              className="px-space-md py-2 bg-surface-container hover:bg-surface-container-high text-primary rounded-lg font-label-md text-label-md font-semibold transition-colors"
            >
              View All Broadsheets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}