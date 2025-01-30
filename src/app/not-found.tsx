import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-300 max-w-md">
        <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
        <div className="mt-6">
          <Link href="/" className="px-6 py-2 bg-yellow-700 text-white rounded-lg shadow-lg hover:bg-yellow-800 transition">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}