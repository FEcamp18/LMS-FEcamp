import { type NextAuthOptions } from "next-auth";
import type { DefaultSession, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import { ROLE } from "@prisma/client";
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

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "string" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        // ARKA : fix this to get real user
        // username and password is in credentials
        // call API /login 
        console.log("Authorize called with credentials:", credentials);

        const mockUser = {
          id: "camper1",
          username: "temp-auth-user",
          password: "temp-auth-pass",
          role: ROLE.CAMPER,
        };

        if (mockUser) {
          return {
            id: mockUser.id,
            username: mockUser.username,
            role: mockUser.role,
          };
        }
        throw new Error("Invalid username or password");
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
    },  },
};
