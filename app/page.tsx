import React from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="p-20">
        <Hero />
      </div>
    </>
  );
};

export default page;
