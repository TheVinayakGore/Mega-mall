import React from "react";

const About = () => {
  return (
    <main className="flex items-center justify-center py-20 text-zinc-500 dark:text-zinc-600 w-full">
      <div className="flex items-center gap-10 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-lg rounded-xl p-7 transition hover:scale-105 duration-300 ease-in-out w-full">
        {/* Left Section: Image */}
        <div className="flex items-center justify-center w-full">
          <video
            src="/about.mp4"
            className="rounded-lg shadow-md w-full"
            autoPlay
            muted
            loop
          />
        </div>

        {/* Right Section: Text */}
        <div className="flex flex-col justify-center w-1/2">
          <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">
            Hello folks!
          </h2>
          <p className="">
            We are committed to providing you with the best online shopping
            experience. With a wide selection of top-quality products,
            unbeatable prices, and a customer-first approach, we aim to be your
            one-stop destination for all your shopping needs.
          </p>
          <p className="my-6">
            From the latest fashion trends to cutting-edge gadgets and
            everything in between, we have got it all. Our team works tirelessly
            to ensure that you have access to a curated selection of products,
            seamless navigation, and secure transactions. We also offer frequent
            deals and discounts to ensure that you get the best value for your
            money.
          </p>
          <p className="">
            Thank you for choosing{" "}
            <span className="font-semibold text-zinc-600 dark:text-zinc-500">
              Mega Mall !
            </span>{" "}
            We are excited to serve you and make your shopping journey
            memorable.
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;
