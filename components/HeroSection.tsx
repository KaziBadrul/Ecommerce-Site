"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const jackets = [
  {
    title: "Blend your style with comfort",
    subtitle: "Arctic Ease",
    description:
      "A premium jeans jacket designed for warmth and modern aesthetics, stay stylish and comfortable in cold weather.",
    price: 1999.99,
    oldPrice: 2499.99,
    image: "/jeansjacket.png",
  },
  {
    title: "Stay warm, stay stylish",
    subtitle: "Polar Jacket",
    description:
      "This cozy polar jacket keeps you warm without compromising style.",
    price: 2199.99,
    oldPrice: 2699.99,
    image: "/polarjacket.png",
  },
  {
    title: "Urban comfort meets design",
    subtitle: "City Explorer",
    description:
      "Perfect for everyday wear, this jacket combines fashion with functionality.",
    price: 1899.99,
    oldPrice: 2299.99,
    image: "/cityjacket.png",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % jackets.length);
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  const jacket = jackets[currentIndex];

  return (
    <section className="relative w-full h-[80vh] rounded-2xl  text-black flex items-center px-12">
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl opacity-40" />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="relative z-10 max-w-lg space-y-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* <h1 className="text-6xl">[BRAND NAME]</h1> */}
          <h1 className="font-poppins text-5xl md:text-6xl font-extrabold leading-tight">
            {jacket.title}
          </h1>

          <h2 className="text-3xl mt-4 font-bold text-[#3c85fa]">
            {jacket.subtitle}
          </h2>

          <p className="text-gray-700 leading-relaxed">{jacket.description}</p>

          <div className="mt-3 text-xl flex items-center gap-4">
            <span className="text-green-500 font-bold">{jacket.price} BDT</span>
            <span className="line-through text-gray-400">
              {jacket.oldPrice} BDT
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 px-7 py-3 bg-[#115acf] text-white rounded-full text-lg font-semibold transition-all duration-300 hover:bg-[#0a3c8c] cursor-pointer"
          >
              <p>Add to Cart</p>
          </motion.button>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute right-10 bottom-0 top-0 flex items-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="relative w-[700px] h-[700px]"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={jacket.image}
              alt={jacket.subtitle}
              width={900}
              height={900}
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-in-out"
              priority
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
