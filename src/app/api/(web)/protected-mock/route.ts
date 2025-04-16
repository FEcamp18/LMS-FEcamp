import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    console.log(token);

    // auth-todo : use apiRequest from "@/utils/api" to verify token
    // try {
    //   await apiRequest("GET", "/auth/verify", null, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    // } catch (error) {
    //   return NextResponse.json({ message: "Invalid token" , error}, { status: 401 });
    // }

    const staffId = "staff2";
    const staffByStaffId = await prisma.staff.findUnique({
      where: { staffId },
    });

    if (!staffByStaffId) {
      return NextResponse.json(
        { message: "failed", error: "StaffId does not exist." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "success", staff: staffByStaffId },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
