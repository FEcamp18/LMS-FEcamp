"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { type WebphaseAPIResponse } from "@/types/api/webphase";
import Link from "next/link";

export default function Home() {
  const [webPhase, setWebPhase] = useState<string>("");
  const [load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    const fetchWebPhase = async () => {
      try {
        const response: WebphaseAPIResponse = await axios.get("/api/web/phase");
        setWebPhase(response.data.phase);
      } catch (error) {
        console.error("Error fetching web phase:", error);
      }
    };

    void fetchWebPhase();
    setLoad(false);
  }, []);

  if (load || webPhase === "") return <></>;
  if (webPhase === "CLOSED") {
    return <LandingClose />;
  } else if (webPhase === "BEFORE_CAMP") {
    return <LandingPreCamp />;
  } else if (webPhase === "ARCHIVE") {
    return <LandingPreClose />;
  } else {
    return <LandingCamp />;
  }
}

function LandingClose() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pt-16">
      <div className="text-4xl font-bold">เว็บไซต์กำลังปิดปรับปรุง</div>
    </div>
  );
}

function LandingPreCamp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pt-16">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-semibold">อดใจรอค่ายเปิดก่อนนะ</h1>
      </div>
    </div>
  );
}

function LandingPreClose() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pt-16">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-semibold">
          ค่ายปิดละจ้า เจอกันปีหน้า
        </h1>
      </div>
    </div>
  );
}

function LandingCamp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pt-16">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-semibold">
          เว็บเปิดแล้ว ลงทะเบียนได้เลย
        </h1>
        <Link
          href={"/login"}
          className="rounded-full bg-blue-500 px-8 py-3 text-white hover:bg-blue-400"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
