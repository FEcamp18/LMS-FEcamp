import { PHASE } from "@prisma/client"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  try {
    // Clearing Existing Data
    console.log("Clearing Phase and Notes data...")

    await prisma.staffClass.deleteMany()
    await prisma.webPhase.deleteMany()
    await prisma.subjectFiles.deleteMany()
    await prisma.subjectAnnouncements.deleteMany()
    await prisma.notes.deleteMany()
    await prisma.staff.deleteMany()
    await prisma.preTestRoom.deleteMany()
    await prisma.camper.deleteMany()
    await prisma.class.deleteMany()
    await prisma.subject.deleteMany()
    await prisma.account.deleteMany()

    console.log("Data cleared successfully.")
  } catch (error) {
    console.error("Error while clearing data:", error)
  }

  /* Creating Defualt Phase */
  try {
    console.log("Seeding Phases ...")
    await prisma.webPhase.create({
      data: {
        phase: PHASE.CAMP,
      },
    })
    console.log("Data cleared successfully.")
  } catch (error) {
    console.error("Error while create phase data:", error)
  }

  
}

console.log("Seeding notes and phase completed !")

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
