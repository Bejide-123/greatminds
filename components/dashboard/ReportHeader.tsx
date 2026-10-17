import Image from "next/image";
import { CREST } from "@/lib/results-data";
import { useStudentResult } from "@/components/dashboard/StudentResultContext";

export default function ReportHeader() {
  const { selectedResult } = useStudentResult();
  const dateIssued = selectedResult?.reviewedAt
    ? new Date(selectedResult.reviewedAt).toLocaleDateString()
    : "—";

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-space-lg bg-surface-container-low p-space-lg rounded-xl border border-surface-container-high/60">
      <div className="flex items-center gap-space-lg">
        <div className="w-24 h-24 bg-surface-container-lowest rounded-xl shadow-sm p-2 flex items-center justify-center shrink-0 border border-surface-container">
          <Image
            src={CREST}
            alt="Great Minds Nursery & Primary School Crest"
            width={96}
            height={96}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-headline-xl text-headline-lg text-primary tracking-tight">
            GREATMINDS INTERNATIONAL SCHOOL
          </span>
          <span className="font-title-md text-secondary-container italic text-body-sm tracking-wide">
            &ldquo;Teaching To Dominate&rdquo;
          </span>
          <span className="font-body-sm text-on-surface-variant text-label-sm mt-0.5">
          17, Olarenwaju Oladunjoye street, off Ilo-Awela RD, Ota, Ogun State, Nigeria
          </span>
          <span className="font-body-sm text-outline text-label-sm">
            Tel: +234 8028010867 / +234 802319338 | Web: www.greatmindsschool.edu.ng | Primary
            Department
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end text-right shrink-0">
        <div className="bg-primary text-on-primary px-space-md py-1.5 rounded-lg font-headline-sm text-label-md tracking-wider uppercase mb-1 shadow-sm">
          Primary Terminal Assessment Report Sheet
        </div>
        <span className="font-label-md text-label-sm text-on-surface-variant font-semibold">
          CAMBRIDGE PRIMARY &amp; NIGERIAN NATIONAL CURRICULUM
        </span>
        <span className="font-tabular-data text-tabular-data text-primary-container">
          Date Issued: {dateIssued}
        </span>
      </div>
    </div>
  );
}