import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // Fetch all orders
    const { data: orders, error: orderError } = await supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (orderError) throw orderError;
    if (!orders || orders.length === 0)
      return NextResponse.json([], { status: 200 });

    // Fetch all order items
    const { data: items, error: itemError } = await supabaseAdmin
      .from("order_items")
      .select("*");

    if (itemError) throw itemError;

    // Fetch all products (with images)
    const { data: products, error: productError } = await supabaseAdmin
      .from("products")
      .select("*, product_images(*)");

    if (productError) throw productError;

    // Convert product array into a map for fast lookup
    const productMap = new Map(
      products.map((p) => [
        p.id,
        {
          id: p.id,
          name: p.name,
          price: p.price,
          image_url: p.product_images?.[0]?.image_url ?? null,
        },
      ])
    );

    // Attach items to their corresponding order
    const ordersWithItems = orders.map((order) => {
      const orderItems = items
        .filter((item) => item.order_id === order.id)
        .map((item) => ({
          ...item,
          product: productMap.get(item.product_id) || null,
        }));

      return {
        ...order,
        items: orderItems,
      };
    });

    return NextResponse.json(ordersWithItems, { status: 200 });
  } catch (err: any) {
    console.error("API ERROR:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
