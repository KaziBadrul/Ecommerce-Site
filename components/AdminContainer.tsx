"use client";

import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";
import Sidebar from "@/components/Sidebar";

export default function AdminContainer() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar selected={selectedMenuItem} onSelect={setSelectedMenuItem} />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6 bg-gray-50 min-h-screen">
        <AdminDashboard selected={selectedMenuItem} />
      </main>
    </div>
  );
}
