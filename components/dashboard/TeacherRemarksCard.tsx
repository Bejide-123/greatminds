"use client";

import { useEffect, useState } from "react";
import { FileEdit, CalendarCheck2 } from "lucide-react";
import { useUser } from "@/components/auth/UserProvider";

type TeacherRemarksCardProps = {
  value?: string;
  onChange: (value: string) => void;
  attendance?: number | null;
  onAttendanceChange: (value: number | null) => void;
  disabled: boolean;
};

export default function TeacherRemarksCard({
  value = "",
  onChange,
  attendance = null,
  onAttendanceChange,
  disabled,
}: TeacherRemarksCardProps) {
  const [remarks, setRemarks] = useState(value);
  const { user } = useUser();

  useEffect(() => {
    setRemarks(value);
  }, [value]);

  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container-high/60 flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
        <div className="flex items-center gap-space-xs">
          <FileEdit className="text-secondary-container w-[22px] h-[22px]" />
          <h4 className="font-title-md text-title-md font-bold text-on-surface">
            Teacher Assessment &amp; Attendance
          </h4>
        </div>
        <span className="font-label-sm text-label-sm text-outline">
          {user?.displayName} • {user?.username}
        </span>
      </div>

      {/* Attendance Input Field */}
      <div className="flex flex-col sm:flex-row gap-space-md items-start sm:items-center justify-between p-space-md rounded-lg bg-surface-container-low border border-surface-container">
        <div className="flex items-center gap-space-sm">
          <CalendarCheck2 className="text-primary w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <label
              htmlFor="student-attendance"
              className="font-title-md text-body-sm font-bold text-on-surface"
            >
              Times School Attended
            </label>
            <span className="font-body-sm text-xs text-on-surface-variant">
              Total number of days this pupil attended school this term (e.g. 95)
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="student-attendance"
            type="number"
            min={0}
            max={365}
            step={1}
            value={attendance ?? ""}
            onChange={(e) => {
              const raw = e.target.value.trim();
              if (raw === "") {
                onAttendanceChange(null);
              } else {
                const parsed = parseInt(raw, 10);
                onAttendanceChange(Number.isNaN(parsed) ? null : Math.max(0, parsed));
              }
            }}
            disabled={disabled}
            placeholder="e.g. 95"
            className="w-28 p-2 rounded-lg bg-surface-container-lowest border border-surface-container text-center font-tabular-data text-body-sm font-bold text-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          />
          <span className="text-xs font-semibold text-on-surface-variant">
            Days
          </span>
        </div>
      </div>

      {/* Teacher Remarks Textarea */}
      <div className="flex flex-col gap-space-xs">
        <label
          htmlFor="teacher-remark-input"
          className="font-label-sm text-label-sm text-on-surface-variant font-medium"
        >
          Overall Behavioral &amp; Academic Trait Summary for Report Card:
        </label>
        <textarea
          id="teacher-remark-input"
          rows={3}
          value={remarks}
          onChange={(e) => {
            setRemarks(e.target.value);
            onChange(e.target.value);
          }}
          disabled={disabled}
          placeholder="Enter detailed behavioural, academic, or conduct remarks for this student..."
          className="w-full p-space-md rounded-lg bg-surface-container-low border border-surface-container text-on-surface font-body-sm text-body-sm focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
