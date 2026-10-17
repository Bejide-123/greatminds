import type { Metadata } from "next";
import AttentionQueue from "@/components/dashboard/AttentionQueue";
import ClassCohortCard from "@/components/dashboard/ClassCohortCard";
import TeacherSectionPage from "@/components/dashboard/TeacherSectionPage";

export const metadata: Metadata = {
  title: "Attendance — Great Minds Nursery & Primary",
  description: "Review class attendance and pupil follow-up items.",
};

export default function AttendancePage() {
  return (
    <TeacherSectionPage
      title="Attendance"
      description="Review class attendance and follow up on pupils who need support."
    >
      <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-12">
        <ClassCohortCard />
        <AttentionQueue />
      </div>
    </TeacherSectionPage>
  );
}
