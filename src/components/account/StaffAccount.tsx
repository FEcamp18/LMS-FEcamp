import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import type { Staff } from "@/types/staff"
import axios from "axios"

export default function StaffAccount() {
  const { data: session, update } = useSession()
  const [loading, setLoading] = useState(true)
  const [staff, setStaff] = useState<Staff | null>(null)

  useEffect(() => {
    const handleLoad = async () => {
      await update()
      await fetchStaffInfo()
    }

    const fetchStaffInfo = async () => {
      try {
        const response = await axios.get(`/api/staff/${session?.user.id}`)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setStaff(response.data.staff)
      } catch (error) {
        console.error("Error fetching staff info:", error)
      }
    }

    void handleLoad()
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading)
    return (
      <div className="w-full pt-10 text-3xl font-bold text-dark-brown">
        Loading...
      </div>
    )
  return (
    <>
      <div className="mx-8 mt-14 flex flex-col justify-between text-brown md:flex-row">
        <div className="w-full space-y-6">
          <h1 className="text-3xl font-semibold">
            พี่ {staff?.name ?? "Unknown"} ({staff?.nickname})
          </h1>
          <section className="grid w-full grid-cols-1 gap-7 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">เบอร์โทรติดต่อ</h2>
              <p>{staff?.contactTel}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">อีเมล</h2>
              <p>{staff?.contactEmail}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">ภาค</h2>
              <p>{staff?.engineerDepartment}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">ปี FE</h2>
              <p>{staff?.FEYear}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">ฝ่าย</h2>
              <p>{staff?.staffDepartment.join(", ")}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">Room Number</h2>
              <p>{staff?.roomNumber}</p>
            </div>
          </section>
        </div>
      </div>
      <section className="mt-3 flex w-full flex-col gap-12 border-b-[1px] border-t-[1px] border-black p-6 text-brown md:flex-row">
        <div className="w-full">
          <h2 className="font-semibold">ข้อมูลสุขภาพ</h2>
          <p>{staff?.healthInfo === "NONE" ? "-" : staff?.healthInfo}</p>
        </div>
        <div className="w-full">
          <h2 className="font-semibold">ข้อจำกัดด้านอาหาร</h2>
          <p>{staff?.foodInfo === "NONE" ? "-" : staff?.foodInfo}</p>
        </div>
      </section>
    </>
  )
}
