"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getFile } from "../fileupload/getFile"
import { FaRegFile } from "react-icons/fa"
import { disableFile } from "../fileupload/disableFile"
import toast from "react-hot-toast"

type fileCard = {
  fileTitle: string
  fileDescription: string
  fileUploadTime: Date
  fileId: number
  isTutor: boolean
  fetchFiles: () => Promise<void>
}

export default function FileCard({
  fileTitle,
  fileId,
  fileDescription,
  fileUploadTime,
  isTutor,
  fetchFiles,
}: fileCard) {
  const downloadFile = async () => {
    await getFile(fileId, fileTitle)
  }

  const handleDelete = async (fileId: number) => {
    const success = await disableFile(fileId)
    if (success) {
      toast.success("Successfully deleted file")
      await fetchFiles()
    } else {
      toast.error("Failed to delete file")
    }
  }
  return (
    <div className="relative m-3 mt-10 max-h-40 max-w-3xl grid-cols-8 gap-3 bg-[url('/image/subject-picture/bg-card.webp')] bg-cover bg-center p-3 pl-5 max-sm:flex max-sm:flex-row sm:grid">
      <Image
        className="absolute -left-12 -top-16"
        src="/image/subject-picture/deco-1.svg"
        alt="deco-1"
        width={140}
        height={100}
      />

      {/* Left Section: Folder Icon and Upload Time */}
      <div className="flex h-full flex-col place-items-center justify-center space-y-2 pr-4 max-sm:w-[15%]">
        <FaRegFile
          className="z-20 h-[40%] max-sm:mt-4 max-sm:w-[30px]"
          size={15}
          strokeWidth={1}
        />
        <div className="h-[25%] text-center text-xs">
          {`${fileUploadTime.getDate()}/${
            fileUploadTime.getMonth() + 1
          }/${fileUploadTime.getFullYear().toString().substr(-2)}`}{" "}
          <br /> {`${fileUploadTime.getHours()}:${fileUploadTime.getMinutes()}`}
        </div>
      </div>

      {/* Right Section: File Details and Actions */}
      <div className="col-span-7 h-full w-full flex-col sm:flex-row">
        <div className="flex w-full justify-between">
          <div className="sn:max-w-[80%] mt-2 flex flex-col flex-wrap gap-2">
            <h3 className="font-prompt text-2xl font-bold max-sm:text-xs">
              {(fileTitle ?? "0-0-untitled-0").split("-")[2]?.trim() ??
                "untitled"}
            </h3>
            <p className="no-scrollbar max-h-14 overflow-y-scroll font-prompt max-md:text-xs">
              {fileDescription}
            </p>
          </div>

          {/* Actions: Download and Trash */}
          <div className="mt-2 flex flex-wrap">
            <div className="h-auto w-32">
              <Button
                variant="link"
                onClick={downloadFile}
                className='h-12 w-32 flex-1 rounded-none bg-[url("/image/subject-picture/bg-download-button.webp")] bg-contain bg-center bg-no-repeat font-prompt text-white hover:text-white'
              >
                Download
              </Button>
            </div>

            {isTutor && (
              <Button
                variant="link"
                onClick={() => handleDelete(fileId)}
                className="z-20 cursor-pointer bg-inherit p-1"
              >
                <Image
                  src="/image/subject-picture/Trash.svg"
                  alt="Trash Icon"
                  width={30}
                  height={30}
                />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
