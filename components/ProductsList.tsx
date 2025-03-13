"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ProductCard from "./ProductCard"; // Import the ProductCard component

interface Product {
  _id: string;
  title: string;
  category: string;
  brand: string;
  tag: string;
  slug: {
    current: string;
  };
  description: string;
  price: number;
  mrp: number;
  image: {
    asset: {
      _id: string;
      url: string;
    };
  };
  color: string[];
}

const ProductsList = () => {
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
    <>
      <main id="products" className="flex flex-col items-start my-8 w-full">
        <h2 className="font-semibold text-center mb-10 text-2xl sm:text-3xl lg:text-4xl">
          ✦ Latest Products
        </h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              image={urlFor(product.image).url()}
              name={product.title}
              category={product.category}
              brand={product.brand}
              tag={product.tag}
              price={product.price}
              mrp={product.mrp}
              description={product.description}
              slug={product.slug.current}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default ProductsList;
