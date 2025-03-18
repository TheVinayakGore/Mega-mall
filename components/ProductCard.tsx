"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  image: string;
  name: string;
  category: string;
  brand: string;
  tag: string;
  price: number;
  mrp: number;
  description: string;
  slug: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  brand,
  tag,
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
        className="group relative bg-white dark:bg-zinc-800 border-2 hover:border-sky-400 rounded-lg overflow-hidden shadow-xl hover:shadow-sky-200 dark:hover:shadow-sky-800 transition-shadow h-full"
      >
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className="w-full h-auto border-b object-cover transition-transform group-hover:scale-105"
        />
        {tag && (
          <div
            className={`absolute top-0 left-0 uppercase ${
              tag === "Best Seller" ? "bg-sky-500" : "bg-teal-500"
            } text-sm text-white p-2 px-5 rounded-tl-md rounded-br-xl`}
          >
            {tag}
          </div>
        )}
        <div className="p-4">
          <span className="text-sm uppercase opacity-50">{brand}</span>
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="text-base opacity-60 mt-3">
            {description.length > 100
              ? description.slice(0, 100) + "..."
              : description}
          </p>
          <div className="flex items-center justify-start gap-3 mt-6 w-full">
            <div className="flex items-center justify-start gap-1 text-sky-500 text-2xl">
              <span className="text-4xl">₹</span>{" "}
              <span className="font-bold">{price.toFixed(2)}</span>
            </div>
            <p className="text-lg opacity-60 font-light line-through">
              ₹{mrp?.toFixed(2)}
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
