"use client";
import React, { useEffect, useState } from "react";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: {
    asset: {
      _id: string;
      url: string;
    };
  };
}

export default function Hero() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await client.fetch<Product[]>(
        `*[_type == "product"]`
      );
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  return (
    <main className="animate-fade-in delay-500">

      <div className="flex flex-col items-center justify-center">
        <div className="py-6 text-center">
          <h1 className="font-bold text-xl sm:text-4xl md:text-6xl lg:text-8xl">
            Welcome to Mega <span className="text-sky-400 italic">mall</span>
          </h1>
          <p className="mt-2 text-xs sm:text-lg md:text-2xl lg:text-4xl">
            Shop the latest trends and deals!
          </p>
        </div>
        <div className="mt-8">
          <Button className="bg-sky-400 text-white px-4 py-2 transition hover:scale-105 rounded-lg hover:bg-sky-500">
            Start Shopping
          </Button>
        </div>
      </div>

      <section className="flex flex-col items-start my-8 px-4 sm:px-6 lg:px-8">
        <h2 className="font-semibold text-center mb-10 text-2xl sm:text-3xl lg:text-4xl">
          ✨ Featured Products
        </h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product, index) => (
            <div key={product._id} className="flex justify-center">
              <Card
                className={`p-5 shadow-lg hover:shadow-xl transition hover:scale-105 delay-300 ease-in-out w-full max-w-sm animate-slide-up delay-${index * 100}`}
              >
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.title}
                  width={500}
                  height={500}
                  priority
                  className="rounded-xl w-full h-auto object-cover"
                />
                <p className="mt-5 text-2xl font-bold text-center">
                  {product.title}
                </p>
                <p className="flex flex-col items-center text-green-500 text-2xl text-center">${product.price} <span className="line-through text-base text-zinc-500 opacity-50 italic">$599</span> <span className="text-sm italic">25% off</span></p>
                <Button
                  color="primary"
                  className="mt-4 transition hover:scale-105 w-full"
                >
                  View Product
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }

        .animate-slide-up {
          animation: slideUp 0.5s ease-in-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}
