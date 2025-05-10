"use client";
import Link from "next/link";
import {
  FaAddressBook,
  FaBook,
  FaChalkboardTeacher,
  FaCog,
  FaCommentDots,
  FaUserCircle,
} from "react-icons/fa";
import Image from "next/image";
import HeaderBG from "./headerBG";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const Header = () => {
  const { data: session, update } = useSession();

  useEffect(() => {
    const handleLoad = async () => {
      await update();
    };
    void handleLoad();
  }, []);
 // Get priority from session with fallback to 0
  const priority = session?.user?.priority ?? 0;
  return (
    <header className="fixed bottom-0 left-0 right-0 top-auto z-50 md:relative md:top-0">
      <HeaderBG />

      <div className="relative flex w-full items-center justify-between overflow-visible px-4 py-3 md:px-6 md:py-6">
        {/* Logo - Hidden on mobile */}
        <Link href="/" className="hidden md:block">
          <Image
            src="/components/femainlogo.svg"
            alt="FE Main Logo"
            width={50}
            height={50}
          />
        </Link>

        {/* Navigation Links */}
        <nav className="flex w-full justify-around md:w-auto md:gap-6">
          {priority > 0 && (
            <>
              <Link
                href="/camperinfo"
                className="flex flex-col items-center text-xs text-dark-brown transition-all hover:text-light-brown md:flex-row md:gap-2 md:text-base md:hover:-translate-y-1"
              >
                <FaAddressBook className="mb-1 text-lg md:mb-0" />
                <span className="whitespace-nowrap">ข้อมูลน้องค่าย</span>
              </Link>

              {priority > 1 && (
                <Link
                  href="/tutor"
                  className="flex flex-col items-center text-xs text-dark-brown transition-all hover:text-light-brown md:flex-row md:gap-2 md:text-base md:hover:-translate-y-1"
                >
                  <FaBook className="mb-1 text-lg md:mb-0" />
                  <span className="whitespace-nowrap">จัดการห้องเรียน</span>
                </Link>
              )}
              {priority > 2 && (
                <Link
                  href="/board"
                  className="flex flex-col items-center text-xs text-dark-brown transition-all hover:text-light-brown md:flex-row md:gap-2 md:text-base md:hover:-translate-y-1"
                >
                  <FaCog className="mb-1 text-lg md:mb-0" />
                  <span className="whitespace-nowrap">board</span>
                </Link>
              )}
            </>
          )}
          {priority <1 && (
            <>
              <Link
                href="/classroom"
                className="flex flex-col items-center text-xs text-dark-brown transition-all hover:text-light-brown md:flex-row md:gap-2 md:text-base md:hover:-translate-y-1"
              >
                <FaChalkboardTeacher className="mb-1 text-lg md:mb-0" />
                <span className="whitespace-nowrap">ห้องเรียน</span>
              </Link>
              <Link
                href="/feedback"
                className="flex flex-col items-center text-xs text-dark-brown transition-all hover:text-light-brown md:flex-row md:gap-2 md:text-base md:hover:-translate-y-1"
              >
                <FaCommentDots className="mb-1 text-lg md:mb-0" />
                <span className="whitespace-nowrap">แบบประเมิน</span>
              </Link>
            </>
          )}
          <Link
            href="/account"
            className="flex flex-col items-center text-xs text-dark-brown transition-all hover:text-light-brown md:flex-row md:gap-2 md:text-base md:hover:-translate-y-1"
          >
            <FaUserCircle className="mb-1 text-lg md:mb-0" />
            <span className="whitespace-nowrap">บัญชี</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
