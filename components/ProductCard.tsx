import Image from "next/image";
import { addToCart } from "@/utils/addToCart";

interface Props {
    name: string;
    image: string;
    slug: string;
    price: number;
}

const ProductCard = ({ name, image, slug, price }: Props) => {
    return (
        <div
            className="
                w-[20rem] h-[28rem]
                bg-white rounded-3xl
                shadow-md hover:shadow-xl
                border border-gray-200
                flex flex-col
                p-5
                transition-all duration-300 ease-in-out
                hover:-translate-y-2 hover:scale-[1.02]
                cursor-pointer
            "
        >
            {/* Image */}
            <div className="w-full h-[260px] rounded-2xl overflow-hidden relative">
                <Image
                    src={image}
                    alt={name}
                    loading="lazy"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="w-full mt-4 flex flex-col flex-grow">
                <p className="font-semibold text-lg text-gray-800 line-clamp-2">
                    {name}
                </p>

                <p className="font-bold text-2xl mt-3 text-gray-900 tracking-wide">
                    {price.toFixed(2)} BDT
                </p>


                <button
                    onClick={() => addToCart({ name, image, slug, price })}
                    className="
                        mt-auto w-[200px] py-3
                       bg-[#115acf]
                        rounded-xl
                        hover:bg-[#184a99]
                        transition-all duration-300
                        shrink-0
                        cursor-pointer
                    "
                >
                    <div className="flex flex-row items-center justify-center">
                        <p className="text-white font-bold">Add to Cart</p>
                        <Image src="/icons/right-arrow.svg" alt="arrow" width={24} height={24} className="inline-block ml-2" />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;




// w-[20rem] h-[28rem]
// bg-white rounded-3xl
// shadow-md hover:shadow-xl
// border border-gray-200
// flex flex-col
// p-5
// transition-all duration-300 ease-in-out
// hover:-translate-y-2 hover:scale-[1.02]
// cursor-pointer