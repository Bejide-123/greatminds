import { BIODATA } from "@/lib/results-data";
import { useStudentResult } from "@/components/dashboard/StudentResultContext";

export default function BiodataStrip() {
  const { data } = useStudentResult();
  const biodata = BIODATA.map((item) => {
    if (item.label === "Pupil's Full Name") {
      return { ...item, value: data.student.name };
    }
    if (item.label === "Admission No.") {
      return { ...item, value: data.student.admissionNumber };
    }
    if (item.label === "Class / Arm") {
      return { ...item, value: data.student.className };
    }
    if (item.label === "Class Size") {
      return { ...item, value: "—" };
    }
    return { ...item, value: "—" };
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-space-xs bg-surface-container p-space-xs rounded-xl">
      {biodata.map((item) => (
        <div
          key={item.label}
          className="bg-surface-container-lowest p-space-sm rounded-lg flex flex-col"
        >
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
            {item.label}
          </span>
          {item.dotColor ? (
            <div className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${item.dotColor}`} />
              <span className="font-headline-sm text-body-sm text-on-surface font-medium">
                {item.value}
              </span>
            </div>
          ) : (
            <span
              className={`font-headline-sm text-body-sm truncate ${
                item.valueClass ?? "text-on-surface"
              }`}
              title={item.value}
            >
              {item.value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}