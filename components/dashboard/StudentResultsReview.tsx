"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  FileEdit,
  ShieldCheck,
} from "lucide-react";
import { SUBJECTS } from "@/lib/results-data";
import type { ReviewClass, StudentRow } from "@/lib/review-data";

type Props = {
  activeClass: ReviewClass;
  student: StudentRow;
};

type StudentReviewState = {
  comment: string;
  approved: boolean;
};

export default function StudentResultsReview({ activeClass, student }: Props) {
  const [reviewByStudent, setReviewByStudent] = useState<
    Record<string, StudentReviewState>
  >({});
  const studentReviewId = `${activeClass.id}:${student.admissionNo}`;
  const studentReview = reviewByStudent[studentReviewId] ?? {
    comment: "",
    approved: false,
  };
  const reviewRows = useMemo(
    () =>
      SUBJECTS.map((subject) => {
        const ca = subject.ca1 + subject.tasks;
        const total = ca + subject.exam;
        return {
          subject: subject.name,
          ca,
          exam: subject.exam,
          total,
          grade: subject.grade,
        };
      }),
    []
  );

  function updateComment(comment: string) {
    setReviewByStudent((previous) => ({
      ...previous,
      [studentReviewId]: {
        comment,
        approved: previous[studentReviewId]?.approved ?? false,
      },
    }));
  }

  function approveStudentResults() {
    setReviewByStudent((previous) => ({
      ...previous,
      [studentReviewId]: {
        comment: previous[studentReviewId]?.comment ?? "",
        approved: true,
      },
    }));
  }

  return (
    <>
      <section className="flex flex-col gap-space-md rounded-xl border border-surface-container-high/60 bg-surface-container-lowest p-space-lg shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-space-sm">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary">
            <ClipboardList className="h-6 w-6" />
          </div>
          <div>
            <span className="font-label-sm text-label-sm font-semibold uppercase text-on-surface-variant">
              Student result
            </span>
            <h2 className="mt-0.5 font-headline-sm text-headline-sm font-bold text-on-surface">
              {student.name}
            </h2>
            <p className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
              {activeClass.className} <span className="px-1 text-outline">•</span>
              {student.admissionNo}
            </p>
          </div>
        </div>
        <div
          className={`flex items-center gap-space-xs self-start rounded-full px-space-md py-1.5 font-label-sm text-label-sm font-semibold sm:self-auto ${
            studentReview.approved
              ? "bg-emerald-50 text-emerald-800"
              : "bg-surface-container-low text-on-surface-variant"
          }`}
        >
          <ShieldCheck className="h-4 w-4 text-primary" />
          {studentReview.approved ? "Results approved" : "Awaiting approval"}
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-surface-container-high/60 bg-surface-container-lowest shadow-sm">
        <div className="flex flex-col gap-space-xs border-b border-surface-container p-space-md sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-title-md text-title-md font-bold text-on-surface">
              Subject results
            </h3>
            <p className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
              Review the submitted marks for all subjects.
            </p>
          </div>
          <span className="w-fit rounded-full bg-surface-container-low px-space-sm py-1 font-label-sm text-label-sm font-semibold text-on-surface-variant">
            CA 40% <span className="px-1 text-outline">•</span> Exam 60%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[940px] border-collapse text-left">
            <thead className="bg-surface-container-low font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="px-space-md py-space-sm">Subject</th>
                <th className="px-space-sm py-space-sm text-center">CA / 40</th>
                <th className="px-space-sm py-space-sm text-center">Exam / 60</th>
                <th className="px-space-sm py-space-sm text-center">Total</th>
                <th className="px-space-sm py-space-sm text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
              {reviewRows.map((row) => (
                <tr key={row.subject} className="hover:bg-surface-container-low/60">
                  <td className="px-space-md py-space-md font-semibold text-primary">
                    {row.subject}
                  </td>
                  <td className="px-space-sm py-space-md text-center tabular-nums">
                    {row.ca}
                  </td>
                  <td className="px-space-sm py-space-md text-center tabular-nums">
                    {row.exam}
                  </td>
                  <td className="px-space-sm py-space-md text-center font-bold tabular-nums">
                    {row.total}
                    <span className="font-normal text-outline"> / 100</span>
                  </td>
                  <td className="px-space-sm py-space-md text-center">
                    <span className="inline-flex rounded-full bg-tertiary-container/30 px-2 py-0.5 font-label-sm text-label-sm font-bold text-on-tertiary-container">
                      {row.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-space-md rounded-xl border border-surface-container-high/60 bg-surface-container-lowest p-space-lg shadow-sm">
        <div className="flex items-center justify-between gap-space-md border-b border-surface-container pb-space-xs">
          <div className="flex items-center gap-space-xs">
            <FileEdit className="h-[22px] w-[22px] text-secondary-container" />
            <h3 className="font-title-md text-title-md font-bold text-on-surface">
              Admin Summary &amp; Approval
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-outline">
            {activeClass.className}
          </span>
        </div>

        <div className="flex flex-col gap-space-xs">
          <label
            htmlFor="student-admin-summary"
            className="font-label-sm text-label-sm font-medium text-on-surface-variant"
          >
            General summary comment for {student.name}:
          </label>
          <textarea
            id="student-admin-summary"
            rows={3}
            value={studentReview.comment}
            onChange={(event) => updateComment(event.target.value)}
            placeholder="Add an overall comment about this student's results..."
            className="w-full rounded-lg border border-surface-container bg-surface-container-low p-space-md font-body-sm text-body-sm text-on-surface outline-none transition-all placeholder:text-outline focus:border-primary focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Approving will approve all {reviewRows.length} subject results for
            this student.
          </span>
          <button
            type="button"
            disabled={studentReview.approved}
            onClick={approveStudentResults}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-space-xl py-2.5 font-title-md text-body-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-default disabled:bg-emerald-100 disabled:text-emerald-800"
          >
            <CheckCircle2 className="h-[18px] w-[18px]" />
            {studentReview.approved ? "Student Results Approved" : "Approve Student Results"}
          </button>
        </div>
      </section>
    </>
  );
}
