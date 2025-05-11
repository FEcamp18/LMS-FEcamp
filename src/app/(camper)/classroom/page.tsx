"use client";
import { ClassCard } from "@/components/classroom/classCard";
import ClassroomService from "@/lib/ClassroomService";
import type { MergeClassData } from "@/types/class";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";

function ClassroomItems() {
  const [subjects, setSubjects] = useState<MergeClassData[] | null>(null);
  const [filterSubject, setFilterSubject] = useState<MergeClassData[] | null>(
    null,
  );
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ClassroomService.getClassroomsByRoomId("1");
        setSubjects(data.courses);
        setFilterSubject(data.courses); // Initially show all subjects
      } catch (error) {
        console.error("Failed to fetch classrooms:", error);
      }
    };

    void fetchData();
  }, []);

  const handleFilter = (filter: string | null) => {
    setSelectedFilter(filter);
    if (!filter) {
      setFilterSubject(subjects); // Show all subjects if no filter is selected
    } else {
      setFilterSubject(
        subjects?.filter(
          (subject) => subject.subjectId.slice(0, -2) === filter,
        ) ?? null,
      );
    }
  };

  return (
    <div className="w-full flex-col p-4 lg:grid-cols-4">
      <div className="flex w-full items-center justify-center">
        <Image
          src="/image/subject-picture/CourseTitle.svg"
          width={300}
          height={20}
          className="w-52"
          alt="Course Title"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 py-4">
        {["MATHS", "PHYSICS", "CHEMISTRY", "TPAT3"].map((filter) => (
          <button
            key={filter}
            onClick={() =>
              handleFilter(filter === selectedFilter ? null : filter)
            }
            className={`border-2 border-dark-brown px-4 py-2 text-sm font-bold ${
              selectedFilter === filter
                ? "bg-dark-brown text-cream"
                : "bg-transparent text-dark-brown"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Subject Cards */}
      <div className="grid w-full grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filterSubject?.map((classData, index) => (
          <div key={index} className="flex items-start justify-center">
            <ClassCard subject={classData} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClassroomPage() {
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
export const dynamic = "force-dynamic";
