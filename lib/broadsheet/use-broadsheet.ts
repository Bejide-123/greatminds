"use client";

import { useEffect, useState } from "react";
import type { BroadsheetData } from "./types";

export function useBroadsheet(
  classId: string | null,
  termId: string | null,
  page: number,
) {
  const [data, setData] = useState<BroadsheetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!classId) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({ classId, page: String(page) });
    if (termId) params.set("termId", termId);

    setLoading(true);
    setError(null);

    fetch(`/api/admin/broadsheet?${params}`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (res) => {
        const body: unknown = await res.json();
        if (!res.ok) {
          const message =
            typeof body === "object" && body !== null && "error" in body
              ? String((body as { error: unknown }).error)
              : "Unable to load broadsheet.";
          throw new Error(message);
        }
        return body as BroadsheetData;
      })
      .then((d) => {
        if (!controller.signal.aborted) setData(d);
      })
      .catch((err: unknown) => {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Unable to load broadsheet.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [classId, termId, page]);

  return { data, loading, error };
}