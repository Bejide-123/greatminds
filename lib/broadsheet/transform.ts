import {
  type BroadsheetData,
  type BroadsheetStudent,
  type BroadsheetScore,
  type SubjectStat,
  tierForAverage,
} from "./types";

type ResultRow = {
  status: BroadsheetStudent["status"];
  overallAverage: { toString(): string } | null;
  classPosition: number | null;
  classSize: number | null;
  teacherRemark: string | null;
  student: {
    id: string;
    admissionNumber: string;
    firstName: string;
    otherName: string | null;
    surname: string;
    sex: "MALE" | "FEMALE";
  };
  subjects: Array<{
    subjectId: string;
    caScore: { toString(): string } | null;
    examScore: { toString(): string } | null;
    totalScore: { toString(): string } | null;
    grade: string | null;
  }>;
};

type Params = {
  classInfo: { id: string; name: string };
  term: { id: string; name: "FIRST" | "SECOND" | "THIRD"; sessionName: string };
  homeroomTeacher: { firstName: string; surname: string } | null;
  subjects: Array<{ id: string; code: string; name: string; sortOrder: number }>;
  results: ResultRow[];
  page: number;
  perPage: number;
  totalCount: number;
};

function num(v: { toString(): string } | null): number | null {
  return v == null ? null : Number(v.toString());
}

export function transformBroadsheet({
  classInfo,
  term,
  homeroomTeacher,
  subjects,
  results,
  page,
  perPage,
  totalCount,
}: Params): BroadsheetData {
  // Sort results by classPosition asc, then surname
  const sorted = [...results].sort((a, b) => {
    const pa = a.classPosition ?? 9999;
    const pb = b.classPosition ?? 9999;
    if (pa !== pb) return pa - pb;
    return a.student.surname.localeCompare(b.student.surname);
  });

  // Build student rows
  const students: BroadsheetStudent[] = sorted.map((r) => {
    const scoreMap = new Map<string, BroadsheetScore>();
    for (const s of r.subjects) {
      scoreMap.set(s.subjectId, {
        subjectId: s.subjectId,
        caScore: num(s.caScore),
        examScore: num(s.examScore),
        totalScore: num(s.totalScore),
        grade: s.grade,
      });
    }

    // Full row — one score entry per active subject (null-filled if missing)
    const scores: BroadsheetScore[] = subjects.map(
      (subj) =>
        scoreMap.get(subj.id) ?? {
          subjectId: subj.id,
          caScore: null,
          examScore: null,
          totalScore: null,
          grade: null,
        },
    );

    // Aggregate = sum of totalScores
    const aggregate = scores.reduce(
      (sum, s) => sum + (s.totalScore ?? 0),
      0,
    );

    const avg = num(r.overallAverage);
    return {
      id: r.student.id,
      admissionNumber: r.student.admissionNumber,
      firstName: r.student.firstName,
      otherName: r.student.otherName,
      surname: r.student.surname,
      sex: r.student.sex,
      position: r.classPosition,
      overallAverage: avg,
      aggregate: scores.every((s) => s.totalScore == null) ? null : aggregate,
      tier: tierForAverage(avg),
      teacherRemark: r.teacherRemark,
      status: r.status,
      scores,
    };
  });

  // Subject-level stats — computed across all pupils on the current page
  // (accurate only if pagination is off; if you want class-wide stats,
  // run a second query that fetches all results with only subject scores)
  const subjectStats: SubjectStat[] = subjects.map((subj) => {
    const totals = students
      .map((s) => s.scores.find((x) => x.subjectId === subj.id)?.totalScore)
      .filter((v): v is number => v != null);
    if (totals.length === 0) {
      return { subjectId: subj.id, mean: null, highest: null, lowest: null };
    }
    const mean = totals.reduce((a, b) => a + b, 0) / totals.length;
    return {
      subjectId: subj.id,
      mean: Math.round(mean * 10) / 10,
      highest: Math.max(...totals),
      lowest: Math.min(...totals),
    };
  });

  // Class KPIs
  const averages = students
    .map((s) => s.overallAverage)
    .filter((v): v is number => v != null);
  const classAverage =
    averages.length > 0
      ? Math.round((averages.reduce((a, b) => a + b, 0) / averages.length) * 10) / 10
      : null;

  const passCount = averages.filter((v) => v >= 50).length;
  const distinctionCount = averages.filter((v) => v >= 85).length;

  const submittedCount = students.filter((s) => s.status === "SUBMITTED").length;
  const approvedCount = students.filter((s) => s.status === "APPROVED").length;
  const publishedCount = students.filter((s) => s.status === "PUBLISHED").length;
  const pendingCount = students.filter(
    (s) => s.status === "DRAFT" || s.status === "UNDER_REVIEW" || s.status === "REJECTED",
  ).length;

  return {
    class: classInfo,
    term,
    homeroomTeacher,
    subjects,
    students,
    stats: {
      pupilCount: totalCount,
      subjectCount: subjects.length,
      classAverage,
      passRate:
        averages.length > 0
          ? Math.round((passCount / averages.length) * 100)
          : 0,
      distinctionCount,
      submittedCount,
      approvedCount,
      publishedCount,
      pendingCount,
    },
    subjectStats,
    pagination: {
      page,
      perPage,
      totalPages: Math.max(1, Math.ceil(totalCount / perPage)),
      total: totalCount,
    },
  };
}