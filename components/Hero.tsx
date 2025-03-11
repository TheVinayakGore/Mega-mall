"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Typewriter } from "react-simple-typewriter";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { motion } from "framer-motion";

const colors = [
  "text-amber-400",
  "text-sky-400",
  "text-fuchsia-400",
  "text-green-400",
  "text-purple-400",
  "text-red-400",
  "text-yellow-400",
];

const products = [
  {
    title: "Tshirt",
    description:
      "Comfortable cotton Tshirt for everyday wear. Available in multiple colors and sizes.",
    price: 20,
    mrp: 28.0,
    image: "/card.png",
  },
  {
    title: "Tshirt XXL",
    description:
      "Extra large Tshirt for a relaxed fit. Perfect for casual outings and lounging.",
    price: 25,
    mrp: 35.0,
    image: "/card.png",
  },
  {
    title: "Tshirt XL",
    description:
      "Large Tshirt for a comfortable fit. Ideal for daily wear and sports activities.",
    price: 22,
    mrp: 30.8,
    image: "/card.png",
  },
  {
    title: "Hoodie XL",
    description:
      "Warm and cozy hoodie for cold days. Features a front pocket and adjustable drawstrings.",
    price: 45,
    mrp: 63.0,
    image: "/card.png",
  },
  {
    title: "Men's Jeans",
    description:
      "Classic denim jeans for a stylish look. Durable and available in various fits.",
    price: 50,
    mrp: 70.0,
    image: "/card.png",
  },
  {
    title: "Leather Jacket",
    description:
      "Premium leather jacket for a rugged appearance. Perfect for bikers and outdoor enthusiasts.",
    price: 120,
    mrp: 168.0,
    image: "/card.png",
  },
  {
    title: "Sneakers",
    description:
      "Comfortable and trendy sneakers for men. Suitable for casual and athletic wear.",
    price: 60,
    mrp: 84.0,
    image: "/card.png",
  },
  {
    title: "Formal Shirt",
    description:
      "Elegant formal shirt for office wear. Made from high-quality cotton for a polished look.",
    price: 35,
    mrp: 49.0,
    image: "/card.png",
  },
  {
    title: "Casual Shorts",
    description:
      "Lightweight shorts for a casual look. Perfect for summer and outdoor activities.",
    price: 28,
    mrp: 39.2,
    image: "/card.png",
  },
  {
    title: "Winter Coat",
    description:
      "Heavy-duty winter coat for extreme cold. Features a waterproof exterior and warm lining.",
    price: 150,
    mrp: 210.0,
    image: "/card.png",
  },
  {
    title: "Men's Watch",
    description:
      "Stylish wristwatch for men. Combines functionality with a sleek, modern design.",
    price: 80,
    mrp: 112.0,
    image: "/card.png",
  },
  {
    title: "Backpack",
    description:
      "Durable backpack for daily use. Spacious compartments and ergonomic design.",
    price: 40,
    mrp: 56.0,
    image: "/card.png",
  },
  {
    title: "Sunglasses",
    description:
      "UV-protected sunglasses for men. Offers style and protection from harmful rays.",
    price: 30,
    mrp: 42.0,
    image: "/card.png",
  },
  {
    title: "Running Shoes",
    description:
      "High-performance running shoes. Designed for comfort and long-distance running.",
    price: 70,
    mrp: 98.0,
    image: "/card.png",
  },
  {
    title: "Boxer Briefs",
    description:
      "Soft and comfortable boxer briefs. Provides all-day comfort and support.",
    price: 15,
    mrp: 21.0,
    image: "/card.png",
  },
  {
    title: "Men's Belt",
    description:
      "Classic leather belt for men. Combines style and durability for everyday use.",
    price: 25,
    mrp: 35.0,
    image: "/card.png",
  },
  {
    title: "Beanie Hat",
    description:
      "Warm beanie hat for winter. Keeps you cozy and stylish during cold weather.",
    price: 18,
    mrp: 25.2,
    image: "/card.png",
  },
  {
    title: "Gym Gloves",
    description:
      "Durable gloves for gym workouts. Enhances grip and protects your hands.",
    price: 22,
    mrp: 30.8,
    image: "/card.png",
  },
  {
    title: "Swim Trunks",
    description:
      "Quick-dry swim trunks for men. Perfect for swimming and beach outings.",
    price: 30,
    mrp: 42.0,
    image: "/card.png",
  },
  {
    title: "Wallet",
    description:
      "Sleek leather wallet for men. Multiple compartments for cards and cash.",
    price: 35,
    mrp: 49.0,
    image: "/card.png",
  },
  {
    title: "Cufflinks",
    description:
      "Elegant cufflinks for formal attire. Adds a touch of sophistication to your outfit.",
    price: 20,
    mrp: 28.0,
    image: "/card.png",
  },
  {
    title: "Tie",
    description:
      "Classic necktie for formal occasions. Available in a variety of colors and patterns.",
    price: 25,
    mrp: 35.0,
    image: "/card.png",
  },
  {
    title: "Duffel Bag",
    description:
      "Spacious duffel bag for travel. Lightweight and easy to carry on the go.",
    price: 55,
    mrp: 77.0,
    image: "/card.png",
  },
  {
    title: "Men's Cologne",
    description:
      "Long-lasting fragrance for men. A perfect blend of freshness and masculinity.",
    price: 50,
    mrp: 70.0,
    image: "/card.png",
  },
  {
    title: "Baseball Cap",
    description:
      "Trendy baseball cap for men. Protects from the sun and adds a sporty look.",
    price: 18,
    mrp: 25.2,
    image: "/card.png",
  },
];

export default function Hero() {
  const [currentColor, setCurrentColor] = useState(colors[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor((prevColor) => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="animate-fade-in delay-50 flex flex-col items-center justify-center m-auto pt-32 w-full">
      <section className="flex flex-col items-center justify-center text-center gap-10 w-full">
        <h1 className="text-7xl sm:text-9xl md:text-[12rem] font-medium bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-fuchsia-500 h-full pb-5">
          Shop the latest <br />
          <span
            className={`font-semibold transition-colors duration-1000 ${currentColor}`}
          >
            <Typewriter
              words={[
                "Trends",
                "Deals",
                "Fashion",
                "Electronics",
                "Accessories",
                "Essentials",
                "Luxury",
                "Gadgets",
                "Home Goods",
                "Beauty",
              ]}
              loop={Infinity}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={3000}
            />
          </span>
        </h1>
        <div className="flex flex-col items-center gap-5 mt-5">
          <Link href="/#products">
            <Button className="flex items-center gap-2 text-xl bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 hover:from-sky-600 hover:via-purple-600 hover:to-pink-600 text-white px-14 py-7 border-2 border-sky-400 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              Start Shopping
            </Button>
          </Link>
          <MdKeyboardDoubleArrowDown className="text-7xl animate-bounce text-sky-500 dark:text-sky-400" />
        </div>
        <div className="overflow-hidden w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-full flex flex-col antialiased items-center justify-center relative overflow-hidden"
          >
            <InfiniteMovingCards
              items={products} // Use updated product array
              direction="right"
              speed="slow"
            />
            <InfiniteMovingCards
              items={products} // Use updated product array
              direction="left"
              speed="slow"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
