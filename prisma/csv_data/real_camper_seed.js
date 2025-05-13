import { parse } from "csv-parse/sync"
import { readFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import { hash } from "bcryptjs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function main() {
  console.log("Starting camper seeding from CSV...")
  const csvFilePath = join(__dirname, "./FE_camper.csv")
  const fileContent = readFileSync(csvFilePath, "utf-8")
  if (!fileContent) return

  let records = []
  try {
    records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      cast: true,
    })
  } catch (error) {
    console.log("error while reading camper.csv")
    return
  }

  for (const record of records) {
    try {
      const password = record.password
      const hashedPassword = await hash(String(password), 10)

      // First, create the account
      await prisma.account.create({
        data: {
          username: String(record.camperId),
          password: hashedPassword,
          role: "CAMPER",
        },
      })

      // Then, create the camper record
      await prisma.camper.create({
        data: {
          camperId: String(record.camperId),
          name: record.name,
          surname: record.surname,
          nickname: record.nickname,
          contactTel: record.contactTel || "",
          parentTel: record.parentTel || "",
          parentRelation: record.parentRelation || "",
          school: record.school || "",
          contactEmail: record.contactEmail || "",
          idLine: String(record.idLine) || "",
          FEYear: parseInt(record.FEYear) || 18,
          foodInfo: record.foodInfo === "-" ? "-" : record.foodInfo,
          healthInfo: record.healthInfo === "-" ? "-" : record.healthInfo,
          miscellaneous: `Book: ${record.ต้องการรับหนังสือแบบใด || "-"}; Shirt: ${record.ไซส์เสื้อ || "-"}`,
          room: 0,
        },
      })

      // Update camper pretest
      await prisma.preTestRoom.create({
        data: {
          camperId: String(record.camperId),
          examNumber: record.examNumber,
          seatNumber: record.seatNumber,
          examLocation: `ตึก 3 ห้อง ${String(record.examLocation)}`,
        },
      })
      // console.log(`Created camper: ${record.camperId} - ${record.name}`);
    } catch (error) {
      console.error(`Error creating camper ${record.camperId}:`, error)
    }
  }

  console.log("Camper seeding completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
