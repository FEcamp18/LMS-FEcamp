"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

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
            setMessage("Invalid token.");
            return;
        }
        if (!username) {
            setMessage("Username not found.");
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

            const resetData = await resetResponse.json() as ResetPasswordResponse;

            if (resetData.message === "success") {
                setMessage("Your password has been successfully reset.");
            } else {
                setMessage("Failed to reset password. Please try again.");
            }

        } catch (error) {
            console.error("Error fetching username:", error);
            setMessage("Error fetching username. Please try again.");
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
                  กำหนดรหัสผ่านใหม่
                </p>

                <input
                  type="Password"
                  placeholder="Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="rounded border w-full px-3 py-2 bg-cream text-brown"
                />

                <button
                  type="submit"
                  className="rounded bg-dark-gray px-2 py-2 text-white w-full"
                >
                  ยืนยัน
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