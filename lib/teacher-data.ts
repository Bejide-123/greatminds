export const CREST =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAbe-O85ZXaBKodbhlru1tMa1HA_d3zbJZTCxQoJZbX6XYRNQVAMQS5a8I_DQyAxg5myyqE40js_UV4QE3nve7GHN8ggGC7SuA01YpCMpst2UAKhfil7JsMDipNebJZSrplC22wPN7beCqUaeYzFCZAg3pZ_fQ8oztdqUg5DayLlGdJytjADiYr9rvlzkP7sZ8Tt-lpy1SB68nNOLPyHdQuBXY9jo-4CEfIhRuxmsE";

export const TEACHER = {
  name: "Mrs. Grace Danladi",
  initials: "GD",
  staffId: "GMIS-PRI-TCH-042",
  role: "Class Teacher & Coordinator",
  className: "Basic 4 Diamond",
} as const;

export const NAV_ITEMS = [
  { key: "dashboard", href: "/dashboard/teacher", label: "Dashboard", icon: "grid", badge: { text: "Active", color: "bg-tertiary-container text-on-tertiary-container", dot: "bg-emerald-500" } },
  { key: "gradebook", href: "/dashboard/gradebook", label: "Class Gradebook", icon: "book", badge: { text: "CA & Exam", color: "bg-secondary-container/20 text-secondary-fixed font-mono" } },
  { key: "attendance", href: "/dashboard/attendance", label: "Attendance", icon: "usercheck", badge: { text: "100% Roll", color: "bg-tertiary-container text-on-tertiary-container" } },
  { key: "psychomotor", href: "/dashboard/psychomotor", label: "Psychomotor & Traits", icon: "brain", badge: { text: "Ratings", color: "bg-surface-container-lowest/10 text-outline-variant" } },
  { key: "homework", href: "/dashboard/homework", label: "Homework & Tasks", icon: "clipboard", badge: { text: "Weekly", color: "bg-surface-container-lowest/10 text-outline-variant" } },
  { key: "timetable", href: "/dashboard/timetable", label: "Timetable", icon: "clock", badge: { text: "Day Routine", color: "bg-surface-container-lowest/10 text-outline-variant" } },
] as const;

export const WELCOME_BADGES = [
  { text: "2024/2025 Session • First Term", icon: "calendar", color: "bg-surface-container-lowest/10 text-surface-container-lowest", iconColor: "text-secondary-fixed" },
  { text: "Active Term Ledger: Day 64 of 85", dot: true, color: "bg-tertiary-container text-on-tertiary-container" },
  { text: "24 Pupils on Roll", icon: "child", color: "bg-secondary-container/20 text-secondary-fixed", iconColor: "text-secondary-fixed" },
] as const;

export const COHORT = {
  total: 24,
  classroom: "Classroom 4D",
  subtitle: "Upper Primary Wing • Ages 8–10 Years • Homeroom Lead",
  girls: { count: 13, percent: 54.2 },
  boys: { count: 11, percent: 45.8 },
  houses: [
    { name: "Ruby", count: 6, color: "bg-rose-500" },
    { name: "Emerald", count: 6, color: "bg-emerald-500" },
    { name: "Sapphire", count: 6, color: "bg-blue-500" },
    { name: "Topaz", count: 6, color: "bg-amber-500" },
  ],
} as const;

export const ASSESSMENT_METRICS = [
  { label: "CA 1 & CA 2 Logged", value: 24, total: 24, barColor: "bg-emerald-500", note: "100% Fully Entered", noteColor: "text-emerald-800" },
  { label: "Terminal Exams Final", value: 21, total: 24, barColor: "bg-primary", note: "Theory Papers Completed", noteColor: "text-on-surface-variant" },
  { label: "Awaiting Check", value: 3, total: 24, barColor: "bg-error", note: "Oral Phonics & Science Lab", noteColor: "text-error", valueColor: "text-error" },
  { label: "Psychomotor Traits", value: 20, total: 24, barColor: "bg-secondary-container", note: "4 Behavioral Reviews Left", noteColor: "text-secondary", valueColor: "text-secondary", bg: "bg-secondary-fixed/50" },
] as const;

export const TASKS = [
  {
    icon: "edit_calendar",
    href: "/dashboard/gradebook",
    iconBg: "bg-secondary-fixed text-secondary",
    tag: "Continuous Assessment",
    tagColor: "text-secondary",
    title: "Open Gradebook & CA Ledger",
    description: "Enter and verify terminal test scores across English Phonics, Mental Arithmetic, Basic Science, and Reasoning for Basic 4 Diamond.",
    badge: { text: "3 Pending Scores", color: "bg-error-container text-on-error-container" },
    badgeNote: "Oral Reading & Practical ICT",
    button: { label: "Open Gradebook & CA", bg: "bg-secondary-container hover:bg-secondary", color: "text-on-primary" },
  },
  {
    icon: "stars",
    href: "/dashboard/psychomotor",
    iconBg: "bg-surface-container text-primary",
    tag: "Affective & Social Growth",
    tagColor: "text-primary",
    title: "Enter Psychomotor & Child Behavioral Traits",
    description: "Grade 5-point ratings for Handwriting, Neatness, Attentiveness, Politeness, Social Play, and Sportsmanship on report sheets.",
    badge: { text: "20 of 24 Completed", color: "bg-surface-container-high text-primary" },
    badgeNote: "4 Pupils Remaining",
    button: { label: "Record Behavioral Traits", bg: "bg-primary-container hover:bg-primary", color: "text-on-primary", icon: "rate_review" },
  },
  {
    icon: "verified_user",
    href: "/dashboard/gradebook",
    iconBg: "bg-secondary-fixed-dim/60 text-secondary",
    tag: "Term Sign-off",
    tagColor: "text-secondary",
    tagBadge: { text: "Broadsheet", color: "bg-secondary-container text-on-primary" },
    title: "Submit Terminal Broadsheet to Head of Primary",
    description: "Review final aggregates, positions in class, and teacher general remarks before transmitting to Mrs. F. Adeboye (Head of Primary).",
    badge: { text: "Ready for Signature", color: "bg-secondary-fixed text-secondary" },
    badgeNote: "Basic 4 Diamond",
    button: { label: "Submit Broadsheet to Head of Primary", bg: "bg-secondary hover:bg-on-secondary-container", color: "text-on-primary", icon: "send" },
  },
] as const;

export const ATTENTION_ITEMS = [
  { id: "GMIS/PRI/2204", name: "Adekunle, Damilola Grace", area: "English Language & Phonics", status: "Oral Reading Pending", statusColor: "bg-secondary-fixed text-secondary", note: "Oral reading fluency check pending due to clinic visit during Monday period.", action: "Conduct Oral Check" },
  { id: "GMIS/PRI/2218", name: "Adeleke, Amina Farida", area: "Affective & Social Traits", status: "Trait Rating Incomplete", statusColor: "bg-error-container text-on-error-container", note: "Update psychomotor remarks: Handwriting (5/5), Neatness (4/5), Attentiveness needed.", action: "Rate Traits" },
  { id: "GMIS/PRI/2198", name: "Chukwudi, Emeka Victor", area: "ICT & Scratch Coding", status: "Practical Lab Score 18/20", statusColor: "bg-secondary-fixed text-secondary", note: "Scratch block animation project completed. Confirm final lab score upload.", action: "Confirm Score" },
  { id: "GMIS/PRI/2231", name: "Ibrahim, Fatima Haladu", area: "Co-Curricular / Literary Club", status: "Spelling Bee Champion", statusColor: "bg-tertiary-container text-on-tertiary-container font-bold", note: "School Spelling Bee Winner! Attach gold certificate badge to term pupil dossier.", action: "Attach Badge" },
] as const;

export const NOTICES = [
  {
    icon: "timer",
    iconBg: "bg-secondary-fixed text-secondary",
    title: "Primary 1–6 Report Sheet Submission Deadline",
    tag: "Strict Submission",
    tagColor: "bg-error-container text-on-error-container",
    body: "Friday 15th November 2024 by 4:00 PM. All primary class teachers must conclude CA records, psychomotor evaluations, and personalized child comments ahead of parent open day and report printing.",
    author: "Mrs. Folashade Adeboye (Head of Primary)",
    time: "Yesterday, 09:15 AM",
  },
  {
    icon: "party",
    iconBg: "bg-surface-container text-primary",
    title: "Primary Arts & Science Exhibition Day",
    tag: "Primary Quadrangle",
    tagColor: "bg-surface-container-high text-primary",
    body: 'Basic 4 Diamond will present the "Living Things & Plant Habitats" model alongside Scratch block coding demos. Please ensure pupils have display materials prepared by Wednesday.',
    author: "Cultural & Science Committee",
    time: "14th November 2024",
  },
] as const;

export const SCHEDULE = [
  { time: "08:00 – 08:45 AM", title: "Phonics & Spelling Drill", status: "Completed", statusColor: "bg-tertiary-container text-on-tertiary-container", cardBg: "bg-surface-container-low" },
  { time: "08:45 – 09:30 AM", title: "Mathematics & Mental Arithmetic", status: "Completed", statusColor: "bg-tertiary-container text-on-tertiary-container", cardBg: "bg-surface-container-low" },
  { time: "09:30 – 10:15 AM", title: "Snack & Supervised Playground", status: "Recess", statusColor: "bg-amber-200 text-amber-900 font-bold", cardBg: "bg-amber-50 border border-amber-200/60", titleColor: "text-amber-900", subColor: "text-amber-700" },
  { time: "10:15 – 11:00 AM", title: "Basic Science & Discovery", subtitle: "Topic: Plant Seeds Germination Experiment", status: "Period 3", statusColor: "bg-surface-container-lowest/20", cardBg: "bg-primary-container text-on-primary", isPrimary: true },
  { time: "11:00 – 11:45 AM", title: "Storytelling & Library Hour", status: "Upcoming", statusColor: "bg-surface-container text-outline", cardBg: "bg-surface-container-low" },
] as const;

export const CURRICULUM = [
  { tag: "Core Literacy", tagColor: "text-primary", border: "border-primary", title: "English Language & Phonics", description: "Grammar rules, phonetic sounds, comprehension passages, and creative composition writing.", hours: "5 hrs/wk", status: "CA Entered", statusIcon: "check", statusColor: "text-emerald-700", logged: "24 / 24 Logged", loggedColor: "text-primary" },
  { tag: "Core Numeracy", tagColor: "text-secondary-container", border: "border-secondary-container", title: "Mathematics & Mental Arithmetic", description: "Fractions, decimals, long multiplication, geometry basics, and rapid mental calculations.", hours: "5 hrs/wk", status: "CA Entered", statusIcon: "check", statusColor: "text-emerald-700", logged: "24 / 24 Logged", loggedColor: "text-secondary" },
  { tag: "Science & Nature", tagColor: "text-emerald-700", border: "border-emerald-600", title: "Basic Science & Technology", description: "Living and non-living things, water cycle, simple machines, hygiene, and safe environment.", hours: "4 hrs/wk", status: "Lab Checking", statusIcon: "pending", statusColor: "text-amber-700", logged: "22 / 24 Final", loggedColor: "text-on-surface" },
  { tag: "Digital Literacy", tagColor: "text-indigo-700", border: "border-indigo-600", title: "ICT & Scratch Block Coding", description: "Computer parts, keyboard navigation, safe internet habits, and introductory Scratch sprites.", hours: "3 hrs/wk", status: "Lab Verified", statusIcon: "check", statusColor: "text-emerald-700", logged: "23 / 24 Logged", loggedColor: "text-indigo-900" },
] as const;