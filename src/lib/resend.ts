"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetEmail = async (email: string, link: string) => {
    try {
        const response = await resend.emails.send({
            to: email,
            from: "onboarding@resend.dev",
            subject: "Reset Password",
            html: `
            <p>Hello,</p>
            <p>We received a request to reset your password. Click the link below to set a new password:</p>
            <p><a href="${link}">Reset Your Password</a></p>
            <p>If you didn’t request this, please ignore this email.</p>
            <p>Thank you,</p>
            <p>FE18 IT team</p>
            `
        });
        console.log("Resend API response:", response); // Log the response for debugging
        console.log("This is RESEND_API_KEY: ", resend); // Log for debugging
    } catch (error) {
        console.error("Error sending reset email:", error); // Catch and log errors
    }
};
