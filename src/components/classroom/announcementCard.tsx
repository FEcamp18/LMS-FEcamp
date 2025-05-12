import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaRegFile } from "react-icons/fa";

type announcementCard = {
  annoTime: Date;
  annoTitle: string;
  annoText: string;
  isTutor: boolean;
};

export default function AnnouncementCard({
  annoTime,
  annoTitle,
  annoText,
  isTutor,
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
        <FaRegFile className="z-20 h-[25%]" size={50} strokeWidth={1} />

        <p className="p-2 text-center align-middle text-xs font-medium text-gray-600">
          {`${annoTime.getDate()}/${annoTime.getMonth() + 1}/${annoTime.getFullYear().toString().substr(-2)}`}{" "}
          <br /> {`${annoTime.getHours()}:${annoTime.getMinutes()}`}
        </p>
      </div>
      <div className="col-span-4 pl-5">
        <h3 className="font-prompt text-2xl font-bold max-sm:text-sm">
          {annoTitle}
        </h3>
        <p className="font-prompt text-xs">{annoText}</p>
      </div>

      {isTutor && (
        <div className="static z-20 flex cursor-pointer place-items-center justify-end pl-11 pr-4">
          <Button variant="link" className="flex-1 bg-inherit p-1">
            <Image
              src="/image/subject-picture/Trash.svg"
              alt="Trash Icon"
              width={35}
              height={100}
            />
          </Button>
        </div>
      )}
      <Image
        className="absolute -bottom-16 -right-4"
        src="/image/subject-picture/deco-2.svg"
        alt="deco-2"
        width={130}
        height={120}
      />
    </div>
  );
}
