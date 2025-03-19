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
          id: "1",
          username: "username",
          password: "password",
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
      // console.log(token);

      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      console.log("Session:", session);
      console.log("Token:", token);
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          username: token.username,
          role: token.role,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
