"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { GoPlus } from "react-icons/go";
import { HiMiniMinusSmall } from "react-icons/hi2";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ProductTable from "./ProductTable";

// Updated Product type
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  tag: string;
  image: string;
  gallery: string[];
  stock: number;
  slug: string;
  rating: number;
  reviews: string[];
  colors: string[];
  sizes: string[];
};

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    title: "",
    description: "",
    price: 0,
    tag: "",
    image: "",
    gallery: [],
    stock: 0,
    slug: "",
    rating: 0,
    reviews: [],
    colors: [],
    sizes: [],
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCardContentVisible, setIsCardContentVisible] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Save products to localStorage whenever products state changes
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
      console.log("Saved products:", products);
    }
  }, [products]);

  // Load products from localStorage when the component mounts
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        if (Array.isArray(parsedProducts)) {
          setProducts(parsedProducts);
          console.log("Loaded products:", parsedProducts); // Debugging
        } else {
          console.error("Parsed data is not an array:", parsedProducts);
        }
      } catch (error) {
        console.error("Error parsing products:", error);
        toast.error("Error parsing products from localStorage");
      }
    }
  }, []);

  // Log the current products state for debugging
  useEffect(() => {
    console.log("Current products state:", products);
  }, [products]);

  // Create a new product
  const handleCreateProduct = () => {
    const productWithId = { ...newProduct, id: Date.now() }; // Use a unique ID
    console.log("Adding product:", productWithId); // Debugging
    setProducts([...products, productWithId]);
    setNewProduct({
      id: 0,
      title: "",
      description: "",
      price: 0,
      tag: "",
      image: "",
      gallery: [],
      stock: 0,
      slug: "",
      rating: 0,
      reviews: [],
      colors: [],
      sizes: [],
    });
  };

  // Update a product
  const handleUpdateProduct = () => {
    if (editingProduct) {
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      );
      setEditingProduct(null);
    }
  };

  // Delete a product
  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Handle array inputs (gallery, colors, sizes, reviews)
  const handleArrayInputChange = (
    field: "gallery" | "reviews" | "colors" | "sizes", // Narrow the type of field
    value: string,
    index?: number
  ) => {
    if (editingProduct) {
      const updatedArray = [...editingProduct[field]];
      if (index !== undefined) {
        updatedArray[index] = value;
      } else {
        updatedArray.push(value);
      }
      setEditingProduct({ ...editingProduct, [field]: updatedArray });
    } else {
      const updatedArray = [...newProduct[field]];
      if (index !== undefined) {
        updatedArray[index] = value;
      } else {
        updatedArray.push(value);
      }
      setNewProduct({ ...newProduct, [field]: updatedArray });
    }
  };

  // Toggle function to show/hide CardContent
  const toggleCardContent = () => {
    setIsCardContentVisible((prev) => !prev);
  };

  // Open dialog with product details
  const openProductDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  return (
    <>
      <main className="relative p-28">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-8"
        >
          Admin Panel
        </motion.h1>

        {/* Create/Edit Product Form */}
        <Card className="mb-20 shadow-xl">
          <CardHeader className="flex flex-row items-start justify-between w-full">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-xl leading-none">
                {editingProduct ? "Edit Product" : "Create New Product"}
              </CardTitle>
              <CardDescription>
                {editingProduct
                  ? "Update the product details"
                  : "Add a new product to your store"}
              </CardDescription>
            </div>
            <button onClick={toggleCardContent}>
              {isCardContentVisible ? (
                <GoPlus className="border p-2 rounded-full w-10 h-10" />
              ) : (
                <HiMiniMinusSmall className="border p-2 rounded-full w-10 h-10" />
              )}
            </button>
          </CardHeader>
          {!isCardContentVisible && (
            <section className="pt-10 border-t">
              <CardContent>
                <section className="flex flex-col items-start gap-6 w-full">
                  <ul className="flex items-start gap-10 w-full">
                    <li className="flex flex-col gap-3 w-full">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        placeholder="Title"
                        value={
                          editingProduct
                            ? editingProduct.title
                            : newProduct.title
                        }
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({
                                ...editingProduct,
                                title: e.target.value,
                              })
                            : setNewProduct({
                                ...newProduct,
                                title: e.target.value,
                              })
                        }
                      />
                    </li>
                    <li className="flex flex-col gap-3 w-full">
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        placeholder="Slug"
                        value={
                          editingProduct ? editingProduct.slug : newProduct.slug
                        }
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({
                                ...editingProduct,
                                slug: e.target.value,
                              })
                            : setNewProduct({
                                ...newProduct,
                                slug: e.target.value,
                              })
                        }
                      />
                    </li>
                    <li className="flex flex-col gap-3 w-full">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        type="number"
                        placeholder="Price"
                        value={
                          editingProduct
                            ? editingProduct.price
                            : newProduct.price
                        }
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({
                                ...editingProduct,
                                price: parseFloat(e.target.value),
                              })
                            : setNewProduct({
                                ...newProduct,
                                price: parseFloat(e.target.value),
                              })
                        }
                      />
                    </li>
                  </ul>
                  <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter product description..."
                      rows={5}
                      value={
                        editingProduct
                          ? editingProduct.description
                          : newProduct.description
                      }
                      onChange={(e) =>
                        editingProduct
                          ? setEditingProduct({
                              ...editingProduct,
                              description: e.target.value,
                            })
                          : setNewProduct({
                              ...newProduct,
                              description: e.target.value,
                            })
                      }
                    />
                  </div>
                  <ul className="flex items-start gap-10 w-full">
                    <li className="flex flex-col gap-3 w-full">
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input
                        placeholder="Image URL"
                        value={
                          editingProduct
                            ? editingProduct.image
                            : newProduct.image
                        }
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({
                                ...editingProduct,
                                image: e.target.value,
                              })
                            : setNewProduct({
                                ...newProduct,
                                image: e.target.value,
                              })
                        }
                      />
                    </li>
                    <li className="flex flex-col gap-3 w-full">
                      <Label htmlFor="gallery">Gallery (Image URLs)</Label>
                      {(editingProduct
                        ? editingProduct.gallery
                        : newProduct.gallery
                      ).map((url, index) => (
                        <Input
                          key={index}
                          placeholder={`Gallery Image URL ${index + 1}`}
                          value={url}
                          onChange={(e) =>
                            handleArrayInputChange(
                              "gallery",
                              e.target.value,
                              index
                            )
                          }
                        />
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => handleArrayInputChange("gallery", "")}
                      >
                        Add Gallery Image
                      </Button>
                    </li>
                    <li className="flex flex-col gap-3 w-full">
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        type="number"
                        placeholder="Stock"
                        value={
                          editingProduct
                            ? editingProduct.stock
                            : newProduct.stock
                        }
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({
                                ...editingProduct,
                                stock: parseInt(e.target.value),
                              })
                            : setNewProduct({
                                ...newProduct,
                                stock: parseInt(e.target.value),
                              })
                        }
                      />
                    </li>
                  </ul>
                  <ul className="flex items-start gap-10 w-full">
                    <li className="flex flex-col gap-3 w-full">
                      <Label htmlFor="tag">Tag</Label>
                      <Input
                        placeholder="Tag"
                        value={
                          editingProduct ? editingProduct.tag : newProduct.tag
                        }
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({
                                ...editingProduct,
                                tag: e.target.value,
                              })
                            : setNewProduct({
                                ...newProduct,
                                tag: e.target.value,
                              })
                        }
                      />
                    </li>
                    <li className="flex flex-col gap-3 w-full">
                      <Label htmlFor="colors">Colors</Label>
                      {(editingProduct
                        ? editingProduct.colors
                        : newProduct.colors
                      ).map((color, index) => (
                        <Input
                          key={index}
                          placeholder={`Color ${index + 1}`}
                          value={color}
                          onChange={(e) =>
                            handleArrayInputChange(
                              "colors",
                              e.target.value,
                              index
                            )
                          }
                        />
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => handleArrayInputChange("colors", "")}
                      >
                        Add Color
                      </Button>
                    </li>
                    <li className="flex flex-col gap-3 w-full">
                      <Label htmlFor="sizes">Sizes</Label>
                      {(editingProduct
                        ? editingProduct.sizes
                        : newProduct.sizes
                      ).map((size, index) => (
                        <Input
                          key={index}
                          placeholder={`Size ${index + 1}`}
                          value={size}
                          onChange={(e) =>
                            handleArrayInputChange(
                              "sizes",
                              e.target.value,
                              index
                            )
                          }
                        />
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => handleArrayInputChange("sizes", "")}
                      >
                        Add Size
                      </Button>
                    </li>
                  </ul>
                </section>
              </CardContent>
              <CardFooter>
                {editingProduct ? (
                  <Button
                    onClick={handleUpdateProduct}
                    className="p-6 text-lg font-medium w-full"
                  >
                    Update Current Product
                  </Button>
                ) : (
                  <Button
                    onClick={handleCreateProduct}
                    className="p-6 text-lg font-medium bg-sky-400 hover:bg-sky-500 text-white w-full"
                  >
                    Create New Product
                  </Button>
                )}
              </CardFooter>
            </section>
          )}
        </Card>

        <ProductTable
          products={products}
          setEditingProduct={setEditingProduct}
          handleDeleteProduct={handleDeleteProduct}
          openProductDialog={openProductDialog}
          setIsCardContentVisible={setIsCardContentVisible}
        />

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
                      {selectedProduct?.title}
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
      </main>
    </>
  );
};

export default Page;
