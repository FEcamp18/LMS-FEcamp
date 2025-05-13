import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/authOptions";

export async function checkSession(req: Request, requiredPriority: number) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 } // 401 Unauthorized
    );
  }

  const userPriority = session.user?.priority ?? 0; // Default priority is 0 if not set

    // api will have priority number
    // 0=all+camper, 1=staff, 2=board
  if (userPriority < requiredPriority) {
    return NextResponse.json(
      { message: "Forbidden: Insufficient priority" },
      { status: 403 } // 403 Forbidden
    );
  }

  return null; // Session is valid and priority is sufficient
}