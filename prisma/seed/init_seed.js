import { prisma } from "@/lib/prisma";

async function main() {
  console.log("Seeding database...");

  try {
    await prisma.staffClass.deleteMany();
    await prisma.subjectFiles.deleteMany();
    await prisma.subjectAnnouncements.deleteMany();
    await prisma.notes.deleteMany();
    await prisma.staff.deleteMany();
    await prisma.preTestRoom.deleteMany();
    await prisma.camper.deleteMany();
    await prisma.class.deleteMany();
    await prisma.subject.deleteMany();
    await prisma.account.deleteMany();

    // Create mock accounts
    await prisma.account.createMany({
      data: [
        { username: "admin", password: "securepassword1", role: "BOARD" },
        { username: "staff", password: "securepassword2", role: "STAFF" },
        { username: "camper1", password: "securepassword3", role: "CAMPER" },
      ],
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error inserting records:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
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
