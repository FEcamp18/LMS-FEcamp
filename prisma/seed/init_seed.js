import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create mock accounts
  await prisma.account.createMany({
    data: [
      { username: "admin", password: "securepassword1", role: "BOARD" },
      { username: "staff", password: "securepassword2", role: "STAFF" },
      { username: "camper1", password: "securepassword3", role: "CAMPER" },
    ],
  });

  // Create mock staff
  await prisma.staff.createMany({
    data: [
      { staffId: "staff1", name: "Alice" },
      { staffId: "staff2", name: "Bob" },
    ],
  });

  // Create mock subjects
  const subject1 = await prisma.subject.create({
    data: {
      subjectId: "math",
      subjectName: "MATHS",
      subjectTopic: "Algebra and Geometry",
      subjectPicture: "/image/subject-picture/temp-subject-image.jpg",
      subjectDescription: "An introduction to mathematics.",
    },
  });

  const subject2 = await prisma.subject.create({
    data: {
      subjectId: "science",
      subjectName: "PHYSICS",
      subjectTopic: "Physics and Chemistry",
      subjectPicture: "/image/subject-picture/temp-subject-image.jpg",
      subjectDescription: "Learn the fundamentals of science.",
    },
  });

  // Create mock classes
  await prisma.class.createMany({
    data: [
      { classId: "math101", subjectId: subject1.subjectId },
      { classId: "science101", subjectId: subject2.subjectId },
    ],
  });

  console.log("Seeding completed.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
