export type BroadsheetSubject = {
  id: string;
  code: string;
  name: string;
  sortOrder: number;
};

export type BroadsheetScore = {
  subjectId: string;
  caScore: number | null;
  examScore: number | null;
  totalScore: number | null;
  grade: string | null;
};

export type BroadsheetStudent = {
  id: string;
  admissionNumber: string;
  firstName: string;
  otherName: string | null;
  surname: string;
  sex: "MALE" | "FEMALE";
  position: number | null;
  overallAverage: number | null;
  aggregate: number | null;
  tier: string;
  teacherRemark: string | null;
  status: "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "PUBLISHED";
  scores: BroadsheetScore[];
};

export type SubjectStat = {
  subjectId: string;
  mean: number | null;
  highest: number | null;
  lowest: number | null;
};

export type BroadsheetData = {
  class: { id: string; name: string };
  term: { id: string; name: "FIRST" | "SECOND" | "THIRD"; sessionName: string };
  homeroomTeacher: { firstName: string; surname: string } | null;
  subjects: BroadsheetSubject[];
  students: BroadsheetStudent[];
  stats: {
    pupilCount: number;
    subjectCount: number;
    classAverage: number | null;
    passRate: number;
    distinctionCount: number;
    submittedCount: number;
    approvedCount: number;
    publishedCount: number;
    pendingCount: number;
  };
  subjectStats: SubjectStat[];
  pagination: {
    page: number;
    perPage: number;
    totalPages: number;
    total: number;
  };
};

export function tierForAverage(avg: number | null): string {
  if (avg == null) return "—";
  if (avg >= 85) return "Distinction";
  if (avg >= 75) return "Merit";
  if (avg >= 70) return "Credit B+";
  if (avg >= 60) return "Credit B";
  if (avg >= 50) return "Pass";
  return "Needs Improvement";
}