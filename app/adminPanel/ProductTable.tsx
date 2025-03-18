"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Edit } from "lucide-react";
import Image from "next/image";
import { Product } from "./ProductType";

interface ProductWithSanityId extends Product {
  _sanityId: string;
}

interface ProductTableProps {
  products: ProductWithSanityId[];
  setEditingProduct: (product: Product | null) => void;
  handleDeleteProduct: (id: number) => void;
  openProductDialog: (product: Product) => void;
  setIsCardContentVisible: (visible: boolean) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  setEditingProduct,
  handleDeleteProduct,
  openProductDialog,
  setIsCardContentVisible,
}) => {
  return (
    <>
      {/* Products Table */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl leading-none">Products</CardTitle>
          <CardDescription>Manage your products</CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto">
          <div className="w-full overflow-auto">
            <Table className="whitespace-nowrap">
              <TableCaption>A list of your products.</TableCaption>
              <TableHeader>
                <TableRow className="border-b bg-zinc-50 dark:bg-zinc-900 h-10">
                  <TableHead className="w-32 border border-b-0">
                    Title
                  </TableHead>
                  <TableHead className="w-32 border border-b-0">Slug</TableHead>
                  <TableHead className="w-24 border border-b-0">
                    Price
                  </TableHead>
                  <TableHead className="w-32 border border-b-0">Tag</TableHead>
                  <TableHead className="w-32 border border-b-0">
                    Brand
                  </TableHead>
                  <TableHead className="w-32 border border-b-0">
                    Category
                  </TableHead>
                  <TableHead className="w-32 border border-b-0">
                    Image
                  </TableHead>
                  <TableHead className="w-44 border border-b-0">
                    Gallery
                  </TableHead>
                  <TableHead className="w-24 border border-b-0">
                    Stock
                  </TableHead>
                  <TableHead className="w-20 border border-b-0">
                    Colors
                  </TableHead>
                  <TableHead className="w-20 border border-b-0">
                    Sizes
                  </TableHead>
                  <TableHead className="w-20 border border-b-0">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border-b whitespace-nowrap overflow-auto">
                {products.map((product) => (
                  <TableRow key={product._sanityId} className="h-28">
                    {/* Title */}
                    <TableCell
                      onClick={() => openProductDialog(product)}
                      className="w-32 overflow-auto border-l border-r hover:text-blue-500 hover:underline underline-offset-8 cursor-pointer h-28"
                    >
                      {product.title || "-"}
                    </TableCell>

                    {/* Slug */}
                    <TableCell className="w-32 overflow-auto border-r h-28">
                      {product.slug || "-"}
                    </TableCell>

                    {/* Price */}
                    <TableCell className="w-24 border-r h-28">
                      {product.price ? `₹ ${product.price}` : "-"}
                    </TableCell>

                    {/* Tag */}
                    <TableCell className="w-32 border-r h-28">
                      {product.tag || "-"}
                    </TableCell>

                    {/* Brand */}
                    <TableCell className="w-32 border-r h-28">
                      {product.brand || "-"}
                    </TableCell>

                    {/* Category */}
                    <TableCell className="w-32 border-r h-28">
                      {product.category || "-"}
                    </TableCell>

                    {/* Image */}
                    <TableCell className="w-32 border-r h-28">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.title || "Product Image"}
                          width={500}
                          height={500}
                          className="w-auto h-14 object-cover rounded border"
                        />
                      ) : (
                        <Image
                          src="/noimage.png"
                          alt="No Image"
                          width={500}
                          height={500}
                          className="w-24 h-14"
                        />
                      )}
                    </TableCell>

                    {/* Gallery */}
                    <TableCell className="w-44 overflow-auto border-r h-28">
                      {product.gallery && product.gallery.length > 0 ? (
                        product.gallery.map((url, index) => (
                          <Image
                            key={index}
                            src={url}
                            alt={`Gallery ${index + 1}`}
                            width={500}
                            height={500}
                            className="w-auto h-14 object-cover inline-block rounded border mr-2"
                          />
                        ))
                      ) : (
                        <Image
                          src="/noimage.png"
                          alt="No Image"
                          width={500}
                          height={500}
                          className="w-24 h-14"
                        />
                      )}
                    </TableCell>

                    {/* Stock */}
                    <TableCell className="w-24 border-r h-28">
                      {product.stock !== undefined && product.stock !== null
                        ? product.stock
                        : "-"}
                    </TableCell>

                    {/* Colors */}
                    <TableCell className="w-20 border-r h-28 overflow-auto">
                      <ul className="flex flex-col items-start gap-1 whitespace-nowrap overflow-auto h-full">
                        {product.color && product.color.length > 0
                          ? product.color.map((item, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-1"
                              >
                                <div
                                  className={`rounded-full mt-1 w-3 h-3`}
                                  style={{ backgroundColor: item }} // Ensure valid color format
                                ></div>
                                {item ? item : "-"}
                              </li>
                            ))
                          : "-"}
                      </ul>
                    </TableCell>

                    {/* Sizes */}
                    <TableCell className="w-20 border-r h-28 overflow-auto">
                      <ul className="flex flex-col items-start justify-start gap-3 whitespace-nowrap overflow-auto h-full">
                        {product.size && product.size.length > 0
                          ? product.size.map((item, index) => (
                              <li
                                key={index}
                                className="flex justify-center bg-zinc-50 dark:bg-zinc-900 border w-full h-10 rounded p-2"
                              >
                                {item ? item : "-"}
                              </li>
                            ))
                          : "-"}
                      </ul>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="w-20 border-r h-28 overflow-auto">
                      <ul className="flex flex-col items-center gap-3 whitespace-nowrap overflow-auto h-full">
                        <li>
                          <Button
                            onClick={() => {
                              setEditingProduct(product);
                              setIsCardContentVisible(true); // Pass a boolean value directly
                            }}
                            variant="outline"
                            className="hover:text-sky-500 w-full h-10"
                          >
                            <Edit className="h-5 w-5" />
                          </Button>
                        </li>
                        <li>
                          <Button
                            onClick={() => handleDeleteProduct(product.id)}
                            variant="outline"
                            className="hover:text-red-500 w-full h-10"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductTable;
