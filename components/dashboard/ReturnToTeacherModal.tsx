"use client";

import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  teacher: string;
};

export default function ReturnToTeacherModal({
  open,
  onClose,
  teacher,
}: Props) {
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  if (!open) return null;

  function handleClose() {
    setNote("");
    setSent(false);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-surface-container-lowest rounded-xl shadow-xl max-w-md w-full p-space-xl flex flex-col">
        <div className="flex items-center justify-between mb-space-md">
          <h3 className="text-headline-sm font-bold text-on-surface">
            Return to Teacher
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="text-outline hover:text-on-surface"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="p-space-md rounded-lg bg-emerald-50 text-emerald-800 text-body-sm text-center border border-emerald-200">
            Results sent back to <strong>{teacher}</strong>.
          </div>
        ) : (
          <>
            <p className="text-body-sm text-on-surface-variant mb-space-md">
              Send a note back to <strong>{teacher}</strong> to correct or
              verify these scores.
            </p>

            <div className="mb-space-lg">
              <label className="block text-label-sm font-semibold text-on-surface mb-1">
                Reason / Note for Teacher:
              </label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Please double check Somtochukwu Eze's exam score..."
                className="w-full bg-surface-container-low rounded-lg p-space-sm text-body-sm border border-outline-variant focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-end gap-space-sm">
              <button
                type="button"
                onClick={handleClose}
                className="px-space-md py-2 text-on-surface-variant hover:bg-surface-container rounded-lg text-body-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setSent(true)}
                className="px-space-md py-2 bg-secondary-container hover:bg-secondary text-white rounded-lg font-medium text-body-sm"
              >
                Send Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}