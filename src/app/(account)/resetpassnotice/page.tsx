"use client";

import { useState } from "react";
import Image from "next/image";

type ResetResponse = {
  message: string;
  error?: string;
};

export default function ResetPasswordNotice() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSending(true);
    setMessage(null); // Clear previous message

        try {
            console.log(`/api/resetpassword/${username}`);

            const response = await fetch(`/api/resetpassword/${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json() as ResetResponse;

      if (data.message === "success") {
        setMessage(
          `เราได้ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปยังอีเมลของน้อง ${username} แล้ว ! กรุณาตรวจสอบกล่องจดหมายของคุณ`,
        );
      } else {
        if (data.error === "Username not found.") {
          setMessage(
            "ไม่พบชื่อผู้ใช้ กรุณาตรวจสอบความถูกต้อง หรือติดต่อฝ่ายไอที",
          );
        } else {
          setMessage(
            "กรุณาตรวจสอบอีเมลของคุณ หากยังไม่ได้รับ กรุณาลองใหม่อีกครั้งภายใน 10 นาที",
          );
        }
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("การส่งอีเมลล้มเหลว กรุณาลองอีกครั้ง");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center p-6 bg-[url('public/image/background/resetpassword-background.webp')] bg-cover bg-center">
      <div className="relative w-[90%] max-w-[884px] h-[80vh] max-h-[698px] items-center justify-center bg-cream shadow-lg p-8">
      <Image src="/image/subject-picture/helmfx1 1.webp" alt="Logo" width={150} height={200} className="absolute left-[12] bottom-[30]"/>
      <Image src="/image/subject-picture/crownfx1 1.webp" alt="Logo" width={150} height={200} className="absolute left-[12] top-[140]"/>
      <Image src="/image/subject-picture/shieldfx1 1.webp" alt="Logo" width={150} height={200} className="absolute right-[12] top-[180]"/>
      <Image src="/image/subject-picture/swordfx1 1.webp" alt="Logo" width={150} height={200} className="absolute right-[30] bottom-[70]"/>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex w-full flex-col items-center justify-center gap-y-7 rounded-2xl bg-gradient-to-b from-white to-cream px-8 pb-5 pt-3 md:max-w-md">
        <Image src="/image/subject-picture/Logo.webp" alt="Logo" width={100} height={200}/>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          
          <p className="text-3xl font-inknut pb-4">
            ส่งคำขอเปลี่ยนรหัสผ่าน
          </p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="rounded border w-full px-3 py-2 bg-cream text-brown"
          />

          <button
            type="submit"
            disabled={isSending}
            className="rounded bg-dark-gray px-2 py-2 text-white w-full"
          >
            {isSending ? "กำลังส่ง..." : "ส่งคำขอ"}
          </button>
        </form>

        {message && (
          <p className="mt-2 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
      </div>

    </main>
  );
}
