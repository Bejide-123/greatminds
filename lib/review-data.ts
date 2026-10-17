export type ReviewClass = {
  id: string;
  className: string;
  arm: string;
  teacher: string;
  subject: string;
  submittedAt: string;
  status: "pending" | "approved";
  pupilsCount: number;
  avg: number;
  highest: number;
  highestPupil: string;
  lowest: number;
};

export const REVIEW_CLASSES: ReviewClass[] = [
  {
    id: "ss2-gold-math",
    className: "SS2 Gold",
    arm: "Gold",
    teacher: "Mr. Babatunde Olawale",
    subject: "Mathematics",
    submittedAt: "Today • 11:20 AM",
    status: "pending",
    pupilsCount: 42,
    avg: 76.4,
    highest: 95.0,
    highestPupil: "David Bolaji Williams",
    lowest: 52.0,
  },
  {
    id: "ss3-diamond-eng",
    className: "SS3 Diamond",
    arm: "Diamond",
    teacher: "Mrs. Grace Danladi",
    subject: "English Language",
    submittedAt: "Today • 09:45 AM",
    status: "pending",
    pupilsCount: 38,
    avg: 74.1,
    highest: 92.5,
    highestPupil: "Amina Chinedu Adeleke",
    lowest: 48.0,
  },
  {
    id: "basic5-ruby-sci",
    className: "Basic 5 Ruby",
    arm: "Ruby",
    teacher: "Mr. Samuel Eze",
    subject: "Basic Science",
    submittedAt: "Yesterday",
    status: "pending",
    pupilsCount: 28,
    avg: 79.3,
    highest: 97.0,
    highestPupil: "Emeka Victor Chukwudi",
    lowest: 55.0,
  },
  {
    id: "jss3-blue-tech",
    className: "JSS3 Blue",
    arm: "Blue",
    teacher: "Mrs. N. Okoro",
    subject: "Basic Technology",
    submittedAt: "Yesterday",
    status: "approved",
    pupilsCount: 34,
    avg: 81.0,
    highest: 96.0,
    highestPupil: "Sarah Kanyin Davies",
    lowest: 60.0,
  },
];

export type StudentRow = {
  name: string;
  admissionNo: string;
  ca: number;       // out of 40
  exam: number;     // out of 60
  total: number;    // out of 100
  grade: string;    // A1, B2, C5…
  status: "ready" | "flagged";
  remark?: string;
};

export const STUDENT_ROWS: StudentRow[] = [
  { name: "Amina Chinedu Adeleke", admissionNo: "GMIS/2022/0482", ca: 39, exam: 53, total: 92, grade: "A1", status: "ready", remark: "Consistently excellent across all assessments." },
  { name: "Chidiebere E. Okafor", admissionNo: "GMIS/2022/0483", ca: 34, exam: 44, total: 78, grade: "A1", status: "ready", remark: "Solid grasp of core topics." },
  { name: "Somtochukwu Anthony Eze", admissionNo: "GMIS/2022/0487", ca: 25, exam: 31, total: 56, grade: "C5", status: "flagged", remark: "Needs revision on algebra and geometry." },
  { name: "David Bolaji Williams", admissionNo: "GMIS/2022/0491", ca: 39, exam: 56, total: 95, grade: "A1", status: "ready", remark: "Outstanding; top of the class." },
  { name: "Fatima Nnamdi Al-Hassan", admissionNo: "GMIS/2022/0498", ca: 31, exam: 40, total: 71, grade: "B2", status: "ready", remark: "Steady effort; room to push to A1." },
];

export const GRADE_STYLES: Record<string, string> = {
  A1: "bg-emerald-50 text-emerald-800",
  B2: "bg-blue-50 text-blue-800",
  B3: "bg-blue-50 text-blue-800",
  C4: "bg-amber-50 text-amber-800",
  C5: "bg-amber-50 text-amber-800",
  C6: "bg-amber-50 text-amber-800",
  D7: "bg-orange-50 text-orange-800",
  E8: "bg-orange-50 text-orange-800",
  F9: "bg-red-50 text-red-800",
};

export const DEFAULT_PRINCIPAL_COMMENT =
  "Well-moderated result sheet. Scores align with continuous assessment history. Approved for publication.";