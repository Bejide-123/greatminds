import type { Metadata } from "next";
import HomeworkLog from "@/components/dashboard/HomeworkLog";
import TeacherSectionPage from "@/components/dashboard/TeacherSectionPage";

export const metadata: Metadata = {
  title: "Homework & Tasks — Great Minds Nursery & Primary",
  description: "Review classroom homework and learning tasks.",
};

export default function HomeworkPage() {
  return (
    <TeacherSectionPage
      title="Homework & Tasks"
      description="Review current learning tasks and homework assigned to pupils."
    >
      <HomeworkLog />
    </TeacherSectionPage>
  );
}
