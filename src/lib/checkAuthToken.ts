import jwt from "jsonwebtoken";
import { type NextRequest } from "next/server";

export async function checkAuthToken(req: NextRequest, requiredPriority?: number): Promise<void> {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized. Please log in.");
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET environment variable is not set");
    throw new Error("Authentication system error. Please contact support.");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
      username: string;
      priority: number;
    };

    // const tokenUsername = decodedToken.username;
    const userPriority = decodedToken.priority;
    
    // Optional priority check
    if (requiredPriority !== undefined  && (!userPriority || userPriority < requiredPriority)) {
      throw new Error("Forbidden: Insufficient priority to access this resource.");
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Your session has expired. Please log in again.");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid authentication token.");
    } else {
      throw new Error("Authentication error.");
    }
  }
}