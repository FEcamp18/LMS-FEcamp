"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import AnnouncementCard from "@/components/classroom/announcementCard"
import FileCard from "@/components/classroom/fileCard"
import {
  type Subject,
  type SubjectAnnouncements,
  type SubjectFiles,
} from "@prisma/client"
import React from "react"
import { FaArrowLeft } from "react-icons/fa"
import NotFound from "@/app/not-found"

interface AnnouncementResponse {
  message: string
  announcements: SubjectAnnouncements[]
}
interface FileResponse {
  message: string
  files: SubjectFiles[]
}

interface SubjectResponse {
  message: string
  subject: Subject
}

export default function SubjectPage() {
  const router = useRouter()
  const params = useParams<{ classname: string }>()

  const [announcements, setAnnouncements] = useState<SubjectAnnouncements[]>([])
  const [files, setFiles] = useState<SubjectFiles[]>([])
  const [notfound, setNotFound] = useState(false)
  const [subjectDetails, setSubjectDetails] = useState<{
    subjectId: string
    subjectName: string
    subjectDescription: string
    subjectTopic: string
  } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectName = params.classname

        const annoResponse = await fetch(`/api/anno/${subjectName}`)
        const annoData = (await annoResponse.json()) as AnnouncementResponse
        if (annoData.message == "failed") setNotFound(true)
        if (annoData.message === "success") {
          setAnnouncements(annoData.announcements)
        }

        const fileResponse = await fetch(`/api/file/${subjectName}`)
        const fileData = (await fileResponse.json()) as FileResponse
        if (fileData.message == "failed") setNotFound(true)

        if (fileData.message === "success") {
          if (fileData.message === "success") {
            setFiles(fileData.files)
          }
        }

        // Fetch subject details
        const subjectResponse = await fetch(`/api/subject/${subjectName}`)
        const subjectData = (await subjectResponse.json()) as SubjectResponse
        if (subjectData.message == "failed") setNotFound(true)
        if (subjectData.message == "success" && subjectData.subject) {
          setSubjectDetails({
            subjectId: subjectData.subject.subjectId,
            subjectName: subjectData.subject.subjectName,
            subjectDescription: subjectData.subject.subjectDescription,
            subjectTopic: subjectData.subject.subjectTopic,
          })
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }

    void fetchData()
  }, [params.classname])
  if (notfound) return <NotFound />
  if (!subjectDetails) {
    return (
      <p className="h-full w-full py-5 text-center text-xl font-bold text-dark-brown">
        Loading...
      </p>
    )
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
                isTutor={false}
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
                fileId={file.fileId}
                fileTitle={file.fileTitle}
                fileDescription={file.fileDescription}
                fileUploadTime={new Date(file.fileUpLoadTime)}
                isTutor={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
