"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    title: string;
    category: string;
    brand: string;
    tag: string;
    slug: string;
    description: string;
    price: number;
    mrp: number;
    image: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "200s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn("scroller relative z-20 overflow-hidden w-full", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-20 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <motion.li
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="relative w-[350px] max-w-full flex-shrink-0 md:w-[25rem] h-[40rem]"
          >
            <Link
              href={`/product/${item.slug}`}
              target="_blank"
              rel="noopener"
              className="flex flex-col items-start justify-between relative rounded-xl border-2 hover:border-sky-500 bg-white dark:bg-zinc-800 shadow-xl hover:shadow-sky-200 dark:hover:shadow-sky-800 w-full h-full"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={500}
                className="w-full h-auto border-b rounded-t-[0.6rem]"
              />
              {item.tag && (
                <div
                  className={`absolute top-0 left-0 uppercase ${
                    item.tag === "Best Seller" ? "bg-sky-500" : "bg-teal-500"
                  } text-sm text-white p-2 px-5 rounded-tl-[0.6rem] rounded-br-xl`}
                >
                  {item.tag}
                </div>
              )}
              <div className="flex flex-col items-start justify-between text-start p-5 pt-3 w-full h-full">
                <div className="flex flex-col items-start justify-start gap-1 w-full">
                  <div className="flex items-center justify-start gap-2 text-base font-normal uppercase w-full">
                    <p className="text-sky-500 font-medium">{item.category}</p>
                    <span className="mb-1 opacity-50">|</span>
                    <p className="uppercase opacity-60">{item.brand}</p>
                  </div>
                  <h1 className="text-3xl title-font font-semibold leading-none">
                    {item.title.length > 17
                      ? item.title.slice(0, 17) + "..."
                      : item.title}
                  </h1>
                </div>
                <p className="text-base opacity-60 mt-3">
                  {item.description.length > 100
                    ? item.description.slice(0, 100) + "..."
                    : item.description}
                </p>
                <div className="flex items-center justify-start gap-3 mt-6 w-full">
                  <div className="flex items-center justify-start gap-1 text-sky-500 text-2xl">
                    <span className="text-4xl">₹</span>{" "}
                    <span className="font-bold">{item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-lg opacity-60 font-light line-through">
                    ₹{item.mrp.toFixed(2)}
                  </p>
                  <p className="text-xl font-semibold text-green-600">
                    {((1 - item.price / item.mrp) * 100).toFixed(0)}% OFF
                  </p>
                </div>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};
