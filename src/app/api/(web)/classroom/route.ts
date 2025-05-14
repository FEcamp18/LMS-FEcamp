import type { MergeClassData } from "@/types/class";
import { prisma } from "@/lib/prisma";


export async function GET() {
  try {
    // HELP : I gave up here
    // await checkAuthToken(req);
    const courses = await prisma.class.findMany({
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
        { message: "failed", error: "No classes found." },
        { status: 404 },
      );
    }

    // Single-pass merge using a Map for O(1) lookups instead of O(n) with find()
    const classMap = new Map<string, MergeClassData>();

    for (const course of courses) {
      const tutors = course.StaffClass.map((sc) => sc.staff.nickname);

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
        error: error instanceof Error ? error : "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
