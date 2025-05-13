import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface LoginRequest {
  username: string;
  password: string;
}

export async function POST(req: Request) {
  try {    
    const { username, password } = (await req.json()) as LoginRequest;

    // error 1 : Invalid credentials (Invalid user or psw)
    if (!username || !password) {
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

    // error 3 : no account found
    const account = await prisma.account.findUnique({
      where: { username: username },
    });
    if (!account) {
      // account == null (account not exist)
      return Response.json({
        message: "failed",
        error: "User not found.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, account.password);

    if (!isPasswordValid) {
      return Response.json(
        {
          message: "failed",
          error: "Wrong Password.",
        },
        {
          status: 401,
        },
      );
    }


    // HELP : token auth problem :: I set cookies here but change to session in stead
    // const priority_number = (account.role === "BOARD" ? 2 : account.role === "STAFF" ? 1 : 0);
    // generate token
    // const token = jwt.sign(
    //   { username: account.username, priority: priority_number, role:account.role },
    //   process.env.JWT_SECRET ?? "your-secret-key", // Secret key for signing the token
    //   { expiresIn: "7d" }, // Token expiration time (1 hour)
    // );    
    // sign a cookies
    const response = NextResponse.json({ message: "success" });
    // response.cookies.set("token", token, {
    //     httpOnly: true,
    //     sameSite: "lax", // "strict" may prevent it from being sent during navigation/fetches
    //     secure: false,
    //     maxAge: 7 * 24 * 60 * 60,
    //     path: "/", // important!
    //   });

    return response;
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
