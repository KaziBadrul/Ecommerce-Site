"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
}

const ProductCarousel = () => {
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

  return (
    <div className="w-full max-w-7xl mx-auto py-10 relative">
      <h2 className="font-bold text-3xl mb-6">
        <p className="text-blue-900">New Drops</p>
      </h2>

      <Carousel
        className="w-full"
        opts={{
          loop: true,
          containScroll: "trimSnaps",
          align: "start",
        }}
      >
        <CarouselContent className="-ml-[600px] py-10">
          {products.map((product) => (
            <CarouselItem key={product.name} className="basis-1/5">
              <ProductCard {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 bg-[#115acf]  text-white border-none cursor-pointer" />
        <CarouselNext
          className="absolute -right-6 top-1/2 -translate-y-1/2 bg-[#115acf]
                text-white border-none cursor-pointer
                "
        />
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
