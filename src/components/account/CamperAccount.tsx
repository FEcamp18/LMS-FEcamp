import Image from "next/image"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import ScoreTable from "./ScoreTable"
import {
  get_god_name,
  get_god_statue_image_path,
} from "@/components/general/god-by-room"
import type { WebphaseAPIResponse } from "@/types/api/webphase"
import axios from "axios"
import type { Camper } from "@/types/camper"

interface godProps {
  name: string
  path: string
}

export default function CamperAccount() {
  const { data: session, update } = useSession()
  const [loading, setLoading] = useState(true)
  const [webPhase, setWebPhase] = useState<string>("")
  const [god, setGod] = useState<godProps | null>(null)
  const [camper, setCamper] = useState<Camper | null>(null)

  useEffect(() => {
    const handleLoad = async () => {
      await update()
      await fetchCamperInfo()
      const path = await get_god_statue_image_path(
        session?.user.roomNumber ?? 0,
      )
      const name = get_god_name(session?.user.roomNumber ?? 0) ?? ""
      setGod({ name, path })
      await fetchWebPhase()
      setLoading(false)
    }
    const fetchCamperInfo = async () => {
      try {
        if (!session?.user.id || session.user.role != "CAMPER") return

        const response = await axios.get(`/api/camper/${session?.user.id}`)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setCamper(response.data.camper)
      } catch (error) {
        console.error("Error fetching camper info:", error)
      }
    }
    const fetchWebPhase = async () => {
      try {
        const response: WebphaseAPIResponse = await axios.get("/api/web/phase")
        setWebPhase(response.data.phase)
      } catch (error) {
        console.error("Error fetching web phase:", error)
      }
    }

    void handleLoad()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading)
    return (
      <div className="w-full pt-10 text-3xl font-bold text-dark-brown">
        Loading...
      </div>
    )

  // TODO : mock score fix
  const mockScoreData = {
    score: {
      maths: `${camper?.scorePostTest?.[0] ?? 0}/100`,
      physics: `${camper?.scorePostTest?.[1] ?? 0}/100`,
      chemistry: `${camper?.scorePostTest?.[2] ?? 0}/100`,
      tpat3: `${camper?.scorePostTest?.[3] ?? 0}/100`,
    },
    mean: {
      maths: "85",
      physics: "80",
      chemistry: "80.13",
      tpat3: "33.33",
    },
  }
  return (
    <>
      <div className="mx-8 mt-14 flex flex-col justify-between text-brown md:flex-row">
        <div className="w-full space-y-6">
          <h1 className="text-3xl font-semibold">
            น้อง {camper?.name ?? "Unknown"} ({camper?.nickname})
          </h1>
          <section className="grid w-full grid-cols-1 gap-7 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">เบอร์โทรติดต่อ</h2>
              <p>{camper?.contactTel}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">เบอร์โทรผู้ปกครอง</h2>
              <p>{camper?.parentTel}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">อีเมล</h2>
              <p>{camper?.contactEmail}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">โรงเรียน</h2>
              <p>{camper?.school}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">ปี FE</h2>
              <p>{camper?.FEYear}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">วิหาร</h2>
              <p>{god?.name ?? "olympus"}</p>
            </div>
          </section>
        </div>
        {god && (
          <div className="flex w-full flex-col items-center justify-center md:max-w-[400px]">
            <Image
              src={god.path}
              alt="got state image"
              width={250}
              height={300}
            />
            <p className="font-semibold">วิหาร : {god.name}</p>
          </div>
        )}
      </div>
      <section className="mt-3 flex w-full flex-col gap-12 border-b-[1px] border-t-[1px] border-black p-6 text-brown md:flex-row">
        <div className="w-full">
          <h2 className="font-semibold">ข้อมูลสุขภาพ</h2>
          <p>{camper?.healthInfo === "NONE" ? "-" : camper?.healthInfo} </p>
        </div>
        <div className="w-full">
          <h2 className="font-semibold">ข้อจำกัดด้านอาหาร</h2>
          <p>{camper?.foodInfo === "NONE" ? "-" : camper?.foodInfo}</p>
        </div>
      </section>
      {!loading && (webPhase === "CERTIFICATE" || webPhase === "POSTTEST") && (
        <section className="flex w-full flex-col content-center items-center justify-center">
          {webPhase === "POSTTEST" && (
            <ScoreTable score={mockScoreData.score} mean={mockScoreData.mean} />
          )}

          <a
            download
            className="relative mx-6 mt-4 h-[160px] w-[350px] cursor-pointer content-center lg:h-[155px] lg:w-[800px]"
          >
            <Image
              layout="fill"
              objectFit="cover"
              className="hidden transition-all hover:scale-110 lg:block"
              src="/image/account/CertificateLaptop.webp"
              alt="background"
            />
            <Image
              layout="fill"
              objectFit="cover"
              className="block lg:hidden"
              src="/image/account/CertificateMobile.webp"
              alt="background"
            />
          </a>
        </section>
      )}
    </>
  )
}
