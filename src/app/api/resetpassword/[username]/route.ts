import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { sendResetEmail } from "@/lib/resend"; 

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: { username: string } }) {
    try {
        const { username } = params;
        const now = new Date();

        // Check if a valid reset token already exists
        const existingToken = await prisma.resetPassTable.findFirst({
            where: { username, expires_at: { gt: now } },
        });

        if (existingToken) {
            return Response.json(
                { message: "failed", error: "Reset request already exists. Please wait." },
                { status: 400 }
            );
        }

        // Generate a new reset token
        const token = randomUUID();
        const expiresAt = new Date(now.getTime() + 10 * 60 * 1000); // Expires in 10 minutes

        // Store the token in the database
        await prisma.resetPassTable.create({
            data: {
                username,
                token,
                created_at: now,
                expires_at: expiresAt,
            },
        });

        // Send the reset email
        const resetLink = `http://localhost:3000/resetpassnotice?token=${token}`; // แก้ไขให้เป็น URL ของหน้ารีเซ็ตรหัสผ่าน
        await sendResetEmail(username, resetLink);

        // Return the UUID token
        return Response.json(
            { message: "success", token },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error generating reset password token:", error);
        return Response.json(
            { message: "failed", error: "Internal server error." },
            { status: 500 }
        );
    }
}
