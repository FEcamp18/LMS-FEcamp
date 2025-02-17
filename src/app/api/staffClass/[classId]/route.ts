import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  props: { params: Promise<{ classId: string }> },
) {
  const { classId } = await props.params;
  try {
    const isClassIdExist = await prisma.class.findUnique({
      where: {
        classId: classId,
      },
    });

    if (!isClassIdExist) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "ClassId does not exist.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    const staffฺsByClassId = await prisma.staffClass.findMany({
      where: {
        classId: classId,
      },
      select: {
        staff: true,
      },
    });

    return new Response(
      JSON.stringify({
        message: "success",
        staffs: staffฺsByClassId.map((staff) => staff.staff),
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
            : "Failed to fetch staffClass by classId.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    await prisma.$disconnect();
  }
}
