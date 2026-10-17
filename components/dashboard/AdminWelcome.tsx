"use client";

import { ClipboardCheck } from "lucide-react";
import { useUser } from "@/components/auth/UserProvider";

export default function AdminWelcome() {
  const { user } = useUser();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-lowest p-space-xl rounded-xl shadow-sm border border-surface-container">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-primary font-bold">
          Welcome back, {user?.displayName}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Here is a quick overview of Great Minds International School for
          First Term.
        </p>
      </div>
      <a
        href="#pending-results"
        className="flex items-center gap-space-xs px-space-lg py-2.5 rounded-lg bg-secondary-container hover:bg-secondary text-on-secondary font-label-md text-label-md font-bold transition-colors shadow-sm"
      >
        <ClipboardCheck className="w-[18px] h-[18px]" />
        <span>Review Pending Results</span>
      </a>
    </div>
  );
}