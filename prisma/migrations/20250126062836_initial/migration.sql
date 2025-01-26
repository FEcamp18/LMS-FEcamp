-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BOARD', 'STAFF', 'CAMPER');

-- CreateTable
CREATE TABLE "Account" (
    "username" TEXT NOT NULL DEFAULT 'user',
    "password" TEXT NOT NULL DEFAULT 'password',
    "role" TEXT NOT NULL DEFAULT 'CAMPER',

    CONSTRAINT "Account_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Staff" (
    "staffId" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT 'staff',

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("staffId")
);

-- CreateTable
CREATE TABLE "Subject" (
    "subjectId" TEXT NOT NULL DEFAULT 'subject-id',
    "subjectName" TEXT NOT NULL DEFAULT 'subject-name',
    "subjectTopic" TEXT NOT NULL DEFAULT 'subject-topic',
    "subjectPicture" TEXT NOT NULL DEFAULT '/image/subject-picture/temp-subject-image.jpg',
    "subjectDescription" TEXT NOT NULL DEFAULT 'subject-descripion',

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("subjectId")
);

-- CreateTable
CREATE TABLE "Class" (
    "classId" TEXT NOT NULL DEFAULT 'class-id',
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("classId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_username_key" ON "Account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_staffId_key" ON "Staff"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_subjectId_key" ON "Subject"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Class_classId_key" ON "Class"("classId");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;
