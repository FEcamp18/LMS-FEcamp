import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding camper database...");

  try {
    await prisma.account.createMany({
      data: [
        { username: "camper1", password: "securepassword1", role: "CAMPER" },
        { username: "camper2", password: "securepassword2", role: "CAMPER" },
        { username: "camper3", password: "securepassword3", role: "CAMPER" },
      ],
    });

    const camper1 = await prisma.camper.create({
      data: {
        camperId: "camp1",
        name: "John",
        surname: "Doe",
        nickname: "Johnny",
        chatbotUserId: "chat123",
        contactTel: "0123456789",
        parentTel: "0987654321",
        parentRelation: "Father",
        school: "ABC High School",
        contactEmail: "john.doe@example.com",
        idLine: "john123",
        FEYear: 1,
        room: 101,
        healthInfo: "No allergies",
        foodInfo: "Vegetarian",
        certificate: "Basic Camper Certificate",
        scorePostTest: [85.5, 90.0, 88.0],
      },
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
        FEYear: 2,
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
        FEYear: 3,
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

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
