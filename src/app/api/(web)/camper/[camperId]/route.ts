import { checkAuthToken } from "@/lib/checkAuthToken";
import { prisma } from "@/lib/prisma";
import { type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ camperId: string }> },
) {
  const { camperId } = await props.params;
  try {
    await checkAuthToken(req);
    const camperBycamperId = await prisma.camper.findUnique({
      where: {
        camperId: camperId,
      },
    });

    if (!camperBycamperId) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "camperId does not exist.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        message: "success",
        camper: camperBycamperId,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "failed",
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch staff by camperId.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
