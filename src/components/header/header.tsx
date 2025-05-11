import Link from "next/link"
import {
  FaChalkboardTeacher,
  FaCommentDots,
  FaUserCircle,
} from "react-icons/fa"
import Image from "next/image"
import HeaderBG from "./headerBG"

const Header = () => {
  return (
    <header className="relative flex items-center justify-between overflow-visible">
      <HeaderBG />
      <div className="relative flex w-full items-center justify-between overflow-visible px-6 py-6">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/components/femainlogo.svg"
            alt="FE Main Logo"
            width={50}
            height={50}
          />
        </Link>
        {/* Navigation Links */}
        <nav className="flex gap-6">
          <Link
            href="/classroom"
            className="flex items-center gap-2 text-dark-brown transition-all hover:-translate-y-1 hover:text-light-brown"
          >
            <FaChalkboardTeacher className="text-lg" />
            ห้องเรียน
          </Link>
          <Link
            href="/feedback"
            className="flex items-center gap-2 text-dark-brown transition-all hover:-translate-y-1 hover:text-light-brown"
          >
            <FaCommentDots className="text-lg" />
            แบบประเมิน
          </Link>
          <Link
            href="/account"
            className="flex items-center text-dark-brown transition-all hover:-translate-y-1 hover:text-light-brown"
          >
            <FaUserCircle className="text-xl" />
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
