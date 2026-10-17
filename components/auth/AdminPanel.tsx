import { UserCog, KeyRound, ShieldAlert } from "lucide-react";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import AuthSubmitButton from "./AuthSubmitButton";
import type { FormEvent } from "react";

type AdminPanelProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
};

export default function AdminPanel({ onSubmit, loading }: AdminPanelProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Administrative Console
          </h2>
          <span className="bg-error-container text-on-error-container font-label-sm text-label-sm px-2 py-0.5 rounded-3xl flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-error" />
            Restricted Access
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Registrar, Bursary, and Executive Board level system orchestration
          &amp; security governance.
        </p>
      </div>

      <div className="bg-surface-container-low rounded-lg p-3 mb-6 flex items-start gap-2.5">
        <ShieldAlert className="text-primary w-5 h-5 mt-0.5 fill-current" />
        <div className="flex flex-col">
          <span className="font-label-md text-label-md text-on-surface font-semibold">
            Hardware Key / MFA Enforced
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            All administrative access is logged with IP timestamping and audit
            trails.
          </span>
        </div>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <AuthInput
          id="admin-user"
          name="username"
          label="Administrator Username / Email"
          placeholder="governance@greatminds.edu"
          type="email"
          inputMode="email"
          icon={<UserCog className="w-5 h-5" />}
          required
        />

        <PasswordInput
          id="admin-pwd"
          name="password"
          label="Master Password"
          placeholder="••••••••••••••••"
          required
          hint={
            <span className="font-label-sm text-label-sm text-outline">
              FIPS-compliant
            </span>
          }
        />

        <AuthInput
          id="admin-mfa"
          name="mfaCode"
          label="FIDO2 / U2F Security Key or Authenticator Code"
          placeholder="Enter 8-digit emergency code or insert key"
          icon={<KeyRound className="w-5 h-5" />}
        />

        <AuthSubmitButton
          label="Sign In to Admin Command Console"
          variant="primary"
          endIcon={<ShieldAlert className="w-5 h-5" />}
          loading={loading}
        />
      </form>

      <div className="mt-4 pt-4 text-center">
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Need key reassignment?{" "}
          <a
            href="#it-support"
            className="font-semibold text-secondary hover:underline ml-1"
          >
            Contact Enterprise IT
          </a>
        </p>
      </div>
    </div>
  );
}