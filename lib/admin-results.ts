export type AdminResultSubject = {
  id: string;
  subjectName: string;
  subjectCode: string;
  caScore: number | null;
  examScore: number | null;
  totalScore: number | null;
  grade: string | null;
};

export type AdminResultRecord = {
  id: string;
  status: "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "PUBLISHED";
  rejectionReason: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
  updatedAt: string;
  student: {
    id: string;
    name: string;
    admissionNumber: string;
  };
  schoolClass: { id: string; name: string };
  teacher: { id: string; name: string };
  term: { id: string; name: "FIRST" | "SECOND" | "THIRD"; sessionName: string };
  subjects: AdminResultSubject[];
};

export type AdminResultsPayload = {
  results: AdminResultRecord[];
  summary: {
    activeStudents: number;
    activeTeachers: number;
    classes: number;
    pendingResults: number;
    approvedResults: number;
  };
};

export function isAdminResultsPayload(value: unknown): value is AdminResultsPayload {
  if (typeof value !== "object" || value === null) return false;
  const data = value as Record<string, unknown>;
  if (!Array.isArray(data.results) || typeof data.summary !== "object" || data.summary === null) {
    return false;
  }

  const summary = data.summary as Record<string, unknown>;
  return (
    ["activeStudents", "activeTeachers", "classes", "pendingResults", "approvedResults"].every(
      (key) => typeof summary[key] === "number"
    ) &&
    data.results.every(
      (result) =>
        typeof result === "object" &&
        result !== null &&
        typeof result.id === "string" &&
        typeof result.status === "string" &&
        typeof result.student === "object" &&
        result.student !== null &&
        typeof result.schoolClass === "object" &&
        result.schoolClass !== null &&
        typeof result.teacher === "object" &&
        result.teacher !== null &&
        typeof result.term === "object" &&
        result.term !== null &&
        Array.isArray(result.subjects)
    )
  );
}

export function fullName(person: {
  firstName: string;
  otherName: string | null;
  surname: string;
}) {
  return [person.firstName, person.otherName, person.surname]
    .filter(Boolean)
    .join(" ");
}
