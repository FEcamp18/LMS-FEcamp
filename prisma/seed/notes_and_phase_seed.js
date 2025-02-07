import { PrismaClient } from "@prisma/client";

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
    await prisma.webPhase.create( // There's only 1 phase >> .create()
        data: {
            phase: PHASE.CLOSED, // Use ENUM in prisma instead
        },
    );

    /* Creating Sample Notes */
    await prisma.notes.createMany({
        data: [
            {
                camperId: "student-1",
                staffId: "staff-5",
                notes: "What is 4+5= ?",
                time: new Date(2025, 5, 20, 14, 30, 5),
            },
            {
                camperId: "student-3",
                staffId: "staff-4",
                notes: "My friend don't talk with me.",
                time: new Date(2025, 5, 21, 8, 15, 0),
            },
        ],
    });

    console.log("Seeding notes and phase completed !");
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