"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Import the Footer

export default function ClientLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const hideNavbarFooter = pathname.startsWith("/login");

    return (
        <>

            {!hideNavbarFooter && <Navbar />}


            <main className="min-h-[calc(100vh-64px)]">{children}</main>


            {!hideNavbarFooter && <Footer />}
        </>
    );
}
