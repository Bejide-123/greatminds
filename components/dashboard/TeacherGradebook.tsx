"use client";

import { useCallback, useEffect, useState } from "react";
import GradebookContextBar from "@/components/dashboard/GradebookContextBar";
import PupilBiodataCard from "@/components/dashboard/PupilBiodataCard";
import PupilKPITiles from "@/components/dashboard/PupilKPITiles";
import PupilRoster from "@/components/dashboard/PupilRoster";
import TeacherRemarksCard from "./TeacherRemarksCard";
import SubjectEntryTable from "@/components/dashboard/SubjectEntryTable";
import PsychomotorEntryCard from "@/components/dashboard/PsychomotorEntryCard"
import {
  isGradebookData,
  type GradebookData,
  type GradebookScore,
  studentName,
  normalisePsychomotor,
  PSYCHOMOTOR_TRAITS
} from "@/lib/gradebook-api";

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

export default function TeacherGradebook() {
  const [data, setData] = useState<GradebookData | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scores, setScores] = useState<GradebookScore[]>([]);
  const [psychomotor, setPsychomotorRatings] = useState<Record<string, number | null>>({});
  const [teacherRemark, setTeacherRemark] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGradebook() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/teacher/gradebook", {
          cache: "no-store",
          signal: controller.signal,
        });
        const payload: unknown = await response.json();
        if (!response.ok) {
          throw new Error(
            responseError(payload, "Unable to load the class gradebook."),
          );
        }
        if (!isGradebookData(payload)) {
          throw new Error(
            "The gradebook service returned an invalid response.",
          );
        }

        setData(payload);
        setSelectedId(payload.students[0]?.id ?? null);
        setScores(payload.students[0]?.scores ?? []);
        setPsychomotorRatings(normalisePsychomotor(payload.students[0]?.psychomotor));
        setTeacherRemark(payload.students[0]?.teacherRemark ?? "");
      } catch (loadError) {
        if (!controller.signal.aborted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load the class gradebook.",
          );
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadGradebook();
    return () => controller.abort();
  }, []);

  const selectedStudent =
    data?.students.find((student) => student.id === selectedId) ?? null;
  const locked =
    selectedStudent?.status !== null &&
    selectedStudent?.status !== "DRAFT" &&
    selectedStudent?.status !== "REJECTED";
  const termLabel = data
    ? `${data.term.name.charAt(0)}${data.term.name.slice(1).toLowerCase()} Term • ${data.term.sessionName}`
    : "";
  const classCompletedCount =
    data?.students.filter(
      (student) =>
        data.subjects.length > 0 &&
        data.subjects.every((subject) => {
          const score = student.scores.find(
            (item) => item.subjectId === subject.id,
          );
          return score?.caScore != null && score.examScore != null;
        }),
    ).length ?? 0;

  const selectStudent = useCallback(
    (studentId: string, allowUnsaved = false) => {
      if (studentId === selectedId) return;
      if (
        dirty &&
        !allowUnsaved &&
        !window.confirm("Discard unsaved score changes?")
      ) {
        return;
      }

      const student = data?.students.find((item) => item.id === studentId);
      if (!student) return;
      setSelectedId(studentId);
      setScores(student.scores);
      setPsychomotorRatings(normalisePsychomotor(student.psychomotor)); 
      setTeacherRemark(student.teacherRemark ?? "");
      setDirty(false);
      setError(null);
      setNotice(null);
    },
    [data?.students, dirty, selectedId],
  );

  function updatePsychomotor(key: string, rating: number | null) {
    setPsychomotorRatings((current) => ({ ...current, [key]: rating }));
    setDirty(true);
    setError(null);
    setNotice(null);
  }


  function updateScore(
    subjectId: string,
    field: "caScore" | "examScore",
    value: number | null,
  ) {
    setScores((current) => {
      const existing = current.find((score) => score.subjectId === subjectId);
      if (!existing) {
        return [
          ...current,
          {
            subjectId,
            caScore: field === "caScore" ? value : null,
            examScore: field === "examScore" ? value : null,
            totalScore: null,
            grade: null,
          },
        ];
      }
      return current.map((score) =>
        score.subjectId === subjectId
          ? { ...score, [field]: value, totalScore: null, grade: null }
          : score,
      );
    });
    setDirty(true);
    setError(null);
    setNotice(null);
  }

  async function saveResult(action: "save" | "submit"): Promise<boolean> {
    if (!selectedStudent || !data || locked) return false;

    const setBusy = action === "save" ? setIsSaving : setIsSubmitting;
    setBusy(true);
    setError(null);
    setNotice(null);

    try {
      const response = await fetch(
        `/api/teacher/gradebook/${encodeURIComponent(selectedStudent.id)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            teacherRemark,
            action,
            scores: data.subjects.map((subject) => {
              const score = scores.find(
                (item) => item.subjectId === subject.id,
              );
              return {
                subjectId: subject.id,
                caScore: score?.caScore ?? null,
                examScore: score?.examScore ?? null,
              };
            }),
          }),
        },
      );
      const payload: unknown = await response.json();
      if (!response.ok) {
        throw new Error(
          responseError(payload, "Unable to save the student's results."),
        );
      }

      if (
        typeof payload !== "object" ||
        payload === null ||
        !("status" in payload) ||
        typeof payload.status !== "string"
      ) {
        throw new Error("The results service returned an invalid response.");
      }

      const savedStatus = payload.status;
      setData((current) =>
        current
          ? {
              ...current,
              students: current.students.map((student) =>
                student.id === selectedStudent.id
                  ? {
                      ...student,
                      status: savedStatus,
                      teacherRemark,
                      psychomotor,
                      scores: scores.map((score) => {
                        if (
                          score.caScore === null ||
                          score.examScore === null
                        ) {
                          return { ...score, totalScore: null, grade: null };
                        }
                        return {
                          ...score,
                          totalScore: score.caScore + score.examScore,
                        };
                      }),
                    }
                  : student,
              ),
            }
          : current,
      );
      setScores((current) =>
        current.map((score) =>
          score.caScore === null || score.examScore === null
            ? { ...score, totalScore: null, grade: null }
            : { ...score, totalScore: score.caScore + score.examScore },
        ),
      );
      setDirty(false);
      setNotice(
        action === "submit"
          ? "Results submitted for admin review."
          : "Draft saved.",
      );
      return true;
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to save the student's results.",
      );
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function saveAndSelectNextStudent() {
    if (!data || data.students.length < 2 || !selectedStudent) return;
    if (dirty && !(await saveResult("save"))) return;
    const start = data.students.findIndex(
      (student) => student.id === selectedStudent.id,
    );
    const next = Array.from(
      { length: data.students.length - 1 },
      (_, index) => {
        return data.students[(start + index + 1) % data.students.length];
      },
    ).find(
      (student) =>
        student.status !== "SUBMITTED" &&
        student.status !== "UNDER_REVIEW" &&
        student.status !== "APPROVED" &&
        student.status !== "PUBLISHED",
    );

    if (next) selectStudent(next.id, true);
  }

  if (loading) {
    return (
      <p className="mx-auto w-full max-w-7xl py-space-2xl text-center text-on-surface-variant">
        Loading students for your class...
      </p>
    );
  }

  if (error && !data) {
    return (
      <div
        className="mx-auto w-full max-w-7xl rounded-xl bg-error-container p-space-lg text-on-error-container"
        role="alert"
      >
        {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mx-auto flex w-full max-w-[1580px] flex-col gap-space-lg py-space-md pt-space-xl">
      <GradebookContextBar
        className={data.class.name}
        classSize={data.students.length}
        classCompletedCount={classCompletedCount}
        hasSelectedStudent={selectedStudent !== null}
        termLabel={termLabel}
        subjects={data.subjects}
        scores={scores}
        resultStatus={selectedStudent?.status ?? null}
        disabled={!selectedStudent || locked}
        isSaving={isSaving}
        isSubmitting={isSubmitting}
        onSave={() => void saveResult("save")}
        onNext={() => void saveAndSelectNextStudent()}
        onSubmit={() => void saveResult("submit")}
      />

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
      {selectedStudent?.rejectionReason &&
        selectedStudent.status === "REJECTED" && (
          <p className="rounded-lg bg-error-container px-space-md py-space-sm text-sm text-on-error-container">
            Returned for correction: {selectedStudent.rejectionReason}
          </p>
        )}

      {!selectedStudent ? (
        <p className="rounded-xl bg-surface-container-lowest p-space-lg text-on-surface-variant">
          No active students were found in {data.class.name}.
        </p>
      ) : (
        <div className="grid grid-cols-1 items-start gap-space-lg lg:grid-cols-12">
          <PupilRoster
            students={data.students}
            subjects={data.subjects}
            selectedId={selectedStudent.id}
            onSelect={selectStudent}
          />

          <div className="flex flex-col gap-space-lg lg:col-span-8 xl:col-span-9">
            <div className="rounded-xl border border-surface-container-high/60 bg-surface-container-lowest p-space-lg shadow-sm">
              <PupilBiodataCard
                pupil={selectedStudent}
                className={data.class.name}
              />
              <PupilKPITiles subjects={data.subjects} scores={scores} />
            </div>

            <SubjectEntryTable
              subjects={data.subjects}
              scores={scores}
              onChange={updateScore}
              disabled={locked}
            />

            <PsychomotorEntryCard
            traits={PSYCHOMOTOR_TRAITS}
              ratings={psychomotor}
              onChange={updatePsychomotor}
              disabled={locked}
            />

            <TeacherRemarksCard
              value={teacherRemark}
              onChange={(value) => {
                setTeacherRemark(value);
                setDirty(true);
                setError(null);
                setNotice(null);
              }}
              disabled={locked}
            />
            <p className="text-xs text-on-surface-variant">
              Scores are saved as drafts. Submit a complete result for admin
              review; it will not be published until approved.
            </p>
            {locked && (
              <p className="rounded-lg bg-surface-container-low px-space-md py-space-sm text-sm text-on-surface-variant">
                This result has been submitted and is locked for editing.
              </p>
            )}
            {dirty && (
              <p className="sr-only" aria-live="polite">
                Unsaved changes for {studentName(selectedStudent)}.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
