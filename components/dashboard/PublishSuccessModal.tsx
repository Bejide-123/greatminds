"use client";

import { CheckCircle2 } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  className: string;
  subject: string;
};

export default function PublishSuccessModal({
  open,
  onClose,
  className,
  subject,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-surface-container-lowest rounded-xl shadow-xl max-w-md w-full p-space-xl flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-space-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-headline-md font-bold text-primary mb-2">
          Results Published!
        </h3>
        <p className="text-body-sm text-on-surface-variant mb-space-lg">
          {subject} results for {className} have been published to student
          profiles and report cards.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-container transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}