"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Typewriter } from "react-simple-typewriter";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  title: string;
  category: string;
  brand: string;
  tag: string;
  slug: {
    current: string;
  };
  description: string;
  price: number;
  mrp: number;
  image: {
    asset: {
      _id: string;
      url: string;
    };
  };
}

const colors = [
  "text-amber-400",
  "text-sky-400",
  "text-fuchsia-400",
  "text-green-400",
  "text-purple-400",
  "text-red-400",
  "text-yellow-400",
];

export default function Hero() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentColor, setCurrentColor] = useState(colors[0]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await client.fetch<Product[]>(
        `*[_type == "product"]`
      );
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

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

  // Filter to get one product per category
  const getUniqueCategoryProducts = (products: Product[]) => {
    const categoryMap = new Map<string, Product>();
    products.forEach((product) => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, product);
      }
    });
    return Array.from(categoryMap.values());
  };

  // Transform the products array to match the expected type for InfiniteMovingCards
  const transformedProducts = getUniqueCategoryProducts(products).map(
    (product) => ({
      title: product.title,
      brand: product.brand,
      category: product.category,
      tag: product.tag,
      slug: product.slug.current,
      description: product.description,
      price: product.price,
      mrp: product.mrp,
      image: urlFor(product.image).url(),
    })
  );

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
              items={transformedProducts} // Pass the transformed array
              direction="right"
              speed="slow"
            />
            <InfiniteMovingCards
              items={transformedProducts} // Pass the transformed array
              direction="left"
              speed="slow"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
