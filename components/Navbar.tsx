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
  // SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdOutlineMenu } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import Cart from "@/app/product/cart";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosGlobe } from "react-icons/io";
import { IoListSharp } from "react-icons/io5";
import { MdOutlineContacts } from "react-icons/md";

const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <>
      <nav className="fixed top-0 flex items-center justify-between p-2 px-4 md:px-10 bg-zinc-100/[0.8] dark:bg-zinc-950/[0.8] backdrop-blur-sm shadow-lg z-50 w-full">
        <Link
          href="/"
          className="flex items-center font-bold whitespace-nowrap"
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={30}
            height={30}
            className="w-7 md:w-10"
          />
          <span className="ml-3 text-xl md:text-2xl font-bold">
            Mega <span className="text-sky-400 italic">mall</span>
          </span>
        </Link>
        <div className="flex items-center space-x-1">
          <ul className="hidden md:flex items-center space-x-5 font-medium mr-5">
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
            <li>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-xl hover:bg-transparent hover:text-sky-500 opacity-60 hover:opacity-100"
                  >
                    <BsCart4 />
                  </Button>
                </DrawerTrigger>
                <Cart />
              </Drawer>
            </li>
          </ul>
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white text-black hover:bg-zinc-100 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900 transition-colors duration-300"
                >
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white dark:bg-zinc-950 shadow-lg rounded-md"
              >
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-300"
                >
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-300"
                >
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className="hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-300"
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
                className="md:hidden bg-white text-black hover:bg-zinc-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 transition-colors duration-300"
              >
                <MdOutlineMenu className="h-[1.5rem] w-[1.5rem]" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col items-start">
              <ul className="flex flex-col items-start justify-start space-y-3">
                <li>
                  <Button
                    variant="outline"
                    className="flex items-center justify-between py-5 w-36 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                    asChild
                  >
                    <Link href="/" className="flex items-center space-x-2">
                      <IoHomeOutline className="text-xl" />
                      <span>Home</span>
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="outline"
                    className="flex items-center justify-between py-5 w-36 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                    asChild
                  >
                    <Link href="/" className="flex items-center space-x-2">
                      <IoListSharp className="text-xl" />
                      <span>Shop</span>
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="outline"
                    className="flex items-center justify-between py-5 w-36 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                    asChild
                  >
                    <Link href="/" className="flex items-center space-x-2">
                      <IoIosGlobe className="text-xl" />
                      <span>About</span>
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="outline"
                    className="flex items-center justify-between py-5 w-36 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                    asChild
                  >
                    <Link href="/" className="flex items-center space-x-2">
                      <MdOutlineContacts className="text-xl" />
                      <span>Contact</span>
                    </Link>
                  </Button>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
};

export default Navbar;