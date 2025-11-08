"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const menuItems = [
    { label: "Admin Dashboard", href: "/admin" },
    { label: "Add Product", href: "/admin/add-product" },
    { label: "Update Stock", href: "/admin/update-stock" },
    { label: "Orders", href: "/admin/orders" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 pt-10 bg-white/90 backdrop-blur-lg shadow-lg flex flex-col p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button variant="outline" className="w-full justify-start">
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
