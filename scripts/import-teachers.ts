// scripts/import-teachers.ts
//
//   npx tsx scripts/import-teachers.ts data/teachers.csv --dry   -> preview only
//   npx tsx scripts/import-teachers.ts data/teachers.csv         -> import
//
// Expected CSV headers (Google Form export):
//   Timestamp, Surname, First Name, Other Name, Email, Phone Number, Assigned Class
//
// Each teacher gets a login: email + password = their surname in lowercase.
// mustChangePassword is TRUE, so they must change it on first login.
// Safe to re-run: existing teachers are updated, existing passwords are NOT reset.
import "dotenv/config";
import fs from "node:fs";
import bcrypt from "bcryptjs";
import { parse } from "csv-parse/sync";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const dry = args.includes("--dry");

if (!file) {
  console.error("Usage: npx tsx scripts/import-teachers.ts <file.csv> [--dry]");
  process.exit(1);
}

// "ODUTOLA " -> "Odutola", "mary-jane" -> "Mary-Jane"
const titleCase = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/(^|[\s'-])(\p{L})/gu, (_, sep: string, ch: string) => sep + ch.toUpperCase());

// Accepts 0803..., +234803..., 234803... and 803... (leading zero lost by Excel).
function normalizePhone(raw: string) {
  let p = raw.replace(/[\s()-]/g, "");
  if (p.startsWith("+234")) p = "0" + p.slice(4);
  else if (p.startsWith("234") && p.length === 13) p = "0" + p.slice(3);
  else if (/^[789]\d{9}$/.test(p)) p = "0" + p;
  return /^0[789][01]\d{8}$/.test(p) ? p : null;
}

async function main() {
  const rows = parse(fs.readFileSync(file!), {
    columns: true,
    bom: true,
    skip_empty_lines: true,
    trim: true,
  }) as Record<string, string>[];

  const classes = await prisma.schoolClass.findMany();
  const classByName = new Map(classes.map((c) => [c.name.toLowerCase(), c]));

  const errors: string[] = [];
  const seenEmails = new Set<string>();

  const teachers = rows.flatMap((r, i) => {
    const line = i + 2; // +1 for header, +1 because humans count from 1
    const surname = titleCase(r["Surname"] ?? "");
    const firstName = titleCase(r["First Name"] ?? "");
    const otherName = titleCase(r["Other Name"] ?? "") || null;
    const email = (r["Email"] ?? "").trim().toLowerCase();
    const phone = normalizePhone(r["Phone Number"] ?? "");
    const cls = classByName.get((r["Assigned Class"] ?? "").trim().toLowerCase());

    const problems: string[] = [];
    if (!surname) problems.push("missing surname");
    if (!firstName) problems.push("missing first name");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) problems.push(`bad email "${email}"`);
    if (seenEmails.has(email)) problems.push(`duplicate email "${email}"`);
    if (!phone) problems.push(`bad phone "${r["Phone Number"]}"`);
    if (!cls) problems.push(`unknown class "${r["Assigned Class"]}"`);
    seenEmails.add(email);

    if (problems.length) {
      errors.push(`Row ${line} (${firstName} ${surname}): ${problems.join(", ")}`);
      return [];
    }
    return [
      {
        surname,
        firstName,
        otherName,
        email,
        phone: phone!,
        classId: cls!.id,
        className: cls!.name,
        password: surname.toLowerCase(),
      },
    ];
  });

  if (errors.length) {
    console.error("\nFix these rows in the CSV, then run again. Nothing was imported:\n");
    errors.forEach((e) => console.error("  - " + e));
    process.exit(1);
  }

  console.table(
    teachers.map((t) => ({
      name: `${t.firstName} ${t.surname}`,
      class: t.className,
      email: t.email,
      phone: t.phone,
      password: t.password,
    }))
  );

  // Warn if a class already has a different teacher (e.g. leftover demo data).
  const others = await prisma.teacher.findMany({
    where: {
      classId: { in: teachers.map((t) => t.classId) },
      email: { notIn: teachers.map((t) => t.email) },
    },
    include: { schoolClass: true },
  });
  if (others.length) {
    console.warn("\nWARNING: these classes already have another teacher:");
    others.forEach((o) =>
      console.warn(`  - ${o.schoolClass.name}: ${o.firstName} ${o.surname} (${o.email})`)
    );
    console.warn("  (probably demo data; see seed-demo.ts clean)\n");
  }

  const covered = new Set(teachers.map((t) => t.className));
  const missing = classes.filter((c) => !covered.has(c.name)).map((c) => c.name);
  if (missing.length) console.warn(`No teacher in this file for: ${missing.join(", ")}\n`);

  if (dry) {
    console.log("Dry run only. Nothing was written.");
    return;
  }

  for (const t of teachers) {
    const user = await prisma.user.upsert({
      where: { username: t.email },
      update: {}, // never overwrite an existing password
      create: {
        username: t.email,
        passwordHash: await bcrypt.hash(t.password, 10),
        role: "TEACHER",
        mustChangePassword: true,
      },
    });
    await prisma.teacher.upsert({
      where: { email: t.email },
      update: {
        surname: t.surname,
        firstName: t.firstName,
        otherName: t.otherName,
        phone: t.phone,
        classId: t.classId,
        userId: user.id,
      },
      create: {
        userId: user.id,
        surname: t.surname,
        firstName: t.firstName,
        otherName: t.otherName,
        email: t.email,
        phone: t.phone,
        classId: t.classId,
      },
    });
  }

  console.log(`Imported ${teachers.length} teachers.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());