/*
  Warnings:

  - The primary key for the `SubjectAnnouncements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[annoId]` on the table `SubjectAnnouncements` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SubjectAnnouncements" DROP CONSTRAINT "SubjectAnnouncements_pkey",
ALTER COLUMN "annoId" SET DEFAULT 'anno-id',
ALTER COLUMN "annoId" DROP DEFAULT,
ALTER COLUMN "annoId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SubjectAnnouncements_pkey" PRIMARY KEY ("annoId");
DROP SEQUENCE "SubjectAnnouncements_annoId_seq";

-- CreateIndex
CREATE UNIQUE INDEX "SubjectAnnouncements_annoId_key" ON "SubjectAnnouncements"("annoId");
