import { PrismaClient } from "@prisma/client";
import { GET as getFilesBySubjectId } from "../../file/[subjectId]/route";
import { GET as getAnnouncementsBySubjectId } from "../../anno/[subjectId]/route";
import { GET as getStaffsByClassId } from "../../staffClass/[classId]/route";

import type { File, FileBySubjectIdResponse } from "@/types/file";
import type {
  Announcement,
  AnnouncementsBySubjectIdResponse,
} from "@/types/announcement";
import type { Staff, StaffsByClassIdResponse } from "@/types/staff";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  props: { params: Promise<{ classId: string }> },
) {
  const { classId } = await props.params;
  try {
    const classData = await prisma.class.findUnique({
      where: { classId: classId },
      include: {
        subject: {
          select: {
            subjectDescription: true,
          },
        },
      },
    });

    if (!classData) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "ClassId does not exist.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    const subjectId = classData.subjectId;
    const subjectIdResolve = {
      params: Promise.resolve({ subjectId }),
    };
    const classIdResolve = {
      params: Promise.resolve({ classId }),
    };

    const filesBySubjectIdResponse = await getFilesBySubjectId(
      req,
      subjectIdResolve,
    );
    const filesBySubjectId: FileBySubjectIdResponse =
      (await filesBySubjectIdResponse.json()) as FileBySubjectIdResponse;

    if (!filesBySubjectId) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "Failed to fetch files by subjectId.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const announcementsBySubjectIdResponse = await getAnnouncementsBySubjectId(
      req,
      subjectIdResolve,
    );
    const announcementsBySubjectId: AnnouncementsBySubjectIdResponse =
      (await announcementsBySubjectIdResponse.json()) as AnnouncementsBySubjectIdResponse;

    if (!announcementsBySubjectId) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "Failed to fetch announcements by subjectId.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const staffsByClassIdResponse = await getStaffsByClassId(
      req,
      classIdResolve,
    );
    const staffsByClassId: StaffsByClassIdResponse =
      (await staffsByClassIdResponse.json()) as StaffsByClassIdResponse;

    if (!staffsByClassId) {
      return new Response(
        JSON.stringify({
          message: "failed",
          error: "Failed to fetch staffs by classId.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const tutors = staffsByClassId.staffs.map((staff: Staff) => staff.nickname);

    const announcements = announcementsBySubjectId.announcements.map(
      (announcement: Announcement) => ({
        title: announcement.annoTitle,
        content: announcement.annoText,
      }),
    );

    const files = filesBySubjectId.files.map((file: File) => ({
      fileName: file.fileTitle,
      description: file.fileDescription,
      downloadLink: file.fileLocation,
    }));

    const classDetails = {
      classId: classData?.classId,
      className: classData.subjectId,
      tutors,
      time:
        classData.startTime.toLocaleTimeString("en", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        }) +
        " - " +
        classData.endTime.toLocaleTimeString("en", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        }),
      description: classData.subject.subjectDescription,
      announcements,
      files,
    };

    return new Response(
      JSON.stringify({
        message: "success",
        classDetails,
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
            : "Failed to fetch class details by classId.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    await prisma.$disconnect();
  }
}
