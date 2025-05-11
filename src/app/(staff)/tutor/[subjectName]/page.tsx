"use client"
import FileTable, { FileTableRef } from "@/components/fileupload/fileTable"
import UploadForm from "@/components/fileupload/uploadForm"
import { useParams } from "next/navigation"
import { useRef } from "react"

// write your code here
export default function SubjectPage() {
  const params = useParams()
  const subjectId = params.subjectName as string
  const tableRef = useRef<FileTableRef>(null)
  return (
    <>
      <UploadForm
        uploadSuccess={async () => {
          await tableRef.current?.fetchFiles()
        }}
      />
      <FileTable ref={tableRef} subjectId={subjectId} />
    </>
  )
}
