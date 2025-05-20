"use client"
import React, { useEffect, useState } from "react"
import PostRoomTable from "./PostRoomTable"
import { type PostExamDataInterface } from "./fetchPretestRoom"
import { cleanPosttestRoom } from "./fetchPretestRoom"
import axios from "axios"

const ExamList: React.FC = () => {
  const [groupedData, setGroupedData] = useState<
    Record<string, PostExamDataInterface[]>
  >({})

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get<{ data: PostExamDataInterface[] }>(
        "/api/posttest",
      )
      const uncleanData = res.data.data

      console.log(uncleanData)

      if (!uncleanData) return
      const examData = cleanPosttestRoom(uncleanData)

      if (!examData) return
      setGroupedData(examData)
    }
    void fetchData()
  }, [])

  return (
    <div className="m-2">
      {groupedData &&
        Object.entries(groupedData).map(([location, campers]) => (
          <PostRoomTable key={location} location={location} campers={campers} />
        ))}
    </div>
  )
}

export default ExamList
