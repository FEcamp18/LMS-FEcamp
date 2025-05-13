import { checkAuthToken } from "@/lib/checkAuthToken";
import { prisma } from "@/lib/prisma";
import { type NextRequest } from "next/server";

// Define an interface for the request body
interface AnnouncementRequest {
  subjectId: string;
  annoTitle: string;
  annoText: string;
}

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ subjectId: string }> },
) {
  const { subjectId } = await props.params;
  try {
    await checkAuthToken(req);
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
  }
}

export async function POST(req: NextRequest) {
  try {
    await checkAuthToken(req,1);
    // Parse and validate the request body using the interface
    const body = (await req.json()) as AnnouncementRequest;

    const { subjectId, annoTitle, annoText } = body;

    if (!subjectId || !annoTitle || !annoText) {
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

    // Check if the tutor is assigned to the class
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

    // Create the announcement
    await prisma.subjectAnnouncements.create({
      data: {
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
      JSON.stringify({
        message: "failed",
        error:
          error instanceof Error ? error.message : "Internal server error.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
