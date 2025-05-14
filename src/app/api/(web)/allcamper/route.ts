import { checkAuthToken } from "@/lib/checkAuthToken";
import { prisma } from "@/lib/prisma";
import { type NextRequest } from "next/server";

export async function GET(req:NextRequest) {
  try {
    await checkAuthToken(req,1);
    const camperAll = await prisma.camper.findMany({
      select: {
        camperId: true,
        name: true,
        surname: true,
        nickname: true,
        room: true,
      },
    })

    return new Response(
      JSON.stringify({
        message: "success",
        data: camperAll,
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
