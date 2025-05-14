"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

interface ConfirmDeleteAnnounceProps {
  announceName: string;
  subjectId: string;
  annoId: string;
}

export default function ConfirmDeleteAnnounce({
  announceName,
  subjectId,
  annoId,
}: ConfirmDeleteAnnounceProps) {
  const [open, setOpen] = useState(false);

  function handleDelete() {
    fetch(`/api/anno/${subjectId}/${annoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete announcement");
        }
        return response.json();
      })
      .catch((error) => {
        toast.error(`${error}`);
      })
      .finally(() => {
        toast.success("ลบสำเร็จ โปรดรีเฟรชหน้าเว็บ");
        setOpen(false);
      });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Toaster />
      <DialogTrigger asChild>
        <button className="flex h-16 w-16 items-center justify-center">
          <Image
            src="/image/subject-picture/Trash.svg"
            alt="Trash Icon"
            width={35}
            height={35} // Adjusted height to match the width
            className="object-contain" // Ensures the image scales properly
          />
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
          src="/image/modal/zigzag-creasvg"
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
            ยืนยันการลบประกาศ
          </DialogTitle>
        </DialogHeader>
        <div className="-mt-4 flex flex-col items-center text-center">
          <span>คุณต้องการลบประกาศ</span>
          <span>{announceName} ใช่หรือไม่</span>
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
              handleDelete();
            }}
            className="h-[58px] flex-1 rounded-none border-0 border-t border-dark-brown bg-dark-gray shadow-none"
          >
            ลบ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
