import { type NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ camperId: string }> },
) {
  try {
    const { camperId } = await props.params

    const targetDir = process.env.FILE_TARGET_DIR ?? "C:/FE18/storage/";
    const filePath = `${targetDir}certificate/${camperId}.pdf`;

    console.log(filePath);
    
    const fileBuffer = await fs.readFile(filePath);

    return new Response(new Uint8Array(fileBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="certificate_${camperId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("File fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: 500 }
    );
  }
}