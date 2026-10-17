import type { Metadata } from "next";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import AdminHeader from "@/components/dashboard/AdminHeader";
import AdminWelcome from "@/components/dashboard/AdminWelcome";
import AdminDashboardData from "@/components/dashboard/AdminDashboardData";
import AdminModules from "@/components/dashboard/AdminModules";

export const metadata: Metadata = {
  title: "Administrator Dashboard — Greatminds International School",
  description:
    "School-wide administrator portal — enrollment metrics, results approval, and system modules.",
};

export default function AdminDashboardPage() {
  return (
    <>
      <AdminSidebar />

      <div className="pl-64">
        <AdminHeader />

        <main className="relative pt-16 bg-background w-full px-gutter-lg pb-space-2xl">
          <div className="flex flex-col w-full max-w-7xl mx-auto pt-space-xl gap-space-xl">
            <AdminWelcome />
            <AdminDashboardData />
            <AdminModules />
          </div>
        </main>
      </div>
    </>
  );
}
