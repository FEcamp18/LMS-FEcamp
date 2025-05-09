import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  props: { params: Promise<{ staffId: string }> },
) {
  const { staffId } = await props.params;
  try {
    const Department = await prisma.staff.findUnique({
      where: {
        staffId: staffId,
      },
      select: {
        staffDepartment: true,
      },
    });

    if (!Department) {
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
        department: Department.staffDepartment,
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
