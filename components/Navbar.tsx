"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MdOutlineMenu } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import Cart from "@/app/product/cart";
// import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineSun } from "react-icons/hi2";
import { IoMoonOutline } from "react-icons/io5";
import { Input } from "./ui/input";
import { FaSearch } from "react-icons/fa";
import { PiArrowUpRightBold } from "react-icons/pi";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  // const { signOut } = useClerk();
  // const { isSignedIn } = useUser();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const navLinkClass =
    "flex items-start justify-center space-x-1 pl-3 pr-2 hover:font-semibold hover:text-sky-500 relative transition-all duration-200 before:absolute before:-bottom-1 before:left-1/2 before:w-0 before:h-[2px] before:bg-sky-400 dark:before:bg-sky-500 before:transition-all before:duration-300 before:-translate-x-1/2 hover:before:w-full hover:before:left-0 hover:before:translate-x-0 hover:before:bottom-[-4px]";

  return (
    <>
      <nav className="fixed top-0 z-[100] bg-white/[0.8] dark:bg-zinc-900/[0.8] backdrop-blur-lg shadow-md w-full">
        <ul className="flex items-center justify-between p-3 px-10 w-full">
          <li>
            <Link
              href="/"
              className="flex items-center font-bold whitespace-nowrap"
            >
              <Image
                src="/logo.png"
                alt="logo"
                width={25}
                height={25}
                className="w-auto"
              />
              <span className="ml-3 text-xl md:text-2xl font-bold">
                Menzy <span className="text-sky-400 italic">Cart</span>
              </span>
            </Link>
          </li>
          <li className="flex items-center justify-center gap-5 m-auto w-full">
            <div className="inline-flex items-center gap-4 whitespace-nowrap">
              <Link href="/about" target="_blank" className={navLinkClass}>
                About
                <PiArrowUpRightBold className="text-xs font-light w-2 h-2" />
              </Link>
              <Link href="/help" target="_blank" className={navLinkClass}>
                Help
                <PiArrowUpRightBold className="text-xs font-light w-2 h-2" />
              </Link>
              <Link href="/faq" target="_blank" className={navLinkClass}>
                FAQ
                <PiArrowUpRightBold className="text-xs font-light w-2 h-2" />
              </Link>
              <Link href="/adminPanel" target="_blank" className={navLinkClass}>
                Admin Panel
                <PiArrowUpRightBold className="text-xs font-light w-2 h-2" />
              </Link>
            </div>
            <div className="flex w-[40rem] relative">
              <Input
                type="text"
                placeholder="Search products"
                className="w-full rounded-lg border dark:border-zinc-700 focus-visible:ring-sky-400 dark:focus-visible:ring-sky-400"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center p-3 rounded-lg border-[0.13rem] border-sky-500 bg-transparent hover:bg-sky-500 text-sky-500 hover:text-white transition-all hover:scale-125 duration-300"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            </div>
          </li>
          <li className="flex items-center gap-3">
            <Drawer>
              <DrawerTrigger asChild>
                <button className="relative p-2 -mr-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200">
                  <HiOutlineShoppingCart className="h-7 w-7" />
                  <span className="absolute top-0 right-0 bg-sky-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    3 {/* Replace with dynamic cart count */}
                  </span>
                </button>
              </DrawerTrigger>
              <Cart />
            </Drawer>
            {/* <UserButton /> */}
            <Button className="px-7 text-sm font-medium bg-sky-400 hover:bg-sky-500 text-white">
              Login
            </Button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/[0.3] dark:bg-zinc-900/[0.3] backdrop-blur-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
            >
              {theme === "dark" ? (
                <HiOutlineSun className="h-6 w-6" />
              ) : (
                <IoMoonOutline className="h-6 w-6" />
              )}
            </button>
          </li>
        </ul>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-white text-black hover:bg-zinc-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 transition-colors duration-300 flex items-center"
            >
              <MdOutlineMenu className="h-[1.5rem] w-[1.5rem]" />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <ul className="flex flex-col items-start justify-start space-y-3">
              <li>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center justify-between py-5 w-36 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:bg-sky-400 dark:hover:bg-sky-500 hover:text-white hover:border-sky-400"
                    >
                      <BsCart4 className="text-xl" />
                      <span>Your Cart</span>
                    </Button>
                  </DrawerTrigger>
                  <Cart />
                </Drawer>
              </li>
              <li>
                <Button
                  variant="outline"
                  className="flex items-center justify-between py-5 w-36 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:bg-sky-400 dark:hover:bg-sky-500 hover:text-white hover:border-sky-400"
                  asChild
                >
                  <Link href="/" className="flex items-center space-x-2">
                    <IoMdHelpCircleOutline className="text-xl" />
                  </Link>
                </Button>
              </li>
              {/* <li>
                  {isSignedIn ? (
                    <Button
                      variant="outline"
                      className="flex items-center justify-between py-5 w-36 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:bg-sky-400 dark:hover:bg-sky-500 hover:text-white hover:border-sky-400"
                      onClick={() => signOut()}
                    >
                      <IoMdHelpCircleOutline className="text-xl" />
                      <span>Sign Out</span>
                    </Button>
                  ) : (
                    <Link href="/sign-in">
                      <Button
                        variant="outline"
                        className="flex items-center justify-between py-5 w-36 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                      >
                        Sign In
                      </Button>
                    </Link>
                  )}
                </li> */}
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
};

export default Navbar;
