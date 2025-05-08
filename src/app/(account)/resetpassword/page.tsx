"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
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

      const resetData = (await resetResponse.json()) as ResetPasswordResponse;

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}
