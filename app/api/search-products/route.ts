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
  image_url?: string | null;
}

interface ProductWithImages {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  product_images?: { image_url?: string }[];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim() || "";

  if (!query) return NextResponse.json([]);

  // NEW VERSION WITH IMAGE
  try {
    const { data: productsData, error } = await supabaseAdmin
      .from("products")
      .select("*, product_images(*)")
      .ilike("name", `%${query}%`)
      .limit(20);

    if (error) throw error;

    if (!productsData) {
      return Response.json([], { status: 200 });
    }

    const formatted: Product[] = (productsData as ProductWithImages[]).map(
      (p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        stock: p.stock,
        image_url: p.product_images?.[0]?.image_url ?? null,
      })
    );

    return NextResponse.json(formatted, { status: 200 });
  } catch (err: unknown) {
    let message = "Unknown error";

    if (err instanceof Error) {
      message = err.message;
    } else if (typeof err === "string") {
      message = err;
    }

    console.error("Error fetching products:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
