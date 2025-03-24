import NextAuth, { DefaultSession, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
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

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "string", placeholder: "john" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        //login api
        const mockUser = {
          id: "1",
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
    strategy: "jwt" as const,
  },
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user?: User }) => {
      if (user) {
        token.username = user.username;
        token.role = user.role;
      }
      console.log("token", token);

      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      session.user.id = typeof token.id === "string" ? token.id : "1";
      session.user.username =
        typeof token.username === "string" ? token.username : "";
      session.user.role =
        typeof token.role === "string" &&
        Object.values(ROLE).includes(token.role as ROLE)
          ? (token.role as ROLE)
          : ROLE.CAMPER;

      console.log("session", session);

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
