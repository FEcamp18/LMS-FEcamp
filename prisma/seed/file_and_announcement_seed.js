import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  console.log("Seeding file and announcement database...")
  try {
    await prisma.subjectFiles.createMany({
      data: [
        // MATHS
        {
          subjectId: "MATHS-1",
          fileTitle: "Algebra 1",
          fileDescription: "Set, Logic, Real Number, Relation and Function",
          fileLocation: "/files/maths/algebra1.pdf",
        },
        {
          subjectId: "MATHS-2",
          fileTitle: "Algebra 2",
          fileDescription:
            "Exponential and Logarithm Function, Trigonometric Function, Sequence and Series",
          fileLocation: "/files/maths/algebra2.pdf",
        },
        {
          subjectId: "MATHS-3",
          fileTitle: "Algebra 3",
          fileDescription:
            "Analytics Geometry and Conic Sections, Matrix, Vector, Complex Number",
          fileLocation: "/files/maths/algebra3.pdf",
        },
        {
          subjectId: "MATHS-4",
          fileTitle: "Stat and Prob",
          fileDescription: "Combinations, Probability, Statistics",
          fileLocation: "/files/maths/statprob.pdf",
        },
        {
          subjectId: "MATHS-5",
          fileTitle: "Calculus",
          fileDescription:
            "Limit and Continuity, Derivatives, Anti-Derivatives",
          fileLocation: "/files/maths/calculus.pdf",
        },

        // PHYSICS
        {
          subjectId: "PHYSICS-1",
          fileTitle: "Mechanics 1",
          fileDescription:
            "Development of Physics, Linear Motion, Newton's Motion Laws, Mechanics Equilibrium",
          fileLocation: "/files/physics/mechanics1.pdf",
        },
        {
          subjectId: "PHYSICS-2",
          fileTitle: "Mechanics 2",
          fileDescription:
            "Work and Energy, Momentum, Projectile Motion and Circular Motion, Simple Harmonic Motion",
          fileLocation: "/files/physics/mechanics2.pdf",
        },
        {
          subjectId: "PHYSICS-3",
          fileTitle: "Electrical",
          fileDescription:
            "Electrostatics, Direct Current, Magnetics and Alternating Current, Electromagnetics Wave",
          fileLocation: "/files/physics/electrical.pdf",
        },
        {
          subjectId: "PHYSICS-4",
          fileTitle: "Solid Liquid Gas",
          fileDescription:
            "Heat and Temperature, Gases Kinetic Theory, 1st Thermodynamics' Law, Solid Properties, Fluid Mechanics",
          fileLocation: "/files/physics/solid-liquid-gas.pdf",
        },
        {
          subjectId: "PHYSICS-5",
          fileTitle: "Wave and ModPhys",
          fileDescription:
            "Mechanical Wave, Physical Light, Radiographic Light, Sound, Atomic Physics, Nuclear Physics",
          fileLocation: "/files/physics/wave-modphys.pdf",
        },

        // CHEMISTRY
        {
          subjectId: "CHEMISTRY-1",
          fileTitle: "Chem 1",
          fileDescription: "Chemical Bond, Organic Chemistry, Electrochemistry",
          fileLocation: "/files/chemistry/chem1.pdf",
        },
        {
          subjectId: "CHEMISTRY-2",
          fileTitle: "Chem 2",
          fileDescription: "Stoichiometry, Chemical Equilibrium, Acid & Base",
          fileLocation: "/files/chemistry/chem2.pdf",
        },

        // TPAT3
        {
          subjectId: "TPAT3-1",
          fileTitle: "TPAT3-1",
          fileDescription: "Numerical, Mechanical, Scientifically",
          fileLocation: "/files/tpat3/tpat3-1.pdf",
        },
        {
          subjectId: "TPAT3-2",
          fileTitle: "TPAT3-2",
          fileDescription: "Relative Dimensional, News",
          fileLocation: "/files/tpat3/tpat3-2.pdf",
        },
      ],
      skipDuplicates: true,
    })

    await prisma.subjectAnnouncements.createMany({
      data: [
        // MATHS
        {
          subjectId: "MATHS-1",
          annoTitle: "MATHS-1 Announcement",
          annoText: "This is MATHS-1 Announcement",
        },
        {
          subjectId: "MATHS-2",
          annoTitle: "MATHS-2 Announcement",
          annoText: "This is MATHS-2 Announcement",
        },
        {
          subjectId: "MATHS-3",
          annoTitle: "MATHS-3 Announcement",
          annoText: "This is MATHS-3 Announcement",
        },
        {
          subjectId: "MATHS-4",
          annoTitle: "MATHS-4 Announcement",
          annoText: "This is MATHS-4 Announcement",
        },
        {
          subjectId: "MATHS-5",
          annoTitle: "MATHS-5 Announcement",
          annoText: "This is MATHS-5 Announcement",
        },

        // PHYSICS
        {
          subjectId: "PHYSICS-1",
          annoTitle: "PHYSICS-1 Announcement",
          annoText: "This is PHYSICS-1 Announcement",
        },
        {
          subjectId: "PHYSICS-2",
          annoTitle: "PHYSICS-2 Announcement",
          annoText: "This is PHYSICS-2 Announcement",
        },
        {
          subjectId: "PHYSICS-3",
          annoTitle: "PHYSICS-3 Announcement",
          annoText: "This is PHYSICS-3 Announcement",
        },
        {
          subjectId: "PHYSICS-4",
          annoTitle: "PHYSICS-4 Announcement",
          annoText: "This is PHYSICS-4 Announcement",
        },
        {
          subjectId: "PHYSICS-5",
          annoTitle: "PHYSICS-5 Announcement",
          annoText: "This is PHYSICS-5 Announcement",
        },

        // CHEMISTRY
        {
          subjectId: "CHEMISTRY-1",
          annoTitle: "CHEMISTRY-1 Announcement",
          annoText: "This is CHEMISTRY-1 Announcement",
        },
        {
          subjectId: "CHEMISTRY-2",
          annoTitle: "CHEMISTRY-2 Announcement",
          annoText: "This is CHEMISTRY-2 Announcement",
        },

        // TPAT3
        {
          subjectId: "TPAT3-1",
          annoTitle: "TPAT3-1 Announcement",
          annoText: "This is TPAT3-1 Announcement",
        },
        {
          subjectId: "TPAT3-2",
          annoTitle: "TPAT3-2 Announcement",
          annoText: "This is TPAT3-2 Announcement",
        },
      ],
      skipDuplicates: true,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error inserting records:", error.message)
    } else {
      console.error("Unknown error:", error)
    }
  }
  console.log("Seeding completed.")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
