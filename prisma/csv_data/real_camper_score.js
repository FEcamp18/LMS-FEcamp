import { parse } from "csv-parse/sync";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  console.log("Starting postTestScore seeding...");
  const csvFilePath = join(__dirname, "./FE_camper_score.csv");
  const fileContent = readFileSync(csvFilePath, "utf-8");
  if (!fileContent) return;

  let records = [];
  try {
    records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      cast: true,
    });
  } catch {
    console.log("Error while reading FE_camper_score.csv");
    return;
  }

  for (const record of records) {
    try {
      // Parse each score as a float
      const maths = parseFloat(record.Maths);
      const physics = parseFloat(record.Physics);
      const chemistry = parseFloat(record.Chemistry);
      const tpat3 = parseFloat(record.TPAT3);

      // Check for invalid values
      if (
        isNaN(maths) ||
        isNaN(physics) ||
        isNaN(chemistry) ||
        isNaN(tpat3)
      ) {
        console.log(
          `Invalid score for camper ${record.camperId}:`,
          record
        );
        continue;
      }

      await prisma.camper.update({
        where: {
          camperId: String(record.camperId),
        },
        data: {
          scorePostTest: [maths, physics, chemistry, tpat3],
        },
      });

      // console.log(`Updated postTestScore for camper: ${record.camperId}`);
    } catch (error) {
      console.error(
        `Error updating postTestScore for camper ${record.camperId}:`,
        error,
      );
    }
  }
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