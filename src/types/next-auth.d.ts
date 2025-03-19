import NextAuth, { DefaultSession } from "next-auth";
import { ROLE } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    role?: ROLE;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      role: ROLE;
    } & DefaultSession["user"];
  }
}
