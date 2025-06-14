import { checkAuthToken } from "@/lib/checkAuthToken";
import { prisma } from "@/lib/prisma";
import { type NextRequest } from "next/server";

// Define an interface for the request body
interface NoteRequest {
  camperId: string
  content: string
  type: "HEALTH" | "NORMAL" // Restrict type to valid values
}

export async function POST(req: NextRequest) {
  try {
    await checkAuthToken(req);
    // Parse and validate the request body using the interface
    const body = (await req.json()) as NoteRequest

    const { camperId, content, type } = body

    if (!camperId || !content || !type) {
      return Response.json(
        { message: "failed", error: "Missing required fields." },
        { status: 400 },
      )
    }

    const validTypes = ["HEALTH", "NORMAL"]
    if (!validTypes.includes(type)) {
      return Response.json(
        { message: "failed", error: "Invalid note type." },
        { status: 400 },
      )
    }

    const camper = await prisma.camper.findUnique({ where: { camperId } })
    if (!camper) {
      return Response.json(
        { message: "failed", error: "Camper does not exist." },
        { status: 404 },
      )
    }

    const staffId = req.headers.get("staff-id")
    if (!staffId) {
      return Response.json(
        { message: "failed", error: "Unauthorized staff." },
        { status: 403 },
      )
    }

    const staff = await prisma.staff.findUnique({ where: { staffId } })
    if (!staff) {
      return Response.json(
        { message: "failed", error: "Staff does not exist." },
        { status: 404 },
      )
    }

    await prisma.notes.create({
      data: {
        camperId,
        staffId,
        notes: content,
        type,
        time: new Date(),
      },
    })

    return Response.json({ message: "success" }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "failed", error: "Internal server error." },
      { status: 500 },
    )
  }
}
