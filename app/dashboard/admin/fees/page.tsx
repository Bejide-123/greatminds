import type { Metadata } from "next";
import AdminSectionPage from "@/components/dashboard/AdminSectionPage";
import { requireRole } from "@/lib/auth/guard";

export const metadata: Metadata = {
  title: "Fees & Billing — Greatminds International School",
};

export const instant = false;

export default async function AdminFeesPage() {
  await requireRole("ADMIN");

  return (
    <AdminSectionPage
      title="Fees & Billing"
      description="Billing tools are not available yet."
    >
      <p className="rounded-xl border border-surface-container bg-surface-container-lowest p-space-lg text-on-surface-variant">
        Fee and payment records are not configured in the current school database.
      </p>
    </AdminSectionPage>
  );
}
