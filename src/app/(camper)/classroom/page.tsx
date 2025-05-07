// write your code here
import { getClassroomsByRoomId } from "@/lib/getClassroomsByRoomId";
import type { MergeClassData } from "@/types/class";

export default async function ClassroomPage() {
  const res = await getClassroomsByRoomId({roomId: "1"});

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <p className="col-span-2 lg:col-span-4 text-center">Count: {res?.courses.length}</p>
      {
        res?.courses.length === 0 ? (
          <p>No classes found.</p>
        ) : (
          res?.courses.map((course: MergeClassData) => (
            <div key={course.classId} className="p-4 rounded-lg shadow-md text-sm">
              <h2>{course.subjectId}</h2>
              <p>{new Date(course.startTime).toLocaleTimeString()} - {new Date(course.endTime).toLocaleTimeString()}</p>
              <p>Room: {course.roomId}</p>
              <p>Location: {course.location}</p>
              <p>Tutors: {course.tutors.join(", ")}</p>
            </div>
          ))
        )
      }
    </div>
  );
}