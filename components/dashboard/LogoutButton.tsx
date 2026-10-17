"use client";

import { LogOut } from "lucide-react";
import { useUser } from "@/components/auth/UserProvider";

export default function LogoutButton() {
  const { logout, isLoggingOut, error } = useUser();

  return (
    <div className="mt-3">
      {error && (
        <p
          className="mb-2 rounded-md bg-error-container px-2 py-1.5 text-xs text-on-error-container"
          role="alert"
        >
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={() => void logout()}
        disabled={isLoggingOut}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-primary-fixed-dim transition-colors hover:bg-[#122B55] hover:text-surface-container-lowest disabled:cursor-wait disabled:opacity-60"
      >
        <LogOut className="h-4 w-4" />
        {isLoggingOut ? "Logging out..." : "Log out"}
      </button>
    </div>
  );
}
