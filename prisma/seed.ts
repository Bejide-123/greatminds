// prisma/seed.ts  (replaces the old one)
// Run with:  npx tsx prisma/seed.ts
// Safe to run more than once (everything is an upsert).
// Needs the ClassSubject model in schema.prisma + a migration first.
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

// Order here = sortOrder (display and, later, promotion).
// Names must match the Google Form "Class" dropdown EXACTLY.
const CLASSES = [
  "TenderHearts", "Kindergarten", "Nursery",
  "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6",
];

// Every subject the school teaches, once. A subject used by several classes
// (e.g. Computer, Comprehension) appears only here.
const SUBJECTS: { code: string; name: string }[] = [
  // Grade 1-6
  { code: "MTH", name: "Mathematics" },
  { code: "CMP", name: "Comprehension" },
  { code: "PHD", name: "Phonics/Diction" },
  { code: "SPD", name: "Spelling and Dictation" },
  { code: "GRM", name: "Grammar" },
  { code: "RVD", name: "Reading & Vocabulary Development" },
  { code: "CMS", name: "Composition" },
  { code: "GST", name: "General Studies" },
  { code: "YOR", name: "Yoruba" },
  { code: "BST", name: "Basic Science & Technology" },
  { code: "NVS", name: "National Values/Social Studies" },
  { code: "QNR", name: "Quantitative Reasoning" },
  { code: "VBR", name: "Verbal Reasoning" },
  { code: "FRN", name: "French" },
  { code: "MRL", name: "Moral Education" },
  // TenderHearts / Kindergarten
  { code: "NWK", name: "Number Work" },
  { code: "LTW", name: "Letter Work" },
  { code: "PRS", name: "Phonics/Reading and Spelling" },
  { code: "HLH", name: "Health Habit" },
  { code: "SCH", name: "Social Habit" },
  { code: "CRM", name: "CRK/Morals" },
  { code: "CMT", name: "Computer" },
  { code: "HWR", name: "Handwriting" },
  { code: "CLR", name: "Colouring" },
  { code: "RHS", name: "Rhymes & Songs" },
  { code: "PRL", name: "Practical Life" },
  { code: "LGD", name: "Language Development" },
  { code: "GNK", name: "General Knowledge" },
  // Nursery (only the ones not already above)
  { code: "MLH", name: "Moral Habit" },
  { code: "DCT", name: "Diction" },
  { code: "QPR", name: "Queen Primer" },
  { code: "WSY", name: "Wise Saying" },
  { code: "NMR", name: "Numeracy" },
  { code: "LTR", name: "Literacy" },
];

// Subject codes per class, in report-card order.
const PRIMARY = [
  "MTH", "CMP", "PHD", "SPD", "GRM", "RVD", "CMS", "GST",
  "YOR", "BST", "NVS", "QNR", "VBR", "FRN", "MRL",
];
const TENDER_KG = [
  "NWK", "LTW", "PRS", "HLH", "SCH", "CRM", "CMT",
  "HWR", "CLR", "RHS", "PRL", "LGD", "GNK",
];
const NURSERY = [
  "SPD", "MLH", "HLH", "SCH", "CMT", "DCT", "QPR",
  "CLR", "WSY", "CMP", "HWR", "NMR", "LTR",
];

// compulsory = subject codes a teacher MUST fill before submitting.
// Only Mathematics for Grade 1-6 for now. Confirm TenderHearts, Kindergarten
// and Nursery with the school before adding any here.
const CLASS_SUBJECTS: Record<string, { codes: string[]; compulsory: string[] }> = {
  TenderHearts: { codes: TENDER_KG, compulsory: [] },
  Kindergarten: { codes: TENDER_KG, compulsory: [] },
  Nursery: { codes: NURSERY, compulsory: [] },
  "Grade 1": { codes: PRIMARY, compulsory: ["MTH"] },
  "Grade 2": { codes: PRIMARY, compulsory: ["MTH"] },
  "Grade 3": { codes: PRIMARY, compulsory: ["MTH"] },
  "Grade 4": { codes: PRIMARY, compulsory: ["MTH"] },
  "Grade 5": { codes: PRIMARY, compulsory: ["MTH"] },
  "Grade 6": { codes: PRIMARY, compulsory: ["MTH"] },
};

async function main() {
  // Classes
  for (const [i, name] of CLASSES.entries()) {
    await prisma.schoolClass.upsert({
      where: { name },
      update: { sortOrder: i + 1 },
      create: { name, sortOrder: i + 1 },
    });
  }

  // Session + terms
  const session = await prisma.academicSession.upsert({
    where: { name: "2026/2027" },
    update: { isCurrent: true },
    create: { name: "2026/2027", isCurrent: true },
  });
  for (const name of ["FIRST", "SECOND", "THIRD"] as const) {
    await prisma.term.upsert({
      where: { sessionId_name: { sessionId: session.id, name } },
      update: {},
      create: { sessionId: session.id, name, isCurrent: name === "FIRST" },
    });
  }

  // Subjects (matched by unique code)
  const subjectByCode = new Map<string, string>();
  for (const s of SUBJECTS) {
    const row = await prisma.subject.upsert({
      where: { code: s.code },
      update: { name: s.name },
      create: { code: s.code, name: s.name },
    });
    subjectByCode.set(s.code, row.id);
  }

  // Which subjects each class takes. This file is the source of truth, so
  // re-running resets sortOrder and isCompulsory to what is written above.
  for (const [className, cfg] of Object.entries(CLASS_SUBJECTS)) {
    const cls = await prisma.schoolClass.findUniqueOrThrow({ where: { name: className } });
    await Promise.all(
      cfg.codes.map((code, i) => {
        const subjectId = subjectByCode.get(code);
        if (!subjectId) throw new Error(`Unknown subject code ${code} in ${className}`);
        return prisma.classSubject.upsert({
          where: { classId_subjectId: { classId: cls.id, subjectId } },
          update: { sortOrder: i + 1, isCompulsory: cfg.compulsory.includes(code) },
          create: {
            classId: cls.id,
            subjectId,
            sortOrder: i + 1,
            isCompulsory: cfg.compulsory.includes(code),
          },
        });
      })
    );
  }

  console.log(
    `Seeded ${CLASSES.length} classes, session 2026/2027 (3 terms), ` +
      `${SUBJECTS.length} subjects and their class assignments.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());