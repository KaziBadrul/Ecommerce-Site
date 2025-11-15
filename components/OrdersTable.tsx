"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function OrdersTable({ orders }: { orders: any[] }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-center">Expand</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <>
              {/* Main Row */}
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.billing_name}</td>
                <td className="p-3 font-semibold">{order.total_amount} BDT</td>
                <td className="p-3">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="p-3 text-center">
                  <button
                    className="p-2 hover:bg-gray-200 rounded-full"
                    onClick={() => toggleRow(order.id)}
                  >
                    {expanded === order.id ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </button>
                </td>
              </tr>

              {/* Expanded Row Content */}
              {expanded === order.id && (
                <tr className="bg-gray-50">
                  <td colSpan={5} className="p-4">
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg">Order Items</h3>

                      <div className="space-y-3">
                        {order.items.map((item: any) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 p-3 border rounded-lg bg-white shadow-sm"
                          >
                            {/* Product Image */}
                            <div className="w-14 h-14 relative">
                              <Image
                                src={
                                  item.product?.image_url || "/placeholder.png"
                                }
                                alt={item.product?.name}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1">
                              <p className="font-semibold">
                                {item.product?.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                Size: {item.size_id}
                              </p>
                            </div>

                            {/* Quantity */}
                            <div className="text-center w-20">
                              Qty: {item.quantity}
                            </div>

                            {/* Price */}
                            <div className="font-semibold">
                              {item.price_at_purchase} BDT
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
