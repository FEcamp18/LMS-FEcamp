"use client";

import { useState } from "react";
type ResetResponse = {
    message: string;
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

            const data: ResetResponse = await response.json();

            // console.log(data);

            if (data.message === "success") {
                setMessage(`เราได้ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปยังอีเมลของน้อง ${username} แล้ว ! กรุณาตรวจสอบกล่องจดหมายของคุณ`);
            } else {
                setMessage("กรุณาตรวจสอบอีเมลของคุณ หากยังไม่ได้รับ กรุณาลองใหม่อีกครั้งภายใน 10 นาที");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            setMessage("การส่งอีเมลล้มเหลว กรุณาลองอีกครั้ง");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6">
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <p className="text-lg font-medium">กรุณากรอกชื่อผู้ใช้ของคุณเพื่อรีเซ็ตรหัสผ่าน</p>

                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border rounded px-3 py-2"
                />

                <button type="submit" disabled={isSending} className="bg-blue-500 text-white px-4 py-2 rounded">
                    {isSending ? "กำลังส่ง..." : "ส่งอีเมลรีเซ็ตรหัสผ่าน"}
                </button>
            </form>


            {message && <p className="text-center text-sm text-gray-700 mt-2">{message}</p>}
        </main>
    );
}
