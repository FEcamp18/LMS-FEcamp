"use client"
import Logout from "./Logout"
import { useSession } from "next-auth/react"
import { Toaster } from "react-hot-toast"

import Link from "next/link"
import { useEffect, useState } from "react"
import CamperAccount from "@/components/account/CamperAccount"
import StaffAccount from "@/components/account/StaffAccount"

export default function AccountPage() {
  const { data: session, status, update } = useSession()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const handleLoad = async () => {
      await update()
    }

    void handleLoad()

    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading)
    return (
      <div className="w-full pt-10 text-3xl font-bold text-dark-brown">
        Loading...
      </div>
    )

  if (status === "unauthenticated" || session === null) {
    return <div>You are not logged in. Please log in to access this page.</div>
  }

  return (
    <>
      <Toaster />
      {!loading &&
        (session?.user?.role === "CAMPER" ? (
          <CamperAccount />
        ) : (
          <StaffAccount />
        ))}
      <div className="mx-6 my-8 flex h-[55px] justify-end space-x-4">
        <Link
          href="resetpassnotice"
          className="w-full max-w-[190px] content-center border-[0.5px] border-black bg-cream py-[8px] text-center text-xl font-normal text-dark-gray hover:bg-light-gray hover:text-cream active:bg-dark-gray active:text-cream md:text-2xl"
        >
          เปลี่ยนรหัส
        </Link>
        <Logout />
      </div>
    </>
  )
}
