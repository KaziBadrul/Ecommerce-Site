import React from 'react'
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    return (
        <header>
            <nav>
                    <Link href="/" className="logo">
                        <Image src="/ecommerce_logo.jpg" alt="logo" fill className="object-contain object-left" />
                    </Link>

                    <ul>
                        <Link href="/">Home</Link>
                        <Link href="/">login</Link>
                    </ul>
            </nav>
        </header>
    )
}
export default Navbar



{/*<nav>*/}
{/*    <Link href="/" className="logo">*/}
{/*        <Image src="/ecommerce_logo.jpg" alt="logo" width={24} height={24} />*/}
{/*    </Link>*/}

{/*    <ul>*/}
{/*        <Link href="/">Home</Link>*/}
{/*        <Link href="/">Products</Link>*/}
{/*    </ul>*/}

{/*</nav>*/}
