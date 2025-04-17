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
            const response = await fetch(`/api/resetpassword/${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data: ResetResponse = await response.json(); 

            console.log(data);

            if (data.message === "success") {
                setMessage(`A reset link has been sent to your email: ${username}. Please check your inbox.`);
            } else {
                setMessage("Please check your email. If you haven't received it, please try again in 10 minutes.");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            setMessage("Failed to send email. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <button type="submit" disabled={isSending}>
                    {isSending ? "Sending..." : "Send Reset Email"}
                </button>
            </form>

            {message && <p>{message}</p>}
        </main>
    );
}
