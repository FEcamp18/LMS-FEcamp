import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  props: { params: Promise<{ subjectId: string }> },)
{
  try {
    const { subjectId } = await props.params;
    const subjects = await prisma.subject.findFirst({
        where: {
          subjectId 
        },
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
        subject: subjects,
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
