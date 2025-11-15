import { products, Product } from "@/lib/products";
import Image from "next/image";
import { addToCart } from "@/utils/addToCart";
import ButtonTwo from "@/components/ui/button-two";

interface Props {
    params: {
        slug: string;
    } | Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: Props) => {

    const { slug } = await params;


    const product: Product | undefined = products.find((p) => p.slug === slug);


    if (!product) {
        return (
            <div className="w-full h-[500px] flex items-center justify-center">
                <p className="font-bold text-8xl">Product Not Found</p>
            </div>
        );
    }




    return (
        <main className="w-full min-h-screen px-6 py-12 flex flex-col items-center font-sans text-gray-800">

            {/* PRODUCT SECTION */}
            <section className="max-w-7xl w-full bg-white p-10 rounded-3xl flex flex-col lg:flex-row justify-center gap-16 lg:gap-24">

                {/* PRODUCT IMAGE */}
                <figure className="flex-1 flex justify-center">
                    <div className="relative w-full max-w-xl aspect-square rounded-3xl overflow-hidden border border-gray-200">
                        <Image
                            src={product.image}
                            alt="High-quality view of Product Name"
                            fill
                            className="object-cover"
                        />
                    </div>
                </figure>

                {/* PRODUCT INFO */}
                <aside className="w-full max-w-md flex flex-col gap-10">

                    {/* TITLE & PRICE */}
                    <header>
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
                        <p className="text-2xl font-semibold text-gray-700 mt-2">{product.price} BDT</p>
                    </header>

                    {/* SELECT COLOR */}
                    <div className="flex flex-col gap-3">
                        <p className="font-bold text-gray-900 uppercase tracking-wide">Color</p>
                        <div className="flex gap-3">
                            <button aria-label="Select blue color" className="w-10 h-10 rounded-full bg-blue-500 border-2 border-gray-300 hover:scale-105 transition-all cursor-pointer"></button>
                            <button aria-label="Select black color" className="w-10 h-10 rounded-full bg-orange-400 border-2 border-gray-300 hover:scale-105 transition-all cursor-pointer"></button>
                            <button aria-label="Select pink color" className="w-10 h-10 rounded-full bg-red-200 border-2 border-gray-300 hover:scale-105 transition-all cursor-pointer"></button>
                        </div>
                    </div>

                    {/* SELECT SIZE */}
                    <div className="flex flex-col gap-3">
                        <p className="font-bold text-gray-900 uppercase tracking-wide">Size</p>
                        <div className="flex gap-3 flex-wrap">
                            {["S", "M", "L", "XL", "XXL"].map((size) => (
                                <button
                                    key={size}
                                    aria-label={`Select size ${size}`}
                                    className="px-5 py-2 border-2 border-gray-300 rounded-lg font-bold text-gray-700 hover:border-gray-900 hover:text-gray-900 transition cursor-pointer"
                                >
                                    <p>{size}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* QUANTITY */}
                    <div className="flex flex-col gap-3">
                        <p className="font-bold text-gray-900 uppercase tracking-wide">Quantity</p>
                        <div className="flex items-center gap-3">
                            <button aria-label="Decrease quantity" className="w-fit h-fit hover:scale-105 transition-transform duration-200 flex items-center justify-center cursor-pointer">
                                <Image
                                    src="/cart-icons/minus.svg"
                                    alt="minus"
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                            </button>
                            <span className="w-12 text-center font-medium" aria-live="polite">1</span>
                            <button aria-label="Decrease quantity" className="w-fit h-fit hover:scale-105 transition-transform duration-200 flex items-center justify-center cursor-pointer">
                                <Image
                                    src="/cart-icons/plus.svg"
                                    alt="minus"
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                            </button>
                        </div>
                    </div>

                    {/* ADD TO CART */}
                    <ButtonTwo name={product.name} image={product.image} slug={product.slug} price={product.price}/>
                </aside>
            </section>

            {/* DESCRIPTION */}
            <section className="max-w-7xl w-full mt-16 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Description</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                    This is a placeholder description. Replace with actual details. This area contains information about materials, fit, features, and benefits. Keep it concise but engaging for the user.
                </p>
            </section>
        </main>
    );
};

export default ProductPage;
