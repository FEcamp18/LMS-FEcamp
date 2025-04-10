"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";  

export default function ResetPasswordNotice() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [isSending, setIsSending] = useState(false);
    const router = useRouter();  

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSending(true);
        setMessage(null); // Clear previous message

        try {
            const response = await fetch(`/api/resetpassword/${email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            console.log(data);

            if (data.message === "success") {
                setMessage(`A reset link has been sent to your email: ${email}. Please check your inbox.`);
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
                    type="email"
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
