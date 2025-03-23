import { PHASE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Notes and Phases ...");

  /* Using try-catch for prevent error */
  try {
    // Clearing Existing Data
    console.log("Clearing Phase and Notes data...");

    await prisma.webPhase.deleteMany();
    await prisma.notes.deleteMany();

    console.log("Data cleared successfully.");
  } catch (error) {
    console.error("Error while clearing data:", error);
  }

  /* Creating Defualt Phase */
  try {
    await prisma.webPhase.create({
      data: {
        phase: PHASE.CLOSED,
      },
    });
    console.log("Data cleared successfully.");
  } catch (error) {
    console.error("Error while create phase data:", error);
  }

  /* Create mock camper account */
  await prisma.account.createMany({
    data: [
      { username: "camperNote1", password: "securepassword1", role: "CAMPER" },
      { username: "camperNote2", password: "securepassword2", role: "CAMPER" },
      { username: "camperNote3", password: "securepassword3", role: "CAMPER" },
      { username: "camperNote4", password: "securepassword4", role: "CAMPER" },
    ],
    skipDuplicates: true,
  });

  /* Create mock Camper */
  await prisma.camper.createMany({
    data: [
      {
        camperId: "camperNote1",
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
        room:1,
        healthInfo: "No allergies",
        foodInfo: "Vegetarian",
        certificate: "Basic Camper Certificate",
        scorePostTest: [85.5, 90.0, 88.0],
      },
      {
        camperId: "camperNote2",
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
        room:2,
        healthInfo: "Asthma",
        foodInfo: "No seafood",
        certificate: "Advanced Camper Certificate",
        scorePostTest: [92.0, 95.0, 91.5],
      },
      {
        camperId: "camperNote3",
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
        room:3,
        healthInfo: "Nut allergy",
        foodInfo: "No nuts",
        certificate: "Elite Camper Certificate",
        scorePostTest: [80.0, 82.5, 85.0],
      },
      {
        camperId: "camperNote4",
        name: "Chanatda",
        surname: "Chonkom",
        nickname: "Fah",
        chatbotUserId: "no-line-id",
        contactTel: "0348678901",
        parentTel: "0765412109",
        parentRelation: "Grandmom",
        school: "LMNs School",
        contactEmail: "fahh.brown@example.com",
        idLine: "fah789",
        FEYear: 3,
        room:4,
        healthInfo: "Nut allergy",
        foodInfo: "No eggs",
        certificate: "Elite Camper Certificate",
        scorePostTest: [80.0, 82.5, 85.0],
      },
    ],
    skipDuplicates: true,
  });

  /* Create mock staff account */
  await prisma.account.createMany({
    data: [
      { username: "staffNote2", password: "securepassword2", role: "STAFF" },
      { username: "staffNote4", password: "securepassword4", role: "STAFF" },
      { username: "staffNote5", password: "securepassword5", role: "STAFF" },
      { username: "staffNote7", password: "securepassword7", role: "STAFF" },
      { username: "staffNote9", password: "securepassword9", role: "STAFF" },
    ],
    skipDuplicates: true,
  });
  /* Create mock staff with different StaffDepartment */
  await prisma.staff.createMany({
    data: [
      {
        staffId: "staffNote2",
        name: "Tester2 BOARDREGISTER",
        surname: "Tester2",
        nickname: "Tester2",
        contactTel: "012-345-6789",
        contactEmail: "tester1@gmail.com",
        FEYear: 3,
        engineerDepartment: "AERO",
        staffDepartment: ["BOARD", "REGISTER"],
        healthInfo: "HEALTHINFO",
        foodInfo: "FOODINFO",
        roomNumber: 1,
      },
      {
        staffId: "staffNote4",
        name: "Tester ROOMSTAFF",
        surname: "Tester4",
        nickname: "Tester4",
        contactTel: "012-345-6789",
        contactEmail: "tester1@gmail.com",
        FEYear: 2,
        engineerDepartment: "CEDT",
        staffDepartment: ["ROOMSTAFF"],
        healthInfo: "",
        foodInfo: "",
        roomNumber: 8,
      },
      {
        staffId: "staffNote5",
        name: "Tester5 ",
        surname: "Tester5",
        nickname: "Tester5",
        contactTel: "012-345-6789",
        contactEmail: "tester1@gmail.com",
        FEYear: 2,
        engineerDepartment: "CP",
        staffDepartment: ["REGISTER"],
        healthInfo: "",
        foodInfo: "",
        roomNumber: 3,
      },
      {
        staffId: "staffNote7",
        name: "Tester3 NURSE",
        surname: "Tester3",
        nickname: "Tester3",
        contactTel: "012-345-6789",
        contactEmail: "tester1@gmail.com",
        FEYear: 2,
        engineerDepartment: "Environmental",
        staffDepartment: ["NURSE"],
        healthInfo: "NONE",
        foodInfo: "NONE",
        roomNumber: 5,
      },
      {
        staffId: "staffNote9",
        name: "Tester9 CENTRAL",
        surname: "Tester9",
        nickname: "Tester9",
        contactTel: "012-345-6789",
        contactEmail: "tester1@gmail.com",
        FEYear: 2,
        engineerDepartment: "NANO",
        staffDepartment: ["CENTRAL"],
        healthInfo: "NONE",
        foodInfo: "NONE",
        roomNumber: 5,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seeding staff completed!");

  /* Creating Sample Notes */
  await prisma.notes.createMany({
    data: [
      {
        camperId: "camperNote1",
        staffId: "staffNote5",
        notes:
          "In the evening, I had learned Math about how to calculate my GPA in each term.",
        time: new Date(2025, 5, 20, 8, 45, 5),
        type: "NORMAL",
      },
      {
        camperId: "camperNote1",
        staffId: "staffNote5",
        notes: "Nong camper 1 don't like salad",
        time: new Date(2025, 5, 20, 8, 45, 5),
        type: "HEALTH",
      },
      {
        camperId: "camperNote3",
        staffId: "staffNote4",
        notes:
          "Math is a challenging but rewarding subject where simple rules build into complex concepts that explain the world around us, and while it can be frustrating at times, the feeling of finally understanding something makes it all worthwhile.",
        time: new Date(2025, 5, 20, 14, 30, 5),
        type: "NORMAL",
      },
      {
        camperId: "camperNote1",
        staffId: "staffNote5",
        notes:
          "The restrooms at FE Camp were a bit of a mixed bag.  Sometimes they were fine, other times they were a bit messy, particularly after a large group had used them.  Regular checks and cleaning would greatly improve the experience.",
        time: new Date(2025, 5, 20, 22, 38, 10),
        type: "HEALTH",
      },
      {
        camperId: "camperNote2",
        staffId: "staffNote7",
        notes:
          "Chemistry is the fascinating study of matter and its properties, exploring how substances interact and transform, ultimately revealing the building blocks of our universe.",
        time: new Date(2025, 5, 21, 7, 22, 0),
        type: "NORMAL",
      },
      {
        camperId: "camperNote1",
        staffId: "staffNote4",
        notes:
          "I came into FE Camp not knowing much about science, but P'Neen's class made it accessible and interesting.  I feel like I have a much better understanding of the basic principles now.",
        time: new Date(2025, 5, 21, 10, 59, 0),
        type: "NORMAL",
      },
      {
        camperId: "camperNote1",
        staffId: "staffNote2",
        notes:
          "FE Camp is a good starting point for learning web development, but it's demanding and fast-paced.",
        time: new Date(2025, 5, 21, 18, 0, 0),
        type: "NORMAL",
      },
      {
        camperId: "camperNote4",
        staffId: "staffNote9",
        notes: "I love today snacks very very much !!!",
        time: new Date(2025, 5, 21, 23, 17, 5),
        type: "HEALTH",
      },
    ],
  });
}

console.log("Seeding notes and phase completed !");

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
