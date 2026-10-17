"use client";

import { useState } from "react";
import {
  FileEdit,
  ArrowLeft,
  Save,
  ArrowRight,
} from "lucide-react";
// import { HOMEROOM_REMARKS } from "@/lib/gradebook-data";
import { useUser } from "@/components/auth/UserProvider";

type TeacherRemarksCardProps = {
  value?: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export default function TeacherRemarksCard({ value, onChange, disabled }: TeacherRemarksCardProps) {
  const [remarks, setRemarks] = useState(value);
  const { user } = useUser();

  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container-high/60 flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
        <div className="flex items-center gap-space-xs">
          <FileEdit className="text-secondary-container w-[22px] h-[22px]" />
          <h4 className="font-title-md text-title-md font-bold text-on-surface">
            Teacher Remarks
          </h4>
        </div>
        <span className="font-label-sm text-label-sm text-outline">
          {user?.displayName} • {user?.username}
        </span>
      </div>

      <div className="flex flex-col gap-space-xs">
        <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
          Overall Behavioral &amp; Academic Trait Summary for Report Card:
        </label>
        <textarea
          rows={3}
          value={remarks}
          onChange={(e) => {
            setRemarks(e.target.value);
            onChange(e.target.value);
          }}
          disabled={disabled}
          className="w-full p-space-md rounded-lg bg-surface-container-low border border-surface-container text-on-surface font-body-sm text-body-sm focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none transition-all"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">
        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            className="flex items-center gap-1.5 px-space-lg py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container font-title-md text-body-sm transition-all border border-surface-container shadow-sm"
          >
            <ArrowLeft className="w-[18px] h-[18px]" />
            <span>Previous Pupil</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-space-lg py-2 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container font-title-md text-body-sm transition-all border border-surface-container shadow-sm"
          >
            <Save className="w-[18px] h-[18px]" />
            <span>Save Current Draft</span>
          </button>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-space-xl py-2.5 rounded-lg bg-secondary-container hover:bg-secondary text-on-secondary font-title-md text-body-sm font-semibold transition-all shadow-sm"
        >
          <span>Save</span>
          <ArrowRight className="w-[18px] h-[18px]" />
        </button>
      </div>
    </div>
  );
}