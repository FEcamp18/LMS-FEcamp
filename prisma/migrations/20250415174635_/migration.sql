/*
  Warnings:

  - You are about to drop the `CamperClass` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CamperClass" DROP CONSTRAINT "CamperClass_camperId_fkey";

-- DropForeignKey
ALTER TABLE "CamperClass" DROP CONSTRAINT "CamperClass_classId_fkey";

-- AlterTable
ALTER TABLE "Camper" ADD COLUMN     "miscellaneous" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "CamperClass";
