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
    roomNumber: number;
    priority?: number; //isstaff 1 ->istutor 2 ->isboard 3
    boardcastPrio: boolean;
    infoPrio: boolean;
  }

  interface Session extends DefaultSession {
    user: {
      id: string | undefined;
      username: string;
      role: ROLE;
      priority?: number;
      roomNumber: number;
      boardcastPrio: boolean;
     infoPrio: boolean;
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
interface DepartmentResponse {
  message: "success" | "failed";
  department: string;
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

        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
        try {
          const response = await fetch(`${baseUrl}/api/login`, {
            method: "POST",
            credentials:"include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          const data = (await response.json()) as { error?: string };

          if (!response.ok) {
            throw new Error(data.error ?? "Login failed");
          }

          const getdetail = await fetch(
            `${baseUrl}/api/account?username=` + credentials.username,
            {
              method: "GET",
              credentials:"include",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          if (!getdetail.ok) {
            throw new Error(data.error ?? "User Not found");
          }

          const userDetails = (await getdetail.json()) as AccountResponse;

          if (!userDetails.data) {
            throw new Error("user data is not define");
          }

          let roomNumber = 0;
          let prio = 0;
          let boardcastPrio = false;
          let infoPrio = false;
          // First check role
          switch (userDetails.data.role) {
            case "CAMPER":
              prio = 0;
              const getRoomNumber = await fetch(
                `${baseUrl}/api/camper/` + credentials.username,
                {
                  method: "GET",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              );

              if (!getRoomNumber.ok) {
                throw new Error("Failed to fetch room number for camper.");
              }

              const camperData = await getRoomNumber.json() as { camper: { room: number } };
              
              roomNumber = camperData?.camper?.room ?? 0; // Extract roomNumber or default to 0
              break;
            case "BOARD":
              prio = 3;
              break;
            default:
              // For other roles, check department
              const getDepartment = await fetch(
                `${baseUrl}/api/staff/getdepartment/` + credentials.username,
                {
                  method: "GET",
                  credentials:"include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              );
              
              
              if (!getDepartment.ok) {
                throw new Error(data.error ?? "Department Not found");
              }
              const departmentDetails =
                (await getDepartment.json()) as DepartmentResponse;
              if (!departmentDetails) {
                throw new Error("Department is not define");
              }
              // Set priority based on department for non-BOARD roles
              prio = departmentDetails.department === "VCK" ? 2 : 1;
               // Set priority based on department for non-BOARD roles
              if (["VCK", "BOARD", "CENTRAL"].includes(departmentDetails.department)) {
                boardcastPrio = true;
              }

              if (["BOARD", "REGISTER", "IT", "ROOMSTAFF", "NURSE"].includes(departmentDetails.department)) {
                infoPrio = true;
              }

          }

          // Return user object with all required fields
          return {
            id: credentials.username,
            username: credentials.username,
            role: userDetails.data.role,
            priority: prio,
            roomNumber: roomNumber,
            boardcastPrio: boardcastPrio,
            infoPrio: infoPrio,
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
        token.priority = user.priority;
        token.roomNumber = user.roomNumber;
        token.boardcastPrio = user.boardcastPrio;
        token.infoPrio = user.infoPrio;
      }
      return token
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.user.role = token.role as ROLE;
      session.user.priority = token.priority as number;
      session.user.roomNumber = token.roomNumber as number;
      session.user.boardcastPrio = token.boardcastPrio as boolean;
      session.user.infoPrio = token.boardcastPrio as boolean;
      return session
    },
  },
}
