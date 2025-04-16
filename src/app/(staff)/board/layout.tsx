import { type Metadata } from "next";
export const metadata: Metadata = {
  title: "Board | FE camp",
  description: "Management System for 18th FE Camp",
};

export default function BoardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main>{children}</main>;
}
