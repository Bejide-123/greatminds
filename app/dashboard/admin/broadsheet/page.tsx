"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/components/auth/UserProvider";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import AdminHeader from "@/components/dashboard/AdminHeader";
import BroadsheetToolbar from "@/components/dashboard/broadsheet/BroadsheetToolbar";
import BroadsheetKPIs from "@/components/dashboard/broadsheet/BroadsheetKPIs";
import BroadsheetTable from "@/components/dashboard/broadsheet/BroadsheetTable";
import PupilResultDrawer from "@/components/dashboard/broadsheet/PupilResultDrawer";
import { useBroadsheet } from "@/lib/broadsheet/use-broadsheet";
import type { BroadsheetStudent } from "@/lib/broadsheet/types";

type ClassOption = { id: string; name: string };
type TermOption = {
  id: string;
  name: "FIRST" | "SECOND" | "THIRD";
  sessionName: string;
};

export default function AdminBroadsheetPage() {
  const { user } = useUser();
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [terms, setTerms] = useState<TermOption[]>([]);
  const [classId, setClassId] = useState<string>("");
  const [termId, setTermId] = useState<string>("");
  const [page, setPage] = useState(1);
  const [drawerStudent, setDrawerStudent] = useState<BroadsheetStudent | null>(null);

  const { data, loading, error } = useBroadsheet(
    classId || null,
    termId || null,
    page,
  );

  useEffect(() => {
    // Load classes and terms for dropdowns
    fetch("/api/admin/broadsheet/meta", { cache: "no-store" })
      .then((r) => r.json())
      .then((body) => {
        setClasses(body.classes ?? []);
        setTerms(body.terms ?? []);
        if (body.classes?.[0]) setClassId(body.classes[0].id);
        const current = body.terms?.find((t: TermOption & { isCurrent?: boolean }) => t.isCurrent);
        setTermId(current?.id ?? body.terms?.[0]?.id ?? "");
      })
      .catch(() => {});
  }, []);

  const termLabel = data
    ? `${data.term.name.charAt(0)}${data.term.name.slice(1).toLowerCase()} Term • ${data.term.sessionName}`
    : "";

  function handleExport() {
    if (!data) return;
    // Simple CSV — admin can copy/paste into Excel
    const header = [
      "Rank",
      "Admission No.",
      "Pupil Name",
      ...data.subjects.map((s) => s.code),
      "Aggregate",
      "Average",
      "Position",
      "Tier",
      "Remark",
    ];
    const rows = data.students.map((s) => [
      s.position ?? "",
      s.admissionNumber,
      `${s.surname}, ${s.firstName}`,
      ...s.scores.map((sc) => sc.totalScore ?? ""),
      s.aggregate ?? "",
      s.overallAverage ?? "",
      s.position ?? "",
      s.tier,
      s.teacherRemark ?? "",
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `broadsheet-${data.class.name}-${data.term.name}.csv`;
    link.click();
  }

  function handlePrint() {
    window.print();
  }

  function handlePublish() {
    // TODO: wire up /api/admin/broadsheet/publish
    alert("Publish coming in a future batch — endpoint not built yet.");
  }

  function handleRecalculate() {
    // TODO: wire up /api/admin/broadsheet/recalculate
    alert("Recalculate coming in a future batch — endpoint not built yet.");
  }

  return (
    <>
      <AdminSidebar />

      <div className="pl-64">
        <AdminHeader />

        <main className="relative pt-16 bg-background w-full px-gutter-lg pb-space-2xl">
          <div className="flex flex-col w-full pt-space-xl">
            <BroadsheetToolbar
              data={data}
              termLabel={termLabel}
              onExport={handleExport}
              onPrint={handlePrint}
              onPublish={handlePublish}
              onRecalculate={handleRecalculate}
            />

            {/* Filters */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm mb-space-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-sm">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                  Class
                </label>
                <select
                  value={classId}
                  onChange={(e) => {
                    setClassId(e.target.value);
                    setPage(1);
                  }}
                  className="w-full h-9 bg-surface-container-low text-on-surface rounded-lg px-3 text-sm"
                >
                  {classes.length === 0 && <option>Loading…</option>}
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                  Term
                </label>
                <select
                  value={termId}
                  onChange={(e) => {
                    setTermId(e.target.value);
                    setPage(1);
                  }}
                  className="w-full h-9 bg-surface-container-low text-on-surface rounded-lg px-3 text-sm"
                >
                  {terms.length === 0 && <option>Loading…</option>}
                  {terms.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name.charAt(0) + t.name.slice(1).toLowerCase()} Term •{" "}
                      {t.sessionName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading && (
              <p className="text-sm text-on-surface-variant">Loading broadsheet…</p>
            )}
            {error && (
              <p className="rounded-lg bg-error-container px-space-md py-space-sm text-sm text-on-error-container">
                {error}
              </p>
            )}

            {data && (
              <>
                <BroadsheetKPIs data={data} />
                <BroadsheetTable
                  data={data}
                  onViewPupil={setDrawerStudent}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>
        </main>
      </div>

      <PupilResultDrawer
        student={drawerStudent}
        onClose={() => setDrawerStudent(null)}
      />
    </>
  );
}