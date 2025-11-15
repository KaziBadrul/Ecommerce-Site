"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { CartProduct } from "@/lib/products";

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

    const increaseQuantity = (slug: string) => {
        setCartItems(prev =>
            prev.map(item =>
                item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (slug: string) => {
        setCartItems(prev =>
            prev
                .map(item =>
                    item.slug === slug
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0) // Remove if quantity goes to 0
        );
    };

    const deleteItem = (slug: string) => {
        setCartItems(prev => prev.filter(item => item.slug !== slug));
    };

    const subtotal = useMemo(
        () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        [cartItems]
    );

    const formatPrice = (amount: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "BDT" }).format(amount);

    return (
        <main className="min-h-screen w-full p-6 lg:p-10 flex justify-center">
            <section className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Cart Items Section */}
                <section className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
                    <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

                    {cartItems.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                        cartItems.map(item => (
                            <article key={item.slug} className="flex items-start gap-4 py-6 border-b">
                                <figure className="w-[120px] h-[120px] bg-gray-200 relative rounded-xl overflow-hidden">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </figure>

                                <div className="flex-1">
                                    <h2 className="text-lg font-medium">{item.name}</h2>
                                    <nav className="flex items-center gap-5 mt-12">
                                        <button
                                            aria-label={`Delete ${item.name}`}
                                            onClick={() => deleteItem(item.slug)}
                                            className="w-fit h-fit"
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

                                <div className="flex flex-col items-end">
                                    <p className="text-lg font-semibold">{formatPrice(item.price * item.quantity)}</p>

                                    <div className="flex items-center gap-2 mt-2">

                                        <button
                                            aria-label={`Decrease quantity of ${item.name}`}
                                            onClick={() => decreaseQuantity(item.slug)}
                                            className="w-fit h-fit flex items-center justify-center"
                                        >
                                            <Image
                                                src="/cart-icons/minus.svg"
                                                alt="minus"
                                                width={24}
                                                height={24}
                                                className="object-contain"
                                            />
                                        </button>


                                        <span className="font-roboto font-bold">{item.quantity}</span>


                                        <button
                                            aria-label={`Increase quantity of ${item.name}`}
                                            onClick={() => increaseQuantity(item.slug)}
                                            className="w-fit h-fit flex items-center justify-center"
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
                        ))
                    )}
                </section>


                <aside className="bg-white rounded-2xl p-6 shadow-sm h-fit">
                    <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

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

                    <button
                        disabled={cartItems.length === 0}
                        className={`w-full py-3 rounded-xl text-sm font-medium mb-3 ${
                            cartItems.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"
                        }`}
                    >
                        Checkout
                    </button>

                    <a href="#" className="text-sm underline text-gray-600">
                        Use a promo code
                    </a>
                </aside>
            </section>
        </main>
    );
};

export default CartPage;
