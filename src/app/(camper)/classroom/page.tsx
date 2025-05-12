"use client";
import { ClassCard } from "@/components/classroom/classCard";
import ClassroomService from "@/lib/ClassroomService";
import type { MergeClassData } from "@/types/class";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import {
  get_god_name,
  get_god_schedule_image_path,
} from "@/components/general/god-by-room";

function ClassroomItems() {
  const [subjects, setSubjects] = useState<MergeClassData[] | null>(null);
  const [filterSubject, setFilterSubject] = useState<MergeClassData[] | null>(
    null,
  );
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [god_name, set_god_name] = useState<string>("");
  const [god_schedule_image_path, set_god_schedule_image_path] =
    useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ClassroomService.getClassroomsByRoomId("1");
        setSubjects(data.courses);
        setFilterSubject(data.courses); // Initially show all subjects
      } catch (error) {
        console.error("Failed to fetch classrooms:", error);
      }
      const god_name_res = await get_god_name();
      const god_schedule_image_path_res = await get_god_schedule_image_path();
      console.log(god_schedule_image_path_res);

      set_god_name(god_name_res ?? "");
      set_god_schedule_image_path(god_schedule_image_path_res);
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
    <div className="w-full flex-col space-y-6 p-4 lg:grid-cols-4">
      <div className="mt-5 flex w-full items-center justify-center">
        <div className="flex h-24 w-[80%] rotate-[-3deg] items-center justify-center bg-white text-dark-brown sm:w-[45%]"></div>
        <p className="absolute font-inknut text-5xl text-dark-brown">
          {god_name}
        </p>
      </div>

      <div className="flex w-full items-center justify-center">
        <Image
          src="/image/subject-picture/SectionTitle.svg"
          width={300}
          height={20}
          className="w-52"
          alt="Course Title"
        />
      </div>
      <div className="relative left-1/2 min-h-64 w-[115%] -translate-x-1/2 bg-white p-10 px-8 sm:w-[110%] sm:px-20">
        {god_schedule_image_path != "" && (
          <Image
            src={god_schedule_image_path}
            alt={"schedule"}
            height={300}
            width={2400}
          />
        )}
      </div>
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
      <div className="flex flex-col justify-center gap-4 py-4 sm:flex-row">
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
