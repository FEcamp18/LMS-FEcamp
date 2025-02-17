import { PrismaClient } from "@prisma/client";

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
