import { BookOpen } from "lucide-react";
import { SUBJECTS } from "@/lib/results-data";
import { useStudentResult } from "@/components/dashboard/StudentResultContext";
import { computeGrade } from "@/lib/gradebook-data";

export default function SubjectLedger() {
  const { selectedResult } = useStudentResult();
  const subjects = selectedResult?.subjects ?? [];
  const caTotal = subjects.reduce((sum, subject) => sum + subject.caScore, 0);
  const examTotal = subjects.reduce(
    (sum, subject) => sum + subject.examScore,
    0
  );
  const aggregate = subjects.reduce(
    (sum, subject) => sum + subject.totalScore,
    0
  );
  const aggregateGrade =
    subjects.length > 0
      ? computeGrade(aggregate / subjects.length).grade
      : "—";

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm gap-1">
        <div className="flex items-center gap-space-xs">
          <BookOpen className="text-primary w-5 h-5" />
          <h2 className="font-headline-md text-headline-sm text-primary tracking-tight">
            Academic Performance Ledger (Cambridge &amp; National Primary
            Curriculum)
          </h2>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant">
          Continuous Assessment (40) + Terminal Exam (60) = 100 Marks
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm bg-surface-container-lowest border border-surface-container">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-surface-container font-label-md text-label-sm text-primary">
              <th className="py-3 px-space-md font-bold">Subject Title</th>
              <th className="py-3 px-space-sm text-center font-semibold">
                Continuous Assessment
                <br />
                <span className="text-outline font-normal text-[10px]">[40]</span>
              </th>
              <th className="py-3 px-space-sm text-center font-semibold">
                Terminal Exam
                <br />
                <span className="text-outline font-normal text-[10px]">[60]</span>
              </th>
              <th className="py-3 px-space-md text-center font-bold bg-primary text-on-primary">
                Total Score
                <br />
                <span className="text-primary-fixed text-[10px]">[100%]</span>
              </th>
              <th className="py-3 px-space-sm text-center font-bold">Grade</th>
              <th className="py-3 px-space-sm text-center font-semibold">Class Avg</th>
              <th className="py-3 px-space-sm text-center font-semibold">Position</th>
              {/* <th className="py-3 px-space-md font-semibold">Teacher Developmental Remarks</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container text-on-surface font-body-sm text-body-sm">
            {subjects.map((subject) => {
              const details = SUBJECTS.find((item) => item.name === subject.subjectName);
              return (
              <tr key={subject.id} className="hover:bg-surface-container-low transition-colors">
                <td className="py-2.5 px-space-md font-semibold text-primary">
                  <div className="flex flex-col">
                    <span>{subject.subjectName}</span>
                    <span className="text-[11px] text-outline font-normal">
                      {details?.subtitle ?? subject.subjectCode}
                    </span>
                  </div>
                </td>
                <td className="py-2.5 px-space-sm text-center font-tabular-data">{subject.caScore}</td>
                <td className="py-2.5 px-space-sm text-center font-tabular-data">{subject.examScore}</td>
                <td className="py-2.5 px-space-md text-center font-tabular-data font-bold text-primary bg-surface-container-low">
                  {subject.totalScore}
                </td>
                <td className="py-2.5 px-space-sm text-center">
                  <span className="inline-flex px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-headline-sm text-label-sm font-bold">
                    {subject.grade ?? "—"}
                  </span>
                </td>
                <td className="py-2.5 px-space-sm text-center font-tabular-data text-outline">
                  —
                </td>
                <td className="py-2.5 px-space-sm text-center font-tabular-data font-medium">
                  —
                </td>
              </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-surface-container font-title-md text-body-sm text-primary">
              <td className="py-3 px-space-md font-bold uppercase tracking-wide">
                Aggregate Total ({subjects.length} Subjects)
              </td>
              <td className="py-3 px-space-sm text-center font-tabular-data font-bold">
                {caTotal} / {subjects.length * 40}
              </td>
              <td className="py-3 px-space-sm text-center font-tabular-data font-bold">
                {examTotal} / {subjects.length * 60}
              </td>
              <td className="py-3 px-space-md text-center font-tabular-data font-bold bg-primary text-on-primary">
                {aggregate} / {subjects.length * 100}
              </td>
              <td className="py-3 px-space-sm text-center font-bold text-secondary-container">
                {aggregateGrade}
              </td>
              <td className="py-3 px-space-sm text-center font-tabular-data text-outline">
                —
              </td>
              <td className="py-3 px-space-sm text-center font-bold text-secondary-container">
                —
              </td>
              {/* <td className="py-3 px-space-md font-label-md text-label-sm text-on-surface-variant">
                —
              </td> */}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}