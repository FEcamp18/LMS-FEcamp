import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  props: { params: Promise<{ subjectId: string }> },
) {
  const { subjectId } = await props.params;

  try {
    const isSubjectIdExist = await prisma.subject.findUnique({
      where: { subjectId },
    });

    if (!isSubjectIdExist) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "SubjectId does not exist.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    const filesBySubjectId = await prisma.subjectFiles.findMany({
      where: { subjectId },
    });

    return new Response(
      JSON.stringify({
        message: "success",
        files: filesBySubjectId,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "failed",
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch files by subjectId.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    await prisma.$disconnect();
  }
}
