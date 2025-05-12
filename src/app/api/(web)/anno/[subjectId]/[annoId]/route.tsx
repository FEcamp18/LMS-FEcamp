import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  props: { params: Promise<{ subjectId: string; annoId: string }> },
) {
  const { subjectId, annoId } = await props.params;

  try {
    const intannoid = parseInt(annoId);
    // Check if announcement exists with both IDs
    const announcement = await prisma.subjectAnnouncements.findFirst({
      where: {
        AND: [{ subjectId: subjectId }, { annoId: intannoid }],
      },
    });

    if (!announcement) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error:
            "Announcement not found for given subject and announcement ID.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // Delete the specific announcement
    await prisma.subjectAnnouncements.deleteMany({
      where: {
        AND: [{ subjectId: subjectId }, { annoId: intannoid }],
      },
    });

    return new Response(
      JSON.stringify({
        message: "success",
        data: {
          deletedAnnouncement: {
            subjectId,
            annoId: intannoid,
          },
        },
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
            : "Failed to delete announcement.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
