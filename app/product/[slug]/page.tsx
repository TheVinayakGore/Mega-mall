"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/slices/cartSlice";
import Image from "next/image";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { PiHeartFill } from "react-icons/pi";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import LoadingBar from "@/components/LoadingBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cart from "@/app/product/cart";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FaMinus, FaPlus } from "react-icons/fa";
// import Link from "next/link";

interface Product {
  _id: string;
  model: string;
  title: string;
  rating: number;
  review: number;
  description: string;
  color: string[];
  size: string[];
  reviewDescription: string;
  price: number;
  image: {
    asset: {
      _id: string;
      url: string;
    };
  };
  likes: number;
}

const ProductDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [pincode, setPincode] = useState<string>("");
  const [service, setService] = useState<boolean | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [liked, setLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const checkPincode = async () => {
    try {
      const response = await fetch("/api/pincode");
      const pincodejson: string[] = await response.json();
      setService(pincodejson.includes(pincode));
    } catch (error) {
      console.error("Failed to check pincode:", error);
    }
  };

  const onChangePincode = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setPincode(value);
    }
  };

  useEffect(() => {
    if (slug) {
      const fetchProduct = async () => {
        setLoading(true);
        const productData = await client.fetch<Product>(
          `*[_type == "product" && slug.current == $slug][0]`,
          { slug }
        );
        setProduct(productData);
        setLoading(false);
      };
      fetchProduct();
    }
  }, [slug]);

  if (loading) return <LoadingBar loading={loading} />;

  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product._id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
        color: selectedColor, // Pass the selected color
        size: selectedSize, // Pass the selected size (ensure `selectedSize` is set)
      };
      dispatch(addItem(cartItem));
      toast.success("Added to cart!");
    }
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => {
      const newLikedStatus = !prevLiked; // Toggle the like status
      return newLikedStatus; // Return the new state value
    });

    if (liked) {
      toast.error("Unliked!");
    } else {
      toast.success("Liked!");
    }
  };

  return (
    <>
      <main className="flex flex-col items-start py-24 px-20 w-full h-full">
        <div className="flex items-start justify-between gap-10 w-full h-full">
          <section id="ID1" className="sticky top-24 w-[70rem] h-full">
            <div className="flex items-start w-full h-full">
              <Image
                src={urlFor(product.image).url()}
                alt={product.title}
                width={600}
                height={200}
                priority
                className="object-cover rounded-lg border border-zinc-200"
              />
              <Button
                variant="outline"
                size="icon"
                className="-ml-12 mt-2 border-none shadow-md rounded-full bg-white"
                onClick={handleLikeClick}
              >
                <PiHeartFill
                  className={`h-6 w-6 ${liked ? "text-rose-500" : "text-zinc-300 hover:text-red-500"}`}
                />
              </Button>
            </div>
            <div className="flex items-center space-x-3 py-5 mt-5 border-t border-zinc-500 w-full h-full">
              <div className="w-full">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={handleAddToCart}
                      className="text-base hover:bg-sky-500 hover:text-white h-14 w-full"
                    >
                      Add to Cart
                    </Button>
                  </DrawerTrigger>
                  <Cart />
                </Drawer>
              </div>
              <div className="w-full">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button className="text-base hover:bg-yellow-500 h-14 w-full">
                      Buy Now
                    </Button>
                  </DialogTrigger>

                  <div className="flex items-center m-auto gap-7 w-full">
                    <DialogContent className="max-w-3xl mx-auto w-full">
                      <DialogHeader>
                        <DialogTitle className="text-4xl font-extrabold">
                          $ Buy Now $
                        </DialogTitle>
                        <DialogDescription className="text-base">
                          Complete your purchase by selecting a payment method.
                        </DialogDescription>
                      </DialogHeader>

                      {/* Product Details */}
                      <div className="flex items-start justify-start m-auto h-full">
                        <Image
                          src={urlFor(product.image).url()}
                          alt={product.title}
                          width={500}
                          height={500}
                          className="rounded-lg border w-64"
                        />
                        <div className="flex flex-col items-start justify-between ml-6 pb-3 border-b w-full h-full">
                          <h2 className="text-3xl font-bold leading-none">
                            {product.title}
                          </h2>
                          <p className="text-base opacity-70 my-2">
                            {product.description.slice(0, 250)}...
                          </p>
                          <div className="flex items-end justify-between w-full">
                            <p className="text-2xl font-bold text-green-600">
                              ₹{product.price * quantity}
                            </p>
                            <p className="text-xl font-medium text-blue-600 overflow-auto w-10">
                              {product.size}
                            </p>
                            <p className="text-xl font-medium overflow-auto w-10">
                              {product.color}
                            </p>
                            <div className="flex items-center gap-3 mt-4">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  setQuantity((prev) => Math.max(1, prev - 1))
                                }
                              >
                                <FaMinus />
                              </Button>
                              <span className="text-lg font-bold">
                                {quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setQuantity((prev) => prev + 1)}
                              >
                                <FaPlus />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <Button className="p-7 text-xl font-bold bg-blue-500 hover:bg-blue-600 text-white w-full">
                        Checkout Now
                      </Button>
                    </DialogContent>
                  </div>
                </Dialog>
              </div>
            </div>
          </section>
          <section
            id="ID2"
            className="sticky top-0 overflow-auto px-5 w-full h-full"
          >
            <div>
              <div>
                <h2 className="text-sm title-font text-zinc-500 tracking-widest">
                  {product.model}
                </h2>
                <h1 className="text-black dark:text-white text-3xl title-font font-medium mb-1">
                  {product.title}
                </h1>
              </div>
              <div className="flex mb-3">
                <span className="flex items-center">
                  {[...Array(product.rating)].map((_, index) => (
                    <FaStar key={index} className="text-yellow-400 text-sm" />
                  ))}
                  {[...Array(5 - product.rating)].map((_, index) => (
                    <FaRegStar
                      key={index}
                      className="text-yellow-400 text-sm"
                    />
                  ))}
                  <span className="ml-3">{product.review} Reviews</span>
                </span>
              </div>
              <p className="leading-relaxed">{product.description}</p>
            </div>
            <div className="flex my-6 items-center space-x-10 w-full">
              {product.size && (
                <div className="flex items-center">
                  <div className="relative">
                    <Select onValueChange={(value) => setSelectedSize(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="M" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.size.map((size, index) => (
                          <SelectItem key={index} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              <div className="flex items-center w-full h-10">
                <span className="mr-2">Colors :</span>
                {product.color.map((color, index) => (
                  <button
                    key={index}
                    aria-label={`Color option ${color}`}
                    onClick={() => {
                      setSelectedColor(color);
                    }}
                    className="border border-zinc-200 dark:border-zinc-800 rounded-full w-6 h-6"
                    style={{ backgroundColor: color }}
                  ></button>
                ))}

                <div className={`flex ${!selectedColor && "hidden"}`}>
                  <span className="ml-5">Selected : </span>
                  <div
                    className="ml-2 border border-zinc-500 dark:border-zinc-800 rounded-full hover:cursor-no-drop w-6 h-6"
                    style={{ backgroundColor: selectedColor }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-b border-zinc-700 py-4 my-5 w-full">
              <p className="flex items-end space-x-3 title-font font-medium text-2xl text-black dark:text-white">
                ₹{product.price.toFixed(2)}
              </p>
              <div className="w-1/2">
                <div className="flex max-w-sm items-center space-x-2 w-full">
                  <Input
                    type="text"
                    id="pincode"
                    name="pincode"
                    placeholder="Check Pincode"
                    className=""
                    value={pincode}
                    onChange={onChangePincode}
                    maxLength={6}
                    required
                  />
                  <Button
                    onClick={checkPincode}
                    className="hover:bg-sky-400 hover:text-white"
                  >
                    Check
                  </Button>
                </div>
                {service === false && (
                  <div className="text-red-500 text-xs text-start mt-1 leading-3">
                    Sorry, No service available at this pincode!
                  </div>
                )}
                {service === true && (
                  <div className="text-green-500 text-xs text-start mt-1 leading-3">
                    Yes, service available at this pincode!
                  </div>
                )}
              </div>
            </div>
            <div className="pb-5">
              <p>{product.reviewDescription}</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default ProductDetails;
