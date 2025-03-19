import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { ROLE } from "@prisma/client";

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
          username: "username",
          password: "password",
          role: ROLE.CAMPER,
        };

        if (mockUser) {
          return { username: mockUser.username, role: mockUser.role };
        }
        throw new Error("Invalid username or password");
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user: User }) => {
      if (user) {
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      session.user.username = token.username as string;
      session.user.role = token.role as ROLE;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
