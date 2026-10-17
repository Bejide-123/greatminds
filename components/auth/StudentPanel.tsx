import { BadgeCheck, CalendarDays, Megaphone } from "lucide-react";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import AuthSelect from "./AuthSelect";
import AuthSubmitButton from "./AuthSubmitButton";
import type { FormEvent } from "react";

const SESSION_OPTIONS = [
  { value: "2026/2027", label: "2026/2027 Session" },
  // { value: "2023/2024", label: "2023/2024 Session" },
  // { value: "2022/2023", label: "2022/2023 Session (Archive)" },
];

type StudentPanelProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
};

export default function StudentPanel({ onSubmit, loading }: StudentPanelProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Pupil Portal Login
          </h2>
          <span className="bg-tertiary-fixed text-tertiary font-label-sm text-label-sm px-2 py-0.5 rounded-3xl flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container" />
            Active
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Enter your pupil admission credentials to access continuous
          assessment and terminal examination results.
        </p>
      </div>

      <div className="bg-surface-container-low rounded-lg p-3 mb-6 flex items-start gap-2.5">
        <Megaphone className="text-secondary w-5 h-5 mt-0.5 fill-current" />
        <div className="flex flex-col">
          <span className="font-label-md text-label-md text-on-surface font-semibold">
            First Term 2026/2027 Terminal Results
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Published &amp; certified by the Academic Board. Terminal sheets
            are ready for download.
          </span>
        </div>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <AuthInput
          id="student-admission"
          name="username"
          label="Admission Number"
          placeholder="GMIS/2022/0482"
          icon={<BadgeCheck className="w-5 h-5" />}
          required
        />

        <PasswordInput
          id="student-pwd"
          name="password"
          label="Password"
          placeholder="Enter your password"
          required
          hint={
            <span className="font-label-sm text-label-sm text-outline">
              Case-sensitive
            </span>
          }
        />

        <AuthSelect
          id="student-session"
          label="Academic Session"
          icon={<CalendarDays className="w-5 h-5" />}
          options={SESSION_OPTIONS}
          defaultValue="2024/2025"
        />

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
            />
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Remember my ID
            </span>
          </label>
          <a
            href="#registrar-assist"
            className="font-body-sm text-body-sm text-secondary hover:underline"
          >
            Forgot Admission ID?
          </a>
        </div>

        <AuthSubmitButton label="Sign In to Pupil Portal" variant="secondary" loading={loading} />
      </form>

      <div className="mt-4 pt-4 text-center">
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Need verification assistance?{" "}
          <a
            href="#registrar-contact"
            className="font-semibold text-primary hover:underline ml-1"
          >
            Contact Registrar&apos;s Desk
          </a>
        </p>
      </div>
    </div>
  );
}