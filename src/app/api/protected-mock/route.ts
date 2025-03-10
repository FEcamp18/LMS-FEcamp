import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
) {
  const staffId = "staff2"
  try {
    const staffByStaffId = await prisma.staff.findUnique({
      where: {
        staffId: staffId,
      },
    });

    if (!staffByStaffId) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "StaffId does not exist.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        message: "success",
        staff: staffByStaffId,
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
            : "Failed to fetch staff by staffId.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    await prisma.$disconnect();
  }
}
