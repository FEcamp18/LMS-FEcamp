import jwt from "jsonwebtoken";
import { type NextRequest } from "next/server";

// export async function checkAuthToken(req: NextRequest, username: string): Promise<void> {
export async function checkAuthToken(req: NextRequest): Promise<void> {
  const token = req.cookies.get("token")?.value;  

    if (!token) {
      throw new Error("Unauthorized. Please log in.");
    }
  
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET environment variable is not set");
      throw new Error("Authentication system error. Please contact support.");
    }
  
    // TODO : I donno wat to do
    // try {
    //   const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    //   const tokenUsername = (decodedToken as { username: string }).username;
  
    //   if (tokenUsername !== username) {
    //     throw new Error("You can only update your own password.");
    //   }
    // } catch (error) {
    //   if (error instanceof jwt.TokenExpiredError) {
    //     throw new Error("Your session has expired. Please log in again.");
    //   } else if (error instanceof jwt.JsonWebTokenError) {
    //     // console.warn(`Invalid token attempt for user: ${username}`);
    //     throw new Error("Invalid authentication token.");
    //   } else if (error instanceof jwt.NotBeforeError) {
    //     throw new Error("Token not yet active.");
    //   } else {
    //     console.error(error);
    //     throw new Error("Authentication error.");
    //   }
    // }
  }