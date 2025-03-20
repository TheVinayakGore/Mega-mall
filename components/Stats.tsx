"use client";
import React from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter"; // Import your AnimatedCounter component

const stats = [
  {
    label: "Global Reach",
    target: 110,
    prefix: "+",
    emoji: "🌍", // Globe emoji
    description: "Serving customers in over 110 countries worldwide.",
  },
  {
    label: "Products in Stock",
    target: 25000,
    prefix: "+",
    emoji: "🛍️", // Shopping bag emoji
    description: "Explore our vast collection of 25,000+ products.",
  },
  {
    label: "Satisfaction Rate",
    target: 98,
    suffix: "%",
    emoji: "⭐", // Star emoji
    description: "98% of our customers love their shopping experience.",
  },
  {
    label: "Happy Customers",
    target: 150,
    prefix: "+",
    suffix: "K",
    emoji: "😊", // Smiling face emoji
    description: "Join 150,000+ happy customers who trust us.",
  },
  {
    label: "Safe Deliveries in a Day",
    target: 250,
    prefix: "+",
    suffix: "K",
    emoji: "📦", // Package emoji
    description: "250,000+ packages delivered safely within 24 hours.",
  },
  {
    label: "Years of Experience",
    target: 10,
    prefix: "+",
    emoji: "⏳", // Hourglass emoji
    description: "Over a decade of trusted service and expertise.",
  },
];

export const Stats = () => {
  return (
    <>
      <main className="flex items-center justify-center m-auto gap-20 w-full h-full">
        <h1 className="text-9xl font-semibold bg-clip-text text-transparent bg-gradient-to-tr from-sky-400 to-fuchsia-500 h-full">
          Why Choose <br /> Us ?
        </h1>
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-7 w-full h-full">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.4 }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-zinc-900 hover:bg-sky-200/50 dark:hover:bg-sky-950/50 hover:border-sky-500 p-6 border rounded-xl shadow-lg text-center"
            >
              <div className="flex flex-col items-center m-auto gap-5 font-bold text-sky-500 dark:text-sky-400">
                <span className="text-5xl">{stat.emoji}</span>
                <AnimatedCounter
                  target={stat.target} // Animate to the target value
                  prefix={stat.prefix} // Add prefix (e.g., "+")
                  suffix={stat.suffix} // Add suffix (e.g., "%")
                  duration={2000} // Animation duration (2 seconds)
                />
              </div>
              <h3 className="text-lg font-semibold mt-4">
                {stat.label}
              </h3>
              <p className="text-sm opacity-70 mt-2">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </section>
      </main>
    </>
  );
};
