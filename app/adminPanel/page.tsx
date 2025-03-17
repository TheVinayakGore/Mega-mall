"use client";
import React, { useEffect, useState } from "react";
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
import { GoPlus } from "react-icons/go";
import { HiMiniMinusSmall } from "react-icons/hi2";
import toast from "react-hot-toast";
import ProductTable from "./ProductTable";
import ProductDialog from "./ProductDialog";
import { Product } from "./ProductType";

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

        <ProductDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      </main>
    </>
  );
};

export default Page;
