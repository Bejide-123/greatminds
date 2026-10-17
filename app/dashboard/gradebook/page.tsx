import type { Metadata } from "next";
import TeacherGradebook from "@/components/dashboard/TeacherGradebook";
import TeacherSectionPage from "@/components/dashboard/TeacherSectionPage";

export const metadata: Metadata = {
  title: "Class Gradebook — Great Minds Nursery & Primary",
  description: "Enter and review class assessment results.",
};

export default function GradebookPage() {
  return (
    <TeacherSectionPage
      title="Class Gradebook"
      description="Review pupil progress and enter continuous assessment and examination results."
    >
      <TeacherGradebook />
    </TeacherSectionPage>
  );
}
