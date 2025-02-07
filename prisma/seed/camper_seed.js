import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding camper database...");

  try {
    await prisma.account.createMany({
      data: [
        { username: "camper2", password: "securepassword4", role: "CAMPER" },
        { username: "camper3", password: "securepassword5", role: "CAMPER" },
      ],
    });

    const camper2 = await prisma.camper.create({
      data: {
        camperId: "camp2",
        name: "Alice",
        surname: "Smith",
        nickname: "Ali",
        chatbotUserId: "chat456",
        contactTel: "0234567890",
        parentTel: "0876543210",
        parentRelation: "Mother",
        school: "XYZ Academy",
        contactEmail: "alice.smith@example.com",
        idLine: "alice456",
        FEYear: 1,
        room: 102,
        healthInfo: "Asthma",
        foodInfo: "No seafood",
        certificate: "Advanced Camper Certificate",
        scorePostTest: [92.0, 95.0, 91.5],
      },
    });

    const camper3 = await prisma.camper.create({
      data: {
        camperId: "camp3",
        name: "Michael",
        surname: "Brown",
        nickname: "Mike",
        chatbotUserId: "chat789",
        contactTel: "0345678901",
        parentTel: "0765432109",
        parentRelation: "Guardian",
        school: "LMN School",
        contactEmail: "michael.brown@example.com",
        idLine: "mike789",
        FEYear: 1,
        room: 103,
        healthInfo: "Nut allergy",
        foodInfo: "No nuts",
        certificate: "Elite Camper Certificate",
        scorePostTest: [80.0, 82.5, 85.0],
      },
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

