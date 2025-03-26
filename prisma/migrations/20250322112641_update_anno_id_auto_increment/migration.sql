/*
  Warnings:

  - The primary key for the `SubjectAnnouncements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `annoId` column on the `SubjectAnnouncements` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "SubjectAnnouncements_annoId_key";

-- AlterTable
ALTER TABLE "SubjectAnnouncements" DROP CONSTRAINT "SubjectAnnouncements_pkey",
DROP COLUMN "annoId",
ADD COLUMN     "annoId" SERIAL NOT NULL,
ADD CONSTRAINT "SubjectAnnouncements_pkey" PRIMARY KEY ("annoId");
