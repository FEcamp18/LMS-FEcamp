-- CreateTable
CREATE TABLE "SubjectFiles" (
    "fileId" TEXT NOT NULL DEFAULT 'file-id',
    "subjectId" TEXT NOT NULL,
    "fileTitle" TEXT NOT NULL DEFAULT 'file-title',
    "fileLocation" TEXT NOT NULL DEFAULT 'file-location',
    "fileDescription" TEXT NOT NULL DEFAULT 'file-description',
    "fileUpLoadTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubjectFiles_pkey" PRIMARY KEY ("fileId")
);

-- CreateTable
CREATE TABLE "SubjectAnnouncements" (
    "annoId" TEXT NOT NULL DEFAULT 'anno-id',
    "subjectId" TEXT NOT NULL,
    "annoTitle" TEXT NOT NULL DEFAULT 'anno-title',
    "annoText" TEXT NOT NULL DEFAULT 'anno-text',
    "annoTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubjectAnnouncements_pkey" PRIMARY KEY ("annoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubjectFiles_fileId_key" ON "SubjectFiles"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectAnnouncements_annoId_key" ON "SubjectAnnouncements"("annoId");

-- AddForeignKey
ALTER TABLE "SubjectFiles" ADD CONSTRAINT "SubjectFiles_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectAnnouncements" ADD CONSTRAINT "SubjectAnnouncements_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;
