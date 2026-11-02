"use client";

import { useEffect, useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Save,
  Undo2,
  CalendarCheck2,
  MessageSquareQuote,
  Sparkles,
} from "lucide-react";
import { DEFAULT_PRINCIPAL_COMMENT } from "@/lib/review-data";
import { useUser } from "@/components/auth/UserProvider";

type Props = {
  initialComment?: string | null;
  teacherRemark?: string | null;
  attendance?: number | null;
  onSaveComment: (comment: string) => Promise<void> | void;
  onConfirmApprove: (comment: string) => Promise<void> | void;
  onReturnToTeacher: () => void;
  disabled?: boolean;
  isSavingComment?: boolean;
  isApproving?: boolean;
  isApproved?: boolean;
};

export default function PrincipalSignoff({
  initialComment = "",
  teacherRemark = null,
  attendance = null,
  onSaveComment,
  onConfirmApprove,
  onReturnToTeacher,
  disabled = false,
  isSavingComment = false,
  isApproving = false,
  isApproved = false,
}: Props) {
  const [comment, setComment] = useState(initialComment ?? "");
  const [signed, setSigned] = useState(true);
  const { user } = useUser();

  // Sync state whenever selected student changes
  useEffect(() => {
    setComment(initialComment ?? "");
  }, [initialComment]);

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-high/60 flex flex-col gap-space-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-space-xs border-b border-surface-container gap-2">
        <div className="flex items-center gap-space-xs">
          <ShieldCheck className="text-secondary-container w-[22px] h-[22px]" />
          <h4 className="font-title-md text-title-md font-bold text-on-surface">
            Principal / Headteacher Review &amp; Sign-off
          </h4>
        </div>
        <div className="flex items-center gap-2">
          {attendance !== null && attendance !== undefined && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-fixed/50 px-2.5 py-0.5 text-xs font-semibold text-primary">
              <CalendarCheck2 className="h-3.5 w-3.5" />
              Attendance: {attendance} Days
            </span>
          )}
          <span className="font-label-sm text-label-sm text-outline">
            {user?.displayName ?? "Headteacher"} •{" "}
            {user?.role === "ADMIN" ? "Administrator" : user?.role}
          </span>
        </div>
      </div>

      {/* Teacher's Reference Remark */}
      {teacherRemark && (
        <div className="rounded-lg bg-surface-container-low p-space-md border border-surface-container flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <MessageSquareQuote className="h-4 w-4" />
            Class Teacher&apos;s Remark
          </div>
          <p className="text-sm italic text-on-surface-variant">
            &ldquo;{teacherRemark}&rdquo;
          </p>
        </div>
      )}

      {/* Headteacher Comment Textarea */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <label
            htmlFor="headteacher-comment"
            className="font-label-sm text-label-sm text-on-surface-variant font-medium"
          >
            Headteacher / Principal Remark (printed on official report card):
          </label>
          {!comment && (
            <button
              type="button"
              onClick={() => setComment(DEFAULT_PRINCIPAL_COMMENT)}
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold"
            >
              <Sparkles className="h-3 w-3" />
              Use recommended template
            </button>
          )}
        </div>
        <textarea
          id="headteacher-comment"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={1000}
          disabled={disabled}
          placeholder="e.g. An excellent and well-moderated result. Commendable academic effort and leadership. Keep up the high standard!"
          className="w-full p-space-md rounded-lg bg-surface-container-low border border-surface-container text-on-surface font-body-sm text-body-sm focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <div className="flex items-center justify-between text-[11px] text-outline">
          <span>Saved directly into student report card record</span>
          <span>{comment.length} / 1000 characters</span>
        </div>
      </div>

      {!isApproved && (
        <label className="flex items-start gap-space-sm cursor-pointer select-none bg-surface-container-low p-space-md rounded-lg border border-surface-container">
          <input
            type="checkbox"
            checked={signed}
            onChange={(e) => setSigned(e.target.checked)}
            disabled={disabled}
            className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary"
          />
          <span className="text-body-sm text-on-surface">
            I have reviewed this student&apos;s scores and approve them for certification.
          </span>
        </label>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs border-t border-surface-container/60">
        <div className="flex items-center gap-space-sm">
          {!isApproved && (
            <button
              type="button"
              onClick={onReturnToTeacher}
              disabled={disabled || isSavingComment || isApproving}
              className="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container font-title-md text-body-sm transition-all border border-surface-container shadow-sm disabled:opacity-50"
            >
              <Undo2 className="w-[18px] h-[18px] text-secondary" />
              <span>Return to Teacher</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-space-sm">
          {/* Save Comment Button (does not approve, saves headTeacherRemark to DB) */}
          <button
            type="button"
            onClick={() => void onSaveComment(comment)}
            disabled={disabled || isSavingComment || isApproving}
            className="inline-flex items-center gap-1.5 px-space-lg py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-title-md text-body-sm border border-surface-container shadow-sm transition-all disabled:opacity-50"
          >
            <Save className="w-[18px] h-[18px]" />
            <span>{isSavingComment ? "Saving..." : "Save Comment"}</span>
          </button>

          {/* Approve Result Button */}
          {!isApproved && (
            <button
              type="button"
              disabled={disabled || !signed || isSavingComment || isApproving}
              onClick={() => void onConfirmApprove(comment)}
              className="inline-flex items-center gap-2 px-space-xl py-2 rounded-lg bg-secondary-container hover:bg-secondary text-on-secondary disabled:opacity-50 disabled:cursor-not-allowed font-title-md text-body-sm font-semibold transition-all shadow-sm"
            >
              <CheckCircle2 className="w-[18px] h-[18px]" />
              <span>{isApproving ? "Approving..." : "Approve Result"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
