import { CalendarDays } from "lucide-react";
import { ADMISSION_STEPS } from "@/lib/data";
import type { StepColor } from "@/lib/types";

const STEP_BG: Record<StepColor, string> = {
  primary: "bg-primary text-on-primary",
  secondary: "bg-secondary text-white",
  emerald: "bg-emerald-600 text-white",
};

type AdmissionsJourneyProps = {
  onOpenTour: () => void;
};

export default function AdmissionsJourney({
  onOpenTour,
}: AdmissionsJourneyProps) {
  return (
    <section
      id="admissions-journey"
      className="w-full py-space-2xl bg-surface"
    >
      <div className="max-w-7xl mx-auto px-gutter-lg flex flex-col gap-space-xl">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
              Admission in 4 Friendly Steps
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
              Welcoming Your Little Scholar
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              A stress-free, child-friendly enrollment experience created to
              understand your child&apos;s personality, learning style, and
              unique brilliance.
            </p>
          </div>
          <button
            onClick={onOpenTour}
            className="inline-flex items-center gap-space-xs px-space-lg py-2.5 rounded-xl bg-secondary text-white font-label-md text-label-md hover:bg-orange-600 transition-all shadow-md font-bold"
          >
            <CalendarDays className="w-[18px] h-[18px]" />
            Book an Assessment Playday
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-lg relative">
          {ADMISSION_STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-surface-container-lowest p-space-lg rounded-3xl border border-surface-container shadow-sm flex flex-col gap-space-sm relative"
            >
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-title-md shadow ${STEP_BG[step.color]}`}
              >
                {step.number}
              </div>
              <h3 className="font-title-md text-title-md text-primary font-bold">
                {step.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {step.description}
              </p>
              <span
                className={`font-label-sm text-label-sm font-semibold mt-auto ${
                  step.taglineColor === "emerald"
                    ? "text-emerald-700"
                    : "text-secondary"
                }`}
              >
                {step.tagline}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}