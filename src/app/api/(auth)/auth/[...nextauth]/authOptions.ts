import { type NextAuthOptions } from "next-auth";
import type { DefaultSession, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import { type ROLE } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string | undefined;
    username: string;
    role?: ROLE;
  }

  interface Session extends DefaultSession {
    user: {
      id: string | undefined;
      username: string;
      role: ROLE;
    } & DefaultSession["user"];
  }
}

interface AccountResponse {
  message: "success" | "failed";
  data?: {
    name: string;
    role: ROLE;
  };
  error?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "string" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const baseUrl =  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
        try {
          // Call login API
          const response = await fetch(`${baseUrl}/api/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          const data = await response.json() as { error?: string };

          if (!response.ok) {
            throw new Error(data.error ?? "Login failed");
          }

          const getdetail = await fetch(`${baseUrl}/api/account?username=` + credentials.username, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!getdetail.ok) {
            throw new Error(data.error ?? "User Not found");
          }

          const userDetails = await getdetail.json() as AccountResponse;

          if (!userDetails.data) {
            throw new Error("user data is not define");
          }
          
          // Return user object with all required fields
          return {
            id: credentials.username,
            username: credentials.username,
            role: userDetails.data.role,
          };
        } catch {
          throw new Error("Invalid username or password");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user?: User }) => {
      // console.log("JWT callback called with token:", token, "and user:", user);

      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      // console.log("jwt last token", token);

      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      // console.log("Session callback called with session:", session, "and token:", token);

      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.user.role = token.role as ROLE;

      // console.log("Final session object:", session);

      return session;
    },
  },
};
