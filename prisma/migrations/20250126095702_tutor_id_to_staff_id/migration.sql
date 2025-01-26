/*
  Warnings:

  - You are about to drop the column `tutorId` on the `Class` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_tutorId_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "tutorId",
ADD COLUMN     "staffId" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("staffId") ON DELETE RESTRICT ON UPDATE CASCADE;
