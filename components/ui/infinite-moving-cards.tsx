"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef, useCallback } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    title: string;
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
          "flex min-w-full shrink-0 gap-8 py-10 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[350px] max-w-full flex-shrink-0 md:w-[25rem] h-[26rem]"
          >
            <Link
              href="/"
              target="_blank"
              rel="noopener"
              className="flex flex-col items-start justify-between relative rounded-xl border hover:border-sky-500 bg-white dark:bg-zinc-800 shadow-xl w-full h-full"
            >
              <div className="flex flex-col items-start gap-2 w-full h-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover rounded-t-xl"
                />
                <div className="flex flex-col items-start justify-start text-start gap-2 p-4 w-full">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-base opacity-50">
                    {item.description.slice(0, 110)}...
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-start gap-3 p-4 w-full">
                <p className="text-2xl font-bold text-sky-500 dark:text-sky-400">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-lg opacity-60 font-light line-through">
                  ${item.mrp.toFixed(2)}
                </p>
                <p className="text-xl font-semibold text-green-600">
                  {((1 - item.price / item.mrp) * 100).toFixed(0)}% OFF
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
