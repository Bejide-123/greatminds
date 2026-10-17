import {
  ShieldCheck,
  Award,
  Star,
  Quote,
  BadgeCheck,
} from "lucide-react";
import { TEACHER_NOTE, TERM_METRICS, TOP_SUBJECTS } from "@/lib/dashboard-data";

export default function TerminalSpotlight() {
  return (
    <section className="mb-space-xl">
      <div className="rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container-high overflow-hidden">
        <div className="h-2 w-full bg-gradient-to-r from-secondary-container via-primary-container to-secondary-container" />

        <div className="p-space-lg md:p-space-xl flex flex-col lg:flex-row gap-space-xl">
          {/* Left: metrics + teacher note */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-space-xs mb-space-sm">
                <span className="bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm px-space-sm py-1 rounded-full flex items-center gap-1.5 uppercase font-bold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse" />
                  Official Basic 4 Terminal Ledger
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-4 h-4 text-secondary-container" />
                  Headteacher&apos;s Honour Roll Certified
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                First Term Examination &amp; CA Summary
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                Continuous Assessments, Jolly Phonics speed assessments, STEM
                practicals, and Terminal Exams audited and signed off by
                Homeroom Teacher Mrs. Grace Danladi and Headteacher Dr.
                Folashade Adelekan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md mt-space-lg">
                {TERM_METRICS.map((m) => (
                  <div
                    key={m.label}
                    className="bg-surface-container-low p-space-md rounded-lg flex flex-col border border-surface-container-high"
                  >
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                      {m.label}
                    </span>
                    <div className="flex items-baseline gap-space-xs mt-1">
                      <span
                        className={`font-headline-xl text-headline-xl font-bold ${m.valueClass}`}
                      >
                        {m.value}
                      </span>
                      <span
                        className={`font-label-md text-label-md font-bold ${m.suffixClass}`}
                      >
                        {m.suffix}
                      </span>
                    </div>
                    <span
                      className={`font-body-sm text-body-sm mt-1 ${
                        m.subClass ?? "text-on-surface-variant"
                      }`}
                    >
                      {m.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-space-lg p-space-md rounded-lg bg-surface-container-low border-l-4 border-secondary-container flex items-start gap-space-sm">
              <Quote className="text-secondary-container w-6 h-6 shrink-0 fill-current" />
              <div>
                <p className="font-body-sm text-body-sm text-on-surface italic">
                  {TEACHER_NOTE.quote}
                </p>
                <span className="font-label-sm text-[11px] font-bold text-primary mt-1 block">
                  {TEACHER_NOTE.author}
                </span>
              </div>
            </div>
          </div>

          {/* Right: top subjects */}
          <div className="lg:w-84 bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between border border-surface-container-high">
            <div>
              <div className="flex items-center justify-between pb-space-xs mb-space-md border-b border-surface-container-high">
                <span className="font-title-md text-title-md text-on-surface font-bold flex items-center gap-1.5">
                  <BadgeCheck className="text-secondary-container w-5 h-5" />
                  Best Performing Subjects
                </span>
                <span className="font-label-sm text-label-sm bg-primary text-surface-container-lowest px-2 py-0.5 rounded-full font-bold">
                  Term 1
                </span>
              </div>

              <div className="space-y-space-md">
                {TOP_SUBJECTS.map((s) => (
                  <div key={s.name} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-body-md text-body-sm font-semibold text-on-surface">
                        {s.name}
                      </span>
                      <span className="font-headline-sm text-body-md font-bold text-primary">
                        {s.score}%
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                      <div
                        className={`${s.barColor} h-2 rounded-full`}
                        style={{ width: `${s.score}%` }}
                      />
                    </div>
                    <div className="flex justify-between font-label-sm text-[11px] text-on-surface-variant">
                      <span className={`${s.tagColor} font-bold`}>{s.tag}</span>
                      <span>{s.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-space-md pt-space-sm bg-surface-container-lowest p-space-sm rounded-lg flex items-center gap-space-sm border border-surface-container-high">
              <Award className="text-secondary-container w-[22px] h-[22px]" />
              <span className="font-body-sm text-[12px] text-on-surface font-medium">
                National Primary STEM Olympiad Junior Candidate.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}