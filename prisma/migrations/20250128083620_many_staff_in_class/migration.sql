/*
  Warnings:

  - The `staffId` column on the `Class` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_staffId_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "staffId",
ADD COLUMN     "staffId" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "classClassId" TEXT;

-- CreateTable
CREATE TABLE "StaffClass" (
    "staffId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,

    CONSTRAINT "StaffClass_pkey" PRIMARY KEY ("staffId","classId")
);

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_classClassId_fkey" FOREIGN KEY ("classClassId") REFERENCES "Class"("classId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffClass" ADD CONSTRAINT "StaffClass_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("staffId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffClass" ADD CONSTRAINT "StaffClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;
