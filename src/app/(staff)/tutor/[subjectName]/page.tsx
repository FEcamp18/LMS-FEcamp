"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AnnouncementCard from "@/components/classroom/announcementCard";
import FileCard from "@/components/classroom/fileCard";
import {
  type Subject,
  type SubjectAnnouncements,
  type SubjectFiles,
} from "@prisma/client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import FileTable, {
  type FileTableRef,
} from "@/components/fileupload/fileTable";
import UploadForm from "@/components/fileupload/uploadForm";
import CreateAnnounce from "@/components/modal/createAnnounce";

interface AnnouncementResponse {
  message: string;
  announcements: SubjectAnnouncements[];
}
interface FileResponse {
  message: string;
  files: SubjectFiles[];
}

interface SubjectResponse {
  message: string;
  subject: Subject;
}

import { useParams } from "next/navigation";
import { useRef } from "react";

export default function SubjectPage() {
  const router = useRouter();
  const params = useParams<{ subjectName: string }>();
  const subjectId = params.subjectName;

  const [announcements, setAnnouncements] = useState<SubjectAnnouncements[]>(
    [],
  );
  const [files, setFiles] = useState<SubjectFiles[]>([]);
  const [subjectDetails, setSubjectDetails] = useState<{
    subjectId: string;
    subjectName: string;
    subjectDescription: string;
    subjectTopic: string;
  } | null>(null);
  const tableRef = useRef<FileTableRef>(null);

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

        // Fetch subject details
        const subjectResponse = await fetch(`/api/subject/${subjectName}`);
        const subjectData = (await subjectResponse.json()) as SubjectResponse;

        if (subjectData.message == "success" && subjectData.subject) {
          setSubjectDetails({
            subjectId: subjectData.subject.subjectId,
            subjectName: subjectData.subject.subjectName,
            subjectDescription: subjectData.subject.subjectDescription,
            subjectTopic: subjectData.subject.subjectTopic,
          });
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    void fetchData();
  }, [params.subjectName]);

  if (!subjectDetails) {
    return (
      <p className="h-full w-full py-5 text-center text-xl font-bold text-dark-brown">
        Loading...
      </p>
    );
  }

  return (
    <div className="relative flex w-full flex-col p-4">
      {/* Top Section */}
      <div className="relative flex w-full flex-row items-center justify-between">
        <button onClick={() => router.back()} className="h-10 w-10 px-4 py-2">
          <FaArrowLeft className="scale-150" />
        </button>
        <div className="text-center text-lg font-bold text-dark-brown sm:text-2xl">
          <p>{subjectDetails.subjectTopic}</p>
          <p className="text-sm font-normal">{subjectDetails.subjectId}</p>
        </div>
        <div className="w-28 bg-light-gray p-4 text-center text-dark-brown sm:w-96">
          {subjectDetails.subjectDescription}
        </div>
      </div>
      {/* Left Section */}
      <div className="relative mt-20 flex h-auto flex-col space-y-16 sm:w-[50vw]">
        {/* Announcements */}
        <div className="relative w-full pb-14">
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
                subjectId={anno.subjectId}
                annoId={String(anno.annoId)}
                isTutor={true}
              />
            ))}
          </div>
          <div className="absolute bottom-0 right-3 flex h-12 w-40 cursor-pointer items-center justify-center">
            <CreateAnnounce
              subjectId={subjectId}
              subjectTopic={subjectDetails.subjectTopic}
            />
          </div>
        </div>

        {/* Files */}
        <div className="relative w-full pb-10">
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
                fileUploadTime={new Date(file.fileUpLoadTime)}
                isTutor={true}
              />
            ))}
          </div>
          <div className="absolute bottom-0 right-3 mt-5 flex h-12 w-40 cursor-pointer items-center justify-center">
            <UploadForm
              uploadSuccess={async () => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                await tableRef?.current?.fetchFiles();
              }}
            />
          </div>
        </div>
        <FileTable ref={tableRef} subjectId={subjectId} />
      </div>
    </div>
  );
}
