import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  props: { params: Promise<{ subjectId: string; fileId: string }> },
) {
  const { fileId } = await props.params; // Await the params object

  try {
    const fileByFileId = await prisma.subjectFiles.findFirst({
      where: {
        fileId: parseInt(fileId),
      },
    });

    if (!fileByFileId) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "File not found",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        message: "success",
        file: fileByFileId,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "failed",
        error: error instanceof Error ? error.message : "Failed to fetch file",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    await prisma.$disconnect();
  }
}
