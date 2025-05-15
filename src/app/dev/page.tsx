"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import toast from "react-hot-toast"

export default function Dev() {
  const { data: session } = useSession()

  const handleLogin = ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    void signIn("credentials", {
      username,
      password,
      redirect: false,
    })
  }

  const handleLogout = async () => {
    try {
      await signOut()
    } catch {
      toast.error("signout failed")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      {/* Display Session Information */}
      <div className="mt-5 text-center">
        <h2 className="text-xl font-bold">Session Information</h2>
        {session && "yes"}
        {session ? (
          <div className="mt-3">
            <p>
              <strong>Username:</strong> {session.user.username}
            </p>
            <p>
              <strong>Role:</strong> {session.user.role}
            </p>
          </div>
        ) : (
          <p>No active session. Please log in.</p>
        )}
      </div>
      <div className="flex h-[600px] flex-row items-center justify-center space-x-5">
        <button
          onClick={() =>
            handleLogin({
              username: "dev-camper",
              password: "dev-password-camper",
            })
          }
          className="rounded-xl bg-gray-600 px-5 py-2 text-white"
        >
          Login As CAMPER1
        </button>
        <button
          onClick={() =>
            handleLogin({
              username: "dev-staff",
              password: "dev-password-staff",
            })
          }
          className="rounded-xl bg-gray-600 px-5 py-2 text-white"
        >
          Login As STAFF1
        </button>
        <button
          onClick={() =>
            handleLogin({
              username: "board_dev",
              password: "dev-password-board",
            })
          }
          className="rounded-xl bg-gray-600 px-5 py-2 text-white"
        >
          Login As BOARD
        </button>
        <button
          onClick={() => handleLogout()}
          className="rounded-xl bg-gray-600 px-5 py-2 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
