// prisma/seed.ts
// Run with:  npx tsx prisma/seed.ts
// Safe to run more than once (uses upsert).
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

// Order here = sortOrder (used for display and, later, promotion).
// These names must match the Google Form "Class" dropdown EXACTLY.
const classes = [
  "TenderHearts",
  "Kindergarten",
  "Nursery",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
];

// Order here = the order subjects appear on the report card.
// isCompulsory: only Mathematics for now. English is NOT in the school's
// list (it has Comprehension, Grammar, etc.), so confirm with the school
// before marking anything else compulsory.
const subjects = [
  { code: "MTH", name: "Mathematics", isCompulsory: true },
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
];

async function main() {
  for (const [i, name] of classes.entries()) {
    await prisma.schoolClass.upsert({
      where: { name },
      update: { sortOrder: i + 1 },
      create: { name, sortOrder: i + 1 },
    });
  }

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

  for (const [i, s] of subjects.entries()) {
    await prisma.subject.upsert({
      where: { name: s.name },
      // isCompulsory is left out of update so re-running never overwrites edits.
      update: { code: s.code, sortOrder: i + 1 },
      create: {
        name: s.name,
        code: s.code,
        isCompulsory: s.isCompulsory ?? false,
        sortOrder: i + 1,
      },
    });
  }

  console.log(
    `Seeded ${classes.length} classes, session 2026/2027 (3 terms), ${subjects.length} subjects.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());