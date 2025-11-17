"use client";

import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, ShoppingCart, User, X, Menu } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
}

export default function Navbar() {
  const { user, isAdmin } = useUser();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest(".mobile-search-area")) {
        setQuery("");
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      // setResults([]);
      setTimeout(() => setResults([]), 0);
      return;
    }

    const delay = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/search-products?q=${query}`);
        const data = await res.json();
        setResults(data);
        console.log("Search results:", data);
      } catch (error) {
        console.error("Search error:", error);
      }

      setLoading(false);
    }, 300); // 300ms debounce

    return () => clearTimeout(delay);
  }, [query]);

  const isAdminRoute = usePathname().startsWith("/admin");

  return (
    <header className="bg-white/80 backdrop-blur-md w-full h-20 flex items-center px-6 shadow-sm border-b sticky top-0 z-50">
      <nav className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-new.svg" alt="Logo" width={50} height={50} />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search Section */}
          {/* SEARCH SECTION */}
          <div className="relative flex items-center">
            {/* Toggle button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchOpen((prev) => !prev);
                setQuery("");
                setResults([]);
              }}
              className="p-2 rounded-full z-20"
            >
              {searchOpen ? (
                <X size={20} />
              ) : (
                <div className="w-[38px] h-[38px] bg-gray-100 hover:bg-gray-300 rounded-full flex items-center justify-center transition">
                  <Search size={20} />
                </div>
              )}
            </motion.button>

            {/* Search input animation */}
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 260, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                >
                  <input
                    value={query}
                    onChange={(e) => {
                      const val = e.target.value;
                      setQuery(e.target.value);
                      if (!val.trim()) setResults([]);
                    }}
                    placeholder="Search jackets..."
                    className="w-full px-4 py-2 bg-white border rounded-lg shadow-md outline-none text-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* RESULTS DROPDOWN */}
            {searchOpen && query.length > 0 && (
              <div className="absolute right-0 top-10 w-72 bg-white shadow-lg rounded-xl border z-50 max-h-72 overflow-y-auto">
                {loading && (
                  <p className="p-3 text-gray-500 text-sm">Searching...</p>
                )}

                {!loading && results.length === 0 && (
                  <p className="p-3 text-gray-500 text-sm">No results found</p>
                )}

                {results.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product-page/${item.id}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                    }}
                    className="flex gap-3 items-center p-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <Image
                      src={
                        item.image_url && item.image_url.trim() !== ""
                          ? item.image_url
                          : "/placeholder-image.png"
                      }
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-md object-cover"
                      alt={item.name || "Product"}
                      unoptimized
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Tk. {item.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Cart icon */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 transition cursor-pointer"
          >
            <Link href="/cart">
              <ShoppingCart size={20} />
            </Link>
          </motion.div>

          {/* Profile */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 transition cursor-pointer"
          >
            <User size={20} />
          </motion.div>

          {/* Admin Button */}
          {user && isAdmin && !isAdminRoute && (
            <Button
              variant="outline"
              className="border-[#115acf] cursor-pointer text-blue-400 hover:bg-blue-50"
              onClick={() => router.push("/admin")}
            >
              <p>Admin Panel</p>
            </Button>
          )}

          {user && isAdmin && isAdminRoute && (
            <Button
              variant="outline"
              className="border-[#115acf] cursor-pointer text-blue-400 hover:bg-blue-50"
              onClick={() => router.push("/")}
            >
              <p>Shop Page</p>
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
              className="text-white cursor-pointer"
            >
              <p>Logout</p>
            </Button>
          ) : (
            <Link href="/login">
              <Button className=" text-white cursor-pointer">
                <p>Login</p>
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
            {/* MOBILE SEARCH BAR WITH RESULTS */}
            <div className="mt-4 relative w-full mobile-search-area">
              <div className="mt-4 relative w-full">
                <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg">
                  <Search size={18} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-transparent outline-none"
                  />
                </div>

                {/* RESULTS DROPDOWN */}
                {query.length > 0 && (
                  <div className="absolute left-0 mt-2 w-full bg-white shadow-lg rounded-xl border z-50 max-h-72 overflow-y-auto">
                    {loading && (
                      <p className="p-3 text-gray-500 text-sm">Searching...</p>
                    )}

                    {!loading && results.length === 0 && (
                      <p className="p-3 text-gray-500 text-sm">
                        No results found
                      </p>
                    )}

                    {results.map((item) => (
                      <Link
                        key={item.id}
                        href={`/product-page/${item.id}`}
                        onClick={() => {
                          setQuery("");
                          setMobileMenuOpen(false);
                        }}
                        className="flex gap-3 items-center p-3 hover:bg-gray-100 cursor-pointer"
                      >
                        <Image
                          src={
                            item.image_url && item.image_url.trim() !== ""
                              ? item.image_url
                              : "/placeholder-image.png"
                          }
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-md object-cover"
                          alt={item.name || "Product"}
                          unoptimized
                        />

                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            Tk. {item.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6 mt-4">
              <div className="p-2 rounded-full bg-gray-100">
                <Link href="/cart">
                  <ShoppingCart size={20} />
                </Link>
              </div>
              <div className="p-2 rounded-full bg-gray-100">
                <User size={20} />
              </div>
            </div>

            {/* Admin Button */}
            {user && isAdmin && (
              <Button
                variant="outline"
                className="border-[#115acf] cursor-pointer text-blue-400 hover:bg-blue-50"
                onClick={() => {
                  router.push("/admin");
                  setMobileMenuOpen(false);
                }}
              >
                <p>Admin Panel</p>
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
                className="text-white cursor-pointer"
              >
                <p>Logout</p>
              </Button>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mt-3 text-white cursor-pointer">
                  <p>Login</p>
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
