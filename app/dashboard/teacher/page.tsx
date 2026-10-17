import type { Metadata } from "next";
import TeacherSidebar from "@/components/dashboard/TeacherSidebar";
import TeacherHeader from "@/components/dashboard/TeacherHeader";
import TeacherWelcomeBanner from "@/components/dashboard/TeacherWelcomeBanner";
import ClassCohortCard from "@/components/dashboard/ClassCohortCard";
import AssessmentPulse from "@/components/dashboard/AssessmentPulse";
import TeacherTasks from "@/components/dashboard/TeacherTasks";
import AttentionQueue from "@/components/dashboard/AttentionQueue";
import TeacherNotices from "@/components/dashboard/TeacherNotices";
import TodaySchedule from "@/components/dashboard/TodaySchedule";
import CurriculumSubjects from "@/components/dashboard/CurriculumSubjects";
import ValidationStrip from "@/components/dashboard/ValidationStrip";

export const metadata: Metadata = {
  title: "Teacher Dashboard — Great Minds Nursery & Primary",
  description:
    "Basic 4 Diamond class teacher portal — assessment ledger, psychomotor ratings, and broadsheet submission.",
};

export default function TeacherDashboardPage() {
  return (
    <>
      <TeacherSidebar />

      <div className="pl-64">
        <TeacherHeader />

        <main className="relative pt-16 bg-background w-full px-gutter-lg pb-space-2xl">
          <div className="flex flex-col w-full gap-space-xl pt-space-xl">
            <TeacherWelcomeBanner />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
              <ClassCohortCard />
              <AssessmentPulse />
            </div>

            <TeacherTasks />
            <AttentionQueue />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
              <TeacherNotices />
              <TodaySchedule />
            </div>

            <CurriculumSubjects />
            <ValidationStrip />
          </div>
        </main>
      </div>
    </>
  );
}