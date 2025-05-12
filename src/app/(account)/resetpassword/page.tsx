"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // For Next.js 13+

interface ResetPasswordResponse {
  message: string;
  error?: string;
}

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // ดึง token จาก URL
  const username = searchParams.get("username");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token) {
      setMessage("ลิงก์ผิดพลาด token นี้ไม่ถูกต้อง");
      return;
    }
    if (!username) {
      setMessage("ลิงก์ผิดพลาด ไม่พบ username");
      return;
    }

    try {
      // ส่งข้อมูลไปยัง API เพื่อรีเซ็ตรหัสผ่าน
      const resetResponse = await fetch("/api/account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          newPassword,
          token,
        }),
      });

      const resetData = (await resetResponse.json()) as ResetPasswordResponse;

      if (resetData.message === "success") {
        setMessage("กำหนดรหัสผ่านใหม่สำเร็จ");
      } else {
        setMessage("เกิดข้อผิดพลาดระหว่างกำหนดรหัสผ่าน กรุณาติดต่อฝ่ายไอที");
      }
    } catch (error) {
      console.error("Error fetching username:", error);
      setMessage("Error fetching username. Please try again.");
    }
  };

  const router = useRouter();

  const handleRedirect = () => {
    router.push("/account"); // change to your desired path
  };

  const defaultView = (
    <div className="flex w-full flex-col items-center justify-center gap-y-6 rounded-2xl bg-gradient-to-b from-white to-cream px-4 py-6 sm:px-6 md:max-w-md md:px-8 md:py-10">
      <Image src="Logo.svg" alt="Logo" width={100} height={100} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <p className="pb-4 text-3xl">กำหนดรหัสผ่านใหม่</p>

        <input
          type="Password"
          placeholder="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full rounded border bg-cream px-3 py-2 text-brown"
        />

        <button
          type="submit"
          className="w-full rounded bg-dark-gray px-2 py-2 text-white"
        >
          ยืนยัน
        </button>
      </form>

      {message && (
        <p className="mt-2 text-center text-sm text-light-brown">{message}</p>
      )}
    </div>
  );

  const successView = (
    <div className="flex w-full flex-col items-center justify-center gap-y-3 rounded-2xl bg-gradient-to-b from-white to-cream px-4 py-6 sm:px-6 md:max-w-md md:px-8">
      <Image src="Logo.svg" alt="Logo" width={100} height={100} />
      <p className="pb-8 text-center text-xl text-dark-brown sm:text-2xl md:text-3xl">
        กำหนดรหัสผ่านใหม่สำเร็จ
      </p>
      <button
        type="button"
        onClick={handleRedirect}
        className="w-full rounded bg-dark-gray px-2 py-2 text-white"
      >
        ไปหน้าบัญชี
      </button>
    </div>
  );

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center bg-[url('public/image/background/resetpassword-background.webp')] bg-cover bg-center p-6">
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
