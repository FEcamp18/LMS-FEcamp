import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
export async function GET() {
  try {
    const staffs = await prisma.staff.findMany({
      select: {
        staffId: true,
        name: true,
        surname: true,
        nickname : true,
        staffDepartment: true,
        contactTel: true,
      },
    })
    return NextResponse.json({ message: "success", data: staffs })
  } catch (error) {
    return NextResponse.json({ message: "failed", error: String(error) }, { status: 500 })
  }
}