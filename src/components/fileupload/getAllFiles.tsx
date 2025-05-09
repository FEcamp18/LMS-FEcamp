"use server";
import { promises as fs } from "fs";

export async function getAllFiles() {
  try {
    const folderPath = "C:/FE18/storage";
    const files = await fs.readdir(folderPath);
    return files;
  } catch {
    return [];
  }
}
