import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mimeTypes: { [key: string]: string } = {
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
};

export async function GET(
  request: Request,
  { params }: { params: { fileId: string } },
) {
  try {
    const { fileId } = await params;
    const fileIdNum = parseInt(fileId);
    if (isNaN(fileIdNum)) {
      return NextResponse.json({ error: "Invalid file ID" }, { status: 400 });
    }

    const fileData = await prisma.subjectFiles.findUnique({
      where: {
        fileId: fileIdNum,
      },
    });

    if (!fileData || !fileData.fileLocation) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    try {
      await fs.access(fileData.fileLocation);
    } catch (error) {
      console.error(`File not found at location: ${fileData.fileLocation}`);
      return NextResponse.json(
        { error: "File not found in storage" },
        { status: 404 },
      );
    }

    const fileExtension = path.extname(fileData.fileLocation).toLowerCase();
    const contentType = mimeTypes[fileExtension] || "application/octet-stream";

    const fileBuffer = await fs.readFile(fileData.fileLocation);

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename=${fileData.fileTitle}${fileExtension}`,
      },
    });
  } catch (error) {
    console.error("File fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
