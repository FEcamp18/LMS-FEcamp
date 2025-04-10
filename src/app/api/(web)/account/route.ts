import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    if (!username) {
      return Response.json(
        {
          message: "failed",
          error: "User does not exist.",
        },
        {
          status: 404,
        },
      );
    }
    const account = await prisma.account.findUnique({
      where: { username: username },
    });
    if (!account) {
      return Response.json(
        {
          message: "failed",
          error: "username request not valid",
        },
        {
          status: 404,
        },
      );
    }
    return Response.json({
      message: "success",
      data: {
        name: account.username,
        password: account.password,
        role: account.role,
      },
    });
  } catch (error) {
    return Response.json(
      {
        message: "failed",
        error: error,
      },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return Response.json(
        { message: "failed", error: "Missing token or new password." },
        { status: 400 }
      );
    }

    // Check if the token is valid and not expired
    const resetRecord = await prisma.resetPassTable.findUnique({
      where: { token },
    });

    if (!resetRecord || new Date(resetRecord.expires_at) < new Date()) {
      return Response.json(
        { message: "failed", error: "Invalid or expired token." },
        { status: 400 }
      );
    }

    // Hash the new password before storing it
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    await prisma.account.update({
      where: { username: resetRecord.username },
      data: { password: hashedPassword },
    });

    // Delete the used reset token
    await prisma.resetPassTable.delete({ where: { token } });

    return Response.json({ message: "success", detail: "Password updated." });
  } catch (error) {
    return Response.json(
      { message: "failed", error: "Internal server error." },
      { status: 500 }
    );
  }
}