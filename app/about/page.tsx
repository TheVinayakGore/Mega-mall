"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Stats } from "@/components/Stats";
import Link from "next/link";
import { TeamMembers } from "@/components/TeamMembers";

const About = () => {
  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center m-auto gap-60 p-28 pt-36 w-full h-full"
      >
        <Card className="flex flex-col md:flex-row items-start justify-start gap-10 bg-transparent shadow-none border-none w-full h-full">
          {/* Left Section: Video */}
          <div className="w-full h-full">
            <video
              src="/about.mp4"
              className="rounded-lg shadow-md w-full h-full"
              autoPlay
              muted
              loop
            />
          </div>

          {/* Right Section: Text */}
          <CardContent className="flex flex-col items-start justify-between gap-3 p-0 w-full h-full">
            <CardHeader className="p-0 -mt-4">
              <CardTitle className="text-9xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-fuchsia-500 h-full">
                Hello folks !
              </CardTitle>
            </CardHeader>
            <div className="space-y-4 text-lg">
              <p>
                We are committed to providing you with the best online shopping
                experience. With a wide selection of top-quality products,
                unbeatable prices, and a customer-first approach, we aim to be
                your one-stop destination for all your shopping needs.
              </p>
              <p>
                Thank you for choosing{" "}
                <span className="font-semibold text-sky-500 dark:text-sky-400">
                  Menzy Cart !
                </span>{" "}
                We are excited to serve you and make your shopping journey
                memorable.
              </p>
            </div>
            <Button
              className="mt-6 bg-sky-400 hover:bg-sky-500 text-white px-8 py-6 text-lg"
              asChild
            >
              <Link href="/about" target="_blank">
                Learn More
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full"
        >
          <Stats />
        </motion.div>

        {/* Team Member Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full"
        >
          <TeamMembers />
        </motion.div>
      </motion.main>
    </>
  );
};

export default About;
