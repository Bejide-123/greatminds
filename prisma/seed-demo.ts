// prisma/seed-demo.ts
// Fake class teachers + students so you can build against realistic data.
//
//   npx tsx prisma/seed-demo.ts         -> create (safe to re-run)
//   npx tsx prisma/seed-demo.ts clean   -> delete them and their results
//
// Run first:  npx tsx prisma/seed.ts  and  npx tsx prisma/seed-test.ts
// (seed-test.ts already gives Grade 1 its teacher, Mrs. Folake Bankole.)
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

const TEACHER_PASSWORD = "Teacher123!";

// [class, title, firstName, surname]
const TEACHERS: [string, string, string, string][] = [
  ["TenderHearts", "Mrs.", "Ronke", "Adeyinka"],
  ["Kindergarten", "Mrs.", "Ijeoma", "Okoro"],
  ["Nursery", "Mrs.", "Hadiza", "Suleiman"],
  ["Grade 2", "Mr.", "Tunde", "Ogundipe"],
  ["Grade 3", "Mrs.", "Chioma", "Nwosu"],
  ["Grade 4", "Mrs.", "Yetunde", "Alabi"],
  ["Grade 5", "Mr.", "Emmanuel", "Ikpe"],
  ["Grade 6", "Mrs.", "Bukola", "Adegoke"],
];

// [surname, firstName, otherName, sex]
type S = [string, string, string, "MALE" | "FEMALE"];
const STUDENTS: Record<string, S[]> = {
  TenderHearts: [
    ["Bello", "Aminat", "", "FEMALE"],
    ["Eze", "Chukwudi", "", "MALE"],
    ["Adeleke", "Tobi", "Michael", "MALE"],
    ["Yusuf", "Hauwa", "", "FEMALE"],
  ],
  Kindergarten: [
    ["Ogunleye", "Damilola", "Grace", "FEMALE"],
    ["Nwachukwu", "Somto", "", "MALE"],
    ["Ibrahim", "Musa", "", "MALE"],
    ["Balogun", "Temitope", "Ruth", "FEMALE"],
  ],
  Nursery: [
    ["Afolabi", "Oluwaseun", "", "MALE"],
    ["Okeke", "Ngozi", "Joy", "FEMALE"],
    ["Danjuma", "Zainab", "", "FEMALE"],
    ["Adewale", "Ayomide", "David", "MALE"],
  ],
  "Grade 1": [
    ["Ojo", "Kehinde", "", "MALE"],
    ["Obi", "Chiamaka", "Faith", "FEMALE"],
    ["Lawal", "Fatima", "", "FEMALE"],
    ["Adebayo", "Ifeoluwa", "John", "MALE"],
  ],
  "Grade 2": [
    ["Salami", "Ibrahim", "", "MALE"],
    ["Nnamdi", "Kamsi", "Peter", "MALE"],
    ["Akinola", "Morenike", "", "FEMALE"],
    ["Umar", "Khadija", "", "FEMALE"],
  ],
  "Grade 3": [
    ["Oladipo", "Seyi", "", "MALE"],
    ["Eze", "Amara", "Blessing", "FEMALE"],
    ["Abubakar", "Hassan", "", "MALE"],
    ["Coker", "Titilayo", "Esther", "FEMALE"],
  ],
  "Grade 4": [
    ["Fashola", "Bisola", "", "FEMALE"],
    ["Onyeka", "Emeka", "Paul", "MALE"],
    ["Garba", "Maryam", "", "FEMALE"],
    ["Akande", "Tobiloba", "", "MALE"],
  ],
  "Grade 5": [
    ["Ajayi", "Oluwatobi", "Hannah", "FEMALE"],
    ["Uche", "Chinedu", "", "MALE"],
    ["Sani", "Aisha", "", "FEMALE"],
    ["Williams", "Ayodele", "Samuel", "MALE"],
  ],
  "Grade 6": [
    ["Olatunji", "Faith", "Oluwadamilare", "FEMALE"],
    ["Okafor", "Obinna", "", "MALE"],
    ["Mohammed", "Aliyu", "", "MALE"],
    ["Adeyemi", "Deborah", "Mercy", "FEMALE"],
  ],
};

// Rough birth year per class (as of the 2026/2027 session).
const BIRTH_YEAR: Record<string, number> = {
  TenderHearts: 2024,
  Kindergarten: 2022,
  Nursery: 2021,
  "Grade 1": 2020,
  "Grade 2": 2019,
  "Grade 3": 2018,
  "Grade 4": 2017,
  "Grade 5": 2016,
  "Grade 6": 2015,
};

function build() {
  const teachers = TEACHERS.map(([className, title, firstName, surname], i) => ({
    className,
    title,
    firstName,
    surname,
    staffId: `T-DEMO-${String(i + 1).padStart(3, "0")}`,
    email: `${firstName}.${surname}@greatminds.test`.toLowerCase(),
    phone: `0805${String(1000000 + i * 137)}`,
  }));

  const students: {
    className: string;
    admissionNumber: string;
    surname: string;
    firstName: string;
    otherName: string | null;
    sex: "MALE" | "FEMALE";
    dateOfBirth: Date;
    guardianName: string;
    guardianPhone: string;
    guardianEmail: string;
  }[] = [];

  let n = 100;
  for (const [className, list] of Object.entries(STUDENTS)) {
    for (const [surname, firstName, otherName, sex] of list) {
      n++;
      if (n === 123) n++; // 123 belongs to the test student from seed-test.ts
      const i = students.length;
      students.push({
        className,
        admissionNumber: `GMIS/2027/${n}`,
        surname,
        firstName,
        otherName: otherName || null,
        sex,
        dateOfBirth: new Date(Date.UTC(BIRTH_YEAR[className], i % 12, (i * 3) % 27 + 1)),
        guardianName: `Mr. & Mrs. ${surname}`,
        guardianPhone: `0803${String(2000000 + i * 311)}`,
        guardianEmail: `${surname}.guardian@example.com`.toLowerCase(),
      });
    }
  }
  return { teachers, students };
}

async function seed() {
  const { teachers, students } = build();
  const classes = await prisma.schoolClass.findMany();
  const classId = (name: string) => {
    const c = classes.find((x) => x.name === name);
    if (!c) throw new Error(`Class "${name}" not found. Run prisma/seed.ts first.`);
    return c.id;
  };

  const teacherHash = await bcrypt.hash(TEACHER_PASSWORD, 10);

  for (const t of teachers) {
    const user = await prisma.user.upsert({
      where: { username: t.email },
      update: {},
      create: {
        username: t.email,
        passwordHash: teacherHash,
        role: "TEACHER",
        mustChangePassword: false,
      },
    });
    await prisma.teacher.upsert({
      where: { email: t.email },
      update: { classId: classId(t.className) },
      create: {
        userId: user.id,
        staffId: t.staffId,
        surname: t.surname,
        firstName: t.firstName,
        email: t.email,
        phone: t.phone,
        classId: classId(t.className),
      },
    });
  }

  for (const s of students) {
    const user = await prisma.user.upsert({
      where: { username: s.admissionNumber },
      update: {},
      create: {
        username: s.admissionNumber,
        passwordHash: await bcrypt.hash(s.surname.toLowerCase(), 10),
        role: "STUDENT",
        mustChangePassword: false,
      },
    });
    await prisma.student.upsert({
      where: { admissionNumber: s.admissionNumber },
      update: { classId: classId(s.className) },
      create: {
        userId: user.id,
        admissionNumber: s.admissionNumber,
        surname: s.surname,
        firstName: s.firstName,
        otherName: s.otherName,
        sex: s.sex,
        dateOfBirth: s.dateOfBirth,
        classId: classId(s.className),
        guardianName: s.guardianName,
        guardianPhone: s.guardianPhone,
        guardianEmail: s.guardianEmail,
      },
    });
  }

  console.log(`Seeded ${teachers.length} teachers and ${students.length} students.`);
  console.log(`Teacher logins: <firstname>.<surname>@greatminds.test / ${TEACHER_PASSWORD}`);
  console.log("Student logins: admission number / lowercase surname");
}

async function clean() {
  const { teachers, students } = build();
  const adm = students.map((s) => s.admissionNumber);
  const emails = teachers.map((t) => t.email);

  const studentRows = await prisma.student.findMany({
    where: { admissionNumber: { in: adm } },
    select: { id: true },
  });
  const teacherRows = await prisma.teacher.findMany({
    where: { email: { in: emails } },
    select: { id: true },
  });

  // Results (and subject rows) go first; they point at the people.
  await prisma.result.deleteMany({
    where: {
      OR: [
        { studentId: { in: studentRows.map((r) => r.id) } },
        { teacherId: { in: teacherRows.map((r) => r.id) } },
      ],
    },
  });
  await prisma.student.deleteMany({ where: { admissionNumber: { in: adm } } });
  await prisma.teacher.deleteMany({ where: { email: { in: emails } } });
  await prisma.user.deleteMany({ where: { username: { in: [...adm, ...emails] } } });
  console.log("Demo teachers and students removed.");
}

(process.argv[2] === "clean" ? clean() : seed())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());