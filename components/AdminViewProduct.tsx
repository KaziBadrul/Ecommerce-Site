"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
}

export default function AdminViewProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/get-product");
      const formatted: Product[] = await res.json();
      if (res.ok) {
        setProducts(formatted);
      } else {
        throw new Error("Failed to fetch products!");
      }
    } catch (err: any) {
      console.error("Error fetching products:", err.message);
      toast.error(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const handleUpdate = async (product: Product) => {
    try {
      const res = await fetch("/api/admin/update-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Update failed");

      toast.success("Product updated!");
      setEditingId(null);
      fetchProducts();
    } catch (err: any) {
      console.error("Error updating product:", err);
      toast.error(err.message || "Update failed");
    }
  };

  // Upload a new image
  const handleImageUpload = async (productId: string, file: File) => {
    try {
      setUploadingId(productId);

      const fileName = `${Date.now()}_${file.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(`products/${fileName}`, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(`products/${fileName}`);

      // Update product_images table
      const { error: dbError } = await supabase
        .from("product_images")
        .upsert({ product_id: productId, image_url: urlData.publicUrl });

      if (dbError) throw dbError;

      toast.success("Image uploaded!");
      fetchProducts();
    } catch (err: any) {
      console.error("Image upload error:", err);
      toast.error(err.message || "Image upload failed");
    } finally {
      setUploadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Your Products</h2>

      {products.map((p) => (
        <div
          key={p.id}
          className="border p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            {/* Image */}
            <div className="relative">
              {p.image_url && (
                <Image
                  src={p.image_url}
                  alt={p.name}
                  width={100}
                  height={100}
                  className="object-cover rounded"
                />
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleImageUpload(p.id, e.target.files[0]);
                  }
                }}
                disabled={uploadingId === p.id}
              />
            </div>

            {/* Editable fields */}
            {editingId === p.id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((prod) =>
                        prod.id === p.id
                          ? { ...prod, name: e.target.value }
                          : prod
                      )
                    )
                  }
                  className="border p-1 rounded"
                />
                <input
                  type="text"
                  value={p.description}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((prod) =>
                        prod.id === p.id
                          ? { ...prod, description: e.target.value }
                          : prod
                      )
                    )
                  }
                  className="border p-1 rounded"
                />
                <input
                  type="number"
                  value={p.price}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((prod) =>
                        prod.id === p.id
                          ? { ...prod, price: Number(e.target.value) }
                          : prod
                      )
                    )
                  }
                  className="border p-1 rounded"
                />
                <input
                  type="number"
                  value={p.stock}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((prod) =>
                        prod.id === p.id
                          ? { ...prod, stock: Number(e.target.value) }
                          : prod
                      )
                    )
                  }
                  className="border p-1 rounded"
                />
              </div>
            ) : (
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-600">{p.description}</p>
                <p>
                  Tk. {p.price} | Stock: {p.stock}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {editingId === p.id ? (
              <>
                <button
                  onClick={() => handleUpdate(p)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditingId(p.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
