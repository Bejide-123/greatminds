import { PenLine } from "lucide-react";
import type { ProfileResult } from "@/lib/pupils/profile-types";

type Props = {
  result: ProfileResult | null;
  teacherName: string | null;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TeacherNoteCard({ result, teacherName }: Props) {
  const hasRemark =
    result?.teacherRemark != null && result.teacherRemark.trim() !== "";

  return (
    <section
      id="teacher-note"
      className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-space-lg shadow-sm scroll-mt-24"
    >
      <div className="flex items-center gap-space-sm pb-space-sm border-b border-outline-variant/30">
        <PenLine className="text-primary w-5 h-5" />
        <h3 className="text-sm font-bold text-on-surface">
          Homeroom Teacher&apos;s Note
        </h3>
      </div>

      <div className="mt-space-sm bg-surface-container-low p-space-md rounded-lg border-l-4 border-l-primary">
        {hasRemark ? (
          <p className="text-xs text-on-surface italic leading-relaxed">
            &ldquo;{result?.teacherRemark}&rdquo;
          </p>
        ) : (
          <p className="text-xs text-on-surface-variant leading-relaxed">
            No teacher remark has been recorded for this term yet.
          </p>
        )}

        <div className="flex items-center gap-space-sm mt-space-sm pt-space-sm border-t border-outline-variant/30">
          <div className="w-7 h-7 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-[11px]">
            {teacherName ? initials(teacherName) : "—"}
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface">
              {teacherName ?? "Homeroom Teacher"}
            </p>
            <p className="text-[10px] text-on-surface-variant">
              Homeroom Tutor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}