"use client";

import { Loader2, ArrowRight } from "lucide-react";
import { ReactNode } from "react";

type Variant = "secondary" | "primary" | "primaryContainer";

const VARIANT_CLASSES: Record<Variant, string> = {
  secondary: "bg-secondary hover:bg-on-secondary-container text-on-secondary",
  primary: "bg-primary hover:bg-on-primary-fixed text-on-primary",
  primaryContainer: "bg-primary-container hover:bg-primary text-on-primary",
};

type AuthSubmitButtonProps = {
  label: string;
  variant?: Variant;
  endIcon?: ReactNode;
  loading?: boolean;
};

export default function AuthSubmitButton({
  label,
  variant = "secondary",
  endIcon,
  loading = false,
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full h-11 font-label-md text-label-md uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-90 ${VARIANT_CLASSES[variant]}`}
    >
      {!loading && (
        <>
          <span>{label}</span>
          {endIcon ?? <ArrowRight className="w-5 h-5" />}
        </>
      )}
      {loading && (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Authenticating with Central Node...
        </>
      )}
    </button>
  );
}