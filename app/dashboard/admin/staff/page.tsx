import type { Metadata } from "next";
import AdminSectionPage from "@/components/dashboard/AdminSectionPage";
import { requireRole } from "@/lib/auth/guard";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Staff — Greatminds International School",
};

export const instant = false;

export default async function AdminStaffPage() {
  await requireRole("ADMIN");
  const teachers = await prisma.teacher.findMany({
    where: { status: "ACTIVE" },
    orderBy: [{ surname: "asc" }, { firstName: "asc" }],
    take: 100,
    select: {
      firstName: true,
      otherName: true,
      surname: true,
      email: true,
      staffId: true,
      schoolClass: { select: { name: true } },
    },
  });

  return (
    <AdminSectionPage
      title="Staff"
      description="Active teacher profiles and assigned classes."
    >
      <div className="overflow-x-auto rounded-xl border border-surface-container bg-surface-container-lowest">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-surface-container-low text-xs uppercase text-on-surface-variant">
            <tr>
              <th className="px-space-lg py-space-md">Teacher</th>
              <th className="px-space-lg py-space-md">Staff ID</th>
              <th className="px-space-lg py-space-md">Email</th>
              <th className="px-space-lg py-space-md">Class</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {teachers.map((teacher) => (
              <tr key={teacher.email}>
                <td className="px-space-lg py-space-md font-semibold">
                  {[teacher.firstName, teacher.otherName, teacher.surname]
                    .filter(Boolean)
                    .join(" ")}
                </td>
                <td className="px-space-lg py-space-md">{teacher.staffId ?? "—"}</td>
                <td className="px-space-lg py-space-md">{teacher.email}</td>
                <td className="px-space-lg py-space-md">{teacher.schoolClass.name}</td>
              </tr>
            ))}
            {teachers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-space-lg py-space-xl text-center text-on-surface-variant">
                  No active teacher records.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminSectionPage>
  );
}
