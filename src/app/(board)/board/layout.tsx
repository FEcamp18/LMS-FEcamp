import { type Metadata } from "next";
import Header from "@/components/header/header";
export const metadata: Metadata = {
  title: "Board | FE camp",
  description: "Management System for 18th FE Camp",
};

import { Prompt, Inknut_Antiqua } from "next/font/google";
import "@/styles/globals.css";

const prompt = Prompt({
  subsets: ["latin"],
  variable: "--font-prompt",
  weight: ["400", "500", "600", "700"],
});

const inknut = Inknut_Antiqua({
  subsets: ["latin"],
  variable: "--font-inknut",
  weight: ["400", "500", "600", "700"],
});

export default function BoardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
