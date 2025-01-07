"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { PiShoppingBagOpenDuotone } from "react-icons/pi";
// import Link from "next/link";
import { ImBin } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { urlFor } from "@/sanity/lib/image";
import {
  clearCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  setCartItems,
} from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Load cart items from localStorage on page load (if available)
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      dispatch(setCartItems(JSON.parse(savedCartItems))); // Load items into the store
    }
  }, [dispatch]);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Save items to localStorage
    } else {
      localStorage.removeItem("cartItems"); // Remove cart from localStorage when empty
    }
  }, [cartItems]);

  // Calculate total payable amount
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared !");
    localStorage.removeItem("cartItems"); // Remove cart from localStorage when cleared
  };

  const handleToast = () => {
    dispatch(clearCart());
    localStorage.removeItem("cartItems");
    toast.success(
      `Order Successful for ${cartItems.map((item) => item.title).join(", ")}!`
    );
  };

  return (
    <main>
      <DrawerContent>
        {cartItems.length === 0 ? (
          <div className="flex flex-col space-y-5 text-xl font-bold items-center justify-center w-full h-[30rem]">
            <Image
              src="/emptycart.png"
              alt="empty cart"
              width={500}
              height={500}
              priority
              className="rounded w-60 h-60"
            />
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <div className="flex flex-col flex-wrap py-5 w-full h-[30rem]">
            <ul className="flex flex-col p-3 overflow-auto h-full">
              {cartItems.map((item) => (
                <li key={item.id} className="flex flex-col gap-5 p-2 w-1/2">
                  <div className="flex items-start p-2 border border-zinc-700 rounded-md w-full">
                    <div className="w-56">
                      <Image
                        src={urlFor(item.image).url()}
                        alt={item.title}
                        width={1000}
                        height={1000}
                        priority
                        className="rounded w-full"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-between px-5 w-full h-40">
                      <div className="">
                        <DrawerTitle className="text-xl pt-2 font-medium">
                          {item.title}
                        </DrawerTitle>
                        <DrawerDescription>
                          {item.title} is an amazing product!
                        </DrawerDescription>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-3 w-full">
                        <div
                          className={`${!item.size && "hidden"} text-start w-full`}
                        >
                          <p>Size : {item.size}</p>
                        </div>
                        <div
                          className={`flex ${!item.color && "hidden"} items-center m-auto w-full`}
                        >
                          Color :{" "}
                          <div
                            className="ml-2 border border-zinc-500 dark:border-zinc-800 rounded-full hover:cursor-no-drop w-4 h-4"
                            style={{
                              backgroundColor: Array.isArray(item.color)
                                ? item.color[0]
                                : item.color,
                            }}
                          />
                        </div>
                        <p className="text-start w-full">
                          {item.quantity} x ₹{item.price * item.quantity}
                        </p>
                        <div className="flex items-center justify-end space-x-3 w-full">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => dispatch(decrementQuantity(item.id))}
                            className="border-zinc-800 hover:border-sky-400 hover:bg-sky-400 hover:text-white rounded-sm p-2"
                          >
                            <FaMinus className="w-3 h-3" />
                          </Button>
                          <span className="flex items-center justify-center title-font font-medium min-w-4">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => dispatch(incrementQuantity(item.id))}
                            className="border-zinc-800 hover:border-sky-400 hover:bg-sky-400 hover:text-white rounded-sm p-2"
                          >
                            <FaPlus className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => dispatch(removeItem(item.id))}
                            className="border-zinc-800 hover:border-red-500 hover:text-red-500 rounded-sm p-2"
                          >
                            <ImBin className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center p-3 bg-zinc-200 dark:bg-zinc-900 w-full">
          <DrawerFooter>
            <DrawerClose className="absolute top-2 right-2">
              <Button
                variant="outline"
                size="icon"
                className="hover:text-white border-zinc-600 hover:bg-red-500 hover:border-red-500 p-1"
                asChild
              >
                <IoClose className="h-7 w-7" />
              </Button>
            </DrawerClose>
          </DrawerFooter>
          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold">
              Total Payable Amount : ₹{totalAmount}
            </p>
            <div className="flex space-x-4">
              <Button
                onClick={handleToast}
                className={`flex items-center justify-end text-base font-normal bg-sky-500 hover:bg-sky-600 text-white ${cartItems.length === 0 ? "hidden" : "opacity-100"}`}
              >
                <PiShoppingBagOpenDuotone className="mr-3 h-5 w-5" />
                Checkout Now
              </Button>
              {/* <Link
                href="/checkout"
                target="_blank"
                className={`${cartItems.length === 0 ? "hidden" : "opacity-100"}`}
              >
                <Button className="flex items-center justify-end text-base font-normal bg-sky-500 hover:bg-sky-600 text-white">
                  <PiShoppingBagOpenDuotone className="mr-3 h-5 w-5" />
                  Checkout Now
                </Button>
              </Link> */}
              <Button
                variant="outline"
                onClick={handleClearCart}
                className={`text-base text-zinc-500 font-normal border-zinc-700 hover:bg-black hover:border-zinc-500 hover:text-white ${cartItems.length === 0 ? "opacity-20 hover:cursor-not-allowed bg-black text-white" : "opacity-100"}`}
              >
                <ImBin className="mr-3 h-5 w-4" />
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </main>
  );
};

export default Cart;
