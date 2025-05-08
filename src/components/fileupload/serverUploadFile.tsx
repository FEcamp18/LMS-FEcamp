"use server";
import { promises as fs } from "fs";
import path from "path";

const ALLOWED_FILE_TYPES = [".pdf"];

export default async function UploadFile({
  file,
  fileName,
  fileSubject,
}: {
  file: File;
  fileName: string;
  fileSubject: string;
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

    await fs.writeFile(
      `${targetDir}${fileSubject}-${fileName}${fileExtension}`,
      Buffer.from(data),
    );
  } catch (error) {
    throw new Error(`File upload failed, ${error}`);
  }
}
