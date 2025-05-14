import { checkAuthToken } from "@/lib/checkAuthToken";
import { prisma } from "@/lib/prisma";
import { type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ classId: string }> },
) {
  const { classId } = await props.params
  try {
    await checkAuthToken(req);
    const isClassIdExist = await prisma.class.findUnique({
      where: {
        classId: classId,
      },
    })

    if (!isClassIdExist) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "ClassId does not exist.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      )
    }

    const staffฺsByClassId = await prisma.staffClass.findMany({
      where: {
        classId: classId,
      },
      select: {
        staff: true,
      },
    })

    return new Response(
      JSON.stringify({
        message: "success",
        staffs: staffฺsByClassId.map((staff) => staff.staff),
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
