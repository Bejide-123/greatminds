import Image from "next/image";
import { BadgeCheck, GraduationCap } from "lucide-react";
import type { UserInfo } from "@/lib/auth/user-info";
import type { PupilProfile } from "@/lib/pupils/profile-types";

type Props = {
  user: UserInfo | null;
  profile: PupilProfile | null;
};

export default function ProfileHeroCard({ user, profile }: Props) {
  const displayName = user?.displayName ?? "—";
  const className = user?.className ?? profile?.schoolClass.name ?? "—";
  const admissionNo = user?.admissionNumber ?? profile?.admissionNumber ?? "—";
  const photo = profile?.photoUrl ?? null;

  const dob = profile?.dateOfBirth
    ? new Date(profile.dateOfBirth).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-space-lg mb-space-lg shadow-sm">
      <div className="flex flex-col md:flex-row gap-space-lg items-start">
        {/* Avatar */}
        <div className="relative shrink-0">
          {photo ? (
            <Image
              src={photo}
              alt={displayName}
              width={144}
              height={192}
              className="aspect-[3/4] rounded-xl w-36 h-48 object-cover border-2 border-primary/20 shadow"
            />
          ) : (
            <div className="aspect-[3/4] rounded-xl w-36 h-48 bg-surface-container border-2 border-primary/20 shadow flex items-center justify-center text-4xl font-bold text-primary/60">
              {displayName
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </div>
          )}
          <span className="absolute -bottom-2 -right-2 bg-tertiary text-tertiary-fixed rounded-full p-1 border-2 border-white flex items-center justify-center shadow">
            <BadgeCheck className="w-[18px] h-[18px]" />
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1 gap-space-sm">
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight">
              {displayName}
            </h1>
            <p className="text-sm font-semibold text-secondary flex items-center gap-1.5 mt-0.5">
              <GraduationCap className="w-4 h-4" />
              {className}
              {admissionNo !== "—" && (
                <span className="text-on-surface-variant font-medium">
                  • {admissionNo}
                </span>
              )}
            </p>
          </div>

          {/* Small metadata strip — only real fields */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm pt-space-sm border-t border-outline-variant/40 text-xs">
            <div>
              <span className="text-on-surface-variant block font-medium">
                Date of Birth
              </span>
              <span className="font-bold text-on-surface">
                {dob ?? "Not on file"}
              </span>
            </div>
            <div>
              <span className="text-on-surface-variant block font-medium">
                Sex
              </span>
              <span className="font-bold text-on-surface">
                {profile?.sex === "MALE"
                  ? "Male"
                  : profile?.sex === "FEMALE"
                  ? "Female"
                  : "Not on file"}
              </span>
            </div>
            <div>
              <span className="text-on-surface-variant block font-medium">
                Status
              </span>
              <span className="font-bold text-on-surface">
                {profile?.status
                  ? profile.status.charAt(0) + profile.status.slice(1).toLowerCase()
                  : "Active"}
              </span>
            </div>
            <div>
              <span className="text-on-surface-variant block font-medium">
                Homeroom Tutor
              </span>
              <span className="font-bold text-primary">
                {profile?.homeroomTeacher
                  ? `${profile.homeroomTeacher.firstName} ${profile.homeroomTeacher.surname}`
                  : "—"}
              </span>
            </div>
            <div>
              <span className="text-on-surface-variant block font-medium">
                Admission No.
              </span>
              <span className="font-bold text-on-surface">{admissionNo}</span>
            </div>
            <div>
              <span className="text-on-surface-variant block font-medium">
                Class
              </span>
              <span className="font-bold text-on-surface">{className}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}