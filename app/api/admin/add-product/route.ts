import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const image = formData.get("image") as File | null;

    if (!image) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    // Upload image to Supabase storage
    const filePath = `products/${Date.now()}_${image.name}`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from("product-images")
      .upload(filePath, image);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("product-images").getPublicUrl(filePath);

    // Insert product data
    const { data: product, error: insertError } = await supabaseAdmin
      .from("products")
      .insert({ name, description, price, stock })
      .select()
      .single();

    if (insertError) throw insertError;

    // Insert image reference
    const { error: imageError } = await supabaseAdmin
      .from("product_images")
      .insert({
        product_id: product.id,
        image_url: publicUrl,
      });

    if (imageError) throw imageError;

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    console.error("Error adding product:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
