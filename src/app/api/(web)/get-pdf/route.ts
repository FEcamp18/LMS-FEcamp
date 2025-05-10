import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const filename = url.searchParams.get("filename");

    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 },
      );
    }

    const targetDir = process.env.FILE_TARGET_DIR ?? "C:/FE18/storage";
    const fileNameWithExtension = `${filename}.pdf`;
    const filePath = path.join(targetDir, fileNameWithExtension);
    const fileBuffer = await fs.readFile(filePath);
    const blob = new Blob([new Uint8Array(fileBuffer)], {
      type: "application/pdf",
    });

    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: `Failed to read PDF file ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    );
  }
}
