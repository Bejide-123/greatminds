import { ShieldCheck } from "lucide-react";
import { studentName, type GradebookStudent } from "@/lib/gradebook-api";

type PupilBiodataCardProps = {
  pupil: GradebookStudent;
  className: string;
};

export default function PupilBiodataCard({
  pupil,
  className,
}: PupilBiodataCardProps) {
  const dateOfBirth = new Date(pupil.dateOfBirth);
  const age = Math.floor(
    (Date.now() - dateOfBirth.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container-high/60">
      <div className="flex flex-col gap-space-lg border-b border-surface-container pb-space-md md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-space-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-container/20 text-xl font-bold text-primary ring-4 ring-primary/20">
            {pupil.firstName[0]}
            {pupil.surname[0]}
          </div>

          <div className="flex min-w-0 flex-col">
            <h3 className="truncate font-headline-sm text-headline-sm font-bold text-on-surface">
              {studentName(pupil)}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-sm text-on-surface-variant">
              <span>
                Admission No:{" "}
                <strong className="font-mono text-primary">
                  {pupil.admissionNumber}
                </strong>
              </span>
              <span>•</span>
              <span>
                Class: <strong className="text-on-surface">{className}</strong>
              </span>
              <span>•</span>
              <span>
                Age:{" "}
                <strong className="text-on-surface">
                  {Number.isFinite(age) && age >= 0 ? `${age} years` : "—"}
                </strong>
              </span>
              <span>•</span>
              <span>
                Gender:{" "}
                <strong className="text-on-surface">
                  {pupil.sex === "FEMALE" ? "Female" : "Male"}
                </strong>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-space-xs self-start md:self-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-tertiary-container/20 px-space-md py-1.5 font-label-md text-label-md font-bold text-on-tertiary-container">
            <ShieldCheck className="h-[18px] w-[18px]" />
            Active Student
          </span>
        </div>
      </div>
    </div>
  );
}
