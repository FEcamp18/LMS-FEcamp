/*
  Warnings:

  - Added the required column `engineerDepartment` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomNumber` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PHASE" AS ENUM ('CLOSED', 'BEFORE_CAMP', 'PRETEST', 'CAMP', 'CERTIFICATE', 'POSTTEST', 'ARCHIVE');

-- CreateEnum
CREATE TYPE "ENGINEERINGDEPARTMENT" AS ENUM ('Engineering', 'Civil', 'Electrical', 'Mechanical', 'Automotive', 'Industrial', 'Chemical', 'Mining', 'WaterResources', 'Georesources', 'Petroleum', 'Environmental', 'Survey', 'Metallurgical', 'Nuclear', 'CP', 'CEDT', 'ADME', 'AERO', 'AI', 'NANO', 'ICE', 'ChPE');

-- CreateEnum
CREATE TYPE "STAFFDEPARTMENT" AS ENUM ('NORMALSTAFF', 'ROOMSTAFF', 'REGISTER', 'VCK', 'NURSE', 'WELFARE', 'CENTRAL', 'BOARD');

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "FEYear" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "contactEmail" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "contactTel" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "engineerDepartment" "ENGINEERINGDEPARTMENT" NOT NULL,
ADD COLUMN     "foodInfo" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "healthInfo" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "nickname" TEXT NOT NULL DEFAULT 'staff',
ADD COLUMN     "roomNumber" INTEGER NOT NULL,
ADD COLUMN     "staffDepartment" "STAFFDEPARTMENT"[],
ADD COLUMN     "surname" TEXT NOT NULL DEFAULT 'staff';

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
CREATE TABLE "Notes" (
    "camperId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("notes")
);

-- CreateIndex
CREATE UNIQUE INDEX "Camper_camperId_key" ON "Camper"("camperId");

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Account"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Camper" ADD CONSTRAINT "Camper_camperId_fkey" FOREIGN KEY ("camperId") REFERENCES "Account"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CamperClass" ADD CONSTRAINT "CamperClass_camperId_fkey" FOREIGN KEY ("camperId") REFERENCES "Camper"("camperId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CamperClass" ADD CONSTRAINT "CamperClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_camperId_fkey" FOREIGN KEY ("camperId") REFERENCES "Camper"("camperId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("staffId") ON DELETE RESTRICT ON UPDATE CASCADE;
