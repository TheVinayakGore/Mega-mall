"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart, setCartItems } from "@/redux/slices/cartSlice";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { ImBin } from "react-icons/im";

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
    <main className="flex flex-col items-center justify-center gap-10 w-full min-h-screen p-20">
      <h1 className="text-5xl font-extrabold text-center">🛒 Checkout</h1>
      <div className="max-w-4xl w-full bg-white dark:bg-zinc-900 p-7 rounded-xl shadow-lg border border-zinc-300 dark:border-zinc-800">
        {/* 🚚 Shipping Details */}
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-3">🚚 Shipping Details</h2>
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
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-3">🛍️ Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty 🛒</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between p-5 border rounded-md bg-zinc-50 dark:bg-zinc-800"
                >
                  <div className="flex items-start gap-4">
                    <Image
                      src={urlFor(item.image)?.url() || "/placeholder.png"}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-40 h-40 border border-zinc-300 dark:border-zinc-700 rounded-lg"
                    />
                    <div>
                      <p className="text-lg font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500 my-1">
                        {item.quantity} × ₹{item.price}
                      </p>
                      {/* ✅ Description with fallback */}
                      <p className="text-xs font-light opacity-70">
                        {item.description
                          ? item.description
                          : "No description available"}
                      </p>
                    </div>
                  </div>
                  <p className="text-3xl text-green-500 font-extrabold">
                    ₹{item.quantity * item.price}
                  </p>
                </div>
              ))}
              <div className="flex justify-between items-center font-bold text-lg border-t pt-3">
                <span>Total Amount</span>
                <span className="text-green-500">₹{totalAmount}</span>
              </div>
            </div>
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
