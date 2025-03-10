import { type NextRequest, NextResponse } from "next/server";

// Define paths that require authentication
const protectedRoutes = ["/api/protected-mock"];

export function middleware(req: NextRequest) {
    // auth-to-do : change this to real token
    const token = "mock-dev-token";
    const isProtected = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

  if (isProtected && !token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"], // Apply middleware to all API routes
};
