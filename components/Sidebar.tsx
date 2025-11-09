"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  selected: string;
  onSelect: (item: string) => void;
}

export default function Sidebar({ selected, onSelect }: SidebarProps) {
  const menuItems = [
    { label: "Admin Dashboard", returns: "dashboard" },
    { label: "View/Edit Products", returns: "viewProduct" },
    { label: "Add Product", returns: "addProduct" },
    { label: "Update Stock", returns: "updateStock" },
    { label: "Orders", returns: "orders" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 pt-25 bg-white/90 backdrop-blur-lg shadow-lg flex flex-col p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.returns}
            variant="outline"
            className={`block w-full text-left p-2 rounded ${
              selected === item.returns
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => onSelect(item.returns)}
          >
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
