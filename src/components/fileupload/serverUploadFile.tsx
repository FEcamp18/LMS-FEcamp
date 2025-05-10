"use server";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { promises as fs } from "fs";
import path from "path";

const ALLOWED_FILE_TYPES = [".pdf"];
const prisma = new PrismaClient();

export default async function UploadFile({
  file,
  fileName,
  fileSubject,
  fileDescription,
}: {
  file: File;
  fileName: string;
  fileSubject: string;
  fileDescription: string;
}) {
  try {
    const data = await file.arrayBuffer();
    if (!data) throw new Error("File content not valid");
    if (!fileName) throw new Error("No file name");

    const fileExtension = path.extname(file.name).toLowerCase();

    if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
      throw new Error("Invalid file type.");
    }
    //storage dir
    const targetDir = "C:/FE18/storage/";
    const filePath = `${targetDir}${fileSubject}-${fileName}${fileExtension}`;

    await fs.writeFile(filePath, Buffer.from(data));
    const fileMetadata = await prisma.subjectFiles.create({
      data: {
        subjectId: fileSubject,
        fileTitle: `${fileSubject}-${fileName}`,
        fileLocation: filePath,
        fileDescription: fileDescription,
        isDisable: false,
      },
    });

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/file/${fileMetadata.subjectId}/${fileMetadata.fileId}`,
    );
    const responseData = response.data;

    return {
      success: true,
      fileInfo: responseData,
    };
  } catch (error) {
    throw new Error(`File upload failed, ${error}`);
  }
}
