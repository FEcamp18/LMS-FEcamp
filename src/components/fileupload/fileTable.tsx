"use client"
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react"
import { getFile } from "./getFile"
import { getAllFileName } from "./getAllFileName"
import { disableFile } from "./disableFile"
import { usePathname } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"
import FileCard from "../classroom/fileCard"
import { type SubjectFiles } from "@prisma/client"

export interface FileTableRef {
  fetchFiles: () => Promise<void>
}

const FileTable = forwardRef<FileTableRef, { subjectId: string }>(
  ({ subjectId }, ref) => {
    const [files, setFiles] = useState<SubjectFiles[]>([])
    const pathname = usePathname()

    const isTutorPath = pathname?.startsWith("/tutor/")
    const showDeleteButton = isTutorPath

    const fetchFiles = async () => {
      const data = (await getAllFileName(subjectId)) as SubjectFiles[]
      if (data) setFiles(data)
      console.log(data)
    }

    useImperativeHandle(ref, () => ({
      fetchFiles,
    }))

    useEffect(() => {
      void fetchFiles()
    }, [subjectId])

    const handleDelete = async (fileId: number) => {
      const success = await disableFile(fileId)
      if (success) {
        toast.success("Successfully deleted file")
        await fetchFiles()
      } else {
        toast.error("Failed to delete file")
      }
    }

    return (
      <>
        <Toaster />

        {files.length === 0 ? (
          <div className="text-xl text-dark-brown">No files available</div>
        ) : (
          files.map((file, index) => (
            <FileCard
              key={index}
              fileId={file.fileId}
              fileTitle={file.fileTitle}
              fileDescription={file.fileDescription}
              fileUploadTime={new Date(file.fileUpLoadTime)}
              isTutor={true}
              fetchFiles={fetchFiles}
            />
          ))
        )}
      </>
    )
  },
)

FileTable.displayName = "FileTable"

export default FileTable
