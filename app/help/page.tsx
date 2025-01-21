import React from "react";
import Image from "next/image";
import Link from "next/link";

const Help = () => {
  return (
    <>
      <nav className="fixed top-0 flex items-center justify-between py-3 px-4 md:px-10 bg-white/[0.8] dark:bg-zinc-950/[0.8] backdrop-blur-sm shadow-lg z-50 w-full">
        <Link
          href="/"
          className="flex items-center font-bold whitespace-nowrap"
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={25}
            height={25}
            className="w-auto"
          />
          <span className="ml-3 text-xl md:text-2xl font-bold">
            Mega <span className="text-sky-400 italic">mall</span>
          </span>
        </Link>
      </nav>
      <main className="container mx-auto py-20 max-w-6xl">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
          Help Center
        </h1>
        <div className="space-y-8">
          {/* Section 1: Account Management */}
          <section>
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
              Getting Started
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Welcome to{" "}
              <span className="font-semibold text-sky-500">Mega Mall</span>!
              Here is how to make the most of your shopping experience:
            </p>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
              <li>
                Create an account to save your preferences and track your
                orders.
              </li>
              <li>
                Log in to access your personalized dashboard, wishlist, and
                order history.
              </li>
              <li>
                Use the search bar to find products quickly by name, category,
                or brand.
              </li>
            </ul>
          </section>

          {/* Section 2: Shopping Guide */}
          <section>
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
              Shopping Guide
            </h2>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
              <li>
                Browse through our categories to explore a wide range of
                products. Use filters (price, brand, ratings) to refine your
                search.
              </li>
              <li>
                Click on a product to view detailed information, including
                specifications, reviews, and images.
              </li>
              <li>
                Add items to your cart by clicking the {"Add to Cart"} button.
                You can review your cart at any time by clicking the cart icon
                at the top-right corner of the page.
              </li>
            </ul>
          </section>

          {/* Section 3: Checkout Process */}
          <section>
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
              Secure Checkout
            </h2>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
              <li>
                Review your cart to ensure all selected items are correct.
              </li>
              <li>
                Proceed to checkout and enter your shipping and payment details
                securely.
              </li>
              <li>
                Confirm your order and receive an email confirmation with order
                details.
              </li>
            </ul>
          </section>

          {/* Section 4: Order Tracking */}
          <section>
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
              Tracking Your Order
            </h2>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
              <li>
                After placing your order, you can track its status in the{" "}
                {"My Orders"} section of your account.
              </li>
              <li>
                You will receive updates via email about your order{"'"}s
                progress and delivery.
              </li>
            </ul>
          </section>

          {/* Section 5: Customer Support */}
          <section>
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
              Need Assistance?
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have any questions or face any issues, our support team is
              here to help:
            </p>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
              <li>
                Visit our{" "}
                <a href="/contact" className="text-sky-500 hover:underline">
                  Contact Us
                </a>{" "}
                page to submit your query.
              </li>
              <li>
                Chat with us using the live chat feature available during
                business hours.
              </li>
              <li>
                Email us at{" "}
                <span className="font-semibold">support@megamall.com</span>.
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};

export default Help;
