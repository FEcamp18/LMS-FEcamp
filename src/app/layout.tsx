import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Header from "@/components/header/header";

export const metadata: Metadata = {
  title: "FE camp",
  description: "Learning Management System for 18th FE Camp",
  icons: [{ rel: "icon", url: "/components/femainlogo.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} font-prompt`}>
      <head></head>
      <body className="flex items-center justify-center bg-light-gray">
        <main className="m-5 min-h-screen w-[95%] bg-cream shadow-2xl sm:w-[80%]">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
