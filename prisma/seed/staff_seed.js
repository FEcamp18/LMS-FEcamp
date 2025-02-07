import { ENGINEERINGDEPARTMENT } from "@/types/ENGINEERINGDEPARTMENT";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Staff database...");

  // Clear Subject and Class tables
  await prisma.account.deleteMany();
  await prisma.staff.deleteMany();
  // await prisma.class.deleteMany();
  // Create mock subjects
  await prisma.staff.createMany({
    data: [
      {
        staffId: "1",
        name: "Tester1 NORMALSTAFF",
        surname: "Tester1",
        nickname: "Tester1",
        contactTel: "012-345-6789",
        contactEmail: "tester1@gmail.com",
        FEYear: 1,
        engineerDepartment: "Civil",
        staffDepartment: ["NORMALSTAFF"],
        healthInfo: "NONE",
        foodInfo: "NONE",
        roomNumber: 0,
      },
      {
        staffId: "2",
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
        staffId: "3",
        name: "Tester3 BOARDVCK",
        surname: "Tester3",
        nickname: "Tester3",
        contactTel: "012-345-6789",
        contactEmail: "tester1@gmail.com",
        FEYear: 2,
        engineerDepartment: "Environmental",
        staffDepartment: ["VCK", "BOARD"],
        healthInfo: "",
        foodInfo: "",
        roomNumber: 8,
      },
      {
        staffId: "4",
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
        staffId: "5",
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
        staffId: "6",
        name: "Tester6 VCK",
        surname: "Tester6",
        nickname: "Tester6",
        contactTel: "012-345-6789",
        contactEmail: "tester1@gmail.com",
        FEYear: 2,
        engineerDepartment: "Environmental",
        staffDepartment: ["VCK"],
        healthInfo: "",
        foodInfo: "",
        roomNumber: 5,
      },
      {
        staffId: "7",
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
        staffId: "8",
        name: "Tester8 WELFARE",
        surname: "Tester8",
        nickname: "Tester8",
        contactTel: "012-345-6789",
        contactEmail: "tester1@gmail.com",
        FEYear: 2,
        engineerDepartment: "ICE",
        staffDepartment: ["WELFARE"],
        healthInfo: "",
        foodInfo: "",
        roomNumber: 3,
      },
      {
        staffId: "9",
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
  });


  console.log("Seeding subjects and classes completed!");
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
