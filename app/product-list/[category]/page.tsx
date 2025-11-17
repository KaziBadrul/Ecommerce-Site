
import Image from "next/image";

interface Props {
    params: { category: string } | Promise<{ category: string }>;
}


export default async function ProductListPage({params}:Props) {

    const {category} = await params


    const products = [
        {
            id: 1,
            name: "Polar Jacket",
            subtitle: "Winter Edition",
            price: "799 BDT",
            image: "/polarjacket.png",
        },
        {
            id: 2,
            name: "Classic Hoodie",
            subtitle: "Organic Cotton",
            price: "499 BDT",
            image: "/polarjacket.png",
        },
        {
            id: 3,
            name: "Slim Fit Jeans",
            subtitle: "Dark Blue Wash",
            price: "599 BDT",
            image: "/polarjacket.png",
        },
        {
            id: 4,
            name: "Basic T-Shirt",
            subtitle: "100% Cotton",
            price: "199 BDT",
            image: "/polarjacket.png",
        },
        {
            id: 5,
            name: "Athletic Sweatpants",
            subtitle: "Lightweight",
            price: "399 BDT",
            image: "/polarjacket.png",
        },
        {
            id: 6,
            name: "Winter Beanie",
            subtitle: "Soft Knit",
            price: "1499 BDT",
            image: "/polarjacket.png",
        },
    ];


    return (
        <div className="w-full min-h-screen  px-6 py-10 flex flex-col items-center">

            <div className="flex w-full max-w-6xl justify-between items-center mb-10">
                <div className="flex gap-6">
                   <p className="font-bold">{category}</p>
                </div>

                <button className="px-4 py-2 text-sm border rounded-lg bg-white shadow-sm hover:bg-neutral-100">
                    <div className="w-fit h-fit flex flex-row items-center justify-center gap-2 cursor-pointer">
                        <p className="font-medium">Filters</p>
                        <Image src="/icons/down-arrow.svg" alt="down arrow" width={12} height={12} className="object-contain" />
                    </div>
                </button>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition p-4"
                    >
                        {/* IMAGE */}
                        <div className="w-full aspect-[4/5] bg-neutral-100 rounded-xl overflow-hidden flex items-center justify-center">
                            <Image
                                src={p.image}
                                alt={p.name}
                                width={400}
                                height={450}
                                className="object-contain"
                            />
                        </div>


                        <div className="mt-4">
                            <h3 className="text-lg font-semibold font-poppins">{p.name}</h3>
                            <p className="text-sm text-neutral-500">{p.subtitle}</p>
                        </div>


                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-base font-semibold font-poppins">{p.price}</span>
                            <button className="px-4 py-2 rounded-4xl border bg-[#115acf] transition-all hover:bg-[#184a99] cursor-pointer">
                                <p className="text-white">Add to Cart</p>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
