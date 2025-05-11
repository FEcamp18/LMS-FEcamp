"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AnnouncementCard from "@/components/classroom/announcementCard";
import FileCard from "@/components/classroom/fileCard";
import { type SubjectAnnouncements, type SubjectFiles } from "@prisma/client";
import React from "react";

interface AnnouncementResponse {
  message: string;
  announcements: SubjectAnnouncements[];
}
interface FileResponse {
  message: string;
  files: SubjectFiles[];
}

export default function SubjectPage() {
  const router = useRouter();
  const params = useParams<{ subjectName: string }>();

  const [announcements, setAnnouncements] = useState<SubjectAnnouncements[]>(
    [],
  );
  const [files, setFiles] = useState<SubjectFiles[]>([]);
  const [subjectDetails, setSubjectDetails] = useState<{
    subjectId: string;
    subjectName: string;
    subjectDescription: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectName = params.subjectName;

        const annoResponse = await fetch(`/api/anno/${subjectName}`);
        const annoData = (await annoResponse.json()) as AnnouncementResponse;
        if (annoData.message === "success") {
          setAnnouncements(annoData.announcements);
        }

        const fileResponse = await fetch(`/api/file/${subjectName}`);
        const fileData = (await fileResponse.json()) as FileResponse;
        if (fileData.message === "success") {
          if (fileData.message === "success") {
            setFiles(fileData.files);
          }
        }

        setSubjectDetails({
          subjectId: subjectName,
          subjectName: subjectName,
          subjectDescription: "คำอธิบายของวิชานี้",
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!subjectDetails) {
    return (
      <p className="h-full w-full py-5 text-center text-xl font-bold text-dark-brown">
        Loading...
      </p>
    );
  }

  return (
    <div className="flex flex-col p-4">
      {/* Top Section */}
      <div className="relative flex flex-col items-center">
        <button
          onClick={() => router.back()}
          className="absolute left-4 top-4 rounded bg-dark-brown px-4 py-2 text-cream"
        >
          Back
        </button>
        <h1 className="text-2xl font-bold text-dark-brown">
          {subjectDetails.subjectId} - {subjectDetails.subjectName}
        </h1>
        <div className="absolute left-1/2 top-16 w-3/4 -translate-x-1/2 rounded bg-light-brown p-4 text-center text-dark-brown">
          {subjectDetails.subjectDescription}
        </div>
      </div>

      {/* Left Section */}
      <div className="mt-20 flex flex-col space-y-16">
        {/* Announcements */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-dark-brown">
            ประกาศจากพี่ๆ
          </h2>
          <div className="flex flex-col gap-4">
            {announcements.map((anno, index) => (
              <AnnouncementCard
                key={index}
                annoTitle={anno.annoTitle}
                annoText={anno.annoText}
                annoTime={new Date(anno.annoTime)}
              />
            ))}
          </div>
        </div>

        {/* Files */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-dark-brown">
            ไฟล์เนื้อหา
          </h2>
          <div className="flex flex-col gap-4">
            {files.map((file, index) => (
              <FileCard
                key={index}
                fileTitle={file.fileTitle}
                fileLocation={file.fileLocation}
                fileDescription={file.fileDescription}
                // fileUploadTime={file.fileUpLoadTime.getTime()}
                fileUploadTime="00.00"
                isTutor={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
