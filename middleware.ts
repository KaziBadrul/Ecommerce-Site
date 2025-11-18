import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: Request) {
  const requestUrl = new URL(req.url);
  const path = requestUrl.pathname;

  // Only protect /admin routes
  if (!path.startsWith("/admin")) {
    return NextResponse.next();
  }

  const res = NextResponse.next();

  // Create supabase client (server-side)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.headers
            .get("cookie")
            ?.split("; ")
            .find((c) => c.startsWith(name + "="))
            ?.split("=")[1];
        },
        set() {},
        remove() {},
      },
    }
  );

  // 1️⃣ Check if user is logged in
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2️⃣ Fetch admin status from your "profiles" table
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Profile lookup error:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }

  const isAdmin = profile?.is_admin === true;
  console.log("User: ", user.email, "Is Admin:", isAdmin);

  // 3️⃣ Block access if not admin
  if (!isAdmin) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Allowed → continue request
  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
