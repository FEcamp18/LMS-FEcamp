import type { MergeClassData } from "@/types/class";

import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  props: { params: Promise<{ roomId: string }> },
) {
  try {
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
        subject: {
          select: { subjectDescription: true, subjectTopic : true },
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
      // tutors is no longer use in frontend ui
      // I'll remove from interface
      // const tutors = course.StaffClass.map(sc => sc.staff.nickname);
      
      classMap.set(course.classId, {
        classId: course.classId,
        roomId: course.room,
        subjectId: course.subjectId,
        startTime: course.startTime,
        endTime: course.endTime,
        location: course.location,
        description: course.subject?.subjectDescription,
        topic : course.subject?.subjectTopic
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
