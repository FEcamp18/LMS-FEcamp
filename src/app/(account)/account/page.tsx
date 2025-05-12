"use client";
import Logout from "./Logout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  get_god_name,
  get_god_statue_image_path,
} from "@/components/general/god-by-room";
import Image from "next/image";
import Link from "next/link";

interface godProps {
  name: string;
  path: string;
}

export default function AccountPage() {
  const { data: session, status, update } = useSession();
  const [loading, setLoading] = useState(true);
  const [god, setGod] = useState<{
    name: string;
    path: string;
  } | null>(null);

  useEffect(() => {
    const handleLoad = async () => {
      await update();
      const path = (await get_god_statue_image_path()) ?? "";
      const name = (await get_god_name()) ?? "";
      setGod({ name, path });
    };
    void handleLoad();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Loading...</div>;

  if (status === "unauthenticated" || session === null) {
    return <div>You are not logged in. Please log in to access this page.</div>;
  }

  return (
    <>
      <Toaster />
      <div className="mx-8 mt-14 flex flex-col justify-between text-brown md:flex-row">
        <main className="w-full space-y-6">
          <h1 className="text-3xl font-semibold">
            น้อง {session?.user?.username ?? "Unknown"} (nickname)
          </h1>
          <section className="grid w-full grid-cols-1 gap-7 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">เบอร์โทรติดต่อ</h2>
              <p>0xx-xxx-xxx</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">เบอร์โทรผู้ปกครอง</h2>
              <p>0xx-xxx-xxxx</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">อีเมล</h2>
              <p>temp@gmail.com</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">โรงเรียน</h2>
              <p>temp in Bangkok</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">ปี FE</h2>
              <p>1</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">Section</h2>
              <p>1</p>
            </div>
          </section>
        </main>
        {god && (
          <div className="flex w-full flex-col items-center justify-center md:max-w-[400px]">
            <Image
              src={god.path}
              alt="got state image"
              width={250}
              height={300}
            />
            <p className="font-semibold">วิหาร : {god.name}</p>
          </div>
        )}
      </div>
      <section className="mt-3 flex w-full flex-col gap-12 border-b-[1px] border-t-[1px] border-black p-6 text-brown md:flex-row">
        <div className="w-full">
          <h2 className="font-semibold">ข้อมูลสุขภาพ</h2>
          <p>-</p>
        </div>
        <div className="w-full">
          <h2 className="font-semibold">ข้อจำกัดด้านอาหาร</h2>
          <p>-</p>
        </div>
      </section>

      <div className="mx-6 my-8 flex h-[55px] justify-end space-x-4">
        <Link
          href="resetpassnotice"
          className="w-full max-w-[190px] content-center border-[0.5px] border-black bg-cream py-[8px] text-center text-xl font-normal text-dark-gray hover:bg-light-gray hover:text-cream active:bg-dark-gray active:text-cream md:text-2xl"
        >
          เปลี่ยนรหัส
        </Link>
        <Logout />
      </div>
    </>
  );
}
