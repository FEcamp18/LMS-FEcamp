"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { get_god_name } from "@/components/general/god-by-room"

export default function BroadcastForm() {
  const { data: session } = useSession()
  const [announceName, setAnnounceName] = useState("")
  const [roomNumber, setRoomNumber] = useState("all camper")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!announceName.trim()) {
      setError("Announcement name is required.")
      return
    }

    setError("") // Clear any previous errors

    try {
      const payload: { message: string; condition?: string } = {
        message: `ประกาศใหม่ถูกเพิ่มในวิชา! หัวข้อ ${announceName}`,
      }

      if (roomNumber !== "all camper") {
        payload.condition = roomNumber
      }

      const response = await fetch(`/api/proxy/send-announcement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        alert("Announcement sent successfully!")
        setAnnounceName("") // Reset form
        setRoomNumber("all camper")
      } else {
        alert("Failed to send announcement.")
      }
    } catch (error) {
      console.error("Error sending announcement:", error)
      alert("An error occurred. Please try again.")
    }
  }

  if (!session?.user.boardcastPrio)
    return (
      <div className="font-2xl w-full pt-10 text-center">
        คุณไม่สามารถ boardcast ได้
      </div>
    )

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="shadow-mdb flex w-80 min-w-[40%] flex-col gap-4 rounded-xl border-2 border-light-brown p-4"
      >
        <label htmlFor="announceName" className="font-medium">
          ข้อความประกาศ
        </label>
        <input
          id="announceName"
          type="text"
          value={announceName}
          onChange={(e) => setAnnounceName(e.target.value)}
          placeholder="Enter announcement"
          className="rounded border p-2"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}

        <label htmlFor="roomNumber" className="font-medium">
          เลือกห้องประกาศ
        </label>
        <select
          id="roomNumber"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="rounded border p-2"
        >
          <option value="all camper">All Camper</option>
          {Array.from({ length: 8 }).map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} : {get_god_name(i)}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="rounded bg-light-brown p-2 text-white hover:bg-dark-brown"
        >
          Send Announcement
        </button>
      </form>
    </div>
  )
}
