import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const staffId = "staff1";
  try {
    const courses = await prisma.staffClass.findMany({
      where: { staffId },
      include: { class: true },
    });

    if (!courses || courses.length === 0) {
      return Response.json(
        {
          message: "failed",
          error: "No assigned courses found.",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json(
      {
        message: "success",
        courses: courses,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return Response.json(
      {
        message: "failed",
        error: error,
      },
      {
        status: 500,
      },
    );
  }
}
