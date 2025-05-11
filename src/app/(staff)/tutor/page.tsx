"use client";
import { type Subject } from "@prisma/client";
import { useState, useEffect } from "react";
import { ClassCard } from "@/components/classroom/classCard";
import { ClassContainer } from "@/components/classroom/classContainer";
import { ClassCardTutor } from "@/components/classroom/classCardTutor";
import Image from "next/image";
interface SubjectResponse {
  message: string;
  subjects: Subject[];
}

export default function TutorPage() {
  const [subjects, setSubjects] = useState<Subject[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/subject`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = (await response.json()) as SubjectResponse;
      setSubjects(data.subjects);
    };
    void fetchData();
  }, []);

  if (!subjects)
    return (
      <p className="h-full w-full py-5 text-center text-xl font-bold text-dark-brown">
        Loading...
      </p>
    );
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
      <div className="grid w-full grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {subjects.map((classData, index) => (
          <div key={index} className="flex items-start justify-center">
            <ClassCardTutor subject={classData} />
          </div>
        ))}
      </div>
      {subjects.map((subject: Subject) => (
        <div
          key={subject.subjectId}
          className="rounded-lg p-4 text-sm shadow-md"
        >
          {/* <ClassCard class={subject} /> */}
          {/* <h2>{subject.subjectId}</h2>

          <p>{subject.subjectName}</p>
          <p>{subject.subjectTopic}</p>
          <p className="text-xs text-gray-600">{subject.subjectDescription}</p> */}
        </div>
      ))}
    </div>
  );
}

// fix build error (headers in route)
export const dynamic = "force-dynamic";
