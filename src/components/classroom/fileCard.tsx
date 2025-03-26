"use client";
import React from "react";
import { Button } from "../ui/button";
import { Folder } from "lucide-react";
import Image from "next/image";

type fileCard = {
  fileTitle: string;
  fileLocation: string;
  fileDescription: string;
  fileUploadTime: string;
  isTutor: boolean;
};
export default function FileCard({
  fileTitle,
  fileLocation,
  fileDescription,
  fileUploadTime,
  isTutor,
}: fileCard) {
  const downloadFile = () => {
    const aTag = document.createElement("a");
    aTag.href = fileLocation;
    aTag.setAttribute("download", fileTitle);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  return (
    <div className="r relative m-3 grid max-h-40 max-w-3xl grid-cols-8 gap-3 bg-[url('/image/subject-picture/bg-card.webp')] bg-cover bg-center p-3 pl-5">
      <Image
        className="absolute -left-12 -top-16"
        src="/image/subject-picture/deco-1.svg"
        alt="deco-1"
        width={140}
        height={100}
      />

      <div className="flex place-items-center justify-center pr-4">
        <Folder className="" size={50} strokeWidth={1} />
      </div>
      <div className="col-span-4">
        <h3 className="font-prompt text-2xl font-bold">{fileTitle}</h3>
        <p className="font-prompt text-xs">{fileDescription}</p>
      </div>

      {isTutor ? (
        <div className="col-span-2 flex place-items-center justify-end">
          <Button
            variant="link"
            onClick={downloadFile}
            className='h-12 flex-1 rounded-none bg-[url("/image/subject-picture/bg-download-button.webp")] bg-cover bg-center font-prompt text-lg text-white hover:text-white'
          >
            Download
          </Button>
        </div>
      ) : (
        <div className=""></div>
      )}

      {isTutor ? (
        <div className="flex place-items-center justify-end pl-4 pr-4">
          <Button variant="link" className="flex-1 bg-inherit p-1">
            <Image
              src="/image/subject-picture/Trash.svg"
              alt="Trash Icon"
              width={30}
              height={100}
            />
          </Button>
        </div>
      ) : (
        <div className="col-span-2 flex place-items-center justify-end">
          <Button
            variant="link"
            onClick={downloadFile}
            className='h-12 flex-1 rounded-none bg-[url("/image/subject-picture/bg-download-button.webp")] bg-cover bg-center font-prompt text-lg text-white hover:text-white'
          >
            Download
          </Button>
        </div>
      )}
    </div>
  );
}
