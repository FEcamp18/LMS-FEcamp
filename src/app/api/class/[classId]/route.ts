import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { classId: string } }
) {
  try {
    const classId = params.classId;
    console.log(classId);
    const classDetails = await prisma.class.findUnique({
      where: { classId: params.classId},
    });

    if (!classDetails) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "Class does not exist.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        message: "success",
        data: { classDetails },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "failed",
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch class details.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
