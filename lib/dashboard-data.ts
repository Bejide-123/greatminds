export const PUPIL = {
  name: "Amina C. Adeleke",
  firstName: "Amina",
  initials: "AA",
  admissionNo: "GMIS/PRI/2021/0482",
  className: "Basic 4 Diamond",
  homeroom: "Mrs. Grace Danladi",
  headteacher: "Dr. Folashade Adelekan",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA99PqdFj0iX5HN479-ymjV105rhf2FpwIDuVpxgMS9A0eXlg1QYXqrk4yWlkU9Ca5lF07oxyLFcrl25q4kvdFcRErJeBN1xYCOk-l57tpImbfpRXq_UT2slJnVgDnskYew58vr4JPhiQpVW5_lMzUEpygqlCCLmaIkCSmdAJlr3wNLWM2ilCrn122RazD-LdtIe-jZZfs5_L3nev9lOFwbGDQJRUeQrSMu915hWb0",
} as const;

export const CREST =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAbe-O85ZXaBKodbhlru1tMa1HA_d3zbJZTCxQoJZbX6XYRNQVAMQS5a8I_DQyAxg5myyqE40js_UV4QE3nve7GHN8ggGC7SuA01YpCMpst2UAKhfil7JsMDipNebJZSrplC22wPN7beCqUaeYzFCZAg3pZ_fQ8oztdqUg5DayLlGdJytjADiYr9rvlzkP7sZ8Tt-lpy1SB68nNOLPyHdQuBXY9jo-4CEfIhRuxmsE";

export const CURRENT_TERM = "First Term 2024/2025";

export const HERO_STATS = [
  { label: "Attendance", value: "98%", sub: "98 / 100 Days", color: "text-surface-container-lowest" },
  { label: "Standing", value: "2nd", sub: "in Class of 24", color: "text-secondary-container" },
  { label: "Average", value: "89.4%", sub: "Star Scholar", color: "text-tertiary-fixed" },
];

export const TERM_METRICS = [
  { label: "Term Average", value: "89.4%", suffix: "A+", sub: "Target Benchmark: 80%", valueClass: "text-primary", suffixClass: "text-secondary-container" },
  { label: "Total Aggregate", value: "983", suffix: "/ 1100 Pts", sub: "Across 11 Subjects", valueClass: "text-on-surface", suffixClass: "text-outline", subClass: "text-tertiary font-bold" },
  { label: "Class Standing", value: "2nd", suffix: "of 24 Pupils", sub: "Star Scholar Grade", valueClass: "text-secondary-container", suffixClass: "text-on-surface-variant", subClass: "text-on-tertiary-container font-semibold" },
];

export const TOP_SUBJECTS = [
  { name: "ICT & Scratch Coding", score: 97, barColor: "bg-primary", tag: "1st in Class • Top Coder", tagColor: "text-secondary", grade: "Grade A+" },
  { name: "Mathematics & Arithmetic", score: 94, barColor: "bg-secondary-container", tag: "2nd in Class", tagColor: "text-primary", grade: "Grade A+" },
  { name: "English Language & Phonics", score: 92, barColor: "bg-tertiary-container", tag: "1st in Class • Level 6", tagColor: "text-tertiary", grade: "Grade A" },
  { name: "Cultural & Creative Arts", score: 90, barColor: "bg-primary-container", tag: "2nd in Class", tagColor: "text-on-surface-variant", grade: "Grade A" },
];

export const TEACHER_NOTE = {
  quote:
    "Amina has exhibited tremendous diligence this term. Her analytical logic in Scratch Block Coding and creative enthusiasm in Jolly Phonics are exemplary!",
  author: "— Mrs. Grace Danladi (Basic 4 Homeroom Teacher)",
};

export const SCHEDULE = [
  { time: "08:00 - 08:45 AM", title: "Jolly Phonics & Spelling Drill", sub: "Digraphs & vocabulary dictation exercises", status: "Completed", statusColor: "bg-tertiary-container text-on-tertiary-container", borderColor: "border-tertiary-container", icon: "check" },
  { time: "08:45 - 09:30 AM", title: "Mental Arithmetic & Multiplication Race", sub: "Rapid flashcard calculation 6x through 9x", status: "Completed", statusColor: "bg-tertiary-container text-on-tertiary-container", borderColor: "border-tertiary-container", icon: "check" },
  { time: "09:30 - 10:15 AM", title: "Snack Time & Playground Play", sub: "Healthy fruit snack & supervised outdoor play", status: "Recess", statusColor: "bg-secondary-container text-on-secondary", borderColor: "border-secondary-container", icon: "apple" },
  { time: "10:15 - 11:15 AM", title: "Seed Germination Discovery Lab", sub: "Primary science lab: bean sprouts observations", status: "In Progress", statusColor: "bg-primary text-surface-container-lowest", borderColor: "border-primary", icon: "science" },
  { time: "11:15 - 12:00 PM", title: "Scratch Block Coding & Animation", sub: "Computer lab: character movement blocks", status: "Upcoming", statusColor: "bg-surface-container-high text-on-surface-variant", borderColor: "border-outline-variant", icon: "terminal" },
] as const;

export const HOMEWORK = [
  { subject: "English Phonics", subjectColor: "text-primary bg-primary/10", title: "Read Chapter 4 of 'The Drummer Boy'", description: "Write down 5 new descriptive adjectives in home exercise book.", due: "Due Tomorrow", dueColor: "text-secondary font-bold" },
  { subject: "Basic Science", subjectColor: "text-tertiary bg-tertiary-container/15", title: "Seed Germination Observation Cup", description: "Water sprout with 2 tablespoons of water and sketch root growth.", due: "Due Thursday", dueColor: "text-outline font-medium" },
  { subject: "Mental Math", subjectColor: "text-secondary bg-secondary-container/15", title: "Speed Times Tables: 7x & 8x", description: "10-minute flashcard drill with parent endorsement signature.", due: "Daily Practice", dueColor: "text-on-surface font-medium" },
];

export const BULLETINS = [
  { tag: "Holiday Notice", tagColor: "bg-secondary-container/15 text-secondary", date: "Dec 13, 2024", title: "First Term Vacation & Second Term Resumption Date", body: "First Term officially concludes on Friday 13th December 2024. Second Term classes resume promptly on Monday 13th January 2025. Please ensure all holiday projects are brought on the first day." },
  { tag: "Exhibition & Showcase", tagColor: "bg-primary/10 text-primary", date: "Dec 04, 2024", title: "Annual Primary Arts, Science & Coding Exhibition", body: "Parents are warmly invited to witness pupil creations, plant germination science boxes, and Amina's Scratch coding game showcase in the School Assembly Hall." },
];

export const CALENDAR = [
  { title: "Primary Arts & STEM Open Day", date: "Wed, Dec 04", detail: "Assembly Hall • 10:00 AM - 1:00 PM", dot: "bg-secondary-container", dateColor: "text-secondary" },
  { title: "End of Term Carol & Party", date: "Thu, Dec 12", detail: "Pupil Christmas Play & Class Gift Swap", dot: "bg-primary", dateColor: "text-primary" },
  { title: "Terminal Report Card Issuance", date: "Fri, Dec 13", detail: "Official sealed physical slips and online downloads", dot: "bg-tertiary-container", dateColor: "text-tertiary" },
  { title: "Second Term Resumption", date: "Mon, Jan 13", detail: "2024/2025 Easter Session Begins", dot: "bg-outline", dateColor: "text-outline" },
];

export const NAV_ITEMS = [
  { key: "dashboard", href: "/dashboard/pupil", label: "Pupil Dashboard", icon: "stars", badge: { text: "Active", color: "bg-secondary-container text-on-secondary" } },
  { key: "results", href: "/dashboard/pupil/results", label: "Terminal Report Sheet", icon: "fact_check", badge: { text: "Term 1 Ready", color: "bg-tertiary-container text-on-tertiary-container" } },
  { key: "homework", href: "/dashboard/pupil/homework", label: "Daily Homework", icon: "book", badge: { text: "3 Due", color: "bg-surface-container-lowest/15 text-surface-container-lowest" } },
  { key: "timetable", href: "/dashboard/pupil/timetable", label: "Class Timetable & Recess", icon: "clock" },
  { key: "fees", href: "/dashboard/pupil/fees", label: "School Fees", icon: "credit_card", badge: { text: "Cleared", color: "bg-tertiary-container text-on-tertiary-container" } },
  { key: "profile", href: "/dashboard/pupil/profile", label: "Pupil Profile & Details", icon: "person" },
  { key: "messages", href: "/dashboard/pupil/messages", label: "Message Mrs. Danladi", icon: "message", dot: true },
] as const;
