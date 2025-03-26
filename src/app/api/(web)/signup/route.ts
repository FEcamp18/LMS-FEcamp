import { PrismaClient, type ROLE } from "@prisma/client";
import bcrypt from "bcryptjs";

interface SignupRequest {
  username: string;
  role: ROLE;
  password: string;
  roomId?: string;
}

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, role, password, roomId } =
      (await req.json()) as SignupRequest;

    // error 1 : Role fail
    const validRoles = ["CAMPER", "STAFF", "BOARD"];
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
    await prisma.account.create({
      data: { username, password: hashedPassword, role },
    });

    // additional data for each role
    if (role === "CAMPER") {
      await prisma.camper.create({
        data: {
          camperId: username,
          room: roomId ? parseInt(roomId) : 0,
        },
      });
    } else if (role === "STAFF") {
      await prisma.staff.create({
        data: {
          staffId: username,
        },
      });
    }
    return Response.json({ message: "success" });
  } catch {
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
