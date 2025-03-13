"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Product } from "./ProductType";

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
        <DialogContent className="max-w-7xl w-full p-10 mt-10 gap-10 shadow-2xl rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 h-[45rem] overflow-auto">
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
                  <DialogDescription className="opacity-80 text-lg text-gray-700 dark:text-gray-300">
                    Get detailed insights about this product.
                  </DialogDescription>
                </motion.div>
              </DialogHeader>

              {/* Left Section: Product Info */}
              <div className="space-y-5">
                {/* Description */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                >
                  <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                    Description
                  </p>
                  <p className="text-sm opacity-80 text-gray-700 dark:text-gray-300">
                    {selectedProduct.description}
                  </p>
                </motion.div>

                {/* Price and Stock */}
                <div className="flex justify-between gap-5">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex-1"
                  >
                    <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                      Price
                    </p>
                    <div className="flex items-center justify-start gap-1 text-green-500 text-2xl">
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
                      Stock
                    </p>
                    <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
                      {selectedProduct.stock}
                    </p>
                  </motion.div>
                </div>

                {/* Colors */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                >
                  <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                    Colors
                  </p>
                  <div className="flex gap-3 items-center">
                    {selectedProduct.colors.map((color, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-2"
                      >
                        <div
                          className="rounded-full w-6 h-6 border border-white shadow-md"
                          style={{ backgroundColor: `#${color}` }}
                        ></div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          #{color}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Sizes */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                >
                  <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                    Sizes
                  </p>
                  <div className="flex gap-3 text-base font-medium">
                    {selectedProduct.sizes.map((size, index) => (
                      <motion.span
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center justify-center rounded-lg shadow-lg text-white hover:text-sky-500 border border-sky-500 bg-sky-500 hover:bg-transparent transition-all duration-300 w-14 h-14"
                      >
                        {size}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Section: Images */}
              <div className="space-y-5">
                {/* Main Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                >
                  <p className="text-xl uppercase text-sky-500 font-semibold mb-5">
                    Image
                  </p>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.title || "Product Image"}
                      width={2000}
                      height={2000}
                      className="w-full h-full rounded-lg border shadow-xl"
                    />
                  </motion.div>
                </motion.div>

                {/* Gallery */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-lg bg-gray-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 w-full"
                >
                  <p className="p-6 pb-0 text-xl uppercase text-sky-500 font-semibold">
                    Gallery
                  </p>
                  <div className="flex items-start gap-7 w-full h-60 p-6 overflow-x-auto">
                    {selectedProduct.gallery.map((url, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        className="flex-shrink-0 rounded-md border shadow-md w-auto h-full"
                      >
                        <Image
                          src={url}
                          alt={`Gallery ${index + 1}`}
                          width={500}
                          height={500}
                          className="w-auto h-full rounded-md"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDialog;
