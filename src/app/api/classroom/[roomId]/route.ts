import { PrismaClient} from "@prisma/client";
import type { ClassData,MergeClassData } from "@/types/class";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    const Id =  parseInt(params.roomId);
    const courses = await prisma.class.findMany({
      where: { room: Id },
      select: {
        classId: true,
        subjectId: true,
        startTime: true,
        endTime: true,
        location: true,
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
    const flattenedCourses = courses.flatMap((course) =>
      course.StaffClass.map((staffClass) => ({
        classId: course.classId,
        staffName: staffClass.staff.nickname, // Unnested staff name
        subjectId: course.subjectId,
        startTime: course.startTime,
        endTime: course.endTime,
        location: course.location,
        description: course.subject?.subjectDescription,
      })),
    );
    const mergeData = (data: ClassData[]): MergeClassData[] => {
      const merged = data.reduce((acc, curr) => {
        const existing = acc.find((item) => item.classId === curr.classId);
        if (existing) {
          existing.staffNames.push(curr.staffName);
        } else {
          acc.push({
            classId: curr.classId,
            staffNames: [curr.staffName],
            subjectId: curr.subjectId,
            startTime: curr.startTime,
            endTime : curr.endTime,
            location: curr.location,
            description: curr.description,
          });
        }
        return acc;
      }, [] as MergeClassData[]);

      return merged;
    };

    
    

    const mergedcourse = mergeData(flattenedCourses as ClassData[]);

    return Response.json(
      {
        message: "success",
        courses: mergedcourse,
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
