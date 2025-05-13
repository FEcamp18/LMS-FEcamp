import { hash } from "bcryptjs";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seedData = async () => {
  try {
    // Camper data
    const camper = {
      name: "camper_dev",
      password: "dev-password-camper",
      role: "camper",
    };

    // Staff data
    const staff = {
      name: "staff_dev",
      password: "dev-password-staff",
      role: "tutor",
    };

    // Board data
    const board = {
      name: "board_dev",
      password: "dev-password-board",
      role: "board",
    };

    const camper_hashedPassword = await hash(String(camper.password), 10);
    const staff_hashedPassword = await hash(String(staff.password), 10);
    const board_hashedPassword = await hash(String(board.password), 10);

    await prisma.account.createMany({
      data: [
        {
          username: camper.name,
          password: camper_hashedPassword,
          role: "CAMPER",
        },
        {
          username: staff.name,
          password: staff_hashedPassword,
          role: "STAFF",
        },
        {
          username: board.name,
          password: board_hashedPassword,
          role: "BOARD",
        },
      ],
    });

    // Create camper
    await prisma.camper.create({
      data: {
        camperId: "camper_dev",
        name: "Dev Camper",
        surname: "Testing",
        nickname: "DevC",
        chatbotUserId: "camper-line-id",
        contactTel: "0811234567",
        parentTel: "0899876543",
        parentRelation: "Mother",
        school: "Dev High School",
        contactEmail: "devcamper@test.com",
        idLine: "devcamper_line",
        FEYear: 2,
        room: 201,
        healthInfo: "No allergies",
        foodInfo: "No restrictions",
        miscellaneous: "Testing account",
        certificate: "FE Certificate",
        scorePostTest: [95.0, 88.5, 92.0, 89.5],
      },
    });

    // Create staff
    await prisma.staff.createMany({
      data: [
        {
          staffId: "staff_dev",
          name: "Dev Staff",
          surname: "Testing",
          roomNumber: 5,
          nickname: "DevS",
          contactTel: "0823456789",
          contactEmail: "devstaff@test.com",
          FEYear: 2,
          engineerDepartment: "CP",
          staffDepartment: ["VCK", "CENTRAL"],
          healthInfo: "None",
          foodInfo: "None",
        },
        {
          staffId: "board_dev",
          name: "Dev Board",
          surname: "Testing",
          nickname: "DevB",
          contactTel: "0834567890",
          engineerDepartment: "CP",
          contactEmail: "devboard@test.com",
          staffDepartment: ["BOARD"],
          healthInfo: "None",
          foodInfo: "None",
          roomNumber: 0,
        },
      ],
    });
  } catch (error) {
    console.error("Error inserting records:", error);
  }
};

const main = async () => {
  try {
    await seedData();
  } catch (error) {
    console.error("Error in main:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};
void main();
