"use client";

import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, ShoppingCart, User, X, Menu } from "lucide-react";

export default function Navbar() {
  const { user, isAdmin } = useUser();
  const router = useRouter();

  const isAdminRoute = usePathname().startsWith("/admin");
  if (isAdminRoute) return null; // Hide navbar on admin routes

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md w-full h-20 flex items-center px-6 shadow-sm border-b sticky top-0 z-50">
      <nav className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo2.png" alt="Logo" width={50} height={50} />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search Section */}
          <div className="relative flex items-center">
            {/* Search Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen((prev) => !prev)}
              className="p-2 rounded-full z-20"
              // bg-gray-100 hover:bg-gray-200 transition
              // z-20 ensures it's always above the input
            >
              {searchOpen ? (
                <X size={20} />
              ) : (
                <Search
                  size={20}
                  className="rounded-full bg-gray-100 hover:bg-gray-200 transition z-20"
                />
              )}
            </motion.button>

            {/* Expanding Input */}
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                >
                  <input
                    placeholder="Search jackets..."
                    className="w-full px-4 py-2 bg-white border rounded-lg shadow-md outline-none text-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart icon */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
          >
            <ShoppingCart size={20} />
          </motion.div>

          {/* Profile */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
          >
            <User size={20} />
          </motion.div>

          {/* Admin Button */}
          {user && isAdmin && !isAdminRoute && (
            <Button
              variant="outline"
              className="border-orange-400 text-orange-500 hover:bg-orange-50"
              onClick={() => router.push("/admin")}
            >
              Admin Panel
            </Button>
          )}

          {user && isAdmin && isAdminRoute && (
            <Button
              variant="outline"
              className="border-orange-400 text-orange-500 hover:bg-orange-50"
              onClick={() => router.push("/admin")}
            >
              Shop Page
            </Button>
          )}

          {/* Login / Logout */}
          {user ? (
            <Button
              onClick={async () => {
                try {
                  await logout();
                } catch (err) {
                  console.error("Logout error:", err);
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button className="bg-orange-400 hover:bg-orange-500 text-white">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white px-6 pb-4 shadow-md border-b top-20 absolute right-0 z-40"
          >
            {/* Search Bar */}
            <div className="mt-4 flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg">
              <Search size={18} />
              <input
                placeholder="Search..."
                className="w-full bg-transparent outline-none"
              />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6 mt-4">
              <div className="p-2 rounded-full bg-gray-100">
                <ShoppingCart size={20} />
              </div>
              <div className="p-2 rounded-full bg-gray-100">
                <User size={20} />
              </div>
            </div>

            {/* Admin Button */}
            {user && isAdmin && (
              <Button
                variant="outline"
                className="w-full mt-4 border-orange-400 text-orange-500 hover:bg-orange-50"
                onClick={() => {
                  router.push("/admin");
                  setMobileMenuOpen(false);
                }}
              >
                Admin Panel
              </Button>
            )}

            {/* Login / Logout */}
            {user ? (
              <Button
                onClick={async () => {
                  try {
                    await logout();
                    setMobileMenuOpen(false);
                  } catch (err) {
                    console.error("Logout error:", err);
                  }
                }}
                className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </Button>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mt-3 bg-orange-400 hover:bg-orange-500 text-white">
                  Login
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
