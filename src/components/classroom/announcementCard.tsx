import React from "react";
import { Button } from '../ui/button'
import Image from 'next/image';

type announcementCard = {
  annoTime: Date;
  annoTitle: string;
  annoText: string;
};

export default function AnnouncementCard({
  annoTime,
  annoTitle,
  annoText,
}: announcementCard) {
  return (
    
    <div className="font-prompt  max-h-40 m-3 grid max-w-3xl grid-cols-6 gap-3 bg-[url('/image/subject-picture/bg-card.png')] bg-cover bg-center p-3 pl-5">
      <div className="border-b border-gray-400 sm:border-b-0 sm:border-r-2 flex items-center justify-items-center">
        <p className="p-2 align-middle font-medium text-gray-600">
          {`${annoTime.getDate()}/${annoTime.getMonth() + 1}/${annoTime.getFullYear().toString().substr(-2)}`}{" "}
          <br /> {`${annoTime.getHours()}:${annoTime.getMinutes()}`}
        </p>
      </div>
      <div className="col-span-4 ">
        <h3 className="font-prompt font-bold text-2xl ">{annoTitle}</h3>
        <p className="font-prompt text-sm">{annoText}</p>
      </div>

      <div className='flex place-items-center justify-end pl-7 pr-7'>
        <Button  variant = 'link' className='flex-1 bg-inherit p-1 ' ><Image src="/image/subject-picture/Trash.png" alt="Trash Icon" width={35} height={100} /></Button>
      </div>

      {/* <Image className="absolute -top-2 -left-1" src="/image/subject-picture/deco-1.png" alt="deco-1" width={80} height={100} />
      <Image className="absolute bottom-90 right-10" src="/image/subject-picture/deco-2.png" alt="deco-2" width={80} height={100} /> */}

    </div>
  );
}
