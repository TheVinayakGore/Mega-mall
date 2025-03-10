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
    <main className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          className="bg-white dark:bg-zinc-900 p-8 border dark:border-zinc-700 rounded-xl shadow-lg text-center"
        >
          <div className="flex flex-col items-center m-auto gap-5 font-bold text-sky-500 dark:text-sky-400">
            <span className="text-7xl">{stat.emoji}</span>
            <AnimatedCounter
              target={stat.target} // Animate to the target value
              prefix={stat.prefix} // Add prefix (e.g., "+")
              suffix={stat.suffix} // Add suffix (e.g., "%")
              duration={2000} // Animation duration (2 seconds)
            />
          </div>
          <h3 className="text-2xl font-semibold text-black dark:text-white mt-4">
            {stat.label}
          </h3>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
            {stat.description}
          </p>
        </motion.div>
      ))}
    </main>
  );
};
