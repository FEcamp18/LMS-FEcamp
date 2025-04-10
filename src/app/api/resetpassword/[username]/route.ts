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

        // Retrieve the email associated with the username
        const account = await prisma.account.findUnique({
            where: { username },
            select: { username: true },
        });

        if (!account) {
            return Response.json(
                { message: "failed", error: "Username not found." },
                { status: 404 }
            );
        }

        // Try to fetch the contact email from either the Camper or Staff model
        let email: string | null = null;
        
        // Check if the username corresponds to a staff member
        const staff = await prisma.staff.findUnique({
            where: { staffId: username },
            select: { contactEmail: true }
        });

        if (staff && staff.contactEmail) {
            email = staff.contactEmail;
        }

        // Check if the username corresponds to a camper
        const camper = await prisma.camper.findUnique({
            where: { camperId: username },
            select: { contactEmail: true }
        });

        if (camper && camper.contactEmail) {
            email = camper.contactEmail;
        }

        if (!email) {
            return Response.json(
                { message: "failed", error: "No email found for this username." },
                { status: 404 }
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
        const resetLink = `http://localhost:3000/resetpassnotice?token=${token}`; // Modify this URL for your reset page
        await sendResetEmail(email, resetLink);  // sendResetEmail will be used to send the email

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
