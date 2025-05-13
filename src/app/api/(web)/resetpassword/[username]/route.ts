import { randomUUID } from "crypto";
import { sendResetEmail } from "@/lib/resend";

import { prisma } from "@/lib/prisma";
export async function POST(
  req: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  try {
    const { username } = await params;
    const now = new Date();

    // Check if a valid reset token already
    const existingToken = await prisma.resetPassTable.findFirst({
      where: { username, expires_at: { gt: now } },
    });

    if (existingToken) {
      return Response.json(
        {
          message: "failed",
          error: "Reset request already exists. Please wait.",
        },
        { status: 400 },
      );
    }

    const account = await prisma.account.findUnique({
      where: { username },
      include: {
        staff: true,
        camper: true,
      },
    });

    if (!account) {
      return Response.json(
        { message: "failed", error: "Username not found." },
        { status: 404 },
      );
    }

    let email: string | null = null;

    if (account.staff?.length > 0 && account.staff[0]?.contactEmail) {
      email = account.staff[0].contactEmail;
    } else if (account.camper?.length > 0 && account.camper[0]?.contactEmail) {
      email = account.camper[0].contactEmail;
    }

    if (!email) {
      return Response.json(
        { message: "failed", error: "No email found for this username." },
        { status: 404 },
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
    const BASE_URL = process.env.BASE_URL;
    const resetLink = `${BASE_URL}/resetpassword?token=${token}&username=${username}`;
    await sendResetEmail(email, resetLink); // sendResetEmail will be used to send the email

    // Return the UUID token
    return Response.json(
      { message: "success", token, username },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error generating reset password token:", error);
    return Response.json(
      { message: "failed", error: "Internal server error." },
      { status: 500 },
    );
  }
}
