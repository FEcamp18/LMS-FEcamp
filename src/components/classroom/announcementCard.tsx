import React from "react"
import Image from "next/image"
import { FaRegBell } from "react-icons/fa"
import ConfirmDeleteAnnounce from "../modal/confirmDeleteAnnounce"

type announcementCard = {
  annoTime: Date
  annoTitle: string
  annoText: string
  isTutor: boolean
  subjectId?: string
  annoId?: string
}

export default function AnnouncementCard({
  annoTime,
  annoTitle,
  annoText,
  isTutor,
  subjectId,
  annoId,
}: announcementCard) {
  return (
    <div className="relative m-3 grid max-h-40 max-w-3xl grid-cols-6 gap-3 bg-[url('/image/subject-picture/bg-card.webp')] bg-cover bg-center p-3 pl-5 font-prompt">
      <Image
        className="absolute -left-12 -top-16"
        src="/image/subject-picture/deco-1.svg"
        alt="deco-1"
        width={140}
        height={100}
      />
      <div className="flex h-full flex-col items-center justify-center">
        <FaRegBell className="z-20 h-[25%]" size={50} strokeWidth={1} />

        <p className="p-2 text-center align-middle text-xs font-medium text-gray-600">
          {`${annoTime.getDate()}/${annoTime.getMonth() + 1}/${annoTime.getFullYear().toString().substr(-2)}`}{" "}
          <br /> {`${annoTime.getHours()}:${annoTime.getMinutes()}`}
        </p>
      </div>
      <div className="col-span-4 pl-5">
        <h3 className="font-prompt text-2xl font-bold max-sm:text-sm">
          {annoTitle}
        </h3>
        <p className="font-prompt">{annoText}</p>
      </div>

      {isTutor && (
        <ConfirmDeleteAnnounce
          annoId={annoId ?? ""}
          subjectId={subjectId ?? ""}
          announceName={annoTitle}
        />
      )}
      <Image
        className="absolute -bottom-16 -right-4"
        src="/image/subject-picture/deco-2.svg"
        alt="deco-2"
        width={130}
        height={120}
      />
    </div>
  )
}
