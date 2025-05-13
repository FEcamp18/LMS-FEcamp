import { PHASE } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { checkAuthToken } from "@/lib/checkAuthToken";
import { type NextRequest } from "next/server";
// Define an interface for the request body
interface PhaseUpdateRequest {
  phase: PHASE
}

export async function GET() {
  try {    
    // await checkAuthToken(req);
    const phase = await prisma.webPhase.findFirst();

    if (!phase) {
      // if phase === null value
      return Response.json(
        {
          message: "failed",
          error: "No phase data available.",
        },
        {
          status: 404,
        },
      )
    }

    return Response.json(
      {
        message: "success",
        phase: phase.phase,
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

export async function PATCH(req: NextRequest) {
  try {
    await checkAuthToken(req,3);


    const presentstate = await prisma.webPhase.findFirst()
    const body = (await req.json()) as PhaseUpdateRequest // Use the interface here
    const newPhase: PHASE = body.phase

    if (!presentstate) {
      // If phase === null value
      return Response.json(
        {
          message: "failed",
          error: "No phase data available.",
        },
        {
          status: 404,
        },
      )
    }

    // Check if the provided phase is valid
    if (!Object.values(PHASE).includes(newPhase)) {
      return Response.json(
        { message: "failed", error: "Invalid phase provided." },
        { status: 400 },
      )
    }

    const current = presentstate.phase
    await prisma.webPhase.update({
      where: { phase: current },
      data: { phase: newPhase },
    })

    return Response.json({ message: "success" }, { status: 200 })
  } catch (error) {
    return Response.json(
      {
        message: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
