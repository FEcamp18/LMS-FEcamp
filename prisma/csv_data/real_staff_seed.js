import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


async function main() {
  console.log("Starting staff seeding from CSV...");
  const csvFilePath = join(__dirname, './FE_staff.csv');
  const fileContent = readFileSync(csvFilePath, 'utf-8');
  if (!fileContent) return;
  
  let records = [];
  try {
    records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      cast: true
    });
  } catch (error) {
    console.log("error while read staff.csv");
    return;
  }

  for (const record of records) {
    try {      
      // Create account using signup API equivalent
      const hashedPassword = await hash(String(record.password), 10);
      
      // First, create the account
      await prisma.account.create({
        data: {
          username: record.staffId,
          password: hashedPassword,
          role: "STAFF",
        },
      });

      // Then, create the staff record
      await prisma.staff.create({
        data: {
          staffId: record.staffId,
          name: record.name,
          surname: record.surname,
          nickname: record.nickname,
          roomNumber: parseInt(record.roomNumber) || 0,
          engineerDepartment: record.engineerDepartment,
          staffDepartment: [
            record.staffDepartment_1,
            ...(record.staffDepartment_2 ? [record.staffDepartment_2] : [])
          ].filter(Boolean),
          contactEmail: record.contactEmail || "",
          contactTel: record.contactTel || "",
          FEYear: parseInt(record.FEYear) || 18,
          foodInfo: record.foodInfo === "-" ? "" : record.foodInfo,
          healthInfo: record.healthInfo === "-" ? "" : record.healthInfo,
        },
      });

      console.log(`Created staff: ${record.staffId} - ${record.name}`);
    } catch (error) {
      console.error(`Error creating staff ${record.staffId}:`, error);
    }
  }

  console.log("Staff seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });