import "@/styles/globals.css";
import { type Metadata } from "next";
import Header from "@/components/header/header";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "FE camp",
  description: "Learning Management System for 18th FE Camp",
  icons: [{ rel: "icon", url: "/components/femainlogo.svg" }],
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  try {
  } catch (error) {
    console.error(error);
  }
  return (
    <main className="m-5 min-h-screen w-[95%] bg-cream shadow-2xl sm:w-[80%]">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
