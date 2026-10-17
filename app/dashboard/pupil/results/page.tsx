import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StudentResultsPortal from "@/components/dashboard/StudentResultsPortal";

export const metadata: Metadata = {
  title: "Terminal Report Sheet — Greatminds International School",
  description:
    "",
};

export default function ResultsPage() {
  return (
    <>
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="relative min-h-screen bg-background px-gutter-lg pb-space-2xl pt-16">
          <StudentResultsPortal />
        </main>
      </div>
    </>
  );
}
