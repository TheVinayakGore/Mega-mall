"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    image: "/mem1.jpeg",
  },
  {
    name: "Jane Smith",
    role: "Head of Operations",
    image: "/mem2.jpeg",
  },
  {
    name: "Alice Johnson",
    role: "Marketing Director",
    image: "/mem3.jpeg",
  },
  {
    name: "Michael Brown",
    role: "Lead Developer",
    image: "/mem4.jpeg",
  },
  {
    name: "Emily Davis",
    role: "Product Manager",
    image: "/mem5.jpeg",
  },
  {
    name: "David Wilson",
    role: "UX Designer",
    image: "/mem6.jpeg",
  },
];

export const TeamMembers = () => {
  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center justify-between m-auto w-full h-full"
      >
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center m-auto gap-20 py-20 w-full h-full"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.2, rotate: -360 }}
              className="relative flex flex-col items-center text-center w-full h-48"
            >
              <motion.div
                className="w-40 h-40 group rounded-full overflow-hidden border border-sky-400 shadow-lg relative"
                whileHover={{
                  rotate: 360,
                  scale: 1.2,
                  boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={500}
                  height={500}
                  className="w-full h-full"
                />
              </motion.div>
              <motion.div
                initial={{ scale: 0.6, y: 10 }}
                whileHover={{ scale: 1.1, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute bottom-0 bg-white dark:bg-zinc-900 border border-sky-500 p-3 rounded-xl shadow-lg text-center group-hover:-translate-y-10 w-44"
              >
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  {member.role}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.section>
        <h1 className="text-9xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-green-500 w-full">
          Meet Our <br /> Team
        </h1>
      </motion.main>
    </>
  );
};
