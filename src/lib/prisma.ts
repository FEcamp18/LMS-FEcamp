// filepath: src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

// Only store the Prisma instance in global during development
// Prevents creating new instances during hot reloads
// but Production doesn't use hot reloading -> The server starts once and stays running
// Thus, No need to store in global scope
// No need to add NODE_ENV in .env (Next.js Handles It Automatically)
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;