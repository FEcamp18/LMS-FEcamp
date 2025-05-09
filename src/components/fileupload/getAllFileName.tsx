"use client";
import axios from "axios";

export async function getAllFileName(subjectId: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/file/${subjectId}`,
    );

    if (response.data.message === "success") {
      const fileTitles = response.data.files.map(
        (file: { fileTitle: string }) => file.fileTitle,
      );
      return fileTitles;
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch files:", error);
    return [];
  }
}
