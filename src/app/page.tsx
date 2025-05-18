"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import { type WebphaseAPIResponse } from "@/types/api/webphase"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [webPhase, setWebPhase] = useState<string>("")
  const [load, setLoad] = useState<boolean>(true)
  const { status } = useSession()

  useEffect(() => {
    const fetchWebPhase = async () => {
      try {
        const response: WebphaseAPIResponse = await axios.get("/api/web/phase")
        setWebPhase(response.data.phase)
      } catch (error) {
        console.error("Error fetching web phase:", error)
      }
    }

    void fetchWebPhase()
    setLoad(false)
  }, [])

  if (load || webPhase === "") return <div>Loading</div>
  if (webPhase === "CLOSED") {
    return <LandingClose />
  } else if (webPhase === "BEFORE_CAMP") {
    return <LandingPreCamp status={status} />
  } else if (webPhase === "ARCHIVE") {
    return <LandingArchive />
  } else {
    return <LandingCamp status={status} />
  }
}

function LandingClose() {
  return (
    <LandingBackground>
      <div className="relative h-screen w-screen bg-[url('/image/background/landingpage_background.webp')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-white/10" />
        <div className="flex h-full w-full flex-col items-center justify-center pt-16 backdrop-brightness-75">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={288}
            height={288}
            className="absolute top-0 mb-6 h-72 w-72"
          />
          <div className="px-4 text-center text-4xl font-bold text-white">
            ตอนนี้วิหารได้ปิดลงชั่วคราว
            <br />
            ร่อยรอยความทรงจำของเรายังคงอยู่เสมอ
          </div>
        </div>
      </div>
    </LandingBackground>
  )
}

function LandingPreCamp(props: { status: string }) {
  return (
    <LandingBackground>
      <div className="flex min-h-screen flex-col items-center justify-center pt-16">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-white">
            เห็นวิหารเทพอยู่ไกลๆ อดใจรอค่ายเปิดก่อนนะ
          </h1>
          <Link
            href={"/pretest"}
            className="w-52 rounded-full bg-light-gray px-8 py-3 text-white hover:bg-dark-gray"
          >
            เช็คที่นั่งสอบ
          </Link>
          {props.status != "authenticated" ? (
            <Link
              href={"/login"}
              className="w-52 rounded-full bg-light-brown px-8 py-3 text-white hover:bg-dark-brown"
            >
              Login
            </Link>
          ) : (
            <Link
              href={"/board"}
              className="w-52 rounded-full bg-light-brown px-8 py-3 text-white hover:bg-dark-brown"
            >
              เข้าหน้าเว็บ
            </Link>
          )}
        </div>
      </div>
    </LandingBackground>
  )
}

function LandingArchive() {
  return (
    <LandingBackground>
      <div className="flex min-h-screen flex-col items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-semibold text-white">
            วิหารเทพได้ปิดตัวลง เจอกันปีหน้า
          </h1>
        </div>
      </div>
    </LandingBackground>
  )
}

function LandingCamp(props: { status: string }) {
  return (
    <LandingBackground>
      <div className="flex min-h-screen flex-col items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-semibold text-white">
            วิหารเทพได้เปิดต้อนรับน้องแล้ว
          </h1>
          {props.status != "authenticated" ? (
            <Link
              href={"/login"}
              className="rounded-full bg-light-brown px-8 py-3 text-white hover:bg-dark-brown"
            >
              Login
            </Link>
          ) : (
            <Link
              href={"/board"}
              className="rounded-full bg-light-brown px-8 py-3 text-white hover:bg-dark-brown"
            >
              เข้าหน้าเว็บ
            </Link>
          )}
        </div>
      </div>
    </LandingBackground>
  )
}

function LandingBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[url('/image/background/landingpage_background.webp')] bg-cover bg-center bg-no-repeat">
      {/* Animated Decorations */}
      <Image
        src="/image/landingpage_element/element01.webp"
        alt="element01"
        width={300}
        height={300}
        className="pointer-events-none absolute right-0 top-0 z-10 animate-x-move"
      />
      <Image
        src="/image/landingpage_element/element03.webp"
        alt="element03"
        width={300}
        height={300}
        className="pointer-events-none absolute left-0 top-0 z-10 animate-x-move"
      />
      <Image
        src="/image/landingpage_element/element04.webp"
        alt="element04"
        width={200}
        height={200}
        className="pointer-events-none absolute -bottom-52 z-10 animate-y-move sm:bottom-0 lg:left-36 lg:top-52"
      />
      {children}
    </div>
  )
}
