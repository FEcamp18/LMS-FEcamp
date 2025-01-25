"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [click, setClick] = useState(0);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-black">Hi FEcamp18</h1>
      <p className="mt-2 text-xl">{click}</p>
      <Button
        className="mt-4"
        onClick={() => {
          setClick((item) => item + 1);
        }}
      >
        Click
      </Button>
    </main>
  );
}
