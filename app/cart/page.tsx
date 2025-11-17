"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url?: string;
}

export interface CartProduct extends Product {
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>(() => {
    if (typeof window !== "undefined") {
      const cartData = localStorage.getItem("cartItem");
      return cartData ? JSON.parse(cartData) : [];
    }
    return [];
  });

  // Sync cartItems with localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItem", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const increaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems(
      (prev) =>
        prev
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0) // Remove if quantity goes to 0
    );
  };

  const deleteItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
    }).format(amount);

  return (
      <main className="min-h-screen w-full p-4 sm:p-6 lg:p-10 flex justify-center">
          <section className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">

              {/* Cart Items Section */}
              <section className="border-double border-6 border-[#115acf] lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-sm">

                  <div className="w-full flex items-center justify-center mb-4 sm:mb-6">
                      <h1 className="text-xl sm:text-2xl font-semibold font-poppins">
                          Your Cart
                      </h1>
                  </div>

                  {cartItems.length === 0 ? (
                      <div className="w-full h-[300px] sm:h-[500px] flex items-center justify-center">
                          <p className="text-gray-500 text-base sm:text-lg font-extrabold">
                              Your cart is empty.
                          </p>
                      </div>
                  ) : (
                      <div className="space-y-6">
                          {cartItems.map((item) => (
                              <article
                                  key={item.id}
                                  className="flex items-start gap-4 sm:gap-6 pb-6 border-b"
                              >
                                  {/* Image (Always on the LEFT for mobile + tablet) */}
                                  <figure className="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] bg-gray-200 relative rounded-xl overflow-hidden shrink-0">
                                      <Image
                                          src={item.image_url || "/placeholder-image.png"}
                                          alt={item.name}
                                          fill
                                          className="object-cover"
                                      />
                                  </figure>

                                  {/* Middle Section: Product Info */}
                                  <div className="flex-1 flex flex-col justify-between">
                                      <h2 className="text-base sm:text-lg font-medium">{item.name}</h2>

                                      {/* Delete button */}
                                      <nav className="flex items-center gap-5 mt-2 sm:mt-6">
                                          <button
                                              aria-label={`Delete ${item.name}`}
                                              onClick={() => deleteItem(item.id)}
                                              className="hover:scale-150 transition-transform duration-200 cursor-pointer"
                                          >
                                              <Image
                                                  src="/cart-icons/delete.svg"
                                                  alt="delete"
                                                  width={24}
                                                  height={24}
                                                  className="object-contain"
                                              />
                                          </button>
                                      </nav>
                                  </div>

                                  {/* Right Section: Price + Quantity */}
                                  <div className="flex flex-col items-end justify-between">
                                      <p className="text-lg font-semibold">
                                          {formatPrice(item.price * item.quantity)}
                                      </p>

                                      <div className="flex items-center gap-2 mt-2">
                                          <button
                                              aria-label={`Decrease quantity of ${item.name}`}
                                              onClick={() => decreaseQuantity(item.id)}
                                              className="hover:scale-105 transition-transform duration-200 cursor-pointer"
                                          >
                                              <Image
                                                  src="/cart-icons/minus.svg"
                                                  alt="minus"
                                                  width={24}
                                                  height={24}
                                                  className="object-contain"
                                              />
                                          </button>

                                          <span className="font-roboto font-bold text-sm sm:text-base">
                                              {item.quantity}
                                          </span>

                                          <button
                                              aria-label={`Increase quantity of ${item.name}`}
                                              onClick={() => increaseQuantity(item.id)}
                                              className="hover:scale-105 transition-transform duration-200 cursor-pointer"
                                          >
                                              <Image
                                                  src="/cart-icons/plus.svg"
                                                  alt="plus"
                                                  width={24}
                                                  height={24}
                                                  className="object-contain"
                                              />
                                          </button>
                                      </div>
                                  </div>
                              </article>

                          ))}
                      </div>
                  )}
              </section>

              {/* Order Summary */}
              <aside className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm h-fit">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                      Order Summary
                  </h2>

                  <div className="flex justify-between text-gray-600 text-sm mb-3">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600 text-sm mb-3">
                      <span>Delivery</span>
                      <span>{formatPrice(0)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600 text-sm border-b pb-4 mb-4">
                      <span>Discount</span>
                      <span>-</span>
                  </div>

                  <div className="flex justify-between text-lg font-semibold mb-6">
                      <span>Total</span>
                      <span>{formatPrice(subtotal)}</span>
                  </div>

                  <Link href="/cart/checkout">
                      <button
                          disabled={cartItems.length === 0}
                          className={`w-full py-3 rounded-xl text-sm font-medium mb-3 ${
                              cartItems.length === 0
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-[#115acf] hover:bg-[#184a99] text-white transition-colors duration-200 cursor-pointer"
                          }`}
                      >
                          Checkout
                      </button>
                  </Link>

                  <a href="#" className="text-sm underline text-gray-600">
                      Use a promo code
                  </a>
              </aside>
          </section>
      </main>
  );
};

export default CartPage;
