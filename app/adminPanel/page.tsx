"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
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
import { Product } from "./ProductType"; // Ensure this is imported
import { SanityProduct } from "./ProductType"; // Import SanityProduct
import { nanoid } from "nanoid"; // or use any other unique ID generator

interface ProductWithSanityId extends Product {
  _sanityId: string;
}

const Page = () => {
  const [products, setProducts] = useState<ProductWithSanityId[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    title: "",
    description: "",
    price: 0,
    mrp: 0, // Added MRP
    tag: "",
    brand: "", // Added Brand
    category: "", // Added Category
    image: "",
    gallery: [],
    stock: 0,
    slug: "",
    rating: 0,
    review: 0,
    color: [],
    size: [],
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCardContentVisible, setIsCardContentVisible] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-") // Replace non-alphanumeric with dashes
      .replace(/^-+|-+$/g, "") // Remove leading/trailing dashes
      .replace(/-+/g, "-"); // Replace multiple dashes with single dash
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        title: title,
        slug: generateSlug(title), // Update slug here
      });
    } else {
      setNewProduct({
        ...newProduct,
        title: title,
        slug: generateSlug(title), // Update slug here
      });
    }
  };

  // Fetch products initially and set up a real-time listener
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const sanityProducts: SanityProduct[] = await client.fetch(
          `*[_type == "product"]`
        );
        const formattedProducts: ProductWithSanityId[] = sanityProducts.map(
          (p) => ({
            id: Date.now(),
            title: p.title || "",
            description: p.description || "",
            price: p.price || 0,
            mrp: p.mrp || 0,
            tag: p.tag || "",
            brand: p.brand || "",
            category: p.category || "",
            image: p.image?.asset?._ref ? urlFor(p.image.asset._ref).url() : "",
            gallery:
              p.gallery?.map((g) =>
                g?.asset?._ref ? urlFor(g.asset._ref).url() : ""
              ) || [],
            stock: p.stock || 0,
            slug: p.slug?.current || "",
            rating: p.rating || 0,
            review: p.review || 0,
            color: p.color || [],
            size: p.size || [],
            _sanityId: p._id,
          })
        );

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products from Sanity.");
      }
    };

    fetchProducts();

    // Set up a real-time listener for updates
    const subscription = client
      .listen('*[_type == "product"]')
      .subscribe((update) => {
        if (update.result) {
          const updatedProduct = update.result as SanityProduct;
          const formattedProduct: ProductWithSanityId = {
            id: Date.now(),
            title: updatedProduct.title || "",
            description: updatedProduct.description || "",
            price: updatedProduct.price || 0,
            mrp: updatedProduct.mrp || 0,
            tag: updatedProduct.tag || "",
            brand: updatedProduct.brand || "",
            category: updatedProduct.category || "",
            image: updatedProduct.image?.asset?._ref
              ? urlFor(updatedProduct.image.asset._ref).url()
              : "",
            gallery:
              updatedProduct.gallery?.map((g) =>
                g?.asset?._ref ? urlFor(g.asset._ref).url() : ""
              ) || [],
            stock: updatedProduct.stock || 0,
            slug: updatedProduct.slug?.current || "",
            rating: updatedProduct.rating || 0,
            review: updatedProduct.review || 0,
            color: updatedProduct.color || [],
            size: updatedProduct.size || [],
            _sanityId: updatedProduct._id,
          };

          if (
            update.transition === "appear" ||
            update.transition === "update"
          ) {
            setProducts((prevProducts) =>
              prevProducts.map((p) =>
                p._sanityId === formattedProduct._sanityId
                  ? formattedProduct
                  : p
              )
            );
          } else if (update.transition === "disappear") {
            setProducts((prevProducts) =>
              prevProducts.filter(
                (p) => p._sanityId !== formattedProduct._sanityId
              )
            );
          }
        }
      });

    // Clean up the listener when the component unmounts
    return () => subscription.unsubscribe();
  }, []);

  const uploadImageToSanity = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const asset = await client.assets.upload("image", blob);
      return asset._id;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
      return null;
    }
  };

  const handleCreateProduct = async () => {
    const productWithId = { ...newProduct, id: Date.now() };

    try {
      const sanityProduct = {
        _type: "product",
        title: productWithId.title,
        description: productWithId.description,
        price: productWithId.price,
        mrp: productWithId.mrp,
        tag: productWithId.tag,
        brand: productWithId.brand,
        category: productWithId.category,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: await uploadImageToSanity(productWithId.image),
          },
        },
        gallery: await Promise.all(
          productWithId.gallery.map(async (imageUrl) => ({
            _type: "image",
            asset: {
              _type: "reference",
              _ref: await uploadImageToSanity(imageUrl),
            },
            _key: nanoid(), // Add a unique _key for each gallery item
          }))
        ),
        stock: productWithId.stock,
        slug: {
          _type: "slug",
          current: productWithId.slug,
        },
        rating: productWithId.rating,
        review: productWithId.review,
        color: productWithId.color,
        size: productWithId.size,
      };

      const createdSanityProduct = await client.create(sanityProduct);

      setProducts([
        ...products,
        { ...productWithId, _sanityId: createdSanityProduct._id },
      ]);
      setNewProduct({
        id: 0,
        title: "",
        description: "",
        price: 0,
        mrp: 0,
        tag: "",
        brand: "",
        category: "",
        image: "",
        gallery: [],
        stock: 0,
        slug: "",
        rating: 0,
        review: 0,
        color: [],
        size: [],
      });
      toast.success("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product.");
    }
  };

  const handleUpdateProduct = async () => {
    if (editingProduct) {
      try {
        const sanityProduct = {
          _type: "product",
          title: editingProduct.title,
          description: editingProduct.description,
          price: editingProduct.price,
          mrp: editingProduct.mrp,
          tag: editingProduct.tag,
          brand: editingProduct.brand,
          category: editingProduct.category,
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: await uploadImageToSanity(editingProduct.image),
            },
          },
          gallery: await Promise.all(
            editingProduct.gallery.map(async (imageUrl) => ({
              _type: "image",
              asset: {
                _type: "reference",
                _ref: await uploadImageToSanity(imageUrl),
              },
              _key: nanoid(), // Add a unique _key for each gallery item
            }))
          ),
          stock: editingProduct.stock,
          slug: {
            _type: "slug",
            current: editingProduct.slug,
          },
          rating: editingProduct.rating,
          review: editingProduct.review,
          color: editingProduct.color,
          size: editingProduct.size,
        };

        const productToUpdate = products.find(
          (p) => p.id === editingProduct.id
        );

        if (productToUpdate) {
          await client
            .patch(productToUpdate._sanityId)
            .set(sanityProduct)
            .commit();

          setProducts(
            products.map((p) =>
              p.id === editingProduct.id
                ? { ...editingProduct, _sanityId: productToUpdate._sanityId }
                : p
            )
          );
          setEditingProduct(null);
          toast.success("Product updated successfully!");
        } else {
          toast.error("Product not found for update.");
        }
      } catch (error) {
        console.error("Error updating product:", error);
        toast.error("Failed to update product.");
      }
    }
  };

  const handleDeleteProduct = async (id: number) => {
    const productToDelete = products.find((p) => p.id === id);
    if (productToDelete) {
      try {
        await client.delete(productToDelete._sanityId);
        setProducts(products.filter((p) => p.id !== id));
        toast.success("Product deleted successfully !");
      } catch (error) {
        console.error("Error deleting product :", error);
        toast.error("Failed to delete product.");
      }
    } else {
      toast.error("product to delete not found");
    }
  };

  const handleArrayInputChange = (
    field: "gallery" | "color" | "size",
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

  const toggleCardContent = () => {
    setIsCardContentVisible((prev) => !prev);
  };

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
                        onChange={handleTitleChange} // Use handleTitleChange
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
                    <li className="flex flex-col gap-3 w-full">
                      <Label htmlFor="mrp">MRP</Label>
                      <Input
                        type="number"
                        placeholder="MRP"
                        value={
                          editingProduct ? editingProduct.mrp : newProduct.mrp
                        }
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({
                                ...editingProduct,
                                mrp: parseFloat(e.target.value),
                              })
                            : setNewProduct({
                                ...newProduct,
                                mrp: parseFloat(e.target.value),
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
                  {/* Brand and Category */}
                  <ul className="flex items-start gap-10 w-full">
                    <li className="flex flex-col gap-3 w-full">
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        placeholder="Brand"
                        value={
                          editingProduct
                            ? editingProduct.brand
                            : newProduct.brand
                        }
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({
                                ...editingProduct,
                                brand: e.target.value,
                              })
                            : setNewProduct({
                                ...newProduct,
                                brand: e.target.value,
                              })
                        }
                      />
                    </li>
                    <li className="flex flex-col gap-3 w-full">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        placeholder="Category"
                        value={
                          editingProduct
                            ? editingProduct.category
                            : newProduct.category
                        }
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({
                                ...editingProduct,
                                category: e.target.value,
                              })
                            : setNewProduct({
                                ...newProduct,
                                category: e.target.value,
                              })
                        }
                      />
                    </li>
                  </ul>
                  <ul className="flex items-start gap-10 w-full">
                    <li className="flex flex-col gap-3 w-full">
                      <Label htmlFor="rating">Rating</Label>
                      <Input
                        type="number"
                        placeholder="Rating"
                        value={
                          editingProduct
                            ? editingProduct.rating
                            : newProduct.rating
                        }
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({
                                ...editingProduct,
                                rating: parseFloat(e.target.value),
                              })
                            : setNewProduct({
                                ...newProduct,
                                rating: parseFloat(e.target.value),
                              })
                        }
                      />
                    </li>
                    <li className="flex flex-col gap-3 w-full">
                      <Label htmlFor="review">Review</Label>
                      <Input
                        type="number"
                        placeholder="Review"
                        value={
                          editingProduct
                            ? editingProduct.review
                            : newProduct.review
                        }
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({
                                ...editingProduct,
                                review: parseFloat(e.target.value),
                              })
                            : setNewProduct({
                                ...newProduct,
                                review: parseFloat(e.target.value),
                              })
                        }
                      />
                    </li>
                  </ul>
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
                        ? editingProduct.color
                        : newProduct.color
                      ).map((item, index) => (
                        <Input
                          key={index}
                          placeholder={`Color ${index + 1}`}
                          value={item}
                          onChange={(e) =>
                            handleArrayInputChange(
                              "color",
                              e.target.value,
                              index
                            )
                          }
                        />
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => handleArrayInputChange("color", "")}
                      >
                        Add Color
                      </Button>
                    </li>
                    <li className="flex flex-col gap-3 w-full">
                      <Label htmlFor="sizes">Sizes</Label>
                      {(editingProduct
                        ? editingProduct.size
                        : newProduct.size
                      ).map((item, index) => (
                        <Input
                          key={index}
                          placeholder={`Size ${index + 1}`}
                          value={item}
                          onChange={(e) =>
                            handleArrayInputChange(
                              "size",
                              e.target.value,
                              index
                            )
                          }
                        />
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => handleArrayInputChange("size", "")}
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
