"use client";
import { ROLE } from "@prisma/client";
import axios from "axios";
import { getSession } from "next-auth/react";

interface ApiResponse {
  message: string;
}

export async function disableFile(fileId: number) {
  try {
    const session = await getSession();
    const user = session?.user;

    if (!user || user.role !== (ROLE.STAFF || ROLE.BOARD)) {
      const response = await axios.patch<ApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/disable-file/${fileId}`,
      );

      return response.data.message === "success";
    }
  } catch (error) {
    console.error("Failed to disable file:", error);
    return false;
  }
}
