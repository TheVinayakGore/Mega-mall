import React from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductsList from "@/components/ProductsList";
import { TeamMembers } from "@/components/TeamMembers";
import Testimonials from "@/components/Testimonials";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="flex flex-col items-center gap-20 p-20 m-auto w-full h-full">
        <ProductsList />
        <TeamMembers />
        <Testimonials />
      </main>
    </>
  );
};

export default page;
