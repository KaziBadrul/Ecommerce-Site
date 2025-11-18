"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      // start loading
      setLoading(true);

      try {
        // initial session fetch
        const { data } = await supabase.auth.getSession();
        const currentUser = data.session?.user ?? null;
        if (!mounted) return;
        setUser(currentUser);

        if (currentUser) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", currentUser.id)
            .single();

          if (!mounted) return;
          setIsAdmin(!!profile?.is_admin);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("useUser initial load error:", err);
        setUser(null);
        setIsAdmin(false);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    load();

    // Listen for auth state changes and update user + isAdmin, ensure loading ends
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        try {
          const currentUser = session?.user ?? null;
          if (!mounted) return;
          setUser(currentUser);

          if (currentUser) {
            const { data: profile } = await supabase
              .from("profiles")
              .select("is_admin")
              .eq("id", currentUser.id)
              .single();

            if (!mounted) return;
            setIsAdmin(!!profile?.is_admin);
          } else {
            setIsAdmin(false);
          }
        } catch (err) {
          console.error("useUser auth listener error:", err);
          setUser(null);
          setIsAdmin(false);
        } finally {
          // ensure loading cleared after listener handles change
          if (!mounted) return;
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, isAdmin, loading };
}
