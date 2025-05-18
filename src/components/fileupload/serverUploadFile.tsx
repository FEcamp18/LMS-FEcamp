"use server"
import { sendAnnouncement } from "@/lib/sendAnnouncement"
import { PrismaClient } from "@prisma/client"
import axios from "axios"
import { promises as fs } from "fs"
import path from "path"
import toast from "react-hot-toast"

const ALLOWED_FILE_TYPES = [".pdf", ".png", ".jpg", ".pptx"]

const prisma = new PrismaClient()

export default async function UploadFile({
  file,
  fileName,
  fileSubject,
  fileDescription,
  fileTopic,
}: {
  file: File
  fileName: string
  fileSubject: string
  fileDescription: string
  fileTopic: string
}) {
  try {
    const data = await file.arrayBuffer()
    if (!data) throw new Error("File content not valid")
    if (!fileName) throw new Error("No file name")

    const fileExtension = path.extname(file.name).toLowerCase()

    if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
      throw new Error("Invalid file type.")
    }

    const fileMetadata = await prisma.subjectFiles.create({
      data: {
        subjectId: fileSubject,
        fileTitle: `${fileSubject}-${fileName}`,
        fileLocation: "",
        fileDescription: fileDescription,
        isDisable: false,
      },
    })

    const targetDir = process.env.FILE_TARGET_DIR ?? "C:/FE18/storage/"
    const filePath = `${targetDir}${fileSubject}-${fileName}-${fileMetadata.fileId}${fileExtension}`

    await fs.writeFile(filePath, Buffer.from(data))
    await prisma.subjectFiles.update({
      where: { fileId: fileMetadata.fileId },
      data: {
        fileTitle: `${fileSubject}-${fileName}-${fileMetadata.fileId}`,
        fileLocation: filePath,
      },
    })
    interface FileResponse {
      subjectId: string
      fileId: string
      fileTitle: string
      fileLocation: string
      fileDescription: string
    }

    const response = await axios.get<FileResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/file/${fileMetadata.subjectId}/${fileMetadata.fileId}`,
    )
    const responseData: FileResponse = response.data
    if (!response) throw new Error("Can't POST /api/file")

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/proxy/send-announcement`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `ไฟล์ ${fileName} ถูกเพิ่มในวิชา ${fileTopic}!`,
        }),
      },
    )
    return {
      success: true,
      fileInfo: responseData,
    }
  } catch (error: unknown) {
    console.log(
      `File upload failed: ${error instanceof Error ? error.message : String(error)}`,
    )
    throw new Error(
      `File upload failed,  ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
