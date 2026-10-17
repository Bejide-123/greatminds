import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import WelcomeHero from "@/components/dashboard/WelcomeHero";
import TerminalSpotlight from "@/components/dashboard/TerminalSpotlight";
import DailySchedule from "@/components/dashboard/DailySchedule";
import HomeworkLog from "@/components/dashboard/HomeworkLog";
import SchoolBulletins from "@/components/dashboard/SchoolBulletins";
import TermCalendar from "@/components/dashboard/TermCalendar";

export const metadata: Metadata = {
  title: "Pupil Dashboard — Great Minds Nursery & Primary",
  description:
    "Basic 4 Diamond pupil portal — terminal results, schedule, homework, and school bulletins.",
};

export default function PupilDashboardPage() {
  return (
    <>
      <Sidebar />

      <div className="pl-64">
        <Header />

        <main className="relative pt-16 bg-background w-full px-gutter-lg pb-space-2xl">
          <div className="flex flex-col w-full pt-space-xl">
            <WelcomeHero />
            <TerminalSpotlight />

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-xl">
              <DailySchedule />
              <HomeworkLog />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-2xl">
              <SchoolBulletins />
              <TermCalendar />
            </section>
          </div>
        </main>
      </div>
    </>
  );
}