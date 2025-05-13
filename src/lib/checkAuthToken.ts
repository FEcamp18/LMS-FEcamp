import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/authOptions";
import { type NextRequest } from "next/server";

export async function checkAuthToken(req: NextRequest, requiredPriority?: number): Promise<void> {
  const session = await getServerSession(authOptions);  

  if (!session) {
    throw new Error("Unauthorized: No session found.");
  }

  if (requiredPriority !== undefined) {
    const userPriority = session.user.priority;

    if (!userPriority || userPriority < requiredPriority) {
      throw new Error("Forbidden: Insufficient priority to access this resource.");
    }
  }
}

// import jwt from "jsonwebtoken";
// import { type NextRequest } from "next/server";
// export async function checkAuthToken(req: NextRequest, requiredPriority?: number): Promise<void> {
//   const token = req.cookies.get("token")?.value;  
//   // HELP : token auth problem :: in postman it work fine, but in website this token is undefine
//   console.log("token",token);
  
//   if (!token) {
//     throw new Error("Unauthorized. Please log in.");
//   }

//   if (!requiredPriority) return;


//   if (!process.env.JWT_SECRET) {
//     console.error("JWT_SECRET environment variable is not set");
//     throw new Error("Authentication system error. Please contact support.");
//   }

//   try {
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
//       username: string;
//       priority: number;
//       role: string;
//     };

//     // const tokenUsername = decodedToken.username;
//     const userPriority = decodedToken.priority;
    
//     // Optional priority check
//     if (requiredPriority !== undefined  && (!userPriority || userPriority < requiredPriority)) {
//       throw new Error("Forbidden: Insufficient priority to access this resource.");
//     }
//   } catch (error) {
//     if (error instanceof jwt.TokenExpiredError) {
//       throw new Error("Your session has expired. Please log in again.");
//     } else if (error instanceof jwt.JsonWebTokenError) {
//       throw new Error("Invalid authentication token.");
//     } else {
//       throw new Error("Authentication error.");
//     }
//   }
// }