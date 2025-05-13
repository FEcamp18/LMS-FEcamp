import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define role-based access control with specific routes
const accessControl = {
  CAMPER: {
    allowedPaths: ["/classroom", "/feedback", "/pretest","/account"],
    defaultPath: "/classroom",
  },
  STAFF: {
    allowedPaths: [
      "/camperinfo",
      "/tutor",
      "/classroom",
      "/feedback",
      "/pretest"
      ,"/account"
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
  console.log("Middleware triggered for path:", pathname);
  // Check if it's a public route first
  // if (publicRoutes.some((route) => pathname.startsWith(route))) {
  //   return NextResponse.next();
  // }

   if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Get token and handle authentication
  
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    // Redirect to login for unauthenticated users
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
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
