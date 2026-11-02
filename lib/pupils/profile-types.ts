export type ProfileSubjectScore = {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  caScore: number | null;
  examScore: number | null;
  totalScore: number | null;
  grade: string | null;
};

export type ProfilePsychomotor = Record<string, number | null>;

export type ProfileResult = {
  termName: "FIRST" | "SECOND" | "THIRD";
  sessionName: string;
  status: "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "PUBLISHED";
  overallAverage: number | null;
  classPosition: number | null;
  classSize: number | null;
  teacherRemark: string | null;
  headTeacherRemark: string | null;
  psychomotor: ProfilePsychomotor | null;
  subjects: ProfileSubjectScore[];
};

export type PupilProfile = {
  id: string;
  admissionNumber: string;
  firstName: string;
  otherName: string | null;
  surname: string;
  sex: "MALE" | "FEMALE";
  dateOfBirth: string;
  status: "ACTIVE" | "INACTIVE" | "GRADUATED";
  photoUrl: string | null;
  schoolClass: { id: string; name: string };
  homeroomTeacher: { firstName: string; surname: string } | null;
  guardian: {
    name: string;
    phone: string;
    email: string | null;
  };
  currentResult: ProfileResult | null;
};