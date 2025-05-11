import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.preTestRoom.findMany({
      include: {
        camper: {
          select: {
            name: true,
            surname: true,
            nickname: true,
          },
        },
      },
    });

    if (!data) {
      return Response.json(
        {
          message: "failed",
          error: "No pretest room data available.",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json(
      {
        message: "success",
        data: data,
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
