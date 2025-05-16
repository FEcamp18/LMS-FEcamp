"use client"
import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import axios from "axios"
import { type Camper, type Notes } from "@prisma/client"
import { Button } from "@/components/ui/button"
import CreateNote from "@/components/modal/createNote"

interface CamperResponseInterface {
  message: "success" | "failed"
  camper: Camper
  error?: string
}
interface NotesWithStaff {
  noteId: number
  notes: string
  time: string
  staffId: string
  camperId: string
  type: string
  staff: {
    name: string
    nickname: string
  }
}

interface NotesResponseInterface {
  message: "success" | "failed"
  notes?: NotesWithStaff[]
  error?: string
}

interface CamperInfoPopupProps {
  camperId: string
  onClose: () => void // Callback to close the popup
}

export default function CamperInfoPopup({
  camperId,
  onClose,
}: CamperInfoPopupProps) {
  const [camperInfo, setCamperInfo] = useState<Camper | null>(null)
  const [camperNotes, setCamperNotes] = useState<NotesWithStaff[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { data: session } = useSession()

  useEffect(() => {
    const fetchCamperData = async () => {
      try {
        const camperResponse = await axios.get<CamperResponseInterface>(
          `/api/camper/${camperId}`,
        )
        setCamperInfo(camperResponse.data.camper)

        const notesResponse = await axios.get<NotesResponseInterface>(
          `/api/note/${camperId}`,
        )
        setCamperNotes(notesResponse.data.notes ?? [])

        setLoading(false)
      } catch (err) {
        console.error("Error fetching camper data:", err)
        setError("Failed to fetch camper data.")
        setLoading(false)
      }
    }

    void fetchCamperData()
  }, [camperId])

  if (loading || !camperInfo) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="flex h-1/4 w-1/4 flex-col items-center justify-center space-y-3 rounded-sm bg-cream text-brown">
          <p>Loading...</p>{" "}
          <Button
            onClick={onClose}
            className="right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-white hover:bg-red-600"
          >
            Close
          </Button>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center py-20">
      {/* Background Blur */}
      <div className="absolute inset-0 h-screen w-screen bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Popup Content */}
      <div className="relative z-10 my-20 flex w-[90vw] flex-col items-center justify-center text-sm sm:w-[75vw]">
        <div className="relative w-[95vw] sm:w-[75vw]">
          <Image
            src={`/image/camperInfo-image/Zigzag_Edge.svg`}
            width={700}
            height={300}
            alt="Zigzag Edge"
            className="h-auto w-full"
          />
        </div>
        <div className="no-scrollbar h-[80vh] w-full overflow-scroll rounded border bg-cream shadow">
          {/* Close Button */}
          <Button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-white hover:bg-red-600"
          >
            Close
          </Button>

          <div className="bg-dark-gray bg-[url('/image/camperInfo-image/Top_App_Bar.svg')] bg-cover bg-center p-4 text-lg font-bold">
            <div>
              {camperInfo?.name} {camperInfo?.surname}
            </div>
          </div>

          <div className="h-full bg-[url('/image/camperInfo-image/Content-3.svg')] bg-cover bg-center pt-8">
            <div className="flex justify-between">
              <div className="mb-4 pl-4 font-[Prompt] text-2xl font-medium">
                หมายเหตุ
              </div>
              <div
                className="hover: mb-4 cursor-pointer pr-4 text-right font-[Prompt] text-2xl font-medium text-amber-900"
                // onClick={() => alert("เพิ่มหมายเหตุ")}
              >
                {/* + เพิ่ม */}
                <CreateNote
                  camperId={camperInfo.camperId}
                  staffId={session?.user.id ?? ""}
                />
              </div>
            </div>
            <div className="no-scrollbar m-2 flex max-h-[200px] w-full items-start justify-start overflow-y-auto rounded-xl border-2 border-dark-brown p-3">
              {camperNotes.length === 0 && (
                <p className="w-[90%] text-center">ไม่มีโน๊ต</p>
              )}
              <div className="w-full">
                <div className="grid auto-rows-min grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {camperNotes.map((note) => (
                    <div
                      key={note.noteId}
                      className="no-scrollbar h-32 w-full overflow-scroll rounded bg-white p-4 shadow hover:shadow-lg"
                    >
                      <div className="text-sm text-gray-600">{note.notes}</div>
                      <div className="bottom-1 flex w-full space-x-3 pt-2">
                        <div className="text-xs text-gray-400">
                          {new Date(note.time).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(note.time).toLocaleTimeString()}
                        </div>
                        <div className="text-right text-xs text-gray-400">
                          <p>
                            {note.staff.name ?? ""}_
                            {note.staff.nickname ?? note.staffId}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-start px-5 py-10">
              <div className="container w-1/2">
                <h2 className="mb-2 text-xl font-semibold">ข้อมูลสุขภาพ</h2>
                <p className="text-gray-600">
                  รายละเอียดเกี่ยวกับข้อมูลสุขภาพของผู้เข้าร่วม
                </p>
                <p className="mt-2">{camperInfo.healthInfo}</p>
              </div>
              <div className="ml-2 flex w-1/2 flex-col">
                <h2 className="mb-2 text-xl font-semibold">
                  ข้อจํากัดด้านอาหาร
                </h2>
                <p className="text-gray-600">
                  รายละเอียดเกี่ยวกับข้อจํากัดด้านอาหาร
                </p>
                <p className="mt-2">{camperInfo.foodInfo}</p>
              </div>
            </div>

            <hr className="border-1 w-full border-gray-700" />
            <div>
              <h2 className="mb-4 pl-4 pt-7 text-xl">ข้อมูลส่วนตัว</h2>
              <div className="grid grid-cols-3 gap-4 pb-8 pl-4">
                <div className="container">
                  <h2 className="mb-2 text-xl font-semibold">เบอร์โทรศัพท์</h2>
                  <p className="text-gray-600">{camperInfo.contactTel}</p>
                </div>
                <div className="container">
                  <h2 className="mb-2 text-xl font-semibold">เบอร์ผู้ปกครอง</h2>
                  <p className="text-gray-600">
                    {camperInfo.parentTel} ({camperInfo.parentRelation})
                  </p>
                </div>
                <div className="container">
                  <h2 className="mb-2 text-xl font-semibold">อีเมล</h2>
                  <p className="text-gray-600">{camperInfo.contactEmail}</p>
                </div>
                <div className="container">
                  <h2 className="mb-2 text-xl font-semibold">โรงเรียน</h2>
                  <p className="text-gray-600">{camperInfo?.school}</p>
                </div>
                <div className="container">
                  <h2 className="mb-2 text-xl font-semibold">ปี FE</h2>
                  <p className="text-gray-600">{camperInfo?.FEYear}</p>
                </div>
                <div className="container">
                  <h2 className="mb-2 text-xl font-semibold">Room</h2>
                  <p className="text-gray-600">{camperInfo?.room}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-[95vw] sm:w-[75vw]">
          <Image
            src={`/image/camperInfo-image/Zigzag_Edge.svg`}
            width={700}
            height={300}
            alt="Zigzag Edge"
            className="h-auto w-full rotate-180"
          />
        </div>
      </div>
    </div>
  )
}
