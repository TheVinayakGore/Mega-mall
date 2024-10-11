"use client";
import React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdOutlineMenu } from "react-icons/md";

const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <>
      <nav className="fixed top-0 flex items-center justify-between p-2 px-4 md:px-10 shadow-lg bg-gradient-to-l from-sky-500 to-purple-600 text-white w-full">
        <Link
          href="/"
          className="flex items-center font-bold whitespace-nowrap"
        >
          <Image
            src="/logo.png"
            alt="logo"
            className="w-7 md:w-10"
            width={30}
            height={30}
          />
          <span className="ml-3 text-xl md:text-2xl font-bold">
            Mega <span className="text-sky-400 italic">mall</span>
          </span>
        </Link>
        <div className="flex items-center space-x-1">
          <ul className="hidden md:flex space-x-5 text-white font-medium mr-5">
            <li>
              <Link href="/" className="opacity-60 hover:opacity-100">
                About
              </Link>
            </li>
            <li>
              <Link href="/" className="opacity-60 hover:opacity-100">
                Help
              </Link>
            </li>
            <li>
              <Link href="/" className="opacity-60 hover:opacity-100">
                Contact
              </Link>
            </li>
          </ul>
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white dark:bg-gray-800 shadow-lg rounded-md"
              >
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden bg-white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <MdOutlineMenu className="h-[1.5rem] w-[1.5rem]" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col items-start">
              <ul className="flex flex-col items-start justify-start space-y-3">
                <li>
                  <Button
                    variant="outline"
                    className="py-5 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                    asChild
                  >
                    <Link href="/" className="w-36">
                      Home
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="outline"
                    className="py-5 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                    asChild
                  >
                    <Link href="/#about" className="hover:text-white w-36">
                      About
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="outline"
                    className="py-5 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                    asChild
                  >
                    <Link href="/" className="hover:text-white w-36">
                      Blogs
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="outline"
                    className="py-5 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                    asChild
                  >
                    <Link href="/#contact" className="hover:text-white w-36">
                      Contact
                    </Link>
                  </Button>
                </li>
              </ul>
              <SheetFooter>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center justify-between py-5 w-36"
                    >
                      <div className="flex">
                        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      </div>
                      <span>Dark Mode</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
