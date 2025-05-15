"use client"
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react"
import { getAllFileName } from "./getAllFileName"
import { Toaster } from "react-hot-toast"
import FileCard from "../classroom/fileCard"
import { type SubjectFiles } from "@prisma/client"

export interface FileTableRef {
  fetchFiles: () => Promise<void>
}

const FileTable = forwardRef<FileTableRef, { subjectId: string }>(
  ({ subjectId }, ref) => {
    const [files, setFiles] = useState<SubjectFiles[]>([])

    const fetchFiles = async () => {
      const data = (await getAllFileName(subjectId)) as SubjectFiles[]
      if (data) setFiles(data)
    }

    useImperativeHandle(ref, () => ({
      fetchFiles,
    }))

    useEffect(() => {
      void fetchFiles()
    }, [subjectId])

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
