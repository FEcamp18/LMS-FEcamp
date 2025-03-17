import Link from "next/link";
import {
  FaChalkboardTeacher,
  FaCommentDots,
  FaUserCircle,
} from "react-icons/fa";
import HeaderBG from "./headerBG";

const Header = () => {
  return (
    <header className="relative flex items-center justify-between overflow-visible">
      <HeaderBG />
      <div className="relative flex w-full items-center justify-between overflow-visible px-6 py-6">
        {/* Logo */}

        <p className="font-black">FE Logo</p>
        {/* Navigation Links */}
        <nav className="flex gap-6">
          <Link
            href="/classroom"
            className="hover:text-light-brown text-dark-brown flex items-center gap-2 transition-all hover:-translate-y-1"
          >
            <FaChalkboardTeacher className="text-lg" />
            ห้องเรียน
          </Link>
          <Link
            href="/feedback"
            className="hover:text-light-brown text-dark-brown flex items-center gap-2 transition-all hover:-translate-y-1"
          >
            <FaCommentDots className="text-lg" />
            แบบประเมิน
          </Link>
          <Link
            href="/account"
            className="hover:text-light-brown text-dark-brown flex items-center transition-all hover:-translate-y-1"
          >
            <FaUserCircle className="text-xl" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
