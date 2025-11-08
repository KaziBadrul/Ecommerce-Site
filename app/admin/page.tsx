"use client";

import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";
import Sidebar from "@/components/Sidebar";

export default function AdminPage() {
  const { user, isAdmin, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace("/");
    }
  }, [user, isAdmin, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!user || !isAdmin) return null;

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6 bg-gray-50 min-h-screen">
        <AdminDashboard />
      </main>
    </div>
  );
}
