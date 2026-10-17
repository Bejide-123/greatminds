export type Pupil = {
  id: string;
  name: string;
  initials?: string;
  avatar?: string;
  house: "Ruby" | "Sapphire" | "Topaz" | "Emerald";
  houseColor: string;
  roll: string;
  admissionNo: string;
  status: "complete" | "pending" | "in-progress";
  completionPct: number;
  entered: number; // out of 11
  classRank?: string;
  houseLabel: string;
};

export const HOUSE_STYLES: Record<Pupil["house"], string> = {
  Ruby: "bg-error-container text-error",
  Sapphire: "bg-primary-container text-surface-container-lowest",
  Topaz: "bg-secondary-fixed text-on-secondary-fixed",
  Emerald: "bg-tertiary-container text-on-tertiary-container",
};

export const PUPILS: Pupil[] = [
  {
    id: "amina",
    name: "Amina Chinedu Adeleke",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6pQBGGpaYz0K7XsDymjTQV_hoqw2Q18phuz_410FKeFRNscCEqWxA4cU-Pf8Kd1fE37pGHjHXVVCBz_C7iA6ajI0901cvCPdz6NGTpIsGsz6qJOaNU7JGqe6SCR-5v1rKIoFxxzo5ll4wbP4GxpR-6NWxMuVRMPx06bzBR0h00dK9wIo0OWzUkdLlYEWekVRPVWbQUwkZheSZHVnkNwjLWUv9KTHNaY68X3KsapE",
    house: "Ruby",
    houseColor: "Ruby",
    roll: "#01",
    admissionNo: "GMIS/PRI/0482",
    status: "complete",
    completionPct: 94,
    entered: 11,
    classRank: "2nd",
    houseLabel: "Ruby Champions",
  },
  {
    id: "daniel",
    name: "Daniel Chukwuma",
    initials: "DC",
    house: "Ruby",
    houseColor: "Ruby",
    roll: "#02",
    admissionNo: "GMIS/PRI/0495",
    status: "pending",
    completionPct: 0,
    entered: 0,
    houseLabel: "Ruby Champions",
  },
  {
    id: "sarah",
    name: "Sarah Kanyin Davies",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcfguLeurUU_MEZOKoXAyLehNJRHm0O8AlAXoxzpH_FM49aE-f1BAvN-s-dHNNdacUKRuG8SRacBDE4dIIa0rUyIRLPA0zlbB99i1UlOsaZnFkfzFe0lyOfBmxY-o5sATsn1NdEHuCRSM3gP1fffZ1AcQh6HHYEVMfjzw4CckwIy7Bprnc9U568qRgGeWA3XxC_y4O8bu1N6xChjdqJEHQrBZhBbZ39oNyYyzOSr0",
    house: "Sapphire",
    houseColor: "Sapphire",
    roll: "#03",
    admissionNo: "GMIS/PRI/2215",
    status: "complete",
    completionPct: 91,
    entered: 11,
    houseLabel: "Sapphire Champions",
  },
  {
    id: "michael",
    name: "Michael Somto Eze",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6mo-QlLCzQjVfnvnviC-g3sVRNZZTl10guV3787T2jXfUsFxdJYfTtcF7KERvp6Dw6aJqwU0M3GvTBlrbN7IDqDScQa_-W2dB1q2Ecn-tJbyNcDRBKN4evGQ0fQNviyYz2jjpLVaeThdRrQFnE8GnizspHfXFtQYqv4zyoZrTHPBzeGDakkG7w4fIjBnwNZZvQxF-qK7n0t8HFYYm2QqGIB_340jx1uTLuXMKwRQ",
    house: "Topaz",
    houseColor: "Topaz",
    roll: "#04",
    admissionNo: "GMIS/PRI/2240",
    status: "in-progress",
    completionPct: 55,
    entered: 6,
    houseLabel: "Topaz Champions",
  },
  {
    id: "esther",
    name: "Esther Damilola Adekunle",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzLVII8fMYbXL21JFGz20OBPuQztGON2c09NSFxJ-mO0gi9kvbdYu96C8OJU49iiSBVEkx7DDAuHZsks25SMbKmqq2hn2sjM7yvcZoqwmehwIAu4oEQGKaMNFP-DJ4c0_OdF_R8wIF4bCAbbD57LglTzMdpdiAvzErReWY2MZOQpuDZJNYgRAwJfsUmd8BjlOdQwae9Ae9uymcCY5npISX3UspPKxLbP_K6umobBU",
    house: "Sapphire",
    houseColor: "Sapphire",
    roll: "#05",
    admissionNo: "GMIS/PRI/2204",
    status: "complete",
    completionPct: 79,
    entered: 11,
    houseLabel: "Sapphire Champions",
  },
  {
    id: "fatima",
    name: "Fatima Haladu Ibrahim",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNCR9WMwKYF6tqBrORU0DHjyTgp70Crzpx28WdpB417qTXfP0Cq-9v1gfb8QTQQR04VSis_F-0nt3rRfkbLbx-DvVRCs5P0zQ1h_IfFAZKYXREUMOenaIQIZ8eLRov_x3BLXm-3L5ArZfbc2TdaRbtjrDV-tc9RUo3Oq_RWimCsPLjOHVyU9uTfjwEJrO4edNE4Z_0_V_F9A5IRW7XOs0ii-9tLwDgvxfgYTzLbgM",
    house: "Topaz",
    houseColor: "Topaz",
    roll: "#06",
    admissionNo: "GMIS/PRI/2231",
    status: "complete",
    completionPct: 85,
    entered: 11,
    houseLabel: "Topaz Champions",
  },
  {
    id: "emeka",
    name: "Emeka Victor Chukwudi",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSVuWscPBovtOoDkr76OzJqoFrgRRERX3qW0ITV4T_ocFr03Cc5s5DGuA02UjAnfNRyAprkxQQUiUpgWQv2A3U46R5vxPeGHfoXbxYHFmkoilPyoR0GEj0y0q896pxW_DHwj0L1E4kYItigENLCSoIa6VRGho9CCjcWXJPfNrymk-popKg_BQ1yL3KsuV82tQK-pTblxApzkztg9IaPPZ1N5F_Idj2ZE481i0vqo",
    house: "Emerald",
    houseColor: "Emerald",
    roll: "#07",
    admissionNo: "GMIS/PRI/2198",
    status: "complete",
    completionPct: 89,
    entered: 11,
    houseLabel: "Emerald Champions",
  },
];

export type SubjectRow = {
  id: string;
  index: number;
  name: string;
  subtitle: string;
  ca: number;
  exam: number;
};

export const AMINA_SUBJECTS: SubjectRow[] = [
  { id: "math", index: 1, name: "Mathematics & Mental Arithmetic", subtitle: "Core Numeracy • Problem Solving", ca: 38, exam: 56 },
  { id: "eng", index: 2, name: "English Language & Phonics", subtitle: "Grammar, Reading & Diction", ca: 37, exam: 55 },
  { id: "sci", index: 3, name: "Basic Science & Technology", subtitle: "Scientific Inquiry & Nature", ca: 35, exam: 53 },
  { id: "soc", index: 4, name: "Social Studies & Civic Education", subtitle: "Civics, Community & Culture", ca: 37, exam: 54 },
  { id: "ict", index: 5, name: "ICT & Scratch Block Coding", subtitle: "Computational Thinking & Media", ca: 39, exam: 58 },
  { id: "agr", index: 6, name: "Agricultural Science", subtitle: "Soil, Crops & Practical Garden", ca: 34, exam: 51 },
  { id: "fre", index: 7, name: "French Language (Oral & Songs)", subtitle: "Conversational French & Grammar", ca: 33, exam: 49 },
  { id: "cca", index: 8, name: "Cultural & Creative Arts (CCA)", subtitle: "Visual Arts, Crafts & Music", ca: 37, exam: 53 },
  { id: "qvr", index: 9, name: "Quantitative & Verbal Reasoning", subtitle: "Aptitude & Logical Deducing", ca: 36, exam: 52 },
  { id: "phe", index: 10, name: "Physical & Health Education (PHE)", subtitle: "Motor Skills, Fitness & Hygiene", ca: 35, exam: 50 },
  { id: "crs", index: 11, name: "Christian Religious Studies / IRS", subtitle: "Moral Instruction & Values", ca: 37, exam: 54 },
];

export const HOMEROOM_REMARKS =
  "Amina has shown exceptional brilliance and exemplary leadership in class this term. She demonstrates outstanding curiosity in STEM subjects and remains a courteous role model for her peers in Basic 4 Diamond.";

export function computeGrade(total: number): { grade: string; label: string } {
  if (total >= 90) return { grade: "A+", label: "Dist." };
  if (total >= 80) return { grade: "A", label: "Excell." };
  if (total >= 70) return { grade: "B", label: "V. Good" };
  if (total >= 60) return { grade: "C", label: "Good" };
  if (total >= 50) return { grade: "P", label: "Pass" };
  return { grade: "NI", label: "Improve" };
}