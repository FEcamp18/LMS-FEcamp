"use client";
import { ROLE } from "@prisma/client";
import axios from "axios";
import { getSession } from "next-auth/react";

export async function disableFile(fileId: number) {
  try {
    const session = await getSession();
    const user = session?.user;

    if (!user || user.role !== (ROLE.STAFF || ROLE.BOARD)) {
      console.error("Unauthorized to delete files");
      return false;
    }

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/disable-file/${fileId}`,
    );

    return response.data.message === "success";
  } catch (error) {
    console.error("Failed to disable file:", error);
    return false;
  }
}
