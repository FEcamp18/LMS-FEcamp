/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `WebPhase` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WebPhase_id_key" ON "WebPhase"("id");
