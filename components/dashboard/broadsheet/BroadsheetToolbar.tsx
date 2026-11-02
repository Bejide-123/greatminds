"use client";

import {
  Table,
  Printer,
  CloudUpload,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import type { BroadsheetData } from "@/lib/broadsheet/types";

type Props = {
  data: BroadsheetData | null;
  termLabel: string;
  onExport: () => void;
  onPrint: () => void;
  onPublish: () => void;
  onRecalculate: () => void;
};

export default function BroadsheetToolbar({
  data,
  termLabel,
  onExport,
  onPrint,
  onPublish,
  onRecalculate,
}: Props) {
  return (
    <div className="w-full bg-surface-container-lowest shadow-sm rounded-xl p-space-lg mb-space-lg">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-sm flex-wrap">
            <span className="font-headline-lg text-headline-lg text-on-surface">
              Class Broadsheet &amp; Master Result Ledger
            </span>
          </div>
          <div className="flex items-center gap-space-md flex-wrap text-on-surface-variant text-body-sm">
            {data?.homeroomTeacher && (
              <span className="flex items-center gap-1">
                <span className="text-primary">•</span>
                Homeroom Tutor:{" "}
                <strong className="text-on-surface font-semibold">
                  {data.homeroomTeacher.firstName} {data.homeroomTeacher.surname}
                </strong>
              </span>
            )}
            <span className="flex items-center gap-1">
              <span className="text-primary">•</span>
              {termLabel}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-primary">•</span>
              Enrolled:{" "}
              <strong className="text-on-surface font-semibold">
                {data?.stats.pupilCount ?? 0} Pupils
              </strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-sm flex-wrap self-start lg:self-center">
          <button
            type="button"
            onClick={onExport}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md rounded-lg shadow-sm transition-all"
          >
            <Table className="w-[18px] h-[18px] text-tertiary-container" />
            Export CSV
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md rounded-lg shadow-sm transition-all"
          >
            <Printer className="w-[18px] h-[18px] text-primary" />
            Print
          </button>
          <button
            type="button"
            onClick={onRecalculate}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md rounded-lg shadow-sm transition-all"
          >
            <RefreshCw className="w-[18px] h-[18px] text-primary" />
            Recalculate
          </button>
          <button
            type="button"
            onClick={onPublish}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary-container hover:bg-secondary text-on-secondary font-label-md text-label-md rounded-lg shadow-md transition-all"
          >
            <CloudUpload className="w-[18px] h-[18px]" />
            Publish Results
          </button>
        </div>
      </div>
    </div>
  );
}