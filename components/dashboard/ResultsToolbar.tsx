"use client";

import { useState } from "react";
import { Download, Printer, ChevronDown, ShieldCheck, Loader2 } from "lucide-react";
import {
  studentResultIsApproved,
  type StudentResultRecord,
} from "@/lib/student-results";
import { useStudentResult } from "@/components/dashboard/StudentResultContext";

export default function ResultsToolbar() {
  const [downloading, setDownloading] = useState(false);
  const { data, selectedResult, onSelectResult } = useStudentResult();
  const sessions = [...new Set(data.results.map((result) => result.term.sessionName))];
  const selectedSession =
    selectedResult?.term.sessionName ?? sessions[0] ?? "";
  const sessionResults = data.results.filter(
    (result) => result.term.sessionName === selectedSession
  );
  const selectedTerm =
    selectedResult?.term.name ?? sessionResults[0]?.term.name ?? "";

  function selectTermResult(
    results: StudentResultRecord[],
    termName: string
  ) {
    const result = results.find((item) => item.term.name === termName);
    if (result) onSelectResult(result.id);
  }

  function handlePrint() {
    window.print();
  }

  function handleDownload() {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      window.print();
    }, 600);
  }

  return (
    <section className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm mb-space-lg flex flex-col md:flex-row md:items-center md:justify-between gap-space-md">
      <div className="flex flex-wrap items-center gap-space-md">
        <div className="flex flex-col">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-space-xs">
            Academic Session
          </label>
          <div className="relative inline-flex items-center">
            <select
              value={selectedSession}
              onChange={(event) => {
                const nextResults = data.results.filter(
                  (result) => result.term.sessionName === event.target.value
                );
                const nextResult =
                  nextResults.find(
                    (result) => result.term.name === selectedTerm
                  ) ?? nextResults[0];
                if (nextResult) onSelectResult(nextResult.id);
              }}
              disabled={sessions.length === 0}
              className="appearance-none bg-surface-container-low text-on-surface font-title-md text-tabular-data pl-space-md pr-8 py-1.5 rounded-lg focus:outline-none focus:bg-surface-container transition-colors cursor-pointer"
            >
              {sessions.map((session) => (
                <option key={session} value={session}>
                  {session}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 text-outline w-[18px] h-[18px] pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-space-xs">
            Assessment Term
          </label>
          <div className="relative inline-flex items-center">
            <select
              value={selectedTerm}
              onChange={(event) =>
                selectTermResult(sessionResults, event.target.value)
              }
              disabled={sessionResults.length === 0}
              className="appearance-none bg-surface-container-low text-on-surface font-title-md text-tabular-data pl-space-md pr-8 py-1.5 rounded-lg focus:outline-none focus:bg-surface-container transition-colors cursor-pointer"
            >
              {[...new Set(sessionResults.map((result) => result.term.name))].map(
                (term) => (
                  <option key={term} value={term}>
                    {term.charAt(0) + term.slice(1).toLowerCase()} Term
                  </option>
                )
              )}
              {!sessionResults.length && <option value="">No results</option>}
            </select>
            <ChevronDown className="absolute right-2 text-outline w-[18px] h-[18px] pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <div className="inline-flex items-center gap-1.5 bg-tertiary-container text-on-tertiary-container px-space-md py-1.5 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-500 fill-current" />
            <span className="font-label-md text-label-sm tracking-wide">
              {selectedResult && studentResultIsApproved(selectedResult)
                ? "Approved & Certified"
                : "Awaiting approval"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-space-sm self-start md:self-end">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 bg-surface-container-low hover:bg-surface-container text-primary font-title-md text-body-sm px-space-md py-2 rounded-lg shadow-sm transition-all active:scale-95"
        >
          <Printer className="w-[18px] h-[18px]" />
          <span>Print Report Sheet</span>
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-1.5 bg-secondary-container hover:bg-secondary text-on-secondary font-title-md text-body-sm px-space-lg py-2 rounded-lg shadow-sm transition-all active:scale-95 disabled:opacity-90"
        >
          {downloading ? (
            <>
              <Loader2 className="w-[18px] h-[18px] animate-spin" />
              <span>Compiling Official PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-[18px] h-[18px]" />
              <span>Download Official PDF</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}