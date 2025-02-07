-- CreateTable
CREATE TABLE "Camper" (
    "camperId" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "surname" TEXT NOT NULL DEFAULT '',
    "nickname" TEXT NOT NULL DEFAULT '',
    "chatbotUserId" TEXT NOT NULL DEFAULT '',
    "contactTel" TEXT NOT NULL DEFAULT '',
    "parentTel" TEXT NOT NULL DEFAULT '',
    "parentRelation" TEXT NOT NULL DEFAULT '',
    "school" TEXT NOT NULL DEFAULT '',
    "contactEmail" TEXT NOT NULL DEFAULT '',
    "idLine" TEXT NOT NULL DEFAULT '',
    "FEYear" INTEGER NOT NULL DEFAULT 0,
    "room" INTEGER NOT NULL,
    "healthInfo" TEXT NOT NULL DEFAULT '',
    "foodInfo" TEXT NOT NULL DEFAULT '',
    "certificate" TEXT NOT NULL DEFAULT '',
    "scorePostTest" DOUBLE PRECISION[] DEFAULT ARRAY[]::DOUBLE PRECISION[],

    CONSTRAINT "Camper_pkey" PRIMARY KEY ("camperId")
);

-- CreateTable
CREATE TABLE "CamperClass" (
    "id" TEXT NOT NULL,
    "camperId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,

    CONSTRAINT "CamperClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" TEXT NOT NULL,
    "camperId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Camper_camperId_key" ON "Camper"("camperId");

-- AddForeignKey
ALTER TABLE "Camper" ADD CONSTRAINT "Camper_camperId_fkey" FOREIGN KEY ("camperId") REFERENCES "Account"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CamperClass" ADD CONSTRAINT "CamperClass_camperId_fkey" FOREIGN KEY ("camperId") REFERENCES "Camper"("camperId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CamperClass" ADD CONSTRAINT "CamperClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_camperId_fkey" FOREIGN KEY ("camperId") REFERENCES "Camper"("camperId") ON DELETE RESTRICT ON UPDATE CASCADE;
