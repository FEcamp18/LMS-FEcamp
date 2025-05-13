import { SessionProvider } from "@/components/session/sessionProvider"
import "@/styles/globals.css"
import { GeistSans } from "geist/font/sans"
import { type Metadata } from "next"
import { getServerSession } from "next-auth"

export const metadata: Metadata = {
  title: "FE camp",
  description: "Learning Management System for 18th FE Camp",
  icons: [{ rel: "icon", url: "/components/femainlogo.svg" }],
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let session
  try {
    session = await getServerSession()
  } catch (error) {
    console.error(error)
    session = undefined
  }
  return (
    <html lang="en" className={`${GeistSans.variable} font-prompt`}>
      <head></head>
      <body className="flex items-center justify-center bg-light-gray">
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}
