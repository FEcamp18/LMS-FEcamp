"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface ResetPasswordResponse {
  message: string;
  error?: string;
}

// Separate client component for the form
function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
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
      console.error("Error resetting password:", error);
      setMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="rounded border p-2"
        />
        <button
          type="submit"
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </main>
  );
}

// Main page component
export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-xl text-dark-brown">Loading...</p>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
