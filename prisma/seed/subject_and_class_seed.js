import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding subjects and classes database...");

  // Create mock subjects
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
    
      // TPAT3
      { subjectId: "TPAT3-1", subjectName: "TPAT3", subjectTopic: "TPAT3-1", subjectDescription: "Numerical, Mechanical, Scientifically", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
      { subjectId: "TPAT3-2", subjectName: "TPAT3", subjectTopic: "TPAT3-2", subjectDescription: "Relative Dimensional, News", subjectPicture: "/image/subject-picture/temp-subject-image.jpg" },
    ],
    skipDuplicates:true,
  });

  const subjectsFECamp = await prisma.subject.findMany();
  const l_subjects = subjectsFECamp.length;

  // Conditions:
  // Campers will be separated into 8 rooms.
  // Each room will have a different time schedule.
  // Camper will join many classes through time schedule
  // ----------------------------------------------------------------
  // From above, I decided to make every room has same subject in each time slot

  const camper_rooms = [1,2,3,4,5,6,7,8];
  const day_time = [
    { day: "2025-05-18", slots: ["09:00:00", "13:00:00"] },
    { day: "2025-05-19", slots: ["09:00:00", "13:00:00"] },
    { day: "2025-05-20", slots: ["09:00:00", "13:00:00"] },
    { day: "2025-05-21", slots: ["09:00:00", "13:00:00"] },
    { day: "2025-05-22", slots: ["09:00:00", "13:00:00"] },
    { day: "2025-05-23", slots: ["09:00:00", "13:00:00"] },
    { day: "2025-05-24", slots: ["09:00:00", "13:00:00"] },
  ];
  const totalSlots = day_time.length * 2;

  let classes = [];

  // Create mock classes
  for (let roomIndex = 0; roomIndex < camper_rooms.length; roomIndex++) {
    const room = camper_rooms[roomIndex];

    for (let subjectIndex = 0; subjectIndex < l_subjects; subjectIndex++) {
      const study_subject = subjectsFECamp[subjectIndex];

      const slotIndex = (roomIndex * l_subjects + subjectIndex) % totalSlots;
      const dayIndex = Math.floor(slotIndex / 2);
      const slotInDay = slotIndex % 2;

      if (dayIndex >= day_time.length) continue;
      const currentDay = day_time[dayIndex];
      if(!currentDay) continue;
      const timeSlot = currentDay.slots[slotInDay];
      const time = new Date(`${currentDay.day}T${timeSlot}.000Z`);

      if (study_subject) {
        classes.push({
          classId: `${study_subject.subjectId}-${room}`,
          subjectId: study_subject.subjectId,
          room: room,
          location: "ตึก 3 ห้อง 315",
          time: time,
        });
      }
    }
  }

  await prisma.class.createMany({
    data: classes,
  })

  const staffsFECamp = await prisma.staff.findMany();
  const l_classes = classes.length;
  const l_staffs = staffsFECamp.length;

  // Create mock staffClass
  let staffClasses = [];
  for (let i = 0; i < l_classes; i++) {
    const class_data = classes[i];
    const staff_1_data = staffsFECamp[i % l_staffs];
    if(staff_1_data && class_data){
      if(i % 2 == 1){
        const staff_2_data = staffsFECamp[(i + 1) % l_staffs];
        if(staff_2_data)
          staffClasses.push({ staffId: staff_2_data.staffId, classId: class_data.classId });
      }
      staffClasses.push({ staffId: staff_1_data.staffId, classId: class_data.classId });
    }
  }

  await prisma.staffClass.createMany({
    data: staffClasses,
    skipDuplicates: true,
  });

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
