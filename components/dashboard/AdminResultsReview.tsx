"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock3, Search, Undo2 } from "lucide-react";
import PrincipalSignoff from "./PrincipalSignoff";
import {
  isAdminResultsPayload,
  type AdminResultRecord,
  type AdminResultsPayload,
} from "@/lib/admin-results";

function responseError(payload: unknown, fallback: string) {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "error" in payload &&
    typeof payload.error === "string"
  ) {
    return payload.error;
  }
  return fallback;
}

function statusLabel(status: AdminResultRecord["status"]) {
  if (status === "APPROVED" || status === "PUBLISHED") return "Approved";
  if (status === "UNDER_REVIEW") return "Under review";
  if (status === "REJECTED") return "Returned";
  return "Pending review";
}

export default function AdminResultsReview() {
  const [data, setData] = useState<AdminResultsPayload | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [busy, setBusy] = useState(false);

  const reload = useCallback(async (signal?: AbortSignal) => {
    const response = await fetch("/api/admin/results", {
      cache: "no-store",
      signal,
    });
    const payload: unknown = await response.json();
    if (!response.ok) {
      throw new Error(responseError(payload, "Unable to load submitted results."));
    }
    if (!isAdminResultsPayload(payload)) {
      throw new Error("The results service returned an invalid response.");
    }
    return payload;
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void reload(controller.signal)
      .then((payload) => {
        setData(payload);
        const requestedId = new URLSearchParams(window.location.search).get("result");
        const pending =
          payload.results.find(
            (result) =>
              result.status === "SUBMITTED" || result.status === "UNDER_REVIEW"
          ) ?? payload.results[0];
        setSelectedId(
          payload.results.some((result) => result.id === requestedId)
            ? requestedId
            : pending?.id ?? null
        );
      })
      .catch((loadError) => {
        if (!controller.signal.aborted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load submitted results."
          );
        }
      });
    return () => controller.abort();
  }, [reload]);

  const filteredResults = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return (
      data?.results.filter((result) => {
        if (!query) return true;
        return [
          result.student.name,
          result.student.admissionNumber,
          result.schoolClass.name,
          result.teacher.name,
        ]
          .join(" ")
          .toLocaleLowerCase()
          .includes(query);
      }) ?? []
    );
  }, [data, search]);
  const selectedResult =
    data?.results.find((result) => result.id === selectedId) ?? null;
  const isPending =
    selectedResult?.status === "SUBMITTED" ||
    selectedResult?.status === "UNDER_REVIEW";
  const enteredScores =
    selectedResult?.subjects.filter(
      (subject) =>
        subject.caScore !== null && subject.examScore !== null
    ) ?? [];
  const aggregate = enteredScores.reduce(
    (sum, subject) => sum + (subject.totalScore ?? 0),
    0
  );
  const average =
    enteredScores.length === 0
      ? 0
      : aggregate / enteredScores.length;

  async function review(action: "approve" | "return") {
    if (!selectedResult || !isPending) return;
    if (action === "return" && rejectionReason.trim().length === 0) {
      setError("Enter a note explaining what needs correction.");
      return;
    }

    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch(
        `/api/admin/results/${encodeURIComponent(selectedResult.id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            action === "approve"
              ? { action }
              : { action, rejectionReason: rejectionReason.trim() }
          ),
        }
      );
      const payload: unknown = await response.json();
      if (!response.ok) {
        throw new Error(responseError(payload, "Unable to update this result."));
      }

      const updated = await reload();
      setData(updated);
      setSelectedId(selectedResult.id);
      setRejectionReason("");
      setNotice(
        action === "approve"
          ? "Result approved. It is ready for publication."
          : "Result returned to the teacher with your correction note."
      );
      if (!updated.results.some((result) => result.id === selectedResult.id)) {
        setSelectedId(updated.results[0]?.id ?? null);
      }
    } catch (reviewError) {
      setError(
        reviewError instanceof Error
          ? reviewError.message
          : "Unable to update this result."
      );
    } finally {
      setBusy(false);
    }
  }

  if (!data && !error) {
    return (
      <p className="py-space-xl text-center text-on-surface-variant" role="status">
        Loading submitted results...
      </p>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1580px] flex-col gap-space-lg pt-space-xl">
      <header className="rounded-xl border border-surface-container-high/60 bg-surface-container-lowest p-space-lg shadow-sm">
        <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">
          Admin review
        </span>
        <h1 className="mt-1 font-headline-lg text-headline-lg font-bold text-on-surface">
          Submitted Student Results
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Review the scores submitted by teachers. Approval makes a result ready
          for publication; it does not publish it to student accounts.
        </p>
        {data && (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-secondary-fixed px-3 py-1 text-sm font-semibold text-on-secondary-fixed">
            <Clock3 className="h-4 w-4" />
            {data.summary.pendingResults} awaiting review
          </p>
        )}
      </header>

      {error && (
        <p
          className="rounded-lg bg-error-container px-space-md py-space-sm text-sm text-on-error-container"
          role="alert"
        >
          {error}
        </p>
      )}
      {notice && (
        <p
          className="rounded-lg bg-tertiary-container/30 px-space-md py-space-sm text-sm text-on-tertiary-container"
          role="status"
        >
          {notice}
        </p>
      )}

      {data && (
        <div className="grid grid-cols-1 items-start gap-space-lg lg:grid-cols-12">
          <aside className="flex flex-col gap-space-md rounded-xl border border-surface-container-high/60 bg-surface-container-lowest p-space-md shadow-sm lg:col-span-4 xl:col-span-3">
            <div className="flex items-center justify-between border-b border-surface-container pb-space-xs">
              <h2 className="font-title-md text-title-md font-bold text-on-surface">
                Results
              </h2>
              <span className="rounded-full bg-primary-fixed px-2 py-0.5 text-xs font-bold text-primary">
                {data.results.length}
              </span>
            </div>
            <label className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-outline" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search student, class, teacher"
                className="w-full rounded-lg border border-surface-container bg-surface-container-low py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
            </label>
            <div className="flex max-h-[720px] flex-col gap-2 overflow-y-auto">
              {filteredResults.map((result) => (
                <button
                  key={result.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(result.id);
                    setNotice(null);
                    setError(null);
                  }}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    result.id === selectedId
                      ? "border-primary bg-primary-fixed/40"
                      : "border-surface-container bg-surface-container-low/50 hover:bg-surface-container-low"
                  }`}
                >
                  <span className="block truncate font-semibold text-on-surface">
                    {result.student.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-on-surface-variant">
                    {result.student.admissionNumber} · {result.schoolClass.name}
                  </span>
                  <span className="mt-2 flex items-center justify-between gap-2 text-xs">
                    <span className="text-on-surface-variant">
                      {result.teacher.name}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 font-semibold ${
                        result.status === "SUBMITTED" ||
                        result.status === "UNDER_REVIEW"
                          ? "bg-secondary-fixed text-secondary"
                          : "bg-tertiary-container/30 text-on-tertiary-container"
                      }`}
                    >
                      {statusLabel(result.status)}
                    </span>
                  </span>
                </button>
              ))}
              {filteredResults.length === 0 && (
                <p className="rounded-lg bg-surface-container-low p-4 text-sm text-on-surface-variant">
                  {data.results.length === 0
                    ? "No results have been submitted yet."
                    : "No results match your search."}
                </p>
              )}
            </div>
          </aside>

          <section className="flex flex-col gap-space-lg lg:col-span-8 xl:col-span-9">
            {!selectedResult ? (
              <div className="rounded-xl border border-surface-container bg-surface-container-lowest p-space-xl text-on-surface-variant">
                Select a submitted result to review.
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-space-md rounded-xl border border-surface-container-high/60 bg-surface-container-lowest p-space-lg shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {selectedResult.schoolClass.name} ·{" "}
                      {selectedResult.term.name.charAt(0)}
                      {selectedResult.term.name.slice(1).toLowerCase()} Term{" "}
                      {selectedResult.term.sessionName}
                    </span>
                    <h2 className="mt-1 font-headline-md text-headline-md font-bold text-on-surface">
                      {selectedResult.student.name}
                    </h2>
                    <p className="mt-1 text-sm text-on-surface-variant">
                      {selectedResult.student.admissionNumber} · Submitted by{" "}
                      {selectedResult.teacher.name}
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-primary-fixed px-3 py-1 text-sm font-semibold text-primary">
                    {statusLabel(selectedResult.status)}
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-surface-container-high/60 bg-surface-container-lowest shadow-sm">
                  <table className="w-full min-w-[700px] text-left text-sm">
                    <thead className="bg-surface-container-low text-xs uppercase text-on-surface-variant">
                      <tr>
                        <th className="px-space-md py-space-sm">Subject</th>
                        <th className="px-space-sm py-space-sm text-center">CA / 40</th>
                        <th className="px-space-sm py-space-sm text-center">Exam / 60</th>
                        <th className="px-space-sm py-space-sm text-center">Total / 100</th>
                        <th className="px-space-sm py-space-sm text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container">
                      {selectedResult.subjects.map((subject) => (
                        <tr key={subject.id}>
                          <td className="px-space-md py-space-sm">
                            <span className="block font-semibold text-on-surface">
                              {subject.subjectName}
                            </span>
                            <span className="text-xs text-on-surface-variant">
                              {subject.subjectCode}
                            </span>
                          </td>
                          <td className="px-space-sm py-space-sm text-center tabular-nums">
                            {subject.caScore ?? "—"}
                          </td>
                          <td className="px-space-sm py-space-sm text-center tabular-nums">
                            {subject.examScore ?? "—"}
                          </td>
                          <td className="px-space-sm py-space-sm text-center font-semibold tabular-nums">
                            {subject.totalScore ?? "—"}
                          </td>
                          <td className="px-space-sm py-space-sm text-center">
                            {subject.grade ?? "—"}
                          </td>
                        </tr>
                      ))}
                      {selectedResult.subjects.length === 0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-space-md py-space-lg text-center text-on-surface-variant"
                          >
                            This result contains no subject scores.
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot className="border-t-2 border-surface-container bg-surface-container-low font-semibold">
                      <tr>
                        <td className="px-space-md py-space-sm">Average</td>
                        <td colSpan={3} className="px-space-sm py-space-sm text-center">
                          {average.toFixed(1)}%
                        </td>
                        <td className="px-space-sm py-space-sm text-center">
                          {enteredScores.length}/{selectedResult.subjects.length} scored
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* <PrincipalSignoff
                  onConfirmPublish={}
                  onReturnToTeacher={}
                  /> */}

                {isPending ? (
                  <div className="flex flex-col gap-space-md rounded-xl border border-surface-container-high/60 bg-surface-container-lowest p-space-lg shadow-sm">
                    <label
                      htmlFor="return-note"
                      className="text-sm font-semibold text-on-surface"
                    >
                      Return to teacher for correction (optional action)
                    </label>
                    <textarea
                      id="return-note"
                      rows={3}
                      value={rejectionReason}
                      onChange={(event) => setRejectionReason(event.target.value)}
                      maxLength={1000}
                      placeholder="Explain what needs to be corrected before resubmission."
                      className="w-full rounded-lg border border-surface-container bg-surface-container-low p-space-md text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <div className="flex flex-wrap items-center justify-end gap-space-sm">
                      <button
                        type="button"
                        onClick={() => void review("return")}
                        disabled={busy || rejectionReason.trim().length === 0}
                        className="inline-flex items-center gap-2 rounded-lg border border-outline-variant px-space-md py-2 font-semibold text-on-surface transition-colors hover:bg-surface-container-low disabled:opacity-50"
                      >
                        <Undo2 className="h-4 w-4" />
                        Return to teacher
                      </button>
                      <button
                        type="button"
                        onClick={() => void review("approve")}
                        disabled={busy || selectedResult.subjects.length === 0}
                        className="inline-flex items-center gap-2 rounded-lg bg-secondary-container px-space-lg py-2 font-semibold text-on-secondary shadow-sm transition-colors hover:bg-secondary disabled:opacity-50"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {busy ? "Saving review..." : "Approve result"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg bg-tertiary-container/30 px-space-md py-space-sm text-sm text-on-tertiary-container">
                    {selectedResult.status === "APPROVED" ||
                    selectedResult.status === "PUBLISHED"
                      ? "This result has been approved."
                      : `This result is ${statusLabel(selectedResult.status).toLowerCase()}.`}
                    {selectedResult.rejectionReason
                      ? ` Teacher note: ${selectedResult.rejectionReason}`
                      : ""}
                  </div>
                )}
              </>
            )}
            <Link
              href="/dashboard/admin"
              className="w-fit text-sm font-semibold text-primary hover:underline"
            >
              Back to admin dashboard
            </Link>
          </section>
        </div>
      )}
    </div>
  );
}
