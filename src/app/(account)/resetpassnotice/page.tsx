"use client"

import { useState } from "react"
type ResetResponse = {
  message: string
  error?: string
}

export default function ResetPasswordNotice() {
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSending(true)
    setMessage(null) // Clear previous message

    try {
      const response = await fetch(`/api/resetpassword/${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = (await response.json()) as ResetResponse

      if (data.message === "success") {
        setMessage(
          `เราได้ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปยังอีเมลของน้อง ${username} แล้ว ! กรุณาตรวจสอบกล่องจดหมายของคุณ`,
        )
      } else {
        if (data.error === "Username not found.") {
          setMessage(
            "ไม่พบชื่อผู้ใช้ กรุณาตรวจสอบความถูกต้อง หรือติดต่อฝ่ายไอที",
          )
        } else {
          setMessage(
            "กรุณาตรวจสอบอีเมลของคุณ หากยังไม่ได้รับ กรุณาลองใหม่อีกครั้งภายใน 10 นาที",
          )
        }
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setMessage("การส่งอีเมลล้มเหลว กรุณาลองอีกครั้ง")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <main className="flex min-h-screen w-[40vw] flex-col items-center justify-center p-6">
      <div className="flex w-full flex-col items-center justify-center gap-y-7 rounded-2xl bg-gradient-to-b from-white to-cream px-8 pb-5 pt-3 md:max-w-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-lg font-medium">
            กรุณากรอกชื่อผู้ใช้ของคุณเพื่อรีเซ็ตรหัสผ่าน
          </p>

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="rounded border px-3 py-2"
          />

          <button
            type="submit"
            disabled={isSending}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            {isSending ? "กำลังส่ง..." : "ส่งอีเมลรีเซ็ตรหัสผ่าน"}
          </button>
        </form>

        {message && (
          <p className="mt-2 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </main>
  )
}
