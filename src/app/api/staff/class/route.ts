import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const staffId = "staff1";
  try {
    const courses = await prisma.staffClass.findMany({
      where: { staffId },
      include: {
        class: {
          include: {
            subject: {
              select: { subjectDescription: true },
            },
          },
        },
      },
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

    const staffCourses = courses.map(({ class: { subject, ...course } }) => ({
      ...course,
      description: subject?.subjectDescription,
    }));

    return Response.json(
      {
        message: "success",
        courses: staffCourses,
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
