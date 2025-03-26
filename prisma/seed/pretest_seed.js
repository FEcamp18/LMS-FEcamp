import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding pretest database...");

  try {
    await prisma.preTestRoom.createMany({
      data: [
        {
          camperId: "camper1",
          examNumber: 1,
          seatNumber: 1,
          examLocation: "ห้อง 306 ชั้น 3 ตึก 1",
        },
        {
          camperId: "camper2",
          examNumber: 2,
          seatNumber: 13,
          examLocation: "ห้อง 306 ชั้น 3 ตึก 1",
        },
        {
          camperId: "camper3",
          examNumber: 3,
          seatNumber: 34,
          examLocation: "ห้อง 306 ชั้น 3 ตึก 1",
        },
        {
          camperId: "camperNote1",
          examNumber: 4,
          seatNumber: 34,
          examLocation: "ห้อง 415 ชั้น 4 ตึก 3",
        },
        {
          camperId: "camperNote2",
          examNumber: 5,
          seatNumber: 13,
          examLocation: "ห้อง 415 ชั้น 4 ตึก 3",
        },
        {
          camperId: "camperNote3",
          examNumber: 6,
          seatNumber: 43,
          examLocation: "ห้อง 309 ชั้น 3 ตึก 3",
        },
        {
          camperId: "camperNote4",
          examNumber: 7,
          seatNumber: 56,
          examLocation: "ห้อง 309 ชั้น 3 ตึก 3",
        },
      ],
      skipDuplicates: true,
    });

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error inserting records:", error);
  } finally {
    await prisma.$disconnect();
  }
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
