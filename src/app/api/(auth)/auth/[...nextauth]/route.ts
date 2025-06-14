import NextAuth from "next-auth"
import { authOptions } from "./authOptions"

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
