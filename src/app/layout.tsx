import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Header from "@/components/ui/header";
export const metadata: Metadata = {
  title: "FE camp",
  description: "Learning Management System for 18th FE Camp",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} font-prompt`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-light-gray flex items-center justify-center">
        <main className="bg-cream m-5 min-h-screen w-[95%] shadow-2xl sm:w-[80%]">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
