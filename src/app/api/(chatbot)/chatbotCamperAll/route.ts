import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const camperByClass = await prisma.camper.findMany({
      select: {
        camperId: true,
        name: true,
        surname: true,
        nickname: true,
        chatbotUserId: true,
        room: true,
      },
    })

    return new Response(
      JSON.stringify({
        message: "success",
        data: camperByClass,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "failed",
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch staffClass by classId.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
