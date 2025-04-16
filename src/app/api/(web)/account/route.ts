import { checkAuthToken } from "@/lib/checkAuthToken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface UpdatePasswordRequest {
  username: string;
  password: string;
}

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
      where: { username },
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
    return Response.json(
      {
        message: "success",
        data: {
          name: account.username,
          role: account.role,
        },
      },
      {
        status: 200,
      },
    );
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

// ?????????
interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json() as ResetPasswordRequest;

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

    if (!resetRecord || new Date(resetRecord.expires_at).getTime() < new Date().getTime()) {
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
  } catch {
    return Response.json(
      { message: "failed", error: "Internal server error." },
      { status: 500 }
    );
  }
}

// ?????????
export async function PATCH(req: Request){
  try {
    const { username, password } = (await req.json()) as UpdatePasswordRequest;

    // check auth token session
    await checkAuthToken(req, username);

    const account = await prisma.account.findUnique({
      where: { username }
    });

    if (!account) {
      return Response.json(
        {
          message: "failed",
          error: "User does not exist.",
        },
        {
          status: 404,
        },
      )
    }

    if (password.length < 8) {
      return Response.json(
        {
          message: "failed",
          error: "Password must be at least 8 characters.",
        },
        {
          status: 400,
        },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.account.update({
      where: { username },
      data: { password: hashedPassword },
    });
    
    return Response.json(
      {
        message: "success",
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return Response.json(
      {
        message: "failed",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      {
        status: 500,
      },
    )
  }
}