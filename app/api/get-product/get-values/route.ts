import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { count: productCount, error: productError } = await supabaseAdmin
      .from("products")
      .select("*", { count: "exact", head: true });

    const { count: orderCount, error: orderError } = await supabaseAdmin
      .from("orders")
      .select("*", { count: "exact", head: true });

    const { count: userCount, error: userError } = await supabaseAdmin
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (productError || orderError || userError)
      throw productError || orderError || userError;

    const formatted = {
      productCount: productCount ?? 0,
      orderCount: orderCount ?? 0,
      userCount: userCount ?? 0,
    };

    return NextResponse.json(formatted, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching products:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
