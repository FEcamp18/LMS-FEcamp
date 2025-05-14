import { checkAuthToken } from "@/lib/checkAuthToken";
import { prisma } from "@/lib/prisma";
import { type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ camperId: string }> },
) {
  const { camperId } = await props.params
  try {
    await checkAuthToken(req);
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

    const noteOfCamper = await prisma.notes.findMany({
      where: {
        camperId: camperId,
      },
    })

    return new Response(
      JSON.stringify({
        message: "success",
        notes: noteOfCamper,
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
            : "Failed to fetch staff by camperId.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}

export async function POST(
  req: Request,
  props: { params: Promise<{ camperId: string }> },
) {
  const { camperId } = await props.params;

  interface NoteRequestBody {
    staffId: string;
    notes: string;
  }

  try {
    const body = (await req.json()) as NoteRequestBody;
    const { staffId, notes } = body;

    const camperExists = await prisma.camper.findUnique({
      where: { camperId },
    });

    if (!camperExists) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "No camperId",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    await prisma.notes.create({
      data: {
        camperId,
        staffId,
        notes,
        time: new Date(),
      },
    });

    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "failed",
        error:
          error instanceof Error ? error.message : "Failed to create note.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    await prisma.$disconnect();
  }
}
