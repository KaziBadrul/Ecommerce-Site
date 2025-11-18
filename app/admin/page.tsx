// app/admin/page.tsx
import AdminContainer from "@/components/AdminContainer";
import { createServerClient } from "@supabase/ssr";

export default async function AdminPage() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return null;
        },
      },
    }
  );

  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  return <AdminContainer />;
}
