import type { Metadata } from "next";
import AdminSectionPage from "@/components/dashboard/AdminSectionPage";
import { requireRole } from "@/lib/auth/guard";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Students — Greatminds International School",
};

export const instant = false;

export default async function AdminStudentsPage() {
  await requireRole("ADMIN");
  const students = await prisma.student.findMany({
    where: { status: "ACTIVE" },
    orderBy: [{ schoolClass: { sortOrder: "asc" } }, { surname: "asc" }],
    take: 100,
    select: {
      firstName: true,
      otherName: true,
      surname: true,
      admissionNumber: true,
      schoolClass: { select: { name: true } },
    },
  });

  return (
    <AdminSectionPage
      title="Students"
      description="Active student profiles from the school database."
    >
      <div className="overflow-x-auto rounded-xl border border-surface-container bg-surface-container-lowest">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="bg-surface-container-low text-xs uppercase text-on-surface-variant">
            <tr>
              <th className="px-space-lg py-space-md">Student</th>
              <th className="px-space-lg py-space-md">Admission number</th>
              <th className="px-space-lg py-space-md">Class</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {students.map((student) => (
              <tr key={student.admissionNumber}>
                <td className="px-space-lg py-space-md font-semibold">
                  {[student.firstName, student.otherName, student.surname]
                    .filter(Boolean)
                    .join(" ")}
                </td>
                <td className="px-space-lg py-space-md font-mono text-primary">
                  {student.admissionNumber}
                </td>
                <td className="px-space-lg py-space-md">{student.schoolClass.name}</td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={3} className="px-space-lg py-space-xl text-center text-on-surface-variant">
                  No active student records.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {students.length === 100 && (
          <p className="border-t border-surface-container px-space-lg py-space-sm text-xs text-on-surface-variant">
            Showing the first 100 students.
          </p>
        )}
      </div>
    </AdminSectionPage>
  );
}
