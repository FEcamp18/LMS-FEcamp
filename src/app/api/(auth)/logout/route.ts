import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Clear the token cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 0, // Expire immediately
  });

  return response;
}