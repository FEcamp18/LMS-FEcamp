import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define role-based access control
const accessControl = {
  camper: ["/(camper)"],
  staff: ["/(camper)", "/(staff)"],
  board: ["/(camper)", "/(staff)", "/(board)"],
};

// Define public routes accessible to everyone
const publicRoutes = ["/login", "/resetpassnotice", "/resetpassword", "/pretest", "/dev"];

export async function middleware(req: NextRequest) {

  // ARKA : remove this after implement login
  return NextResponse.next();

  const pathname = req.nextUrl.pathname;

  // Allow access to public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  // If no token, redirect to the landing page
  if (!token) {
    console.log("No token found, redirecting to landing page.");
    return NextResponse.redirect(new URL("/", req.url));
  }

  const role = token?.role;

  // Determine allowed paths based on role
  let allowedPaths: string[] = [];
  if (role === "CAMPER") {
    allowedPaths = accessControl.camper;
  } else if (role === "STAFF") {
    allowedPaths = accessControl.staff;
  } else if (role === "BOARD") {
    allowedPaths = accessControl.board;
  } else {
    // If role is not recognized, redirect to landing page
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Check if the requested path is allowed
  const isAllowed = allowedPaths.some((path) => pathname.startsWith(path));
  if (!isAllowed) {
    console.log(`Access denied for role: ${role} to path: ${pathname}`);
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(camper)/:path*", "/(staff)/:path*", "/(board)/:path*", "/login", "/resetpassnotice", "/resetpassword", "/pretest", "/"], // Apply middleware to specific folders and public routes
};
