import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
export const metadata: Metadata = {
  title: "Board | FE camp",
  description: "Management System for 18th FE Camp",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} font-prompt`}>
      <body>{children}</body>
    </html>
  );
}
