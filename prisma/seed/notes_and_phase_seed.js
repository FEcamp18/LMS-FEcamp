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
                noteId: 000001,
                camperId: "student-1",
                staffId: "staff-5",
                notes: "In the evening, I had learned Math about how to calculate my GPA in each term.",
                time: new Date(2025, 5, 20, 8, 45, 5),
            },
            {
                noteId: 000002,
                camperId: "student-3",
                staffId: "staff-4",
                notes: "Math is a challenging but rewarding subject where simple rules build into complex concepts that explain the world around us, and while it can be frustrating at times, the feeling of finally understanding something makes it all worthwhile.",
                time: new Date(2025, 5, 20, 14, 30, 5),
            },
            {
                noteId: 0000003,
                camperId: "student-2",
                staffId: "staff-7",
                notes: "Chemistry is the fascinating study of matter and its properties, exploring how substances interact and transform, ultimately revealing the building blocks of our universe.",
                time: new Date(2025, 5, 21, 7, 22, 0),
            },
            {
                noteId: 000004,
                camperId: "student-1",
                staffId: "staff-14",
                notes: "FE Camp is a good starting point for learning web development, but it's demanding and fast-paced.",
                time: new Date(2025, 5, 21, 18, 00, 0),
            },
            {
                noteId: 000005,
                camperId: "student-8",
                staffId: "staff-3",
                notes: "I love today snacks very very much !!!",
                time: new Date(2025, 5, 21, 23, 17, 5),
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