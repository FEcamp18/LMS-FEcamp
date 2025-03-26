/*
  Warnings:

  - The primary key for the `SubjectAnnouncements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `annoId` column on the `SubjectAnnouncements` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SubjectFiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `fileId` column on the `SubjectFiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SubjectAnnouncements" DROP CONSTRAINT "SubjectAnnouncements_pkey",
DROP COLUMN "annoId",
ADD COLUMN     "annoId" SERIAL NOT NULL,
ADD CONSTRAINT "SubjectAnnouncements_pkey" PRIMARY KEY ("annoId");

-- AlterTable
ALTER TABLE "SubjectFiles" DROP CONSTRAINT "SubjectFiles_pkey",
DROP COLUMN "fileId",
ADD COLUMN     "fileId" SERIAL NOT NULL,
ADD CONSTRAINT "SubjectFiles_pkey" PRIMARY KEY ("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectAnnouncements_annoId_key" ON "SubjectAnnouncements"("annoId");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectFiles_fileId_key" ON "SubjectFiles"("fileId");
