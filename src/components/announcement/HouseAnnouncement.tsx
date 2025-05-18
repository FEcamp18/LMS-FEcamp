import { useState, useEffect } from "react"
import React from "react"

import Image from "next/image"

const HouseAnnouncement = ({
  camper_name,
  god_name,
  setShowAnnouncement,
}: {
  camper_name: string
  god_name: string
  setShowAnnouncement: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [activeBackground, setActiveBackground] = useState(0)
  const [textStep, setTextStep] = useState(0)

  useEffect(() => {
    if (activeBackground === 0) {
      const timer = setTimeout(() => {
        setActiveBackground(1) // เปลี่ยนไปที่ bg2
      }, 5000) // 4s duration for the first animation
      return () => clearTimeout(timer)
    }
  }, [activeBackground])

  useEffect(() => {
    if (textStep < 2) {
      const timer = setTimeout(() => {
        setTextStep((prev) => prev + 1) // เปลี่ยนข้อความทีละขั้น
      }, 2500) // 2s duration for each text animation
      return () => clearTimeout(timer)
    }
  }, [textStep])

  const renderText = () => {
    switch (textStep) {
      case 0:
        return (
          <div className="relative flex flex-col items-center justify-center">
            <div className="absolute z-0">
              <Image
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                src="/image/announcement/leaf1.svg"
                alt="Leaf"
                width={350}
                height={350}
                className="animate-spin opacity-50 [animation-duration:4000ms]"
              />
            </div>
            <div className="relative z-10 translate-y-0 text-center text-xl text-white opacity-100 transition-all duration-1000 sm:text-5xl">
              ผลการคัดเลือกจากเทพเจ้าได้ออกมาแล้ว ....
            </div>
          </div>
        )
      case 1:
        return (
          <div className="relative flex flex-col items-center justify-center">
            <div className="absolute z-0">
              <Image
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                src="/image/announcement/leaf1.svg"
                alt="Leaf"
                width={900}
                height={900}
                className="animate-spin opacity-50 [animation-duration:4000ms]"
              />
            </div>
            <div className="z-10 translate-y-0 text-2xl text-white opacity-100 transition-all duration-1000 sm:text-5xl">
              น้อง {camper_name} จะได้เข้าสู่
            </div>
          </div>
        )
      case 2:
        return (
          <div className="flex translate-y-0 flex-col items-center justify-center space-y-4 text-center opacity-100 transition-all duration-1000">
            <div className="text-xl text-white sm:text-3xl">
              ผลการคัดเลือกจากเทพเจ้าได้ออกมาแล้ว
            </div>
            <div className="text-xl text-white sm:text-3xl">
              น้อง {camper_name} ได้ถูกต้องรับสู่
            </div>
            <div className="text-5xl font-bold text-amber-950">
              วิหารเทพ {god_name}
            </div>
            <Image
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              src={`/image/god-room/statue/${god_name}_statue.webp`}
              alt="Leaf"
              width={250}
              height={250}
            />
            <button
              onClick={() => {
                setShowAnnouncement(false)
              }}
              className="absolute bottom-0 right-1 bg-dark-brown px-6 py-2 text-white"
            >
              ปิด
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 h-screen w-screen">
      {/* Background */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000">
        <Image
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src="/image/announcement/bg1.webp"
          alt="Background 1"
          layout="fill"
          objectFit="cover"
          className={`h-full w-full transition-opacity duration-1000 ${
            activeBackground === 0 ? "opacity-100" : "opacity-0"
          }`}
        />
        <Image
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src="/image/announcement/bg2.webp"
          alt="Background 2"
          layout="fill"
          objectFit="cover"
          className={`h-full w-full transition-opacity duration-1000 ${
            activeBackground === 1 ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div
          className={`transition-all duration-1000 ${
            textStep < 2
              ? "translate-y-0 opacity-100"
              : "translate-y-0 opacity-100"
          }`}
        >
          {renderText()}
        </div>
      </div>
    </div>
  )
}

export default HouseAnnouncement
