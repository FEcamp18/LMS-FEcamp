"use client"
import { type Subject } from "@prisma/client"
import { useState, useEffect } from "react"
import { ClassCardTutor } from "@/components/classroom/classCardTutor"
import Image from "next/image"

interface SubjectResponse {
  message: string
  subjects: Subject[]
}

export default function TutorPage() {
  const [subjects, setSubjects] = useState<Subject[] | null>(null)
  const [filterSubject, setFilterSubject] = useState<Subject[] | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

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
      )
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const data = (await response.json()) as SubjectResponse
      setSubjects(data.subjects)
      setFilterSubject(data.subjects) // Initially show all subjects
    }
    void fetchData()
  }, [])

  const handleFilter = (filter: string | null) => {
    setSelectedFilter(filter)
    if (!filter) {
      setFilterSubject(subjects) // Show all subjects if no filter is selected
    } else {
      setFilterSubject(
        subjects?.filter((subject) => subject.subjectName === filter) ?? null,
      )
    }
  }

  if (!subjects)
    return (
      <p className="h-full w-full py-5 text-center text-xl font-bold text-dark-brown">
        Loading...
      </p>
    )

  return (
    <div className="w-full flex-col p-4 lg:grid-cols-4">
      {/* Title */}
      <div className="relative flex w-full items-center justify-center">
        <Image
          src="/image/subject-picture/CourseTitle.svg"
          width={300}
          height={20}
          className="w-52"
          alt="Course Title"
        />
        <Image
          src="/image/subject-picture/helmfx1 1.webp"
          alt="Helm"
          width={200}
          height={200}
          className="absolute -top-5 right-5 hidden w-[150px] lg:block"
        />
        <Image
          src="/image/subject-picture/shieldfx1 1.webp"
          alt="Helm"
          width={200}
          height={200}
          className="absolute left-10 top-2 hidden w-[150px] lg:block"
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
            <ClassCardTutor subject={classData} />
          </div>
        ))}
      </div>
    </div>
  )
}

// fix build error (headers in route)
export const dynamic = "force-dynamic"
