export type StudentResultSubject = {
  id: string;
  subjectName: string;
  subjectCode: string;
  caScore: number;
  examScore: number;
  totalScore: number;
  grade: string | null;
  remark: string | null;
};

export type StudentResultRecord = {
  id: string;
  status:
    | "DRAFT"
    | "SUBMITTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "REJECTED"
    | "PUBLISHED";
  term: {
    id: string;
    name: "FIRST" | "SECOND" | "THIRD";
    sessionName: string;
    isCurrent: boolean;
    sessionIsCurrent: boolean;
  };
  teacherRemark: string;
  headTeacherRemark: string;
  teacherName: string;
  schoolClass: string;
  reviewedAt: string | null;
  subjects: StudentResultSubject[];
};

export type StudentResultsPayload = {
  student: {
    name: string;
    admissionNumber: string;
    className: string;
  };
  results: StudentResultRecord[];
};

export function isStudentResultsPayload(
  value: unknown,
): value is StudentResultsPayload {
  if (typeof value !== "object" || value === null) return false;

  const payload = value as Record<string, unknown>;
  if (
    typeof payload.student !== "object" ||
    payload.student === null ||
    !Array.isArray(payload.results)
  ) {
    return false;
  }

  const student = payload.student as Record<string, unknown>;
  return (
    typeof student.name === "string" &&
    typeof student.admissionNumber === "string" &&
    typeof student.className === "string" &&
    payload.results.every(
      (result) =>
        typeof result === "object" &&
        result !== null &&
        typeof result.id === "string" &&
        typeof result.status === "string" &&
        typeof result.term === "object" &&
        result.term !== null &&
        Array.isArray(result.subjects),
    )
  );
}

export function studentResultIsApproved(result: StudentResultRecord) {
  return result.status === "APPROVED" || result.status === "PUBLISHED";
}

export function termDisplayName(term: StudentResultRecord["term"]) {
  const termName = term.name.charAt(0) + term.name.slice(1).toLowerCase();
  return `${termName} Term ${term.sessionName}`;
}
