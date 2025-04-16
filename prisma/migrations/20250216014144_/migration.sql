/*
  Warnings:

  - You are about to drop the column `time` on the `Class` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Class" DROP COLUMN "time",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
