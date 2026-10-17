import type { Metadata } from "next";
import TodaySchedule from "@/components/dashboard/TodaySchedule";
import TeacherSectionPage from "@/components/dashboard/TeacherSectionPage";

export const metadata: Metadata = {
  title: "Timetable — Great Minds Nursery & Primary",
  description: "Review the daily class timetable and lesson schedule.",
};

export default function TimetablePage() {
  return (
    <TeacherSectionPage
      title="Timetable"
      description="Review the class lesson schedule and upcoming periods."
    >
      <TodaySchedule />
    </TeacherSectionPage>
  );
}
