import Link from "next/link";
import type { AdminResultRecord } from "@/lib/admin-results";

function displayDate(date: string | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function statusLabel(status: AdminResultRecord["status"]) {
  if (status === "APPROVED" || status === "PUBLISHED") return "Approved";
  if (status === "UNDER_REVIEW") return "Under review";
  if (status === "REJECTED") return "Returned";
  return "Pending review";
}

export default function RecentSubmissions({
  results,
}: {
  results: AdminResultRecord[];
}) {
  return (
    <div className="mt-space-lg">
      <h3 className="mb-space-md font-title-md text-title-md font-bold text-on-surface">
        Recent Submissions
      </h3>
      <div className="overflow-x-auto rounded-lg border border-surface-container">
        <table className="w-full min-w-[900px] text-left font-body-sm text-body-sm">
          <thead className="bg-surface-container-low font-label-md text-label-md text-on-surface-variant">
            <tr>
              <th className="px-space-lg py-space-md font-semibold">Student</th>
              <th className="px-space-lg py-space-md font-semibold">Class</th>
              <th className="px-space-lg py-space-md font-semibold">Teacher</th>
              <th className="px-space-lg py-space-md font-semibold">Term</th>
              <th className="px-space-lg py-space-md font-semibold">Submitted</th>
              <th className="px-space-lg py-space-md font-semibold">Status</th>
              <th className="px-space-lg py-space-md text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {results.map((result) => {
              const waiting =
                result.status === "SUBMITTED" ||
                result.status === "UNDER_REVIEW";
              return (
                <tr key={result.id} className="transition-colors hover:bg-surface-container-low/50">
                  <td className="px-space-lg py-space-md">
                    <span className="block font-semibold text-primary">
                      {result.student.name}
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      {result.student.admissionNumber}
                    </span>
                  </td>
                  <td className="px-space-lg py-space-md text-on-surface">
                    {result.schoolClass.name}
                  </td>
                  <td className="px-space-lg py-space-md text-on-surface-variant">
                    {result.teacher.name}
                  </td>
                  <td className="px-space-lg py-space-md text-on-surface-variant">
                    {result.term.name.charAt(0)}
                    {result.term.name.slice(1).toLowerCase()} •{" "}
                    {result.term.sessionName}
                  </td>
                  <td className="px-space-lg py-space-md text-on-surface-variant">
                    {displayDate(result.submittedAt)}
                  </td>
                  <td className="px-space-lg py-space-md">
                    <span
                      className={`inline-flex items-center gap-1 rounded px-space-sm py-1 font-label-sm text-label-sm font-bold ${
                        waiting
                          ? "bg-secondary-fixed text-on-secondary-fixed"
                          : "bg-tertiary-container text-on-tertiary-container"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {statusLabel(result.status)}
                    </span>
                  </td>
                  <td className="px-space-lg py-space-md text-right">
                    <Link
                      href={`/dashboard/admin/results?result=${encodeURIComponent(result.id)}`}
                      className="inline-flex rounded-lg bg-secondary-container px-space-md py-1.5 font-label-md text-label-md font-bold text-on-secondary shadow-sm transition-colors hover:bg-secondary"
                    >
                      {waiting ? "Review" : "View"}
                    </Link>
                  </td>
                </tr>
              );
            })}
            {results.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-space-lg py-space-xl text-center text-on-surface-variant"
                >
                  No results have been submitted for review yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
