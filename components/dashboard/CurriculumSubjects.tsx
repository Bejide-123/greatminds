import { GraduationCap, CheckCircle2, CircleDashed } from "lucide-react";
import { CURRICULUM } from "@/lib/teacher-data";

export default function CurriculumSubjects() {
  return (
    <div className="flex flex-col gap-space-sm pt-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <div className="flex items-center gap-space-xs">
            <GraduationCap className="text-primary w-5 h-5" />
            <h2 className="font-headline-md text-headline-sm text-on-surface">
              Primary Curriculum Subjects (Basic 4 Diamond)
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Continuous assessment and terminal evaluation modules for Mrs.
            Danladi&apos;s classroom.
          </p>
        </div>
        <span className="font-label-sm text-label-sm bg-surface-container text-on-surface-variant px-space-sm py-1 rounded-full font-mono">
          CURRICULUM: NERDC &amp; CAMBRIDGE
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg mt-space-xs">
        {CURRICULUM.map((s) => {
          const StatusIcon =
            s.statusIcon === "check" ? CheckCircle2 : CircleDashed;
          return (
            <div
              key={s.title}
              className={`bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between border-t-4 ${s.border}`}
            >
              <div>
                <div className="flex items-center justify-between mb-space-xs">
                  <span
                    className={`font-label-sm text-label-sm uppercase font-bold ${s.tagColor}`}
                  >
                    {s.tag}
                  </span>
                  <span className="font-label-sm text-[11px] bg-surface-container px-1.5 py-0.5 rounded text-on-surface-variant">
                    {s.hours}
                  </span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface mt-1">
                  {s.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {s.description}
                </p>
              </div>

              <div className="mt-space-md pt-space-xs flex items-center justify-between text-body-sm">
                <span
                  className={`font-label-sm text-label-sm ${s.statusColor} font-semibold flex items-center gap-1`}
                >
                  <StatusIcon className="w-4 h-4" /> {s.status}
                </span>
                <span className={`font-label-sm text-label-sm font-bold ${s.loggedColor}`}>
                  {s.logged}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}