import { prisma } from "@/lib/prisma"
import { empty } from "@prisma/client/runtime/library"

interface requestBodySchema {
  camperId: string
  newChatbotUserId: string
  chatbotUserId: string
}

export async function PATCH(request: Request) {
  try {
    const { camperId, newChatbotUserId } =
      (await request.json()) as requestBodySchema

    const camperBycamperId = await prisma.camper.findUnique({
      where: {
        camperId: camperId,
      },
    })

    if (!camperBycamperId) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "camperId does not exist.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      )
    }

    const newCamperBycamperId = await prisma.camper.update({
      where: {
        camperId: camperId,
      },
      data: {
        chatbotUserId: newChatbotUserId,
      },
    })

    return new Response(
      JSON.stringify({
        message: "success",
        camper: newCamperBycamperId,
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
            : "Failed to update camper information.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { chatbotUserId } = (await request.json()) as requestBodySchema

    const camperBycamperId = await prisma.camper.findFirst({
      where: {
        chatbotUserId: chatbotUserId,
      },
    })

    if (!camperBycamperId) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "camperId does not exist.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      )
    }

    const newCamperBycamperId = await prisma.camper.update({
      where: {
        camperId: camperBycamperId.camperId,
      },
      data: {
        chatbotUserId: undefined,
      },
    })

    return new Response(
      JSON.stringify({
        message: "success",
        camper: newCamperBycamperId,
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
            : "Failed to update camper information.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
