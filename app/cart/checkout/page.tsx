"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CheckOutPage() {
    const [paymentMethod, setPaymentMethod] = useState("Bkash");

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6 lg:p-12 flex justify-center">
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left Section: Delivery Address + Payment */}
                <Card className="bg-white p-8 rounded-3xl shadow-xl space-y-6">
                    <h2 className="text-2xl font-semibold mb-4 font-poppins">Biling Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="First name"
                            className="border rounded-2xl p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none transition"
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            className="border rounded-2xl p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none transition"
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="Delivery address"
                        className="border rounded-2xl p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none transition"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select className="border rounded-2xl p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none transition">
                            <option>Select city</option>
                            <option>Dhaka</option>
                            <option>Chittagong</option>
                            <option>Khulna</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Phone number"
                            className="border rounded-2xl p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none transition"
                        />
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-3 mt-4">
                        <h3 className="text-lg font-semibold">Payment Method</h3>
                        <div className="flex flex-col gap-3">
                            {["Bkash", "Cash on Delivery"].map((method) => (
                                <button
                                    key={method}
                                    onClick={() => setPaymentMethod(method)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition
                                        ${
                                        paymentMethod === method
                                            ? "border-blue-500 bg-blue-50 shadow-lg"
                                            : "border-gray-300 bg-white hover:border-blue-400"
                                    }`}
                                >
                                    <span className="font-medium">{method}</span>
                                    {paymentMethod === method && (
                                        <span className="text-blue-500 font-bold">✔</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Pay Button */}
                    <Button className="w-full py-5 rounded-2xl text-lg bg-blue-600 hover:bg-blue-700 text-white mt-2 shadow-md">
                        Pay $2,748
                    </Button>
                </Card>

                {/* Right Section: Order Summary */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold font-poppins">Order Summary</h2>

                    <Card className="rounded-3xl shadow-xl bg-white">
                        <CardContent className="p-6 space-y-4">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src="/jeansjacket.png"
                                            width={60}
                                            height={60}
                                            alt="item image"
                                            className="rounded-xl bg-gray-200"
                                        />
                                        <div>
                                            <p className="font-medium">Sample Product {item}</p>
                                            <p className="text-sm text-gray-500">Color: Sample</p>
                                        </div>
                                    </div>
                                    <p className="font-medium">$999</p>
                                </div>
                            ))}

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="text"
                                    placeholder="Discount code or gift card"
                                    className="border rounded-2xl p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none transition"
                                />
                                <Button className="rounded-2xl px-5 bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                                    Apply
                                </Button>
                            </div>

                            <div className="pt-4 space-y-1">
                                <div className="flex justify-between text-xl font-semibold pt-2">
                                    <span>Total</span>
                                    <span>$2,748</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
