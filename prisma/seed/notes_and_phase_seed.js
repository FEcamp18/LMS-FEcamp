import { PHASE, PrismaClient } from "@prisma/client";

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
    try {
        await prisma.webPhase.create({
            data: {
                phase: PHASE.CLOSED
            },
        });
        console.log("Data cleared successfully.");
    } catch (error) {
        console.error("Error while create phase data:", error);
    }
   

    /* Creating Sample Notes */
    await prisma.notes.createMany({
        data: [
            {
                camperId: "camper1",
                staffId: "staff5",
                notes: "In the evening, I had learned Math about how to calculate my GPA in each term.",
                time: new Date(2025, 5, 20, 8, 45, 5),
            },
            {
                camperId: "camper3",
                staffId: "staff4",
                notes: "Math is a challenging but rewarding subject where simple rules build into complex concepts that explain the world around us, and while it can be frustrating at times, the feeling of finally understanding something makes it all worthwhile.",
                time: new Date(2025, 5, 20, 14, 30, 5),
            },
            {
                camperId: "camper1",
                staffId: "staff5",
                notes: "The restrooms at FE Camp were a bit of a mixed bag.  Sometimes they were fine, other times they were a bit messy, particularly after a large group had used them.  Regular checks and cleaning would greatly improve the experience.",
                time: new Date(2025, 5, 20, 22, 38, 10),
            },
            {
                camperId: "camper2",
                staffId: "staff7",
                notes: "Chemistry is the fascinating study of matter and its properties, exploring how substances interact and transform, ultimately revealing the building blocks of our universe.",
                time: new Date(2025, 5, 21, 7, 22, 0),
            },
            {
                camperId: "camper1",
                staffId: "staff5",
                notes: "I came into FE Camp not knowing much about science, but P'Neen's class made it accessible and interesting.  I feel like I have a much better understanding of the basic principles now.",
                time: new Date(2025, 5, 21, 10, 59, 0),
            },
            {
                camperId: "camper1",
                staffId: "staff1",
                notes: "FE Camp is a good starting point for learning web development, but it's demanding and fast-paced.",
                time: new Date(2025, 5, 21, 18, 0, 0),
            },
            {
                camperId: "camper2",
                staffId: "staff3",
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