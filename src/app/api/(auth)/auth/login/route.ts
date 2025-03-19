import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { username, hashedPassword } = await req.json();

        // error 1 : Invalid credentials (Invalid user or psw)
        if (!username || !hashedPassword) {
            return Response.json(
                {   
                    message: "failed",
                    error: "Invalid username or password."
                },
                {
                    status: 401,
                }
            );
        }

        // error 3 : no account found
        const account = await prisma.account.findUnique({
            where: { username: username },
        });
        if (!account) { // account == null (account not exist)
            return Response.json(
                {
                    message: "failed",
                    error: "User not found."
                }
            );
        }

        // error 2 : wrong password (declare here becuase use 'account')
        const isPasswordValid = await bcrypt.compare(hashedPassword, account.password);
        if (!isPasswordValid) {
            return Response.json(
                {
                    message: "failed",
                    error: "Wrong Password."
                },
                {
                    status: 401,
                }
            );
        }

        // generate token
        const token = jwt.sign(
            { username: account.username, role: account.role },
            process.env.JWT_SECRET || "your-secret-key", // Secret key for signing the token
            { expiresIn: "1h" } // Token expiration time (1 hour)
          );

        // if successful
        return Response.json(
            {
              message: "success",
              token: token,
            },
            {
              status: 200, // OK
            }
          );
    } catch (error) {
        
    }
}