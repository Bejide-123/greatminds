import { Download, IdCard } from "lucide-react";
import type { UserInfo } from "@/lib/auth/user-info";

type Props = {
  user: UserInfo | null;
};

export default function ProfileDossierHeader({ user }: Props) {
  return (
    <div className="flex flex-wrap justify-between items-center gap-space-md p-space-md bg-surface-container-low rounded-xl mb-space-md border border-outline-variant/50">
      <div className="flex min-w-72 flex-col gap-1">
        <div className="flex items-center gap-space-sm">
          <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-secondary-fixed text-on-secondary-fixed">
            {user?.className ?? "—"}
          </span>
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-tertiary-fixed text-on-tertiary-fixed flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-fixed" />
            Active Enrollment
          </span>
        </div>
        <p className="text-on-surface text-3xl font-black leading-tight tracking-tight">
          Pupil Profile Dossier
        </p>
        <p className="text-on-surface-variant text-body-sm">
          Admission No:{" "}
          <span className="font-semibold text-primary">
            {user?.admissionNumber ?? "—"}
          </span>
        </p>
      </div>

      <div className="flex flex-wrap gap-space-sm">
        <button
          type="button"
          className="flex items-center gap-2 rounded h-10 px-4 bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-bold transition border border-outline-variant/30"
        >
          <Download className="w-4 h-4" />
          <span>Download Pupil Dossier (PDF)</span>
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary-container transition shadow-sm"
        >
          <IdCard className="w-4 h-4" />
          <span>Print ID Card / Badge</span>
        </button>
      </div>
    </div>
  );
}