"use client";

import { useEffect, useState } from "react";
import AdminMetrics from "@/components/dashboard/AdminMetrics";
import RecentSubmissions from "@/components/dashboard/RecentSubmissions";
import ResultsManagement from "@/components/dashboard/ResultsManagement";
import {
  isAdminResultsPayload,
  type AdminResultsPayload,
} from "@/lib/admin-results";

export default function AdminDashboardData() {
  const [data, setData] = useState<AdminResultsPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch("/api/admin/results?limit=8", {
          cache: "no-store",
          signal: controller.signal,
        });
        const result: unknown = await response.json();
        if (!response.ok) {
          throw new Error(
            typeof result === "object" &&
              result !== null &&
              "error" in result &&
              typeof result.error === "string"
              ? result.error
              : "Unable to load administrator dashboard data."
          );
        }
        if (!isAdminResultsPayload(result)) {
          throw new Error("The results service returned an invalid response.");
        }
        setData(result);
      } catch (loadError) {
        if (!controller.signal.aborted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load administrator dashboard data."
          );
        }
      }
    }

    void load();
    return () => controller.abort();
  }, []);

  if (error) {
    return (
      <p
        className="rounded-xl bg-error-container p-space-lg text-on-error-container"
        role="alert"
      >
        {error}
      </p>
    );
  }

  if (!data) {
    return (
      <p className="py-space-md text-sm text-on-surface-variant" role="status">
        Loading live school and results data...
      </p>
    );
  }

  return (
    <>
      <AdminMetrics summary={data.summary} />
      <div className="rounded-xl border border-surface-container bg-surface-container-lowest p-space-xl shadow-sm">
        <ResultsManagement pendingCount={data.summary.pendingResults} />
        <RecentSubmissions results={data.results} />
      </div>
    </>
  );
}
