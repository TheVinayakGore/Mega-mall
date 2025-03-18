"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  clearCart,
  setCartItems,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "@/redux/slices/cartSlice"; // Import the missing actions
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Load cart items from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCartItems = localStorage.getItem("cartItems");
      if (savedCartItems) {
        dispatch(setCartItems(JSON.parse(savedCartItems)));
      }
    }
  }, [dispatch]);

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.quantity ? item.price * item.quantity : 0),
    0
  );

  // User Details Form State
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Checkout
  const handleCheckout = () => {
    if (!userDetails.name || !userDetails.email || !userDetails.address) {
      toast.error("🚨 Please fill in all the shipping details!");
      return;
    }

    toast.success("✅ Order placed successfully!");
    console.log("Order Details:", userDetails, cartItems);

    // Clear the form
    setUserDetails({ name: "", email: "", address: "" });

    // Clear the cart after successful checkout
    dispatch(clearCart());
    localStorage.removeItem("cartItems");
  };

  return (
    <main className="flex flex-col items-start justify-center gap-10 w-full min-h-screen p-20 py-40">
      <h1 className="text-[12rem] leading-none font-extrabold text-start -mb-24">
        🛒 Checkout
      </h1>
      <div className="w-full bg-white dark:bg-zinc-900 p-7 rounded-xl shadow-lg border border-zinc-300 dark:border-zinc-800">
        {/* 🚚 Shipping Details */}
        <div className="">
          <h2 className="text-3xl font-medium mb-10">🚚 Shipping Details</h2>
          <form className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userDetails.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-zinc-50 dark:bg-zinc-800"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={userDetails.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-zinc-50 dark:bg-zinc-800"
            />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={userDetails.address}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-zinc-50 dark:bg-zinc-800"
            />
          </form>
        </div>

        {/* 🛍️ Order Summary */}
        <div className="my-10">
          <h2 className="text-3xl font-medium mb-10">🛍️ Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty 🛒</p>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-5 w-full h-full">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-800 w-full"
                  >
                    <div className="flex items-start gap-4 w-full h-full">
                      <Image
                        src={urlFor(item.image)?.url() || "/placeholder.png"}
                        alt={item.title}
                        width={2000}
                        height={2000}
                        className="w-60 h-auto border border-zinc-300 dark:border-zinc-700 rounded-lg"
                      />
                      <div className="flex flex-col items-center justify-between h-full">
                        <div className="flex items-center justify-between w-full">
                          <p className="text-2xl font-semibold w-full">
                            {item.title.length > 12
                              ? item.title.slice(0, 12) + "..."
                              : item.title}
                          </p>
                          <p className="text-end text-3xl text-green-500 font-extrabold w-full">
                            ₹{item.quantity * item.price}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xl font-bold p-2 bg-zinc-200 dark:bg-zinc-700 rounded-md my-2 w-full">
                          <span className="">
                            {item.quantity} × ₹{item.price}
                          </span>
                          {item.size && <p>Size : {item.size}</p>}
                          {item.color && (
                            <div className="flex items-center">
                              Color :{" "}
                              <div
                                className="ml-2 rounded p-3"
                                style={{
                                  backgroundColor: Array.isArray(item.color)
                                    ? item.color[0]
                                    : item.color,
                                }}
                              />
                            </div>
                          )}
                        </div>
                        <p className="text-base">
                          {item.description
                            ? item.description.slice(0, 170) + "..."
                            : "No description available"}
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
                          <span className="font-medium">{item.quantity}</span>
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
                ))}
              </div>
              <div className="flex justify-between items-center font-bold text-3xl border-t mt-10 pt-5">
                <span>💸 Payable Amount</span>
                <span className="text-green-500">₹{totalAmount}</span>
              </div>
            </>
          )}
        </div>

        {/* 🏁 Checkout & Clear Cart Actions */}
        <div className="flex items-center gap-5 mt-6 w-full">
          <Button
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-md text-lg w-full"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            <FaShoppingCart className="mr-2" />
            Confirm Order
          </Button>
          <Button
            className="flex items-center bg-red-500 hover:bg-red-600 text-white p-6 rounded-md text-lg w-full"
            onClick={() => {
              dispatch(clearCart());
              toast.success("🗑️ Cart cleared successfully!");
              localStorage.removeItem("cartItems");
            }}
            disabled={cartItems.length === 0}
          >
            <ImBin className="mr-2" />
            Clear Cart
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
