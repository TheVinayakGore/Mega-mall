"use client";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
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
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  // Toggle Theme Function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <nav className="fixed top-0 flex items-center justify-between py-3 px-4 md:px-10 bg-white/[0.8] dark:bg-zinc-950/[0.8] backdrop-blur-sm shadow-lg z-50 w-full">
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
            Mega <span className="text-sky-400 italic">mall</span>
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <ul className="hidden md:flex items-center space-x-4">
            <li>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-xl hover:bg-transparent hover:text-sky-500 opacity-60 hover:opacity-100 flex items-center"
                  >
                    <BsCart4 />
                  </Button>
                </DrawerTrigger>
                <Cart />
              </Drawer>
            </li>
            <li>{/* <UserButton /> */}</li>
            <li>
              <button
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </button>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/help"
                      target="_blank"
                      className="opacity-60 hover:opacity-100 text-xl"
                    >
                      <IoMdHelpCircleOutline />
                    </Link>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
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
        </div>
      </nav>
    </>
  );
};

export default Navbar;
