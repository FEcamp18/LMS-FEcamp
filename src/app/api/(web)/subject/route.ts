import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
      const subjects = await prisma.subject.findMany({
          select: {
              subjectId: true,
              subjectName: true,
              subjectPicture: true,
              subjectTopic: true,
              subjectDescription: true
          }
      }
);


    return Response.json(
      {
        message: "success",
        subjects: subjects,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return Response.json(
      {
        message: "failed",
        error: error instanceof Error ? error : "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
