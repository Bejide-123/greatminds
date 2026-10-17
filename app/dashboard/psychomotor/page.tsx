import type { Metadata } from "next";
import PsychomotorGrid from "@/components/dashboard/PsychomotorGrid";
import TeacherSectionPage from "@/components/dashboard/TeacherSectionPage";

export const metadata: Metadata = {
  title: "Psychomotor & Traits — Great Minds Nursery & Primary",
  description: "Review pupil affective and psychomotor development ratings.",
};

export default function PsychomotorPage() {
  return (
    <TeacherSectionPage
      title="Psychomotor & Traits"
      description="Review affective and psychomotor development ratings for the class."
    >
      <PsychomotorGrid />
    </TeacherSectionPage>
  );
}
