import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  props: { params: Promise<{ fileId: string }> },
) {
  const { fileId } = await props.params;

  try {
    const fileIdParsed = parseInt(fileId, 10);

    const updatedFile = await prisma.subjectFiles.update({
      where: {
        fileId: fileIdParsed,
      },
      data: {
        isDisable: true,
      },
    });

    if (!updatedFile) {
      return Response.json(
        { message: "failed", error: "File not found" },
        { status: 404 },
      );
    }

    return Response.json(
      { message: "success", file: updatedFile },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        message: "failed",
        error:
          error instanceof Error ? error.message : "Failed to disable file",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
