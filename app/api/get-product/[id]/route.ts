import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;

    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*, product_images(*)")
      .eq("id", productId)
      .single();

    if (error) throw error;

    if (!data) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const formatted = {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      image_url: data.product_images?.[0]?.image_url ?? null,
      images: data.product_images ?? [], // all images if needed
    };

    return NextResponse.json(formatted, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching product:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
