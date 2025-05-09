"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllFileName(subjectId: string) {
  try {
    const files = await prisma.subjectFiles.findMany({
      where: {
        subjectId: subjectId,
        isDisable: false,
      },
      select: {
        fileTitle: true,
      },
    });
    const fileTitles = files.map((file) => file.fileTitle);
    return fileTitles;
  } catch (error) {
    console.error("Failed to fetch files:", error);
    return [];
  }
}
