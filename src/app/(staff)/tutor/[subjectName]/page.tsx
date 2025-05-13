"use client";
import FileTable from "@/components/fileupload/fileTable";
import UploadForm from "@/components/fileupload/uploadForm";
import { useParams } from "next/navigation";

// write your code here
export default function SubjectPage() {
  const params = useParams();
  const subjectId = params.subjectName as string;
  return (
    <>
      <UploadForm />
      <FileTable subjectId={subjectId} />
    </>
  );
}
