import { type NextAuthOptions } from "next-auth"
import type { DefaultSession, Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { JWT } from "next-auth/jwt"
import { ROLE } from "@prisma/client"
declare module "next-auth" {
  interface User {
    id: string | undefined
    username: string
    role?: ROLE
  }

  interface Session extends DefaultSession {
    user: {
      id: string | undefined
      username: string
      role: ROLE
    } & DefaultSession["user"]
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
      async authorize(_credentials, _req) {
        // Mock user for demonstration purposes
        const mockUser = {
          id: "dev-staff",
          username: "temp-auth-user",
          password: "temp-auth-pass",
          role: ROLE.STAFF,
        }

        if (mockUser) {
          return {
            id: mockUser.id,
            username: mockUser.username,
            role: mockUser.role,
          }
        }
        throw new Error("Invalid username or password")
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user?: User }) => {
      if (user) {
        token.username = user.username
        token.role = user.role
      }

      return token
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      session.user.id = typeof token.id === "string" ? token.id : "1"
      session.user.username =
        typeof token.username === "string" ? token.username : ""
      session.user.role =
        typeof token.role === "string" &&
        Object.values(ROLE).includes(token.role as ROLE)
          ? (token.role as ROLE)
          : ROLE.CAMPER

      return session
    },
  },
}
