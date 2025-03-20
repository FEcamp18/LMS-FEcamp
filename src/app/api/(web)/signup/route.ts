import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, role, password, accountId, roomId } = await req.json();

    // error 1 : Role fail
    const validRoles = ["camper", "staff", "board"];
    if (!validRoles.includes(role)) {
      return Response.json(
        { message: "failed", error: "these role not exit" },
        { status: 404 },
      );
    }

    // error 2 : Weak password
    if (password.length < 8) {
      return Response.json(
        { message: "failed", error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    // error 3 : Duplicate Username
    const existingUser = await prisma.account.findUnique({
      where: { username },
    }); // if it's correct, then the value == null
    if (existingUser) {
      return Response.json(
        { message: "failed", error: "this username is already exit" },
        { status: 400 },
      );
    }

    // hash password before saving it to database
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert new account into the database
    const newUser = await prisma.account.create({
      data: { username, password: hashedPassword, role },
    });

    // additional data for each role
    if (role === "camper") {
      await prisma.camper.create({
        data: {
          camperId: accountId,
          room: roomId,
        },
      });
    } else if (role === "staff") {
      await prisma.staff.create({
        data: {
          staffId: accountId,
        },
      });
    }
    return Response.json({ message: "success" });
  } catch (error) {
    return Response.json(
      {
        message: "failed",
        error: "Internal server error.",
      },
      {
        status: 500, // Internal Server Error
      },
    );
  }
}
