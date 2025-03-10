"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  description: string;
  slug?: string; // Optional slug for the product link
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
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
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
            {description.length > 100
              ? description.slice(0, 100) + "..."
              : description}
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-sky-500 dark:text-sky-400">
              ${price}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
