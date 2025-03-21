import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  props: { params: Promise<{ subjectId: string }> },
) {
  const { subjectId } = await props.params;
  try {
    const isSubjectIdExist = await prisma.subject.findUnique({
      where: { subjectId },
    });

    if (!isSubjectIdExist) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "SubjectId does not exist.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    const announcementsBySubjectId = await prisma.subjectAnnouncements.findMany(
      {
        where: { subjectId },
      },
    );

    return new Response(
      JSON.stringify({
        message: "success",
        announcements: announcementsBySubjectId,
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
            : "Failed to fetch announcements by subjectId.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(
  req: Request,
  props: { params: Promise<{ subjectId: string }> },
) {
  const { subjectId } = await props.params;
  try {
    const isSubjectIdExist = await prisma.subject.findUnique({
      where: { subjectId },
    });

    if (!isSubjectIdExist) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "SubjectId does not exist.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    const { annoTitle, annoText } = await req.json();

    // Validate the input
    if (!annoTitle || !annoText) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "Announcement title and text are required.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const newAnnouncement = await prisma.subjectAnnouncements.create({
      data: {
        subjectId,
        annoTitle,
        annoText,
      },
    });

    return new Response(
      JSON.stringify({
        message: "success",
        announcement: newAnnouncement,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "failed",
        error:
          error instanceof Error
            ? error.message
            : "Failed to create new announcement.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    await prisma.$disconnect();
  }
}