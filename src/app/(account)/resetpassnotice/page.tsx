"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { User } from "lucide-react";

type ResetResponse = {
  message: string;
  error?: string;
};

export default function ResetPasswordNotice() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    setUsername("");
  }, []);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSending(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/resetpassword/${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = (await response.json()) as ResetResponse;

      if (data.message === "success") {
        setMessage(`success`);
      } else if (data.error === "Username not found.") {
        setMessage(
          "ไม่พบชื่อผู้ใช้ กรุณาตรวจสอบความถูกต้อง หรือติดต่อฝ่ายไอที",
        );
      } else {
        setMessage(
          "กรุณาตรวจสอบอีเมลของคุณ หากยังไม่ได้รับ กรุณาลองใหม่อีกครั้งภายใน 10 นาที",
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("การส่งอีเมลล้มเหลว กรุณาลองอีกครั้ง");
    } finally {
      setIsSending(false);
    }
  };

  const defaultView = (
    <div className="flex w-full flex-col items-center justify-center gap-y-6 rounded-2xl bg-gradient-to-b from-white to-cream px-4 py-6 sm:px-6 md:max-w-md md:px-8 md:py-10">
      <Image src="Logo.svg" alt="Logo" width={100} height={100} />
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-4"
      >
        <p className="pb-4 text-center text-xl sm:text-2xl md:text-3xl">
          ส่งคำขอเปลี่ยนรหัสผ่าน
        </p>
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brown">
            <User size={18} />
          </span>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full rounded border bg-cream py-2 pl-10 pr-10 font-sans text-brown placeholder:text-brown"
          />
        </div>
        <button
          type="submit"
          disabled={isSending}
          className="w-full rounded bg-dark-gray px-3 py-2 text-white"
        >
          {isSending ? "กำลังส่ง..." : "ส่งคำขอ"}
        </button>
      </form>

      {message && (
        <p className="text-m mt-2 text-center text-light-brown">{message}</p>
      )}
    </div>
  );

  const successView = (
    <div className="flex w-full flex-col items-center justify-center gap-y-3 rounded-2xl bg-gradient-to-b from-white to-cream px-4 py-6 sm:px-6 md:max-w-md md:px-8">
      <Image src="Logo.svg" alt="Logo" width={100} height={100} />
      <p className="pb-2 text-center text-xl text-dark-brown sm:text-2xl md:text-3xl">
        ส่งคำขอเปลี่ยนรหัสผ่านสำเร็จ
      </p>
      <p className="text-center font-bold text-dark-brown">
        เราได้ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปยังอีเมล <br />
        ของน้อง {username} แล้ว !
      </p>
      <p className="text-center font-bold text-dark-brown">
        กรุณาตรวจสอบกล่องจดหมาย gmail
      </p>
    </div>
  );

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[url('/image/background/resetpassword-background.webp')] bg-cover bg-center p-4 sm:p-6">
      <div className="relative h-auto max-h-[698px] w-full max-w-[884px] bg-cream p-4 shadow-lg sm:h-[80vh] sm:w-[90%] sm:p-8">
        {/* Decorative Images */}
        <Image
          src="/image/subject-picture/helmfx1 1.webp"
          alt="Helm"
          width={100}
          height={100}
          className="absolute bottom-[30px] left-[12px] hidden w-[150px] sm:block sm:w-[150px] md:bottom-[20px]"
        />
        <Image
          src="/image/subject-picture/crownfx1 1.webp"
          alt="Crown"
          width={100}
          height={100}
          className="absolute left-[12px] top-[140px] hidden sm:block sm:w-[150px] md:top-[20px]"
        />
        <Image
          src="/image/subject-picture/shieldfx1 1.webp"
          alt="Shield"
          width={100}
          height={100}
          className="absolute right-[12px] top-[180px] hidden w-[70px] sm:block sm:w-[150px] md:top-[10px]"
        />
        <Image
          src="/image/subject-picture/swordfx1 1.webp"
          alt="Sword"
          width={100}
          height={100}
          className="absolute bottom-[70px] right-[30px] hidden w-[70px] sm:block sm:w-[150px] md:bottom-[20px]"
        />

        {/* Main content centered */}
        <div className="flex h-full w-full items-center justify-center p-2">
          {message === "success" ? successView : defaultView}
        </div>
      </div>
    </main>
  );
}
