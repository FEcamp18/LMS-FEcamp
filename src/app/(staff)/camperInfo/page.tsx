"use client"

import { useEffect, useState } from "react"
import CamperInfoTable from "@/components/info/camperInfoTable"
import { type Camper } from "@prisma/client"
import axios from "axios"

interface CamperResponseInterface {
  message: "success" | "failed"
  data: Camper[]
  error?: string
}

export default function ClassroomPage() {
  const [campers, setCampers] = useState<Camper[]>([])
  const [selectedRoom, setSelectedRoom] = useState(1)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCampers = async () => {
      try {
        const response =
          await axios.get<CamperResponseInterface>("/api/allcamper")

        setCampers(response.data.data)
      } catch (err) {
        console.error("Error fetching campers:", err)
        setError("Failed to get data")
      }
    }

    void fetchCampers()
  }, [])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  const filteredCampers = campers.filter(
    (camper) => camper.room === selectedRoom,
  )

  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      {/* Sidebar */}
      <div className="w-[90%] p-4 sm:w-1/4">
        <h2 className="mb-4 text-xl font-bold">Rooms</h2>
        <p className="mb-4 text-sm sm:hidden">เลื่อนเพื่อดูห้องลำดับอื่น</p>
        <ul className="flex max-sm:flex-row max-sm:space-x-2 max-sm:overflow-scroll sm:flex-col sm:space-y-2">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((room) => (
            <li key={room}>
              <button
                onClick={() => setSelectedRoom(room)}
                className={`w-[100px] rounded-lg p-2 text-left sm:w-full ${
                  selectedRoom === room ? "bg-gray-100" : "hover:bg-gray-300"
                }`}
              >
                Room {room}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <main className="w-full p-4">
        <h1 className="mb-4 text-2xl font-bold">Camper Information</h1>
        <CamperInfoTable camper={filteredCampers} />
      </main>
    </div>
  )
}
