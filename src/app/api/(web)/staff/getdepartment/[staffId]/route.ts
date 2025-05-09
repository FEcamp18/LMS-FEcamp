import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  props: { params: Promise<{ staffId: string }> },
) {
  const { staffId } = await props.params;
  try {
    const staffData = await prisma.staff.findUnique({
      where: {
        staffId: staffId,
      },
      select: {
        staffDepartment: true,
      },
    });

    if (!staffData) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "StaffId does not exist.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // Determine single department based on priority
    let primaryDepartment = "STAFF"; // default value
    const departments = staffData.staffDepartment;

    if (departments.includes("VCK")) {
      primaryDepartment = "VCK";
    }

    return new Response(
      JSON.stringify({
        message: "success",
        department: primaryDepartment,
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
            : "Failed to fetch department.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    await prisma.$disconnect();
  }
}
