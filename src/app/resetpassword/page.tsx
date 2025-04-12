"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token"); // ดึง token จาก URL

    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/account", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (data.message === "success") {
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
