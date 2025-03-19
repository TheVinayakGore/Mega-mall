"use client";
import React from "react";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Product } from "./ProductType";
import { FaRegStar, FaStar } from "react-icons/fa6";

interface ProductDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (selectedProduct: Product | null) => void;
}

const ProductDialog: React.FC<ProductDialogProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedProduct,
}) => {
  return (
    <>
      {/* Dialog to show product details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-7xl w-full p-10 mt-10 gap-5 shadow-2xl rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 h-[45rem] overflow-auto">
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {/* Header Section */}
              <DialogHeader className="col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex flex-col items-start gap-1 w-full"
                >
                  {selectedProduct.tag && (
                    <span className="text-center text-xs bg-gradient-to-br from-blue-500 to-sky-400 text-white rounded p-2 leading-none px-3">
                      {selectedProduct.tag}
                    </span>
                  )}
                  <DialogTitle className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                    {selectedProduct.title}
                  </DialogTitle>
                  <DialogDescription className="opacity-80 text-lg">
                    Get detailed insights about this product.
                  </DialogDescription>
                </motion.div>
              </DialogHeader>

              {/* Left Section: Product Info */}
              <div className="space-y-5">
                {/* Rating and Review */}
                <div className="flex items-center gap-5 w-full">
                  {/* Brand */}
                  {selectedProduct.brand && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 w-full"
                    >
                      <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                        Brand
                      </p>
                      <p className="text-xl font-medium">
                        {selectedProduct.brand}
                      </p>
                    </motion.div>
                  )}

                  {/* Category */}
                  {selectedProduct.category && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 w-full"
                    >
                      <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                        Category
                      </p>
                      <p className="text-xl font-medium">
                        {selectedProduct.category}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Price and MRP */}
                <div className="flex justify-between gap-5">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex-1"
                  >
                    <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                      Price
                    </p>
                    <div className="flex items-center justify-start gap-1 text-green-500 text-3xl">
                      <span className="text-5xl">₹</span>{" "}
                      <span className="font-bold">
                        {selectedProduct.price.toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex-1"
                  >
                    <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                      MRP
                    </p>
                    <div className="flex items-center justify-start gap-1 text-2xl">
                      <span className="text-5xl">₹</span>{" "}
                      <span className="font-bold">
                        {selectedProduct.mrp.toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Stock */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                >
                  <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                    Stock
                  </p>
                  <p className="text-xl font-medium">{selectedProduct.stock}</p>
                </motion.div>

                {/* Rating and Review */}
                <div className="flex justify-between gap-5">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex-1"
                  >
                    <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                      Rating
                    </p>
                    <div className="flex items-center gap-1 text-2xl font-bold">
                      {[...Array(selectedProduct.rating)].map((_, index) => (
                        <FaStar key={index} className="text-yellow-400" />
                      ))}
                      {[...Array(5 - selectedProduct.rating)].map(
                        (_, index) => (
                          <FaRegStar key={index} className="text-yellow-400" />
                        )
                      )}
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex-1"
                  >
                    <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                      Reviews
                    </p>
                    <p className="text-xl font-medium">
                      {selectedProduct.review}
                    </p>
                  </motion.div>
                </div>

                {/* Colors */}
                {selectedProduct.color.length > 0 ? (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  >
                    <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                      Colors
                    </p>
                    <div className="flex gap-3 items-center overflow-auto">
                      {selectedProduct.color.map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-2"
                        >
                          <div
                            className="rounded-full w-6 h-6 border border-white shadow-md"
                            style={{ backgroundColor: `${item}` }}
                          ></div>
                          <span className="text-sm font-medium">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  >
                    <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                      Colors
                    </p>
                    <p className="text-sm opacity-80">No colors available.</p>
                  </motion.div>
                )}

                {/* Sizes */}
                {selectedProduct.size.length > 0 ? (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  >
                    <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                      Sizes
                    </p>
                    <div className="flex gap-3 text-base font-medium overflow-auto">
                      {selectedProduct.size.map((item, index) => (
                        <motion.span
                          key={index}
                          className="flex items-center justify-center rounded-lg shadow-lg text-white hover:text-sky-500 border border-sky-500 bg-sky-500 hover:bg-transparent transition-all duration-300 w-14 h-14"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  >
                    <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                      Sizes
                    </p>
                    <p className="text-sm opacity-80">No sizes available.</p>
                  </motion.div>
                )}
              </div>

              {/* Right Section: Images */}
              <div className="space-y-5">
                {/* Main Image */}
                {selectedProduct.image ? (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  >
                    <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                      Image
                    </p>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Image
                        src={selectedProduct.image} // Use urlFor to get the image URL
                        alt={selectedProduct.title || "Product Image"}
                        width={2000}
                        height={2000}
                        className="w-full h-full rounded-lg border shadow-xl"
                      />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  >
                    <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                      Image
                    </p>
                    <p className="text-sm opacity-80">No image available.</p>
                  </motion.div>
                )}

                {/* Gallery */}
                {selectedProduct.gallery.length > 0 ? (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 w-full"
                  >
                    <p className="p-6 pb-0 text-xl uppercase text-sky-500 font-semibold">
                      Gallery
                    </p>
                    <div className="flex items-start gap-5 w-full h-full p-6 overflow-auto">
                      {selectedProduct.gallery.map((image, index) => (
                        <Image
                          key={index}
                          src={urlFor(image).url()}
                          alt={`Gallery image ${index + 1}`}
                          width={200}
                          height={200}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 w-full"
                  >
                    <p className="p-6 pb-0 text-xl uppercase text-sky-500 font-semibold">
                      Gallery
                    </p>
                    <p className="p-6 text-sm opacity-80">
                      No gallery images available.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Description */}
          {selectedProduct && selectedProduct.description ? (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 w-full"
            >
              <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                Description
              </p>
              <p className="text-sm opacity-80">
                {selectedProduct.description}
              </p>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 w-full"
            >
              <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                Description
              </p>
              <p className="text-sm opacity-80">No description available.</p>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDialog;
