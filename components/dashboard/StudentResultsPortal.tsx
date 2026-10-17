"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Clock3 } from "lucide-react";
import BiodataStrip from "@/components/dashboard/BiodataStrip";
import GradingScale from "@/components/dashboard/GradingScale";
import KPITiles from "@/components/dashboard/KPITiles";
import PsychomotorGrid from "@/components/dashboard/PsychomotorGrid";
import ReportHeader from "@/components/dashboard/ReportHeader";
import ResultsToolbar from "@/components/dashboard/ResultsToolbar";
import SignoffRow from "@/components/dashboard/SignoffRow";
import SubjectLedger from "@/components/dashboard/SubjectLedger";
import { StudentResultProvider } from "@/components/dashboard/StudentResultContext";
import { CREST } from "@/lib/results-data";
import {
  isStudentResultsPayload,
  studentResultIsApproved,
  type StudentResultRecord,
  type StudentResultsPayload,
} from "@/lib/student-results";

function responseError(value: unknown) {
  if (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof value.error === "string"
  ) {
    return value.error;
  }
  return "Unable to load your results.";
}

function preferredResult(results: StudentResultRecord[]) {
  return (
    results.find(
      (result) => result.term.sessionIsCurrent && result.term.isCurrent
    ) ??
    results.find((result) => studentResultIsApproved(result)) ??
    results[0] ??
    null
  );
}

export default function StudentResultsPortal() {
  const [data, setData] = useState<StudentResultsPayload | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadResults() {
      try {
        const response = await fetch("/api/student/results", {
          cache: "no-store",
          signal: controller.signal,
        });
        const payload: unknown = await response.json();
        if (!response.ok) throw new Error(responseError(payload));
        if (!isStudentResultsPayload(payload)) {
          throw new Error("The results service returned an invalid response.");
        }
        setData(payload);
        setSelectedId(preferredResult(payload.results)?.id ?? null);
      } catch (loadError) {
        if (!controller.signal.aborted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load your results."
          );
        }
      }
    }

    void loadResults();
    return () => controller.abort();
  }, []);

  const selectedResult =
    data?.results.find((result) => result.id === selectedId) ?? null;
  const approved =
    selectedResult !== null && studentResultIsApproved(selectedResult);

  if (!data && !error) {
    return (
      <p className="py-space-xl text-center text-on-surface-variant" role="status">
        Loading your results...
      </p>
    );
  }

  if (error || !data) {
    return (
      <p
        className="rounded-lg bg-error-container px-space-md py-space-sm text-sm text-on-error-container"
        role="alert"
      >
        {error ?? "Unable to load your results."}
      </p>
    );
  }

  return (
    <StudentResultProvider
      value={{
        data,
        selectedResult,
        onSelectResult: setSelectedId,
      }}
    >
      <div className="flex flex-col w-full pt-space-xl">
        <ResultsToolbar />
        <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-xl lg:p-space-2xl flex flex-col gap-space-xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 opacity-[0.03] pointer-events-none select-none">
            <Image
              src={CREST}
              alt="GMIS Watermark"
              width={384}
              height={384}
              className="w-96 h-96 object-contain"
            />
          </div>

          {approved ? (
            <>
              <ReportHeader />
              <BiodataStrip />
              <KPITiles />
              <SubjectLedger />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
                <GradingScale />
                <PsychomotorGrid />
              </div>
              <SignoffRow />
            </>
          ) : (
            <section
              className="relative flex flex-col items-center justify-center rounded-xl border border-surface-container-high/60 bg-surface-container-low p-space-2xl text-center"
              role="status"
            >
              <Clock3 className="h-10 w-10 text-secondary-container" />
              <h1 className="mt-space-md font-headline-lg text-headline-lg text-primary">
                Awaiting approval
              </h1>
              <p className="mt-space-xs max-w-xl font-body-sm text-body-sm text-on-surface-variant">
                {selectedResult
                  ? `Your ${selectedResult.term.name.toLowerCase()} term result is awaiting approval. Your report will appear here once it has been approved.`
                  : "Your result is not available yet. Your report will appear here once it has been approved."}
              </p>
            </section>
          )}
        </div>
      </div>
    </StudentResultProvider>
  );
}
