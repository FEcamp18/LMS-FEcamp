// write your code here
import { getClassroomsByRoomId } from "@/lib/getClassroomsByRoomId";
import type { MergeClassData } from "@/types/class";
import { Suspense } from "react";

async function ClassroomItems() {
  const res = await getClassroomsByRoomId({ roomId: "1" });

  return (
    <div className="grid grid-cols-2 gap-4 p-4 lg:grid-cols-4">
      <p className="col-span-2 text-center lg:col-span-4">
        Count: {res?.courses.length}
      </p>
      {res?.courses.length === 0 ? (
        <p>No classes found.</p>
      ) : (
        res?.courses.map((course: MergeClassData) => (
          <div
            key={course.classId}
            className="rounded-lg p-4 text-sm shadow-md"
          >
            <h2>{course.subjectId}</h2>
            <p>
              {new Date(course.startTime).toLocaleTimeString()} -{" "}
              {new Date(course.endTime).toLocaleTimeString()}
            </p>
            <p>Room: {course.roomId}</p>
            <p>Location: {course.location}</p>
            <p>Tutors: {course.tutors.join(", ")}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default async function ClassroomPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-xl text-dark-brown">Loading...</p>
        </div>
      }
    >
      <ClassroomItems />
    </Suspense>
  );
}
