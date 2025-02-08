-- CreateEnum
CREATE TYPE "PHASE" AS ENUM ('CLOSED', 'BEFORE_CAMP', 'PRETEST', 'CAMP', 'CERTIFICATE', 'POSTTEST', 'ARCHIVE');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('BOARD', 'STAFF', 'CAMPER');

-- CreateEnum
CREATE TYPE "SUBJECT" AS ENUM ('MATHS', 'PHYSICS', 'CHEMISTRY', 'TPAT3');

-- CreateEnum
CREATE TYPE "ENGINEERINGDEPARTMENT" AS ENUM ('Engineering', 'Civil', 'Electrical', 'Mechanical', 'Automotive', 'Industrial', 'Chemical', 'Mining', 'WaterResources', 'Georesources', 'Petroleum', 'Environmental', 'Survey', 'Metallurgical', 'Nuclear', 'CP', 'CEDT', 'ADME', 'AERO', 'AI', 'NANO', 'ICE', 'ChPE');

-- CreateEnum
CREATE TYPE "STAFFDEPARTMENT" AS ENUM ('NORMALSTAFF', 'ROOMSTAFF', 'REGISTER', 'VCK', 'NURSE', 'WELFARE', 'CENTRAL', 'BOARD');

-- CreateTable
CREATE TABLE "Account" (
    "username" TEXT NOT NULL DEFAULT 'user',
    "password" TEXT NOT NULL DEFAULT 'password',
    "role" "ROLE" NOT NULL DEFAULT 'CAMPER',

    CONSTRAINT "Account_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Staff" (
    "staffId" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT 'staff',
    "surname" TEXT NOT NULL DEFAULT 'staff',
    "nickname" TEXT NOT NULL DEFAULT 'staff',
    "contactTel" TEXT NOT NULL DEFAULT '',
    "contactEmail" TEXT NOT NULL DEFAULT '',
    "FEYear" INTEGER NOT NULL DEFAULT 0,
    "engineerDepartment" "ENGINEERINGDEPARTMENT" NOT NULL DEFAULT 'Engineering',
    "staffDepartment" "STAFFDEPARTMENT"[],
    "healthInfo" TEXT NOT NULL DEFAULT '',
    "foodInfo" TEXT NOT NULL DEFAULT '',
    "roomNumber" INTEGER NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("staffId")
);

-- CreateTable
CREATE TABLE "Subject" (
    "subjectId" TEXT NOT NULL DEFAULT 'subject-id',
    "subjectName" "SUBJECT" NOT NULL DEFAULT 'MATHS',
    "subjectTopic" TEXT NOT NULL DEFAULT 'subject-topic',
    "subjectPicture" TEXT NOT NULL DEFAULT '/image/subject-picture/temp-subject-image.jpg',
    "subjectDescription" TEXT NOT NULL DEFAULT 'subject-descripion',

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("subjectId")
);

-- CreateTable
CREATE TABLE "Class" (
    "classId" TEXT NOT NULL DEFAULT 'class-id',
    "subjectId" TEXT NOT NULL,
    "room" INTEGER NOT NULL DEFAULT 0,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL DEFAULT 'not assign',

    CONSTRAINT "Class_pkey" PRIMARY KEY ("classId")
);

-- CreateTable
CREATE TABLE "StaffClass" (
    "staffId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,

    CONSTRAINT "StaffClass_pkey" PRIMARY KEY ("staffId","classId")
);

-- CreateTable
CREATE TABLE "Camper" (
    "camperId" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "surname" TEXT NOT NULL DEFAULT '',
    "nickname" TEXT NOT NULL DEFAULT '',
    "chatbotUserId" TEXT NOT NULL DEFAULT '',
    "contactTel" TEXT NOT NULL DEFAULT '',
    "parentTel" TEXT NOT NULL DEFAULT '',
    "parentRelation" TEXT NOT NULL DEFAULT '',
    "school" TEXT NOT NULL DEFAULT '',
    "contactEmail" TEXT NOT NULL DEFAULT '',
    "idLine" TEXT NOT NULL DEFAULT '',
    "FEYear" INTEGER NOT NULL DEFAULT 0,
    "room" INTEGER NOT NULL,
    "healthInfo" TEXT NOT NULL DEFAULT '',
    "foodInfo" TEXT NOT NULL DEFAULT '',
    "certificate" TEXT NOT NULL DEFAULT '',
    "scorePostTest" DOUBLE PRECISION[] DEFAULT ARRAY[]::DOUBLE PRECISION[],

    CONSTRAINT "Camper_pkey" PRIMARY KEY ("camperId")
);

-- CreateTable
CREATE TABLE "CamperClass" (
    "id" TEXT NOT NULL,
    "camperId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,

    CONSTRAINT "CamperClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectFiles" (
    "fileId" TEXT NOT NULL DEFAULT 'file-id',
    "subjectId" TEXT NOT NULL,
    "fileTitle" TEXT NOT NULL DEFAULT 'file-title',
    "fileLocation" TEXT NOT NULL DEFAULT 'file-location',
    "fileDescription" TEXT NOT NULL DEFAULT 'file-description',
    "fileUpLoadTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubjectFiles_pkey" PRIMARY KEY ("fileId")
);

-- CreateTable
CREATE TABLE "SubjectAnnouncements" (
    "annoId" TEXT NOT NULL DEFAULT 'anno-id',
    "subjectId" TEXT NOT NULL,
    "annoTitle" TEXT NOT NULL DEFAULT 'anno-title',
    "annoText" TEXT NOT NULL DEFAULT 'anno-text',
    "annoTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubjectAnnouncements_pkey" PRIMARY KEY ("annoId")
);

-- CreateTable
CREATE TABLE "Notes" (
    "noteId" SERIAL NOT NULL,
    "camperId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("noteId")
);

-- CreateTable
CREATE TABLE "WebPhase" (
    "phase" "PHASE" NOT NULL DEFAULT 'CLOSED',

    CONSTRAINT "WebPhase_pkey" PRIMARY KEY ("phase")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_username_key" ON "Account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_staffId_key" ON "Staff"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_subjectId_key" ON "Subject"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Class_classId_key" ON "Class"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "Camper_camperId_key" ON "Camper"("camperId");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectFiles_fileId_key" ON "SubjectFiles"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectAnnouncements_annoId_key" ON "SubjectAnnouncements"("annoId");

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Account"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffClass" ADD CONSTRAINT "StaffClass_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("staffId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffClass" ADD CONSTRAINT "StaffClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Camper" ADD CONSTRAINT "Camper_camperId_fkey" FOREIGN KEY ("camperId") REFERENCES "Account"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CamperClass" ADD CONSTRAINT "CamperClass_camperId_fkey" FOREIGN KEY ("camperId") REFERENCES "Camper"("camperId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CamperClass" ADD CONSTRAINT "CamperClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectFiles" ADD CONSTRAINT "SubjectFiles_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectAnnouncements" ADD CONSTRAINT "SubjectAnnouncements_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_camperId_fkey" FOREIGN KEY ("camperId") REFERENCES "Camper"("camperId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("staffId") ON DELETE RESTRICT ON UPDATE CASCADE;
