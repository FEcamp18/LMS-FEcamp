import Link from "next/link"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found | FE Camp",
  description: "404 Page Not Found",
}

export default function NotFound() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-[url('/image/landingpage_element/404-mobile.webp')] bg-cover bg-center p-4 text-center lg:bg-[url('/image/landingpage_element/404-bg.webp')]">
      <div className="mt-48">
        <Link
          href="/"
          className="rounded-lg bg-yellow-700 px-6 py-2 text-white shadow-lg transition hover:bg-yellow-800"
        >
          กลับหน้าวิหาร
        </Link>
      </div>
    </div>
  )
}
