import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding subjects and classes database...");

  await prisma.subject.createMany({
    data: [
      // MATHS
      { subjectId: "MATHS-1", subjectName: "MATHS", subjectTopic: "Algebra 1", subjectDescription: "Set, Logic, Real Number, Relation and Function", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
      { subjectId: "MATHS-2", subjectName: "MATHS", subjectTopic: "Algebra 2", subjectDescription: "Exponential and Logarithm Function, Trigonometric Function, Sequence and Series", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
      { subjectId: "MATHS-3", subjectName: "MATHS", subjectTopic: "Algebra 3", subjectDescription: "Analytics Geometry and Conic Sections, Matrix, Vector, Complex Number", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
      { subjectId: "MATHS-4", subjectName: "MATHS", subjectTopic: "Stat and Prob", subjectDescription: "Combinations, Probability, Statistics", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
      { subjectId: "MATHS-5", subjectName: "MATHS", subjectTopic: "Calculus", subjectDescription: "Limit and Continuity, Derivatives, Anti-Derivatives", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
    
      // PHYSICS
      { subjectId: "PHYSICS-1", subjectName: "PHYSICS", subjectTopic: "Mechanics 1", subjectDescription: "Development of Physics, Linear Motion, Newton\"s Motion Laws, Mechanics Equilibrium", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
      { subjectId: "PHYSICS-2", subjectName: "PHYSICS", subjectTopic: "Mechanics 2", subjectDescription: "Work and Energy, Momentum, Projectile Motion and Circular Motion, Simple Harmonic Motion", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
      { subjectId: "PHYSICS-3", subjectName: "PHYSICS", subjectTopic: "Electrical", subjectDescription: "Electrostatics, Direct Current, Magnetics and Alternating Current, Electromagnetics Wave", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
      { subjectId: "PHYSICS-4", subjectName: "PHYSICS", subjectTopic: "Solid Liquid Gas", subjectDescription: "Heat and Temperature, Gases Kinetic Theory, 1st Thermodynamics\"s Law, Solid Properties, Fluid Mechanics", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
      { subjectId: "PHYSICS-5", subjectName: "PHYSICS", subjectTopic: "Wave and ModPhys", subjectDescription: "Mechanical Wave, Physical Light, Radiographic Light, Sound, Atomic Physics, Nuclear Physics", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
    
      // CHEMISTRY
      { subjectId: "CHEMISTRY-1", subjectName: "CHEMISTRY", subjectTopic: "Chem 1", subjectDescription: "Chemical Bond, Organic Chemistry, Electrochemistry", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
      { subjectId: "CHEMISTRY-2", subjectName: "CHEMISTRY", subjectTopic: "Chem 2", subjectDescription: "Stoichiometry, Chemical Equilibrium, Acid & Base", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
      { subjectId: "CHEMISTRY-3", subjectName: "CHEMISTRY", subjectTopic: "ไม่มีการสอนในค่าย (แต่มีในหนังสือค่าย)", subjectDescription: "Periodic Table, Chemical Formula, Chemical Reaction Rate, Gas, Polymer", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
    
      // TPAT3
      { subjectId: "TPAT3-1", subjectName: "TPAT3", subjectTopic: "TPAT3-1", subjectDescription: "Numerical, Mechanical, Scientifically", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
      { subjectId: "TPAT3-2", subjectName: "TPAT3", subjectTopic: "TPAT3-2", subjectDescription: "Relative Dimensional, News", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
    ],
  });

  const subjectsFECamp = await prisma.subject.findMany();

  let classes = [];

  for (let i = 0; i < subjectsFECamp.length; i++) {
    const subject = subjectsFECamp[i];
    const staffId = i % 2 === 0 ? "staff1" : "staff2";
    if (subject)
      classes.push({ classId: `${subject.subjectId}-101`, subjectId: subject.subjectId, staffId: staffId });
  }

  await prisma.class.createMany({
    data: classes,
  })

  console.log("Seeding subjects and classes completed!");
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
