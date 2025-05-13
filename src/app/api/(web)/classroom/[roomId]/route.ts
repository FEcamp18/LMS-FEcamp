import type { MergeClassData } from "@/types/class";

import { prisma } from "@/lib/prisma";
import { checkAuthToken } from "@/lib/checkAuthToken";
import { type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ roomId: string }> },
) {
  try {
    await checkAuthToken(req);
    const { roomId } = await props.params;
    const Id = parseInt(roomId);
    const courses = await prisma.class.findMany({
      where: { room: Id },
      select: {
        classId: true,
        subjectId: true,
        startTime: true,
        endTime: true,
        location: true,
        room: true,
        StaffClass: {
          select: {
            staff: {
              select: {
                nickname: true,
              },
            },
          },
        },
        subject: {
          select: { subjectDescription: true },
        },
      },
    });

    if (!courses || courses.length === 0) {
      return Response.json(
        { message: "failed", error: "Room does not exist." },
        {
          status: 404,
        },
      );
    }

    // Single-pass merge using a Map for O(1) lookups instead of O(n) with find()
    const classMap = new Map<string, MergeClassData>();
    
    for (const course of courses) {
      const tutors = course.StaffClass.map(sc => sc.staff.nickname);
      
      classMap.set(course.classId, {
        classId: course.classId,
        tutors: tutors,
        roomId: course.room,
        subjectId: course.subjectId,
        startTime: course.startTime,
        endTime: course.endTime,
        location: course.location,
        description: course.subject?.subjectDescription,
      });
    }

    return Response.json(
      {
        message: "success",
        courses: Array.from(classMap.values()),
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return Response.json(
      {
        message: "failed",
        error: error,
      },
      {
        status: 500,
      },
    );
  }
}
