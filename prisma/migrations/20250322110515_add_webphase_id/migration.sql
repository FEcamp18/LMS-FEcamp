/*
  Warnings:

  - The primary key for the `WebPhase` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "WebPhase" DROP CONSTRAINT "WebPhase_pkey",
ADD COLUMN     "id" TEXT NOT NULL DEFAULT 'current_phase',
ADD CONSTRAINT "WebPhase_pkey" PRIMARY KEY ("id");
