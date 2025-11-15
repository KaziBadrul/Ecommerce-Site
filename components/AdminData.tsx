"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import OrdersTable from "./OrdersTable";

export default function AdminData() {
  const [productCount, setProductCount] = useState<number>(0);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [orders, setOrders] = useState<any[]>([]);

  // TODO: Check if orders table works properly

  const fetchCounts = async () => {
    try {
      const res = await fetch("/api/get-product/get-values");
      const data = await res.json();
      if (res.ok) {
        setProductCount(data.productCount);
        setOrderCount(data.orderCount);
        setUserCount(data.userCount);
        return;
      } else {
        throw new Error("Failed to fetch counts!");
      }
    } catch (err: any) {
      console.error("Error fetching counts:", err.message);
      return { productCount: 0, orderCount: 0, userCount: 0 };
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/get-orders"); // your API route
      const data = await res.json();
      if (res.ok) {
        setOrders(data);
      } else {
        console.error("Failed to fetch orders:", data.error);
      }
    } catch (err: any) {
      console.error("Error fetching orders:", err.message);
    }
  };

  React.useEffect(() => {
    fetchCounts();
    fetchOrders();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/90 backdrop-blur rounded-xl shadow">
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{productCount}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur rounded-xl shadow">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{orderCount}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur rounded-xl shadow">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{userCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sales Table */}
      <OrdersTable orders={orders} />
    </div>
  );
}
