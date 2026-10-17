export const ADMIN = {
  name: "Dr. Folashade Adelekan",
  initials: "FA",
  role: "Principal / Admin",
} as const;

export const CREST =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAbe-O85ZXaBKodbhlru1tMa1HA_d3zbJZTCxQoJZbX6XYRNQVAMQS5a8I_DQyAxg5myyqE40js_UV4QE3nve7GHN8ggGC7SuA01YpCMpst2UAKhfil7JsMDipNebJZSrplC22wPN7beCqUaeYzFCZAg3pZ_fQ8oztdqUg5DayLlGdJytjADiYr9rvlzkP7sZ8Tt-lpy1SB68nNOLPyHdQuBXY9jo-4CEfIhRuxmsE";

export const NAV_ITEMS = [
  { key: "dashboard", href: "/dashboard/admin", label: "Dashboard", icon: "grid" },
  { key: "results", href: "/dashboard/admin/results", label: "Results Review", icon: "fact_check" },
  { key: "students", href: "/dashboard/admin/students", label: "Students", icon: "users" },
  { key: "staff", href: "/dashboard/admin/staff", label: "Staff", icon: "badge" },
  { key: "fees", href: "/dashboard/admin/fees", label: "Fees & Billing", icon: "payments", badge: { text: "Soon", color: "bg-surface-container-lowest/10 text-outline-variant" } },
] as const;

export const METRICS = [
  { label: "Total Students", value: "1,248", sub: "Enrolled across all arms", icon: "users" },
  { label: "Total Teachers", value: "84", sub: "Academic & teaching staff", icon: "badge" },
  { label: "Total Classes", value: "36", sub: "Primary to Secondary", icon: "meeting_room" },
  { label: "Result Approval Progress", value: "82%", sub: "33 of 36 Classes", icon: "verified", isProgress: true, progressValue: 82, valueColor: "text-secondary-container", iconBg: "bg-secondary-fixed text-secondary" },
] as const;

export type Submission = {
  cls: string;
  subject: string;
  teacher: string;
  submitted: string;
  status: "pending" | "approved";
};

export const SUBMISSIONS: Submission[] = [
  { cls: "SS2 Gold", subject: "Mathematics", teacher: "Mr. Babatunde Olawale", submitted: "Today • 11:20 AM", status: "pending" },
  { cls: "SS3 Diamond", subject: "English Language", teacher: "Mrs. Grace Danladi", submitted: "Today • 09:45 AM", status: "pending" },
  { cls: "Basic 5 Ruby", subject: "Basic Science", teacher: "Mr. Samuel Eze", submitted: "Yesterday", status: "pending" },
  { cls: "JSS3 Blue", subject: "Basic Technology", teacher: "Mrs. N. Okoro", submitted: "Yesterday", status: "approved" },
];

export const MODULES = [
  { icon: "school", title: "Student Directory", subtitle: "Profiles & admissions" },
  { icon: "teacher", title: "Staff Management", subtitle: "Teachers & workloads" },
  { icon: "payments", title: "Fee Payments", subtitle: "Invoicing & receipts" },
  { icon: "clock", title: "Timetable & Classes", subtitle: "Periods & rooms" },
  { icon: "campaign", title: "Announcements", subtitle: "School circulars & SMS" },
  { icon: "attendance", title: "Attendance", subtitle: "Daily roll call logs" },
] as const;