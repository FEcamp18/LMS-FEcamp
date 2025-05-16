"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { type WebphaseAPIResponse } from "@/types/api/webphase"
import Link from "next/link"

export default function Home() {
  const [webPhase, setWebPhase] = useState<string>("")
  const [load, setLoad] = useState<boolean>(true)

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
    return <LandingPreCamp />
  } 
  else if (webPhase === "ARCHIVE") {
    return <LandingArchive />
  } 
  else {
    return <LandingCamp />
  }
}

function LandingClose() {
  return (
    <div className="relative w-screen h-screen bg-[url('/image/background/landingpage_background.webp')] bg-cover bg-center bg-no-repeat bg-contain">
       <div className="absolute inset-0 bg-white/10 " />
      <div className="flex h-full w-full flex-col items-center justify-center pt-16 backdrop-brightness-75">
         <img src="/logo.svg" alt="Logo" className="absolute top-0 w-72 h-72 mb-6" />
        <div className="text-4xl font-bold text-white text-center px-4">
          ตอนนี้วิหารได้ปิดลงแล้ว<br />
          ร่อยรอยความทรงจำของเรายังคงอยู่เสมอ
        </div>
        <Link
          href="/login"
          className="mt-6 rounded-full bg-blue-500 px-6 py-3 text-white hover:bg-blue-400"
        >
          เข้าสู่ระบบ
        </Link>
      </div>
    </div>
  )
}

function LandingPreCamp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pt-16">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-semibold">อดใจรอค่ายเปิดก่อนนะ</h1>
      </div>
    </div>
  )
}

function LandingArchive() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pt-16">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-semibold">
          ค่ายปิดละจ้า เจอกันปีหน้า
        </h1>
      </div>
    </div>
  )
}

function LandingCamp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pt-16">
      <div className="text-center">
        <video width={200} height={400} loop muted autoPlay>
          <source src="/trident_full.webm" type="video/webm" />
          <p>Your browser does not support the video tag.</p>
        </video>
        <h1 className="mb-4 text-3xl font-semibold">
          เว็บเปิดแล้ว ลงทะเบียนได้เลย
        </h1>
        <Link
          href={"/login"}
          className="rounded-full bg-blue-500 px-8 py-3 text-white hover:bg-blue-400"
        >
          Login
        </Link>
      </div>
    </div>
  )
}
