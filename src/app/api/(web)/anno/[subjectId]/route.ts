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

export async function POST(req: Request) {
  try {
    const { annoId, subjectId, annoTitle, annoText } = await req.json();

    if (!annoId || !subjectId || !annoTitle || !annoText) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "Missing required fields.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const subject = await prisma.subject.findUnique({ where: { subjectId } });
    if (!subject) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "SubjectId does not exist.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    const staffId = req.headers.get("staff-id");
    if (!staffId) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "Unauthorized tutor.",
        }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    const staff = await prisma.staff.findUnique({ where: { staffId } });
    if (!staff) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "Staff does not exist.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // unauthorized tutor
    const staffClass = await prisma.staffClass.findFirst({
      where: {
        staffId: staffId,
        class: {
          subjectId: subjectId,
        },
      },
    });

    if (!staffClass) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "Tutor not assigned to this class.",
        }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    await prisma.subjectAnnouncements.create({
      data: {
        annoId,
        subjectId,
        annoTitle,
        annoText,
        annoTime: new Date(),
      },
    });

    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "failed", error: "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    await prisma.$disconnect();
  }
}
