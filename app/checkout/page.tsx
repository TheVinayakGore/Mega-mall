"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { useState } from "react";
import { clearCart } from "@/redux/slices/cartSlice";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { toast } from "react-toastify";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate total payable amount
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Form state for user details
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckout = () => {
    // Here you can add logic to process the checkout (like payment integration)
    toast.warning("Proceeding with checkout" + userDetails);
    // Optionally, clear the cart after checkout
    dispatch(clearCart());
  };

  return (
    <main className="flex items-center justify-center fixed w-full h-screen">
      <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg dark:shadow-none border border-zinc-300 dark:border-zinc-800 shadow-zinc-300">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        <div className="mb-6">
          <h2 className="text-xl font-medium mb-3">Shipping Details</h2>
          <form className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userDetails.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={userDetails.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={userDetails.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </form>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-medium mb-3">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-3"
                >
                  <div className="flex items-center">
                    <Image
                      src={urlFor(item.image).url()}
                      alt={item.title}
                      width={500}
                      height={500}
                      className="w-32 h-32 border border-zinc-300 dark:border-zinc-800 rounded-xl mr-4"
                    />
                    <span>{item.title}</span>
                  </div>
                  <span>
                    {item.quantity} x ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-6">
          <Button
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={handleCheckout}
          >
            <FaShoppingCart className="mr-2" />
            Confirm Order
          </Button>
          <Button
            className="flex items-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            onClick={() => dispatch(clearCart())}
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
