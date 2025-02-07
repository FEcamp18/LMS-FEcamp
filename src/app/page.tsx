"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [webPhase, setWebPhase] = useState<string>("Open");
  const router = useRouter();

  function redirectToLogin() {
    router.push("/login");
  }
  function changePhase(phase: string) {
    setWebPhase(phase);
  }

  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-center pt-16">
        {webPhase === "Close" ? (
          <div className="text-4xl font-bold">ปิดปรับปรุง</div>
        ) : webPhase === "BeforeCamp" ? (
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-semibold">Landing Page ngub</h1>
            <Button className="cursor-not-allowed rounded-full border-2 border-gray-400 bg-gray-300 px-8 py-3 text-white hover:bg-gray-400">
              Coming Soon
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-semibold">Landing Page ngub</h1>
            <Button
              onClick={redirectToLogin}
              className="rounded-full bg-blue-500 px-8 py-3 text-white hover:bg-blue-400"
            >
              Login
            </Button>
          </div>
        )}
        <div className="mt-24 flex gap-4">
          <Button
            onClick={() => changePhase("BeforeCamp")}
            className="w-32 bg-yellow-500 hover:bg-yellow-400"
          >
            Before Camp
          </Button>
          <Button
            onClick={() => changePhase("Open")}
            className="w-32 bg-green-500 hover:bg-green-400"
          >
            Open
          </Button>
          <Button
            onClick={() => changePhase("Close")}
            className="w-32 bg-red-500 hover:bg-red-400"
          >
            Closing
          </Button>
        </div>
      </div>
    </div>
  );
}
