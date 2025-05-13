import Link from "next/link"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found | FE Camp",
  description: "404 Page Not Found",
}

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <div className="max-w-md rounded-2xl border border-gray-300 bg-white p-10 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">
          404 - Page Not Found
        </h1>
        <div className="mt-6">
          <Link
            href="/"
            className="rounded-lg bg-yellow-700 px-6 py-2 text-white shadow-lg transition hover:bg-yellow-800"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
