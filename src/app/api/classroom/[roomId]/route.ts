import { PrismaClient, SUBJECT } from "@prisma/client";
const prisma = new PrismaClient();

type ClassData = {
  classId: string;
  staffName: string;
  subjectId: string;
  startTime: Date;
  endTime: Date;
  location: string;
  description?: string;
};
type MergedData = {
  classId: string;
  staffNames: string[];
  subjectId: string;
  startTime: Date;
  endTime: Date;
  location: string;
  description?: string;
};

export async function GET(
  req: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    const Id = await parseInt(params.roomId);
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
                name: true,
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

    const mergeData = (data: ClassData[]): MergedData[] => {
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
      }, [] as MergedData[]);

      return merged;
    };

    
    const flattenedCourses = courses.flatMap((course) =>
      course.StaffClass.map((staffClass) => ({
        classId: course.classId,
        staffName: staffClass.staff.name, // Unnested staff name
        subjectId: course.subjectId,
        startTime: course.startTime,
        endTime: course.endTime,
        location: course.location,
        description: course.subject?.subjectDescription,
      })),
    );

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
