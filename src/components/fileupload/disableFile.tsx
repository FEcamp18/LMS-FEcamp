"use client"
import axios from "axios"

interface ApiResponse {
  message: string
}

export async function disableFile(fileId: number) {
  try {
    const response = await axios.patch<ApiResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/disable-file/${fileId}`,
    )
    return response.data.message === "success"
  } catch (error) {
    console.error("Failed to disable file:", error)
    return false
  }
}
