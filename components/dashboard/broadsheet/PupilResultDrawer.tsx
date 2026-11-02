"use client";

import { X } from "lucide-react";
import type { BroadsheetStudent } from "@/lib/broadsheet/types";

type Props = {
  student: BroadsheetStudent | null;
  onClose: () => void;
};

export default function PupilResultDrawer({ student, onClose }: Props) {
  if (!student) return null;

  const fullName = [student.firstName, student.otherName, student.surname]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="absolute top-0 right-0 h-full w-full max-w-lg bg-surface-container-lowest shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-surface-container-lowest z-10 px-space-lg py-space-md border-b border-surface-container flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm font-bold text-on-surface">
              {fullName}
            </h3>
            <p className="text-xs text-on-surface-variant">
              {student.admissionNumber}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-space-lg flex flex-col gap-space-md">
          <div className="grid grid-cols-3 gap-space-sm">
            <div className="bg-surface-container-low p-space-sm rounded-lg text-center">
              <div className="text-[11px] text-on-surface-variant uppercase">
                Average
              </div>
              <div className="font-bold text-primary text-lg">
                {student.overallAverage != null
                  ? `${student.overallAverage.toFixed(1)}%`
                  : "—"}
              </div>
            </div>
            <div className="bg-surface-container-low p-space-sm rounded-lg text-center">
              <div className="text-[11px] text-on-surface-variant uppercase">
                Position
              </div>
              <div className="font-bold text-on-surface text-lg">
                {student.position ?? "—"}
              </div>
            </div>
            <div className="bg-surface-container-low p-space-sm rounded-lg text-center">
              <div className="text-[11px] text-on-surface-variant uppercase">
                Tier
              </div>
              <div className="font-bold text-secondary text-sm mt-1">
                {student.tier}
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-space-sm rounded-lg">
            <h4 className="font-label-md uppercase tracking-wider text-on-surface-variant mb-2">
              Subject Scores
            </h4>
            <div className="flex flex-col gap-1">
              {student.scores.map((s, i) => (
                <div
                  key={s.subjectId}
                  className="flex items-center justify-between text-sm py-1 border-b border-surface-container last:border-0"
                >
                  <span className="text-on-surface-variant">
                    Subject {i + 1}
                  </span>
                  <span className="font-tabular-data text-on-surface">
                    CA {s.caScore ?? "—"} • Exam {s.examScore ?? "—"} •{" "}
                    <strong className="text-primary">
                      {s.totalScore ?? "—"}
                    </strong>{" "}
                    {s.grade && (
                      <span className="text-secondary font-bold">
                        ({s.grade})
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {student.teacherRemark && (
            <div className="bg-surface-container-low p-space-sm rounded-lg border-l-4 border-primary">
              <div className="text-[11px] uppercase font-bold text-primary mb-1">
                Tutor Remark
              </div>
              <p className="text-sm italic text-on-surface">
                &ldquo;{student.teacherRemark}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}