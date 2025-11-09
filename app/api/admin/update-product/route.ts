import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, name, description, price, stock } = body;

    if (!id) throw new Error("Product ID is required");

    const { error } = await supabaseAdmin
      .from("products")
      .update({ name, description, price, stock })
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error updating product:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
