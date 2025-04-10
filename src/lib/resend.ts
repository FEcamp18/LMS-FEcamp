"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetEmail = async (email: string, link: string) => {
    await resend.emails.send({
        to: email,
        from: "your-email@example.com", // ใส่อีเมลของคุณ
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
};
