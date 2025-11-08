"use client";
import Homepage from "@/components/Homepage";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabaseClient";
import React, { useEffect, useState } from "react";
import GetStarted from "./get-started/page";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const App = () => {
  const { user, isAdmin, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  return (

    <div>
      {user ? (
        <>
          {isAdmin && <Link href="/admin">Admin Dashboard</Link>}
          <Homepage />
          <Button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        <div>
          {/*<GetStarted />*/}
          <Homepage />
        </div>
      )}
    </div>
  );
};

export default App;
