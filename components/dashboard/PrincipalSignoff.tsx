"use client";

import { useState } from "react";
import { ShieldCheck, Send, MessageSquare, Undo2 } from "lucide-react";
import { DEFAULT_PRINCIPAL_COMMENT } from "@/lib/review-data";
import { useUser } from "@/components/auth/UserProvider";

type Props = {
  onConfirmPublish: (comment: string) => void;
  onReturnToTeacher: () => void;
};

export default function PrincipalSignoff({
  onConfirmPublish,
  onReturnToTeacher,
}: Props) {
  const [comment, setComment] = useState(DEFAULT_PRINCIPAL_COMMENT);
  const [signed, setSigned] = useState(true);
  const { user } = useUser();

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-high/60 flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
        <div className="flex items-center gap-space-xs">
          <ShieldCheck className="text-secondary-container w-[22px] h-[22px]" />
          <h4 className="font-title-md text-title-md font-bold text-on-surface">
            Principal / Admin Sign-off &amp; Comments
          </h4>
        </div>
        <span className="font-label-sm text-label-sm text-outline">
          {user?.displayName} •{" "}
          {user?.role === "ADMIN" ? "Administrator" : user?.role}
        </span>
      </div>

      <div className="flex flex-col gap-space-xs">
        <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
          Moderation Note for Report Card (visible to teaching staff &amp;
          parents on request):
        </label>
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="e.g. Scores have been checked against CA history and moderated."
          className="w-full p-space-md rounded-lg bg-surface-container-low border border-surface-container text-on-surface font-body-sm text-body-sm focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none transition-all"
        />
        <span className="font-label-sm text-[11px] text-outline">
          {comment.length} / 500 characters
        </span>
      </div>

      <label className="flex items-start gap-space-sm cursor-pointer select-none bg-surface-container-low p-space-md rounded-lg border border-surface-container">
        <input
          type="checkbox"
          checked={signed}
          onChange={(e) => setSigned(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary"
        />
        <span className="text-body-sm text-on-surface">
          I have reviewed this class broadsheet and authorize publication to
          student report cards.
        </span>
      </label>

      <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">
        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            onClick={onReturnToTeacher}
            className="flex items-center gap-1.5 px-space-lg py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container font-title-md text-body-sm transition-all border border-surface-container shadow-sm"
          >
            <Undo2 className="w-[18px] h-[18px] text-secondary" />
            <span>Return to Teacher</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-space-lg py-2 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container font-title-md text-body-sm transition-all border border-surface-container shadow-sm"
          >
            <MessageSquare className="w-[18px] h-[18px]" />
            <span>Add Internal Note</span>
          </button>
        </div>

        <button
          type="button"
          disabled={!signed}
          onClick={() => onConfirmPublish(comment)}
          className="flex items-center gap-2 px-space-xl py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 disabled:cursor-not-allowed text-white font-title-md text-body-sm font-semibold transition-all shadow-sm"
        >
          <Send className="w-[18px] h-[18px]" />
          <span>Confirm &amp; Publish Results</span>
        </button>
      </div>
    </div>
  );
}