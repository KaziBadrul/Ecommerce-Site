"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminData() {
  // Dummy data for now
  const totalProducts = 120;
  const totalSales = 342;
  const totalStock = 589;

  const recentSales = [
    {
      id: 1,
      product: "Red T-Shirt",
      quantity: 2,
      total: "$40",
      date: "2025-11-09",
    },
    {
      id: 2,
      product: "Blue Jeans",
      quantity: 1,
      total: "$60",
      date: "2025-11-08",
    },
    {
      id: 3,
      product: "Sneakers",
      quantity: 3,
      total: "$150",
      date: "2025-11-08",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/90 backdrop-blur rounded-xl shadow">
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur rounded-xl shadow">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalSales}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur rounded-xl shadow">
          <CardHeader>
            <CardTitle>Total Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalStock}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sales Table */}
      <Card className="bg-white/90 backdrop-blur rounded-xl shadow">
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.id}</TableCell>
                  <TableCell>{sale.product}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>{sale.total}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
