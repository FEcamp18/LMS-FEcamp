import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  props: { params: Promise<{ classId: string }> },
) {
  const params = await props.params;
  try {
    const classDetails = await prisma.class.findUnique({
      where: { classId: params.classId },
    });

    if (!classDetails) {
      return Response.json(
        {
          message: "failed",
          error: "Class does not exist.",
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        message: "success",
        classDetails,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        message: "failed",
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch class details by classId.",
      },
      { status: 500 },
    );
  }
}
