import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Menu } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="relative z-50 flex items-center justify-between h-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 border-b border-[#722b41]/24">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="SGCC Logo"
            width={150}
            height={150}
            className="inline-block mr-2"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-4">
          <Link
            href="https://sgcc.ng"
            className="text-black text-sm tracking-wide relative group-hover:text-black/90 active:text-black/70 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Church Website →
            <div className="absolute -bottom-1 left-0 w-full h-px bg-[#722b41]"></div>
          </Link>
          <Link
            href="https://youtube.com/channel/UCWRXwx_RKv3aNxks9zGeXHw"
            className="text-black/80 hover:text-black active:text-black/60 text-sm tracking-wide transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join us Live 🎥
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black p-1 hover:text-black/80 active:text-black/60 hover:bg-black/5 active:bg-black/10 rounded transition-all duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={20} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#121212] border-b border-black/10 p-4 z-40">
          <div className="flex flex-col space-y-4">
            <Link
              href="#"
              className="text-black text-sm tracking-wide relative hover:text-black/90 active:text-black/70 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Church Website →
            </Link>
            <Link
              href="#"
              className="text-black/80 hover:text-black active:text-black/60 text-sm tracking-wide transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join us Live 🎥
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
