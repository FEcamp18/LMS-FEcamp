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
      {/* Logo */}
      <div className="relative h-16 w-full">
        <p>FE Logo</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-6">
        <Link
          href="/classroom"
          className="hover:text-light-brown text-dark-brown flex items-center gap-2"
        >
          <FaChalkboardTeacher className="text-lg" />
          ห้องเรียน
        </Link>
        <Link
          href="/feedback"
          className="hover:text-light-brown text-dark-brown flex items-center gap-2"
        >
          <FaCommentDots className="text-lg" />
          แบบประเมิน
        </Link>
        <Link
          href="/account"
          className="hover:text-light-brown text-dark-brown flex items-center"
        >
          <FaUserCircle className="text-xl" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
