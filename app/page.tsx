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
  const { loading } = useUser();

  if (loading) return <p>Loading...</p>;

  return (

    <main className="px-6 py-2">
        <section className="bg-white h-120 rounded-2xl flex flex-row items-center justify-center">
            hello
        </section>
    </main>
  );
};

export default App;
