export type GradebookSubject = {
  id: string;
  code: string;
  name: string;
  sortOrder: number;
};

export type GradebookScore = {
  subjectId: string;
  caScore: number | null;
  examScore: number | null;
  totalScore: number | null;
  grade: string | null;
};

/* ──────────────────────────────────────────────────────────────
   Psychomotor
   ────────────────────────────────────────────────────────────── */

export type PsychomotorTrait = {
  key: string;
  label: string;
  wide?: boolean;
};

export type PsychomotorRatings = Record<string, number | null>;

/**
 * Canonical 9 traits. The `key` is the stable identifier used in
 * API payloads and stored in the database. Do NOT change keys once
 * shipped — only labels may be updated.
 */
export const PSYCHOMOTOR_TRAITS: PsychomotorTrait[] = [
  { key: "handwriting",   label: "Handwriting & Neatness" },
  { key: "punctuality",   label: "Punctuality & Attendance" },
  { key: "attentiveness", label: "Attentiveness & Participation" },
  { key: "politeness",    label: "Politeness, Empathy & Honesty" },
  { key: "teamwork",      label: "Teamwork & Social Play" },
  { key: "curiosity",     label: "Curiosity & Independent Thinking" },
  { key: "materials",     label: "Handling Materials & Care of Books" },
  { key: "sports",        label: "Sports, Motor Skills & Agility" },
  { key: "music",         label: "Music & Creative Arts Expression", wide: true },
];

export const PSYCHOMOTOR_KEYS = PSYCHOMOTOR_TRAITS.map((t) => t.key);

export const EMPTY_PSYCHOMOTOR: PsychomotorRatings = Object.fromEntries(
  PSYCHOMOTOR_KEYS.map((key) => [key, null]),
);

/**
 * Coerce unknown input (API payload, DB row, …) into a fully-shaped
 * PsychomotorRatings object. Missing/invalid values become `null`.
 */
export function normalisePsychomotor(input: unknown): PsychomotorRatings {
  const out: PsychomotorRatings = Object.fromEntries(
    PSYCHOMOTOR_KEYS.map((key) => [key, null]),
  );
  if (!input || typeof input !== "object") return out;

  const record = input as Record<string, unknown>;
  for (const key of PSYCHOMOTOR_KEYS) {
    const raw = record[key];
    out[key] =
      typeof raw === "number" && Number.isInteger(raw) && raw >= 1 && raw <= 5
        ? raw
        : null;
  }
  return out;
}

export function developmentalScore(ratings: PsychomotorRatings) {
  const values = PSYCHOMOTOR_KEYS.map((key) => ratings[key]).filter(
    (v): v is number => typeof v === "number",
  );
  const earned = values.reduce((sum, v) => sum + v, 0);
  const max = PSYCHOMOTOR_KEYS.length * 5;
  const pct = max > 0 ? Math.round((earned / max) * 1000) / 10 : 0;
  return {
    earned,
    max,
    pct,
    filled: values.length,
    total: PSYCHOMOTOR_KEYS.length,
  };
}

/* ──────────────────────────────────────────────────────────────
   Gradebook
   ────────────────────────────────────────────────────────────── */

export type GradebookStudent = {
  id: string;
  firstName: string;
  otherName: string | null;
  surname: string;
  admissionNumber: string;
  sex: "MALE" | "FEMALE";
  dateOfBirth: string;
  status: string | null;
  teacherRemark?: string | null;
  headTeacherRemark?: string | null;
  rejectionReason?: string | null;
  scores: GradebookScore[];
  psychomotor?: PsychomotorRatings | null; // ← NEW
};

export type GradebookData = {
  class: { id: string; name: string };
  term: { id: string; name: "FIRST" | "SECOND" | "THIRD"; sessionName: string };
  subjects: GradebookSubject[];
  students: GradebookStudent[];
};

export function isGradebookData(value: unknown): value is GradebookData {
  if (typeof value !== "object" || value === null) return false;
  const data = value as Record<string, unknown>;
  if (
    typeof data.class !== "object" ||
    data.class === null ||
    typeof data.term !== "object" ||
    data.term === null ||
    !Array.isArray(data.subjects) ||
    !Array.isArray(data.students)
  ) {
    return false;
  }

  const classInfo = data.class as Record<string, unknown>;
  const term = data.term as Record<string, unknown>;
  return (
    typeof classInfo.id === "string" &&
    typeof classInfo.name === "string" &&
    typeof term.id === "string" &&
    (term.name === "FIRST" || term.name === "SECOND" || term.name === "THIRD") &&
    typeof term.sessionName === "string" &&
    data.subjects.every(
      (subject) =>
        typeof subject === "object" &&
        subject !== null &&
        typeof subject.id === "string" &&
        typeof subject.code === "string" &&
        typeof subject.name === "string" &&
        typeof subject.sortOrder === "number"
    ) &&
    data.students.every((student) => {
      if (typeof student !== "object" || student === null) return false;
      const s = student as Record<string, unknown>;
      if (
        typeof s.id !== "string" ||
        typeof s.firstName !== "string" ||
        (typeof s.otherName !== "string" && s.otherName !== null) ||
        typeof s.surname !== "string" ||
        typeof s.admissionNumber !== "string" ||
        (s.sex !== "MALE" && s.sex !== "FEMALE") ||
        typeof s.dateOfBirth !== "string" ||
        (typeof s.status !== "string" && s.status !== null) ||
        !Array.isArray(s.scores)
      ) {
        return false;
      }
      if (
        !s.scores.every(
          (score: unknown) =>
            typeof score === "object" &&
            score !== null &&
            typeof (score as Record<string, unknown>).subjectId === "string"
        )
      ) {
        return false;
      }
      // psychomotor is optional at the wire level; if present it must be an object
      if (
        s.psychomotor !== undefined &&
        s.psychomotor !== null &&
        typeof s.psychomotor !== "object"
      ) {
        return false;
      }
      return true;
    })
  );
}

export function studentName(student: GradebookStudent) {
  return [student.firstName, student.otherName, student.surname]
    .filter(Boolean)
    .join(" ");
}

export function completedSubjectCount(
  subjects: GradebookSubject[],
  scores: GradebookScore[]
) {
  return subjects.filter((subject) => {
    const score = scores.find((item) => item.subjectId === subject.id);
    return score?.caScore !== null && score?.caScore !== undefined &&
      score?.examScore !== null && score?.examScore !== undefined;
  }).length;
}