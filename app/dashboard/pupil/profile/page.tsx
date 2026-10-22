"use client";

import { useUser } from "@/components/auth/UserProvider";
import { usePupilProfile } from "@/lib/pupils/use-pupil-profile";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import ProfileDossierHeader from "@/components/dashboard/profile/ProfileDossierHeader";
import ProfileHeroCard from "@/components/dashboard/profile/ProfileHeroCard";
import ProfileTabNav from "@/components/dashboard/profile/ProfileTabNav";
import AcademicPerformanceCard from "@/components/dashboard/profile/AcademicPerformanceCard";
import PsychomotorCard from "@/components/dashboard/profile/PsychomotorCard";
import TeacherNoteCard from "@/components/dashboard/profile/TeacherNoteCard";
import GuardiansCard from "@/components/dashboard/profile/GuardiansCard";

export default function PupilProfilePage() {
  const { user } = useUser();
  const { profile, loading, error } = usePupilProfile(user?.id ?? null, {
    self: true,
  });

  const teacherName = profile?.homeroomTeacher
    ? `${profile.homeroomTeacher.firstName} ${profile.homeroomTeacher.surname}`
    : null;

  return (
    <>
      <Sidebar />

      <div className="pl-64">
        <Header />

        <main className="relative pt-16 bg-background w-full px-gutter-lg pb-space-2xl">
          <div className="flex flex-col w-full max-w-7xl mx-auto pt-space-xl">
            <ProfileDossierHeader user={user} />
            <ProfileHeroCard user={user} profile={profile} />
            <ProfileTabNav />

            {loading && (
              <p className="text-sm text-on-surface-variant py-space-md">
                Loading pupil profile…
              </p>
            )}
            {error && (
              <p
                className="rounded-lg bg-error-container px-space-md py-space-sm text-sm text-on-error-container"
                role="alert"
              >
                {error}
              </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
              <div className="lg:col-span-8 flex flex-col gap-space-lg">
                <AcademicPerformanceCard result={profile?.currentResult ?? null} />
                <PsychomotorCard
                  psychomotor={profile?.currentResult?.psychomotor ?? null}
                />
              </div>

              <div className="lg:col-span-4 flex flex-col gap-space-lg">
                <TeacherNoteCard
                  result={profile?.currentResult ?? null}
                  teacherName={teacherName}
                />
                <GuardiansCard guardian={profile?.guardian ?? null} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}