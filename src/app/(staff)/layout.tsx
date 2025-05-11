import "@/styles/globals.css"
import { type Metadata } from "next"
import Header from "@/components/header/header"

export const metadata: Metadata = {
  title: "FE camp",
  description: "Learning Management System for 18th FE Camp",
  icons: [{ rel: "icon", url: "/components/femainlogo.svg" }],
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  try {
  } catch (error) {
    console.error(error)
  }
  return (
    <main className="m-5 min-h-screen w-[95%] bg-cream shadow-2xl sm:w-[80%]">
      <Header />
      {children}
    </main>
  )
}
