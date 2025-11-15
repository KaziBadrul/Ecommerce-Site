import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
}

export async function GET() {
  try {
    const { data: productsData, error } = await supabaseAdmin
      .from("products")
      .select("*, product_images(*)")
      .order("created_at", { ascending: false });

    if (error) throw error;

    if (!productsData || productsData.length === 0) {
      return Response.json([], { status: 200 });
    }

    const formatted: Product[] = productsData.map((p: any) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      image_url: p.product_images?.[0]?.image_url ?? null,
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching products:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
