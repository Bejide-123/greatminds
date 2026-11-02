"use client";

import { useEffect, useState } from "react";
import type { PupilProfile } from "./profile-types";

type UsePupilProfileResult = {
  profile: PupilProfile | null;
  loading: boolean;
  error: string | null;
};

export function usePupilProfile(
  pupilId: string | null,
  options?: { self?: boolean },
): UsePupilProfileResult {
  const [profile, setProfile] = useState<PupilProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For a pupil viewing their own profile, use `/me`; otherwise `/id`.
    const url = options?.self
      ? "/api/pupils/me"
      : pupilId
      ? `/api/pupils/${pupilId}`
      : null;

    if (!url) {
      setProfile(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { cache: "no-store", signal: controller.signal })
      .then(async (res) => {
        const body: unknown = await res.json();
        if (!res.ok) {
          const message =
            typeof body === "object" && body !== null && "error" in body
              ? String((body as { error: unknown }).error)
              : "Unable to load profile.";
          throw new Error(message);
        }
        return body as PupilProfile;
      })
      .then((data) => {
        if (!controller.signal.aborted) setProfile(data);
      })
      .catch((err: unknown) => {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Unable to load profile.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [pupilId, options?.self]);

  return { profile, loading, error };
}