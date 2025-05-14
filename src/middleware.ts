import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define role-based access control with specific routes
const accessControl = {
  CAMPER: {
    allowedPaths: ["/classroom", "/feedback","/account"],
    defaultPath: "/classroom",
  },
  STAFF: {
    allowedPaths: [
      "/camperinfo",
      "/tutor",
      "/classroom",
      "/feedback",
      "/account",
      "/boardcast"
    ],
    defaultPath: "/camperinfo",
  },
  BOARD: {
    allowedPaths: [
      "/board",
      "/camperinfo",
      "/tutor",
      "/classroom",
      "/feedback",
      "/pretest","/account"
    ],
    defaultPath: "/board",
  },
};

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/pretest",
  "/login",
  "/resetpassnotice",
  "/resetpassword",
  "/api",
  "/_next",
  "/static",
  "/favicon.ico",
];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // always allow landing page
  if(pathname === "/")
    return NextResponse.next();
  
  // TODO : Get token and handle authentication
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });


   // if campe is CLOSED only go to "/"
  const phaseResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/web/phase`, {
    method: "GET",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const phaseData = await phaseResponse.json() as { phase: string };  
  const currentPhase = phaseData?.phase;

  // If the phase is "CLOSED", restrict access for all roles except BOARD
  if (currentPhase === "CLOSED") {
   if (!token || token.role !== "BOARD") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // who already login, shouldn't go to login
  if (token && pathname.includes("/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // publicRoutes check
   if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // who not login
  if (!token) {
    // Redirect to login for unauthenticated users
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // check path by role
  const role = token.role as keyof typeof accessControl;

  // Handle invalid roles
  if (!accessControl[role]) {
    console.error(`Invalid role: ${role}`);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { allowedPaths, defaultPath } = accessControl[role];

  const isAllowedPath = allowedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (!isAllowedPath) {
    return NextResponse.redirect(new URL(defaultPath, req.url));
  }

  // Allow access if all checks pass
  return NextResponse.next();
}

// Configure middleware matcher
export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico|.*\\..*).*)"],
};
