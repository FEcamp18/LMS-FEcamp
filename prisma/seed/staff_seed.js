import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Staff database...");

  // Create mock subjects
  await prisma.account.createMany({
    data: [
      { username: "staff1", password: "securepassword1", role: "STAFF" },
      { username: "staff2", password: "securepassword2", role: "STAFF" },
      { username: "staff3", password: "securepassword3", role: "STAFF" },
      { username: "staff4", password: "securepassword4", role: "STAFF" },
      { username: "staff5", password: "securepassword5", role: "STAFF" },
      { username: "staff6", password: "securepassword6", role: "STAFF" },
      { username: "staff7", password: "securepassword7", role: "STAFF" },
      { username: "staff8", password: "securepassword8", role: "STAFF" },
      { username: "staff9", password: "securepassword9", role: "STAFF" },
      { username: "dev-staff", password: "$2b$10$CiACGDAA3W.tH1e6d62T8.WNb41mRLN3/M0UxuahrnkdJ8CKsPQva", role: "STAFF" },
    ],
    skipDuplicates: true,
  });
  //Create mock staff with different StaffDepartment
  await prisma.staff.createMany({
    data: [
      {
        staffId: "staff1",
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
        staffId: "staff2",
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
        staffId: "staff3",
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
        staffId: "staff4",
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
        staffId: "staff5",
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
        staffId: "staff6",
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
        staffId: "staff7",
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
        staffId: "staff8",
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
        staffId: "staff9",
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
      {
        staffId: "dev-staff",
        name: "dev",
        surname: "staff",
        nickname: "devStaff",
        contactTel: "012-345-6789",
        contactEmail: "tester1@gmail.com",
        FEYear: 2,
        engineerDepartment: "NANO",
        staffDepartment: ["CENTRAL", "BOARD", "VCK", "ROOMSTAFF"],
        healthInfo: "ผมแพ้หัวใจของเทอ",
        foodInfo: "ไม่กินของไม่อร่อย",
        roomNumber: 5,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seeding staff completed!");
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
