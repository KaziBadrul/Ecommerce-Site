"use client";

import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import React from "react";


export default function Navbar() {
    const { user } = useUser();

    return (
        <header className="bg-white w-full h-20 flex flex-row items-center justify-center px-6 py-2 shadow-md sticky top-0 z-50">
            <nav className="w-full h-full flex flex-row items-center justify-between max-h-[1200px]">

                <div className="h-full flex flex-row items-center">
                    <Link href="/">
                        <Image src="/logo.svg" alt="Logo" width={64} height={64} />
                    </Link>
                </div>


                <div className="flex flex-row items-center justify-between h-full w-fit">

                    <div className="h-full mr-5 flex flex-row items-center">
                        <Image src="/icons/cart.svg" alt="Cart" width={52} height={52} />
                    </div>


                    <div className="h-full w-full flex flex-row items-center justify-between">

                        <div className="h-full flex flex-row items-center">
                            <Image src="/icons/profile-picture.svg" alt="Profile" width={33} height={33}/>
                        </div>


                        <div className="h-full flex flex-row items-center">
                            {user ? (
                                <>
                                    <Button
                                        onClick={async () => {
                                            await supabase.auth.signOut();
                                            window.location.reload();
                                        }}
                                    >
                                        <p>Logout</p>
                                    </Button>
                                </>
                            ) : (
                                <Link href="/login">
                                    <Button><p>Login</p></Button>
                                </Link>
                            )}

                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
