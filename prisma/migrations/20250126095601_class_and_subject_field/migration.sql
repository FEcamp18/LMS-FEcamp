/*
  Warnings:

  - The `role` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `subjectName` column on the `Subject` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('BOARD', 'STAFF', 'CAMPER');

-- CreateEnum
CREATE TYPE "SUBJECT" AS ENUM ('MATHS', 'PHYSICS', 'CHEMISTRY', 'TPAT3');

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "role",
ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'CAMPER';

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'not assign',
ADD COLUMN     "room" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tutorId" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "subjectName",
ADD COLUMN     "subjectName" "SUBJECT" NOT NULL DEFAULT 'MATHS';

-- DropEnum
DROP TYPE "Role";

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Staff"("staffId") ON DELETE RESTRICT ON UPDATE CASCADE;
