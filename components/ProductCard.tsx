"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  mrp: number;
  description: string;
  slug?: string; // Optional slug for the product link
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  mrp,
  description,
  slug,
}) => {
  return (
    <>
      <Link
        href={`/product/${slug}`}
        target="_blank"
        rel="noopener"
        className="group relative bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full"
      >
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className="w-full h-auto object-cover transition-transform group-hover:scale-105"
        />
        <div className="p-4">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
            {name}
          </h3>
          <p className="text-base text-zinc-600 dark:text-zinc-400 mt-3">
            {description.length > 100
              ? description.slice(0, 100) + "..."
              : description}
          </p>
          <div className="flex items-center justify-start gap-3 mt-6 w-full">
            <p className="text-2xl font-bold text-sky-500 dark:text-sky-400">
              ${price.toFixed(2)}
            </p>
            <p className="text-lg opacity-60 font-light line-through">
              ${mrp.toFixed(2)}
            </p>
            <p className="text-xl font-semibold text-green-600">
              {((1 - price / mrp) * 100).toFixed(0)}% OFF
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
