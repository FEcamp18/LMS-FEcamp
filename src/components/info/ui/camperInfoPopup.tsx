"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import * as ZigzagEdge from "public/image/camperInfo-image/Zigzag_Edge.svg";
import * as ZigzagEdge2 from "public/image/camperInfo-image/Zigzag Edge-2.svg";

interface CamperInfoPopupProps {
  camperId: string;
  onClose: () => void; // Callback to close the popup
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ""; // Get base URL from environment variable

export default function CamperInfoPopup({
  camperId,
  onClose,
}: CamperInfoPopupProps) {
  interface CamperInfo {
    name: string;
    details: string;
  }

  const [camperInfo, setCamperInfo] = useState<CamperInfo | null>(null);
  interface Note {
    id: string;
    content: string;
  }

  const [camperNotes, setCamperNotes] = useState<Note[]>([]);

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center py-20">
      {/* Background Blur */}
      <div className="absolute inset-0 h-screen w-screen bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Popup Content */}
      <div className="relative z-10 my-20 flex min-w-[40vw] flex-col items-center justify-center text-sm">
        <div className="relative w-full">
          <Image src={ZigzagEdge} alt="Zigzag Edge" className="h-auto w-full" />
        </div>
        <div className="w-full rounded border bg-white shadow">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-white hover:bg-red-600"
          >
            Close
          </button>

          <div className="bg-[url('/image/camperInfo-image/Top_App_Bar.svg')] bg-cover bg-center p-4 text-lg font-bold">
            <div>Name</div>
          </div>

          <div className="bg-[url('/image/camperInfo-image/Content-3.svg')] bg-cover bg-center pt-8">
            <div className="flex justify-between">
              <div className="mb-4 pl-4 font-[Prompt] text-2xl font-medium">
                หมายเหตุ
              </div>
              <div
                className="hover: mb-4 cursor-pointer pr-4 text-right font-[Prompt] text-2xl font-medium text-amber-900"
                onClick={() => alert("เพิ่มหมายเหตุ")}
              >
                + เพิ่ม
              </div>
            </div>
            <div className="pl-4 pr-4">
              <div className="flex justify-between">
                <div className="h-32 w-1/3 rounded bg-white shadow"></div>
                <div className="mx-4 h-32 w-1/3 rounded bg-white shadow"></div>
                <div className="h-32 w-1/3 rounded bg-white shadow"></div>
              </div>
            </div>

            <div className="flex justify-start px-5 py-10">
              <div className="container w-1/2">
                <h2 className="mb-2 text-xl font-semibold">ข้อมูลสุขภาพ</h2>
                <p className="text-gray-600">
                  รายละเอียดเกี่ยวกับข้อมูลสุขภาพของผู้เข้าร่วม
                </p>
              </div>
              <div className="ml-2 flex w-1/2 flex-col">
                <h2 className="mb-2 text-xl font-semibold">
                  ข้อจํากัดด้านอาหาร
                </h2>
                <p className="text-gray-600">
                  รายละเอียดเกี่ยวกับข้อจํากัดด้านอาหาร
                </p>
              </div>
            </div>

            <hr className="border-1 w-full border-gray-700" />
            <div>
              <h2 className="mb-4 pl-4 pt-7 text-xl">ข้อมูลส่วนตัว</h2>
              <div className="grid grid-cols-3 gap-4 pb-8 pl-4">
                <div className="container">
                  <h2 className="mb-2 text-xl font-semibold">เบอร์โทรศัพท์</h2>
                  <p className="text-gray-600">000-000-0000</p>
                </div>
                <div className="container">
                  <h2 className="mb-2 text-xl font-semibold">เบอร์ผู้ปกครอง</h2>
                  <p className="text-gray-600">000-000-0000 (มารดา)</p>
                </div>
                <div className="container">
                  <h2 className="mb-2 text-xl font-semibold">อีเมล</h2>
                  <p className="text-gray-600">somchai.mee@gmail.com</p>
                </div>
                <div className="container">
                  <h2 className="mb-2 text-xl font-semibold">โรงเรียน</h2>
                  <p className="text-gray-600">สมชายวิทยาลัย</p>
                </div>
                <div className="container">
                  <h2 className="mb-2 text-xl font-semibold">ปี FE</h2>
                  <p className="text-gray-600">1</p>
                </div>
                <div className="container">
                  <h2 className="mb-2 text-xl font-semibold">Room</h2>
                  <p className="text-gray-600">1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
