import React from "react";
import Link from "next/link";
import { FaInstagram, FaTwitter, FaGithub, FaFacebook } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-200 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Brand Info */}
        <section className="flex flex-col gap-2 mb-4 md:mb-0">
          <Link
            href="/"
            className="flex items-center font-bold whitespace-nowrap"
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={18}
              height={18}
              className="w-auto"
            />
            <span className="ml-2 text-base md:text-xl font-bold">
              Mega <span className="text-sky-400 italic">mall</span>
            </span>
          </Link>
          <p className="text-sm text-gray-400">
            Your one-stop destination for all your shopping needs.
          </p>
        </section>

        {/* Center Section: Social Links */}
        <section className="flex flex-col items-end gap-2">
          <div className="flex space-x-1">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-zinc-800 rounded-full text-gray-400 hover:text-pink-500 transition"
            >
              <FaInstagram size={20} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-zinc-800 rounded-full text-gray-400 hover:text-sky-500 transition"
            >
              <FaTwitter size={20} />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-zinc-800 rounded-full text-gray-400 hover:text-gray-500 transition"
            >
              <FaGithub size={20} />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-zinc-800 rounded-full text-gray-400 hover:text-blue-500 transition"
            >
              <FaFacebook size={20} />
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-4 md:mt-0">
            © {new Date().getFullYear()} Mega Mall. All rights reserved.
          </p>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
