import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  try {
    
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
          { staffId: "staff3", name: "Charlie" },
        ]
      });

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error inserting records:', error.message);
    } else {
      console.error('Unknown error:', error);
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
