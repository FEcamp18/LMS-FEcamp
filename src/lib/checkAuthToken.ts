import jwt from "jsonwebtoken";

export async function checkAuthToken(req: Request, username: string): Promise<void> {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      throw new Error(
        "Authorization header missing or invalid format. Use 'Bearer [token]'."
      );
    }
  
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized. Please log in.");
    }
  
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET environment variable is not set");
      throw new Error("Authentication system error. Please contact support.");
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const tokenUsername = (decodedToken as { username: string }).username;
  
      if (tokenUsername !== username) {
        throw new Error("You can only update your own password.");
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Your session has expired. Please log in again.");
      } else if (error instanceof jwt.JsonWebTokenError) {
        console.warn(`Invalid token attempt for user: ${username}`);
        throw new Error("Invalid authentication token.");
      } else if (error instanceof jwt.NotBeforeError) {
        throw new Error("Token not yet active.");
      } else {
        console.error(error);
        throw new Error("Authentication error.");
      }
    }
  }