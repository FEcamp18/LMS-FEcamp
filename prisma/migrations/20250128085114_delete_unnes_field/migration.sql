/*
  Warnings:

  - You are about to drop the column `staffId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `classClassId` on the `Staff` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_classClassId_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "staffId";

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "classClassId";
