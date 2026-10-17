import { BadgeCheck, Pin, ClipboardCheck } from "lucide-react";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import AuthSubmitButton from "./AuthSubmitButton";
import type { FormEvent } from "react";

type TeacherPanelProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
};

export default function TeacherPanel({ onSubmit, loading }: TeacherPanelProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Faculty Gradebook Login
          </h2>
          <span className="bg-primary-fixed text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-3xl flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Academic Staff
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Secure ledger access for continuous assessment grading, attendance
          records, and comments.
        </p>
      </div>

      <div className="bg-surface-container-low rounded-lg p-3 mb-6 flex items-start gap-2.5">
        <ClipboardCheck className="text-primary w-5 h-5 mt-0.5" />
        <div className="flex flex-col">
          <span className="font-label-md text-label-md text-on-surface font-semibold">
            Gradebook Submission Window Active
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Mid-Term Assessment entry locks Friday, 5:00 PM GMT.
          </span>
        </div>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <AuthInput
          id="teacher-staffid"
          name="username"
          label="Email Address"
          placeholder="teacher@greatminds.edu"
          type="email"
          inputMode="email"
          icon={<BadgeCheck className="w-5 h-5" />}
          required
        />

        <PasswordInput
          id="teacher-pwd"
          name="password"
          label="Faculty Password"
          placeholder="Enter Staff Password"
          required
          hint={
            <a
              href="#reset"
              className="font-label-sm text-label-sm text-primary hover:underline"
            >
              Reset credential
            </a>
          }
        />

        <AuthInput
          id="teacher-2fa"
          name="twoFactorCode"
          label="2FA Verification Code (6-Digit Token)"
          placeholder="e.g. 589410"
          icon={<Pin className="w-5 h-5" />}
          inputMode="numeric"
          maxLength={6}
        />

        <div className="flex items-center gap-2 pt-1">
          <input
            id="teacher-remember"
            type="checkbox"
            className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
          />
          <label
            htmlFor="teacher-remember"
            className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer"
          >
            Trust this departmental workstation for 14 days
          </label>
        </div>

        <AuthSubmitButton
          label="Sign In to Teacher Gradebook"
          variant="primaryContainer"
          loading={loading}
        />
      </form>

      <div className="mt-4 pt-4 text-center">
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Missing teacher access tokens?{" "}
          <a
            href="#it-support"
            className="font-semibold text-secondary hover:underline ml-1"
          >
            Contact Head of Primary Academics
          </a>
        </p>
      </div>
    </div>
  );
}