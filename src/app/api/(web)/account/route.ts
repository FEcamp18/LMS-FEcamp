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

export async function PATCH(req: Request){
  try {
    const { username, password } = (await req.json()) as UpdatePasswordRequest;
    const authHeader = req.headers.get("Authorization");

    if (!authHeader?.startsWith('Bearer ')) {
      return Response.json(
        {
          message: "failed",
          error: "Authorization header missing or invalid format. Use 'Bearer [token]'.",
        },
        {
          status: 401,
        },
      );
    }

    const token = authHeader.split(" ")[1];

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
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET environment variable is not set"); // Log the actual issue for developers
        return Response.json(
          {
            message: "failed",
            error: "Authentication system error. Please contact support.",
          },
          {
            status: 500,
          }
        );
      }
      
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const tokenUsername = (decodedToken as { username: string }).username;
    
      if (tokenUsername !== username) {
        // This error is fine as it's expected user-facing behavior
        return Response.json(
          {
            message: "failed",
            error: "You can only update your own password.",
          },
          {
            status: 403,
          }
        );
      }
    } catch (error) {
      // Provide specific error messages based on the type of JWT error
      let errorMessage = "Authentication failed";
      const statusCode = 401;
    
      if (error instanceof jwt.TokenExpiredError) {
        errorMessage = "Your session has expired. Please log in again.";
      } else if (error instanceof jwt.JsonWebTokenError) {
        errorMessage = "Invalid authentication token.";
        // Could be tampering, log this for security monitoring
        console.warn(`Invalid token attempt for user: ${username}`);
      } else if (error instanceof jwt.NotBeforeError) {
        errorMessage = "Token not yet active.";
      } else if (error instanceof Error) {
        errorMessage = "Authentication error.";
        console.error(error);
      }
    
      return Response.json(
        {
          message: "failed",
          error: errorMessage,
          errorType: error instanceof Error ? error.name ?? "AuthError" : "AuthError"
        },
        { status: statusCode }
      );
    }

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