import { parse } from "csv-parse/sync"
import { readFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function main() {
  console.log("Starting room assignment seeding...")
  const csvFilePath = join(__dirname, "./FE_camper_room.csv")
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
    console.log("Error while reading camper_room.csv")
    return
  }

  for (const record of records) {
    try {
      const room = parseInt(record.room)
      if (room < 1 || room > 8) {
        console.log(`Invalid room number ${room} for camper ${record.camperId}`)
        continue
      }

      await prisma.camper.update({
        where: {
          camperId: String(record.camperId),
        },
        data: {
          room: room,
        },
      })

      //   console.log(`Updated room ${room} for camper: ${record.camperId}`);
    } catch (error) {
      console.error(`Error updating room for camper ${record.camperId}:`, error)
    }
  }

  console.log("Room assignment completed!")
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
