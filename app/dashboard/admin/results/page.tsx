import type { Metadata } from "next";
import AdminHeader from "@/components/dashboard/AdminHeader";
import AdminResultsReview from "@/components/dashboard/AdminResultsReview";
import AdminSidebar from "@/components/dashboard/AdminSidebar";

export const metadata: Metadata = {
  title: "Results Review — Greatminds International School",
  description: "Review and approve submitted student results.",
};

export default function AdminResultsPage() {
  return (
    <>
      <AdminSidebar />
      <div className="pl-64">
        <AdminHeader />
        <main className="relative min-h-screen bg-background px-gutter-lg pb-space-2xl pt-20">
          <AdminResultsReview />
        </main>
      </div>
    </>
  );
}
