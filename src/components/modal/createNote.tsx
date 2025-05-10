"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";

export default function CreateNote() {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");

  function handleCreate() {
    //write function here
    console.log(description);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="h-[40px] w-[158px] bg-light-gray text-white hover:bg-opacity-50">
          สร้างโน๊ต
        </button>
      </DialogTrigger>
      <DialogContent className="h-[332px] w-[312px] rounded-none border-none bg-[url('/image/modal/background.png')] p-0 text-base">
        <Image
          src="/image/modal/zigzag-top.png"
          alt="top-edge"
          width={312}
          height={6}
          className="absolute -top-[5px] left-0 w-full"
        />
        <Image
          src={"/image/modal/note-top.png"}
          alt="upload-top"
          width={312}
          height={100}
          className="absolute -top-12 left-0"
        />
        <Image
          src="/image/modal/zigzag-cream.png"
          alt="bottom-edge"
          width={156}
          height={6}
          className="absolute -bottom-[6px] left-0"
        />
        <Image
          src="/image/modal/zigzag-gray.png"
          alt="bottom-edge"
          width={156}
          height={6}
          className="absolute -bottom-[6px] right-0"
        />
        <DialogHeader>
          <DialogTitle className="mt-16 text-center text-2xl">
            เพิ่มหมายเหตุให้น้อง
          </DialogTitle>
        </DialogHeader>
        <div className="px-2 text-center text-sm">
          คุณสามารถเพิ่มหมายเหตุให้กับน้องได้ในสถานะ staff
          เพื่อความปลอดภัยของน้อง ๆ ค่าย
        </div>
        <div className="mt-auto flex flex-col">
          <Input
            placeholder="รายละเอียด"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-[104px] rounded-none border-t border-dark-brown align-text-top placeholder:bg-dark-gray"
          />
          <div className="flex w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="h-[58px] flex-1 rounded-none border-0 border-t border-dark-brown bg-transparent"
            >
              ยกเลิก
            </Button>
            <Button
              onClick={handleCreate}
              className="h-[58px] flex-1 rounded-none border-0 border-t border-dark-brown bg-dark-gray shadow-none"
            >
              เพิ่ม
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
