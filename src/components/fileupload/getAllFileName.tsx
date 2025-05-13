"use client"
import axios from "axios"

interface FileInfo {
  fileId: number
  fileTitle: string
}

interface ApiResponse {
  message: string
  files: {
    fileId: number
    fileTitle: string
    isDisable: boolean
  }[]
}

export async function getAllFileName(subjectId: string): Promise<FileInfo[]> {
  try {
    const response = await axios.get<ApiResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/file/${subjectId}`,
    )

    if (response.data.message === "success") {
      const files = response.data.files
        .filter((file) => !file.isDisable)
        .map((file) => ({
          fileId: file.fileId,
          fileTitle: file.fileTitle,
        }))

      return files
    }

    return []
  } catch (error) {
    console.error("Failed to fetch files:", error)
    return []
  }
}
