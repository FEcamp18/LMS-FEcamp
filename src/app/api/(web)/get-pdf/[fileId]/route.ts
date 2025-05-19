import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mimeTypes: Record<string, string> = {
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
};

export async function GET(
  request: Request,
  context: { params: Promise<{ fileId: string }> },
) {
  try {
    const { fileId } = await context.params; // Await the params object
    const fileIdNum = parseInt(fileId);
    if (isNaN(fileIdNum)) {
      return NextResponse.json({ error: "Invalid file ID" }, { status: 400 });
    }

    const fileData = await prisma.subjectFiles.findUnique({
      where: {
        fileId: fileIdNum,
      },
    });

    if (!fileData?.fileLocation) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    try {
      await fs.access(fileData.fileLocation);
    } catch  {
      return NextResponse.json(
        { error: "File not found in storage" },
        { status: 404 },
      );
    }

    const fileExtension = path.extname(fileData.fileLocation).toLowerCase();
    const contentType = mimeTypes[fileExtension] ?? "application/octet-stream";

    const fileBuffer = await fs.readFile(fileData.fileLocation);

    // Properly encode filename for non-ASCII (RFC 5987)
    const asciiFallback = "download" + fileExtension;
    const encodedFilename = encodeURIComponent(fileData.fileTitle + fileExtension);

    return new Response(new Uint8Array(fileBuffer), {
      headers: {
        "Content-Type": contentType,
        // Both ASCII fallback and UTF-8 encoded filename
        "Content-Disposition":
          `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encodedFilename}`,
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
