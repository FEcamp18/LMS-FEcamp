import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding camper database...");

  try {
    await prisma.account.createMany({
      data: [
        { username: "camper2", password: "securepassword2", role: "CAMPER" },
        { username: "camper3", password: "securepassword3", role: "CAMPER" },
      ],
      skipDuplicates: true,
    });

    await prisma.camper.createMany({
      data: [
        {
          camperId: "camper1",
          name: "John",
          surname: "Doe",
          nickname: "Johnny",
          chatbotUserId: "no-line-id",
          contactTel: "0123456789",
          parentTel: "0987654321",
          parentRelation: "Father",
          school: "ABC High School",
          contactEmail: "john.doe@example.com",
          idLine: "john123",
          FEYear: 1,
          room: 1,
          healthInfo: "No allergies",
          foodInfo: "Vegetarian",
          certificate: "Basic Camper Certificate",
          scorePostTest: [85.5, 90.0, 88.0],
        },
        {
          camperId: "camper2",
          name: "Alice",
          surname: "Smith",
          nickname: "Ali",
          chatbotUserId: "no-line-id",
          contactTel: "0234567890",
          parentTel: "0876543210",
          parentRelation: "Mother",
          school: "XYZ Academy",
          contactEmail: "alice.smith@example.com",
          idLine: "alice456",
          FEYear: 2,
          room: 2,
          healthInfo: "Asthma",
          foodInfo: "No seafood",
          certificate: "Advanced Camper Certificate",
          scorePostTest: [92.0, 95.0, 91.5],
        },
        {
          camperId: "camper3",
          name: "Michael",
          surname: "Brown",
          nickname: "Mike",
          chatbotUserId: "no-line-id",
          contactTel: "0345678901",
          parentTel: "0765432109",
          parentRelation: "Guardian",
          school: "LMN School",
          contactEmail: "michael.brown@example.com",
          idLine: "mike789",
          FEYear: 3,
          room: 3,
          healthInfo: "Nut allergy",
          foodInfo: "No nuts",
          certificate: "Elite Camper Certificate",
          scorePostTest: [80.0, 82.5, 85.0],
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
