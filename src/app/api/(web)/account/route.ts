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
    return Response.json(
      {
        message: "success",
        data: {
          name: account.username,
          password: account.password,
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
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(req: Request){
  try {
    const { username, password } = (await req.json()) as UpdatePasswordRequest;
    const authHeader = req.headers.get("Authorization");
    const token = authHeader ? authHeader.split(" ")[1] : null;

    if(!token){
      return Response.json(
        {
          message: "failed",
          error: "Unauthorized. Please log in.",
        },
        {
          status: 401,
        },
      )
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET ?? "your-secret-key");
      const tokenUsername = (decode as { username: string }).username;

      if (tokenUsername !== username) {
        return Response.json(
          {
            message: "failed",
            error: "You can only update your own password.",
          },
          {
            status: 403,
          },
        )
      }
    } catch (error) {
      return Response.json(
        {
          message: "failed",
          error: error instanceof Error ? error : "Invalid or expired token.",
        },
        {
          status: 401,
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
  } finally {
    await prisma.$disconnect();
  }
}