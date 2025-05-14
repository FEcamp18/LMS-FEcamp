"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import Image from "next/image"

interface ConfirmDeleteFielProps {
  fileName: string
}

export default function ConfirmDeleteFile({
  fileName,
}: ConfirmDeleteFielProps) {
  const [open, setOpen] = useState(false)

  function handleDelete() {
    //write function here
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="h-[40px] w-[158px] bg-light-gray text-white hover:bg-opacity-50">
          ลบไฟล์
        </button>
      </DialogTrigger>
      <DialogContent className="h-[228px] w-[312px] rounded-none border-none bg-[url('/image/modal/background.webp')] p-0 text-base">
        <Image
          src="/image/modal/zigzag-top.svg"
          alt="top-edge"
          width={312}
          height={6}
          className="absolute -top-[5px] left-0 w-full"
        />
        <Image
          src={"/image/modal/delete-top.webp"}
          alt="upload-top"
          width={312}
          height={100}
          className="absolute -top-12 left-0"
        />
        <Image
          src="/image/modal/zigzag-cream.svg"
          alt="bottom-edge"
          width={156}
          height={6}
          className="absolute -bottom-[6px] left-0"
        />
        <Image
          src="/image/modal/zigzag-gray.svg"
          alt="bottom-edge"
          width={156}
          height={6}
          className="absolute -bottom-[6px] right-0"
        />
        <DialogHeader>
          <DialogTitle className="mt-16 text-center text-2xl">
            ลบไฟล์
          </DialogTitle>
        </DialogHeader>
        <div className="-mt-4 flex flex-col items-center text-center">
          <span>คุณต้องการลบไฟล์</span>
          <span>{fileName} ใช่หรือไม่</span>
        </div>
        <div className="mt-auto flex w-full p-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="h-[58px] flex-1 rounded-none border-0 border-t border-dark-brown bg-transparent"
          >
            ยกเลิก
          </Button>
          <Button
            onClick={() => {
              handleDelete()
            }}
            className="h-[58px] flex-1 rounded-none border-0 border-t border-dark-brown bg-dark-gray shadow-none"
          >
            ลบ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
