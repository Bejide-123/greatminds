import type { PupilProfile, ProfileResult, ProfileSubjectScore, ProfilePsychomotor } from "./profile-types";

// Minimal shape we need — matches the Prisma `include` we use below.
type StudentRow = {
  id: string;
  admissionNumber: string;
  firstName: string;
  otherName: string | null;
  surname: string;
  sex: "MALE" | "FEMALE";
  dateOfBirth: Date;
  status: "ACTIVE" | "INACTIVE" | "GRADUATED";
  photoUrl: string | null;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string | null;
  schoolClass: { id: string; name: string };
};

type ResultRow = {
  term: { name: "FIRST" | "SECOND" | "THIRD"; session: { name: string } };
  status: "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "PUBLISHED";
  overallAverage: { toString(): string } | null;
  classPosition: number | null;
  classSize: number | null;
  teacherRemark: string | null;
  headTeacherRemark: string | null;
  psychomotor: unknown;
  teacher: { firstName: string; surname: string };
  subjects: Array<{
    subject: { id: string; name: string; code: string };
    caScore: { toString(): string } | null;
    examScore: { toString(): string } | null;
    totalScore: { toString(): string } | null;
    grade: string | null;
  }>;
};

function decimalToNumber(value: { toString(): string } | null): number | null {
  return value == null ? null : Number(value.toString());
}

function sanitisePsychomotor(input: unknown): ProfilePsychomotor | null {
  if (!input || typeof input !== "object") return null;
  const out: ProfilePsychomotor = {};
  for (const [key, raw] of Object.entries(input as Record<string, unknown>)) {
    if (typeof raw === "number" && Number.isInteger(raw) && raw >= 1 && raw <= 5) {
      out[key] = raw;
    } else {
      out[key] = null;
    }
  }
  return out;
}

function buildResult(result: ResultRow | null): ProfileResult | null {
  if (!result) return null;

  const subjects: ProfileSubjectScore[] = result.subjects.map((s) => ({
    subjectId: s.subject.id,
    subjectName: s.subject.name,
    subjectCode: s.subject.code,
    caScore: decimalToNumber(s.caScore),
    examScore: decimalToNumber(s.examScore),
    totalScore: decimalToNumber(s.totalScore),
    grade: s.grade,
  }));

  return {
    termName: result.term.name,
    sessionName: result.term.session.name,
    status: result.status,
    overallAverage: decimalToNumber(result.overallAverage),
    classPosition: result.classPosition,
    classSize: result.classSize,
    teacherRemark: result.teacherRemark,
    headTeacherRemark: result.headTeacherRemark,
    psychomotor: sanitisePsychomotor(result.psychomotor),
    subjects,
  };
}

export function buildPupilProfile(
  student: StudentRow,
  currentResult: ResultRow | null,
  homeroomTeacher: { firstName: string; surname: string } | null,
): PupilProfile {
  return {
    id: student.id,
    admissionNumber: student.admissionNumber,
    firstName: student.firstName,
    otherName: student.otherName,
    surname: student.surname,
    sex: student.sex,
    dateOfBirth: student.dateOfBirth.toISOString(),
    status: student.status,
    photoUrl: student.photoUrl,
    schoolClass: student.schoolClass,
    homeroomTeacher,
    guardian: {
      name: student.guardianName,
      phone: student.guardianPhone,
      email: student.guardianEmail,
    },
    currentResult: buildResult(currentResult),
  };
}