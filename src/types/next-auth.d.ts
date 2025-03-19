import NextAuth, { DefaultSession } from "next-auth";
import { ROLE } from "@prisma/client";

declare module "next-auth" {
  interface User {
    username: string;
    role: ROLE;
  }

  interface Session {
    user: {
      username: string;
      role: ROLE;
    };
  }
}
