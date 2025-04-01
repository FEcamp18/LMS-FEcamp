import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface UpdateAccountRequest {
  username: string;
  newPassword: string;
}

export async function PATCH(req: Request){
  try {
    const { username, newPassword } = (await req.json()) as UpdateAccountRequest;

    if (!username || !newPassword) {
      return Response.json(
        {
          message: "failed",
          error: "Invalid username or password.",
        },
        {
          status: 401,
        },
      );
    }

    if (newPassword.length < 8) {
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

    const user = await prisma.account.findUnique({
      where: { username }
    });

    if (!user) {
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

    const hashedPassword = await bcrypt.hash(newPassword, 10);

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
  } finally {
    await prisma.$disconnect();
  }
}