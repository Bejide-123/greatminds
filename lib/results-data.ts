
export const CREST =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAbe-O85ZXaBKodbhlru1tMa1HA_d3zbJZTCxQoJZbX6XYRNQVAMQS5a8I_DQyAxg5myyqE40js_UV4QE3nve7GHN8ggGC7SuA01YpCMpst2UAKhfil7JsMDipNebJZSrplC22wPN7beCqUaeYzFCZAg3pZ_fQ8oztdqUg5DayLlGdJytjADiYr9rvlzkP7sZ8Tt-lpy1SB68nNOLPyHdQuBXY9jo-4CEfIhRuxmsE";

export const REPORT_META = {
  dateIssued: "18th December, 2024",
  authCode: "GMIS-PRI-2024-B4D-0188-A94",
  resumption: "Monday, 13th January 2025",
} as const;

export const SESSION_OPTIONS = [
  "2024/2025 Academic Session",
  "2023/2024 Academic Session",
  "2022/2023 Academic Session",
];

export const TERM_OPTIONS = [
  "First Term ",
  "Second Term",
  "Third Term ",
];

export type BiodataItem = {
  label: string;
  value: string;
  valueClass?: string;
  dotColor?: string;
};

export const BIODATA: BiodataItem[] = [
  { label: "Pupil's Full Name", value: "Amina C. Adeleke", valueClass: "text-primary font-bold" },
  { label: "Admission No.", value: "GMIS/PRI/2021/0188" },
  { label: "Class / Arm", value: "Basic 4 Diamond", valueClass: "text-primary font-semibold" },
  { label: "Age", value: "9 Years" },
  { label: "School House", value: "Ruby Champions", dotColor: "bg-secondary-container" },
  { label: "Class Size", value: "24 Pupils" },
  { label: "Class Position", value: "2nd / 24", valueClass: "text-secondary-container font-bold" },
  { label: "Attendance", value: "98 / 100 Days", valueClass: "text-emerald-600 font-semibold" },
];

export type KPITile = {
  label: string;
  value: string;
  suffix: string;
  note: string;
  noteColor: string;
  icon: "auto_awesome" | "school" | "grade" | "workspace_premium";
  variant: "ring" | "icon";
  iconBg?: string;
};

export const KPI_TILES: KPITile[] = [
  {
    label: "Overall Average",
    value: "89.4%",
    suffix: "/ 100%",
    note: "Star Scholar Grade",
    noteColor: "text-emerald-600",
    icon: "auto_awesome",
    variant: "ring",
  },
  {
    label: "Total Aggregate Score",
    value: "983",
    suffix: "/ 1100",
    note: "11 Core Subjects Evaluated",
    noteColor: "text-on-surface-variant",
    icon: "school",
    iconBg: "bg-surface-container text-primary",
    variant: "icon",
  },
  {
    label: "Academic Standing",
    value: "A+",
    suffix: "Distinction",
    note: "Exemplary Scholar",
    noteColor: "text-emerald-600",
    icon: "grade",
    iconBg: "bg-tertiary-container text-on-tertiary-container",
    variant: "icon",
  },
  {
    label: "Class Cohort Standing",
    value: "2nd",
    suffix: "in Class (Out of 24)",
    note: "Headteacher's Honour Roll",
    noteColor: "text-secondary-container",
    icon: "workspace_premium",
    iconBg: "bg-secondary-container/10 text-secondary-container",
    variant: "icon",
  },
];

export type Subject = {
  name: string;
  subtitle: string;
  ca1: number;
  tasks: number;
  exam: number;
  total: number;
  grade: "A+" | "A" | "B" | "C" | "P" | "NI";
  classAvg: number;
  position: string;
  remark: string;
};

export const SUBJECTS: Subject[] = [
  { name: "English Language & Phonics", subtitle: "Grammar, Creative Writing & Diction", ca1: 18, tasks: 19, exam: 55, total: 92, grade: "A+", classAvg: 74.5, position: "1st", remark: "Fluent expressive reader with great phonics clarity and rich vocabulary." },
  { name: "Mathematics & Mental Arithmetic", subtitle: "Geometry, Fractions, Problem Solving", ca1: 19, tasks: 19, exam: 56, total: 94, grade: "A+", classAvg: 71.0, position: "2nd", remark: "Exceptional mental math speed and neat, methodical problem solving." },
  { name: "Basic Science & Technology", subtitle: "Living Things, Simple Machines & Earth Science", ca1: 17, tasks: 18, exam: 53, total: 88, grade: "A", classAvg: 69.2, position: "3rd", remark: "Very inquisitive in science experiments; observes and records data accurately." },
  { name: "Social Studies & Civic Education", subtitle: "Community, Nigerian Heritage & Values", ca1: 18, tasks: 19, exam: 54, total: 91, grade: "A+", classAvg: 75.1, position: "2nd", remark: "Shows high civic responsibility, moral consciousness, and cultural appreciation." },
  { name: "Agricultural Science", subtitle: "Crop Care, Soil Types & School Garden", ca1: 17, tasks: 17, exam: 51, total: 85, grade: "A", classAvg: 68.0, position: "4th", remark: "Enthusiastic participant in the school garden and practical seed germination." },
  { name: "ICT (Coding & Digital Literacy)", subtitle: "Block Coding, Touch Typing & Safe Tech", ca1: 20, tasks: 19, exam: 58, total: 97, grade: "A+", classAvg: 76.4, position: "1st", remark: "Top coder in Basic 4! Created brilliant interactive animations in Scratch." },
  { name: "French Language", subtitle: "Oral Greetings, Vocabulary & Songs", ca1: 16, tasks: 17, exam: 49, total: 82, grade: "A", classAvg: 66.3, position: "4th", remark: "Pronunciation has improved considerably; participates happily in French dialogues." },
  { name: "Cultural & Creative Arts (CCA)", subtitle: "Music, Fine Art, Origami & Crafts", ca1: 18, tasks: 19, exam: 53, total: 90, grade: "A+", classAvg: 73.8, position: "2nd", remark: "Highly creative and imaginative color mixing with beautiful recorder recitals." },
  { name: "Quantitative & Verbal Reasoning", subtitle: "Patterns, Anagrams, Logic Puzzles", ca1: 18, tasks: 18, exam: 52, total: 88, grade: "A", classAvg: 69.5, position: "3rd", remark: "Sharp deductive logic and pattern discovery; tackles tricky word puzzles well." },
  { name: "Physical & Health Education (PHE)", subtitle: "Athletics, Personal Hygiene & Safety", ca1: 17, tasks: 18, exam: 50, total: 85, grade: "A", classAvg: 72.0, position: "5th", remark: "Great coordination, energetic during relay races, and keeps clean personal habits." },
  { name: "Christian Religious Studies & Moral Instruction", subtitle: "Bible Stories, Golden Rule, Integrity", ca1: 19, tasks: 18, exam: 54, total: 91, grade: "A+", classAvg: 75.0, position: "2nd", remark: "Reflects moral lessons in daily interactions with classmates. Very polite." },
];

export const LEDGER_TOTALS = {
  ca1: "194 / 220",
  tasks: "203 / 220",
  exam: "586 / 660",
  total: "983 / 1100",
  grade: "A+ (89.4%)",
  classAvg: "71.6%",
  position: "2nd",
  remark: "All 11 Subjects Passed at Distinction / Excellent Level",
};

export type GradingRow = {
  grade: string;
  tier: string;
  tierColor: string;
  note: string;
  gradeColor?: string;
};

export const GRADING_SCALE: GradingRow[] = [
  { grade: "A+ (90 - 100%)", tier: "Distinction", tierColor: "text-emerald-600", note: "Exemplary Mastery & Application" },
  { grade: "A (80 - 89%)", tier: "Excellent", tierColor: "text-emerald-600", note: "Outstanding Depth & Fluency" },
  { grade: "B (70 - 79%)", tier: "Very Good", tierColor: "text-primary-container", note: "High Competency & Accuracy" },
  { grade: "C (60 - 69%)", tier: "Good", tierColor: "text-on-surface-variant", note: "Satisfactory Progress Made" },
  { grade: "P (50 - 59%)", tier: "Pass", tierColor: "text-secondary", note: "Meets Minimum Primary Standards" },
  { grade: "NI (0 - 49%)", tier: "Needs Improvement", tierColor: "text-error", note: "Remedial Support Recommended", gradeColor: "text-error" },
];

export type PsychomotorRow = { label: string; rating: number; wide?: boolean };

export const PSYCHOMOTOR: PsychomotorRow[] = [
  { label: "Handwriting & Neatness", rating: 5 },
  { label: "Punctuality & Attendance", rating: 5 },
  { label: "Attentiveness & Participation", rating: 5 },
  { label: "Politeness, Empathy & Honesty", rating: 5 },
  { label: "Teamwork & Social Play", rating: 5 },
  { label: "Curiosity & Independent Thinking", rating: 5 },
  { label: "Handling Materials & Care of Books", rating: 4 },
  { label: "Sports, Motor Skills & Agility", rating: 5 },
  { label: "Music & Creative Arts Expression", rating: 5, wide: true },
];

export const SIGNOFFS = {
  teacher: {
    heading: "Class Teacher's Remark",
    badge: { text: "Highly Commended", icon: "sentiment_very_satisfied" as const },
    quote:
      "Amina is a delightful, hardworking, and attentive pupil. She shows great enthusiasm during phonics and coding classes. Well done!",
    signaturePath: "M5 25 Q 25 5, 45 22 T 80 12 T 110 28 T 140 10 T 155 20",
    name: "Mrs. Grace Danladi",
    role: "Class Teacher • Basic 4 Diamond",
    date: "Signed: 16 Dec 2024",
  },
  head: {
    heading: "Head of Primary's Endorsement",
    badge: { text: "Star Pupil", icon: "military_tech" as const },
    quote:
      "An outstanding academic performance with exemplary moral conduct. Keep shining, Amina!",
    signaturePath: "M10 20 Q 30 2, 60 25 T 90 5 T 130 30 T 150 15",
    name: "Dr. (Mrs.) Folashade Adelekan",
    role: "Head of Primary & Academic Director",
    date: "Endorsed: 18 Dec 2024",
  },
} as const;