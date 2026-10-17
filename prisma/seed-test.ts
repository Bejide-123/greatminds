// prisma/seed-test.ts
// Creates TEST accounts so you can build and try the portal before the
// school's real data arrives.
//
//   npx tsx prisma/seed-test.ts         -> create / refresh test accounts
//   npx tsx prisma/seed-test.ts clean   -> delete them (and their results)
//
// Run `npx tsx prisma/seed.ts` first (classes must exist).
// Requires: npm i bcryptjs
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

const STUDENT = {
  admissionNumber: "GMIS/2027/123",
  surname: "Okonkwo",
  firstName: "Adaeze",
  otherName: "Grace",
  guardianName: "Mr. Chukwuemeka Okonkwo",
  guardianPhone: "08031234567",
  guardianEmail: "okonkwo.guardian@example.com",
};
// Student password = surname in lowercase ("okonkwo").
// On login, lowercase + trim whatever the user types before comparing.

const TEACHER = {
  staffId: "T-TEST-001",
  surname: "Bankole",
  firstName: "Folake",
  email: "teacher@greatminds.test",
  phone: "08051234567",
  password: "Teacher123!",
};

const ADMIN = {
  email: "admin@greatminds.test",
  password: "Admin123!",
};

const hash = (p: string) => bcrypt.hash(p, 10);

async function seed() {
  const grade1 = await prisma.schoolClass.findUniqueOrThrow({
    where: { name: "Grade 1" },
  });

  await prisma.user.upsert({
    where: { username: ADMIN.email },
    update: {},
    create: {
      username: ADMIN.email,
      passwordHash: await hash(ADMIN.password),
      role: "ADMIN",
      mustChangePassword: false,
    },
  });

  const teacherUser = await prisma.user.upsert({
    where: { username: TEACHER.email },
    update: {},
    create: {
      username: TEACHER.email,
      passwordHash: await hash(TEACHER.password),
      role: "TEACHER",
      mustChangePassword: false,
    },
  });
  await prisma.teacher.upsert({
    where: { email: TEACHER.email },
    update: { classId: grade1.id },
    create: {
      userId: teacherUser.id,
      staffId: TEACHER.staffId,
      surname: TEACHER.surname,
      firstName: TEACHER.firstName,
      email: TEACHER.email,
      phone: TEACHER.phone,
      classId: grade1.id,
    },
  });

  const studentUser = await prisma.user.upsert({
    where: { username: STUDENT.admissionNumber },
    update: {},
    create: {
      username: STUDENT.admissionNumber,
      passwordHash: await hash(STUDENT.surname.toLowerCase()),
      role: "STUDENT",
      mustChangePassword: false,
    },
  });
  await prisma.student.upsert({
    where: { admissionNumber: STUDENT.admissionNumber },
    update: { classId: grade1.id },
    create: {
      userId: studentUser.id,
      admissionNumber: STUDENT.admissionNumber,
      surname: STUDENT.surname,
      firstName: STUDENT.firstName,
      otherName: STUDENT.otherName,
      sex: "FEMALE",
      dateOfBirth: new Date("2018-05-14"),
      classId: grade1.id,
      guardianName: STUDENT.guardianName,
      guardianPhone: STUDENT.guardianPhone,
      guardianEmail: STUDENT.guardianEmail,
    },
  });

  console.log("Test accounts ready:");
  console.log(`  Student: ${STUDENT.admissionNumber} / ${STUDENT.surname.toLowerCase()}`);
  console.log(`  Teacher: ${TEACHER.email} / ${TEACHER.password}`);
  console.log(`  Admin:   ${ADMIN.email} / ${ADMIN.password}`);
}

async function clean() {
  const student = await prisma.student.findUnique({
    where: { admissionNumber: STUDENT.admissionNumber },
  });
  const teacher = await prisma.teacher.findUnique({
    where: { email: TEACHER.email },
  });
  const admin = await prisma.user.findUnique({
    where: { username: ADMIN.email },
  });

  // Results (and their subject rows) must go before the people they point to.
  if (student) await prisma.result.deleteMany({ where: { studentId: student.id } });
  if (teacher) await prisma.result.deleteMany({ where: { teacherId: teacher.id } });
  if (admin)
    await prisma.result.updateMany({
      where: { reviewedById: admin.id },
      data: { reviewedById: null },
    });

  if (student) await prisma.student.delete({ where: { id: student.id } });
  if (teacher) await prisma.teacher.delete({ where: { id: teacher.id } });
  await prisma.user.deleteMany({
    where: {
      username: { in: [STUDENT.admissionNumber, TEACHER.email, ADMIN.email] },
    },
  });
  console.log("Test accounts removed.");
}

(process.argv[2] === "clean" ? clean() : seed())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());