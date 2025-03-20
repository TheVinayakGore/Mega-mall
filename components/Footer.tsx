"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { FaYoutube } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

const Footer = () => {
  // All 8 Data Lists
  const clothingCategories = [
    { name: "T-Shirts", href: "/mens-tshirts" },
    { name: "Shirts", href: "/mens-shirts" },
    { name: "Jeans", href: "/mens-jeans" },
    { name: "Jackets", href: "/mens-jackets" },
    { name: "Suits", href: "/mens-suits" },
    { name: "Blazers", href: "/mens-blazers" },
    { name: "Activewear", href: "/mens-activewear" },
    { name: "Formal Wear", href: "/mens-formal-wear" },
    { name: "Loungewear", href: "/mens-loungewear" },
    { name: "Workwear", href: "/mens-workwear" },
  ];

  const footwearCategories = [
    { name: "Casual Shoes", href: "/mens-casual-shoes" },
    { name: "Formal Shoes", href: "/mens-formal-shoes" },
    { name: "Sneakers", href: "/mens-sneakers" },
    { name: "Boots", href: "/mens-boots" },
    { name: "Sandals", href: "/mens-sandals" },
    { name: "Sliders", href: "/mens-sliders" },
    { name: "Sports Shoes", href: "/mens-sports-shoes" },
  ];

  const accessoriesCategories = [
    { name: "Watches", href: "/mens-watches" },
    { name: "Sunglasses", href: "/mens-sunglasses" },
    { name: "Belts", href: "/mens-belts" },
    { name: "Wallets", href: "/mens-wallets" },
    { name: "Bags", href: "/mens-bags" },
    { name: "Ties", href: "/mens-ties" },
    { name: "Cufflinks", href: "/mens-cufflinks" },
    { name: "Hats", href: "/mens-hats" },
    { name: "Scarves", href: "/mens-scarves" },
  ];

  const groomingAndLifestyleCategories = [
    { name: "Perfumes", href: "/mens-perfumes" },
    { name: "Grooming Kits", href: "/mens-grooming-kits" },
    { name: "Tech Accessories", href: "/mens-tech-accessories" },
    { name: "Fitness Gear", href: "/mens-fitness-gear" },
    { name: "Outdoor Gear", href: "/mens-outdoor-gear" },
    { name: "Underwear", href: "/mens-underwear" },
    { name: "Socks", href: "/mens-socks" },
    { name: "Swimwear", href: "/mens-swimwear" },
    { name: "Winter Wear", href: "/mens-winter-wear" },
  ];

  const shoppingLinks = [
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Best Sellers", href: "/best-sellers" },
    { name: "Sale", href: "/sale" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Order History", href: "/order-history" },
    { name: "Size Guide", href: "/size-guide" },
  ];

  const featuredBrands = [
    { name: "Nike", href: "/brands/nike" },
    { name: "Adidas", href: "/brands/adidas" },
    { name: "Puma", href: "/brands/puma" },
    { name: "Levi's", href: "/brands/levis" },
    { name: "Tommy Hilfiger", href: "/brands/tommy-hilfiger" },
    { name: "Calvin Klein", href: "/brands/calvin-klein" },
    { name: "Under Armour", href: "/brands/under-armour" },
    { name: "H&M", href: "/brands/hm" },
  ];

  const mensEssentialsCategories = [
    { name: "Underwear", href: "/mens-underwear" },
    { name: "Socks", href: "/mens-socks" },
    { name: "Tank Tops", href: "/mens-tank-tops" },
    { name: "Thermal Wear", href: "/mens-thermal-wear" },
    { name: "Boxers", href: "/mens-boxers" },
    { name: "Briefs", href: "/mens-briefs" },
    { name: "Compression Wear", href: "/mens-compression-wear" },
    { name: "Nightwear", href: "/mens-nightwear" },
    { name: "Towels", href: "/mens-towels" },
    { name: "Robes", href: "/mens-robes" },
  ];

  // Customer Support Links
  const customerSupportLinks = [
    { name: "About Us", href: "/about" },
    { name: "Help", href: "/help" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center gap-5 bg-zinc-100 dark:bg-zinc-900 w-full"
    >
      <section className="p-20 pb-10 w-full">
        {/* First Row */}
        <div className="flex items-start justify-between pb-8 border-b dark:border-zinc-800 w-full">
          {/* Featured Brands Categories */}
          <div className="w-full">
            <h3 className="text-lg font-medium ml-5">Featured Brands</h3>
            <ul className="mt-4 space-y-2">
              {featuredBrands.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-sky-500 hover:border-l-2 border-sky-500 pl-5 hover:ml-5 opacity-60 hover:opacity-100 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clothing Categories */}
          <div className="w-full">
            <h3 className="text-lg font-medium ml-5">Clothing</h3>
            <ul className="mt-4 space-y-2">
              {clothingCategories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-sky-500 hover:border-l-2 border-sky-500 pl-5 hover:ml-5 opacity-60 hover:opacity-100 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footwear Categories */}
          <div className="w-full">
            <h3 className="text-lg font-medium ml-5">Footwear</h3>
            <ul className="mt-4 space-y-2">
              {footwearCategories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-sky-500 hover:border-l-2 border-sky-500 pl-5 hover:ml-5 opacity-60 hover:opacity-100 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Accessories Categories */}
          <div className="w-full">
            <h3 className="text-lg font-medium ml-5">Accessories</h3>
            <ul className="mt-4 space-y-2">
              {accessoriesCategories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-sky-500 hover:border-l-2 border-sky-500 pl-5 hover:ml-5 opacity-60 hover:opacity-100 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex items-start justify-between pt-8 w-full">
          {/* Mens Essentials Categories */}
          <div className="w-full">
            <h3 className="text-lg font-medium ml-5">
              Mens Essentials Categories
            </h3>
            <ul className="mt-4 space-y-2">
              {mensEssentialsCategories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-sky-500 hover:border-l-2 border-sky-500 pl-5 hover:ml-5 opacity-60 hover:opacity-100 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Grooming & Lifestyle Categories */}
          <div className="w-full">
            <h3 className="text-lg font-medium ml-5">Grooming & Lifestyle</h3>
            <ul className="mt-4 space-y-2">
              {groomingAndLifestyleCategories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-sky-500 hover:border-l-2 border-sky-500 pl-5 hover:ml-5 opacity-60 hover:opacity-100 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shopping Links */}
          <div className="w-full">
            <h3 className="text-lg font-medium ml-5">Shopping</h3>
            <ul className="mt-4 space-y-2">
              {shoppingLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-sky-500 hover:border-l-2 border-sky-500 pl-5 hover:ml-5 opacity-60 hover:opacity-100 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support Links */}
          <div className="w-full">
            <h3 className="text-lg font-medium ml-5">Customer Support</h3>
            <ul className="mt-4 space-y-2">
              {customerSupportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-sky-500 hover:border-l-2 border-sky-500 pl-5 hover:ml-5 opacity-60 hover:opacity-100 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Third Row - Bottom Section */}
      <section className="flex flex-col md:flex-row items-start justify-between text-sm border-t dark:border-zinc-800 py-10 px-24 w-full">
        {/* Logo & Newsletter */}
        <div className="w-full">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="w-12"
            />
            <h1 className="text-2xl font-medium">
              Menzy<span className="italic text-sky-400">Cart</span>
            </h1>
          </Link>
          <p className="mt-4 text-sm opacity-60">
            Discover premium {"men's"} fashion and accessories for every
            occasion.
          </p>
          <div className="mt-4 flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 dark:bg-zinc-800 dark:border-zinc-700"
            />
            <Button className="bg-sky-500 hover:bg-sky-600 text-white">
              Subscribe
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-end gap-5 w-full">
          <p className="opacity-60">
            © {new Date().getFullYear()} MenzyCart. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              target="_blank"
              className="hover:text-sky-500 opacity-60 hover:opacity-100"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              target="_blank"
              className="hover:text-sky-500 opacity-60 hover:opacity-100"
            >
              Terms of Service
            </Link>
            <Link
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500 opacity-60 hover:opacity-100"
            >
              <FaYoutube className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500 opacity-60 hover:opacity-100"
            >
              <FaXTwitter className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </motion.footer>
  );
};

export default Footer;
