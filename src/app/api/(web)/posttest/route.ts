import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const camperAll = await prisma.camper.findMany({
      select: {
        name: true,
        surname: true,
        nickname: true,
        room: true
      },
    })


    if (!camperAll) {
      return Response.json(
        {
          message: "failed",
          error: "No pretest room data available.",
        },
        {
          status: 404,
        },
      )
    }

    return Response.json(
      {
        message: "success",
        data: camperAll,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return Response.json(
      {
        message: "failed",
        error: error,
      },
      {
        status: 500,
      },
    )
  }
}
