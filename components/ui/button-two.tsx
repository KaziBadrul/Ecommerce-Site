"use client";
import {addToCart} from "@/utils/addToCart";
import Image from "next/image";

interface Props {
    name: string;
    image: string;
    slug: string;
    price: number;
}

const ButtonTwo = ({name,image,slug,price}:Props) => {
    return (
        <button onClick={() => addToCart({name,image,slug,price})} className="w-[200px] p-4 rounded-4xl cursor-pointer bg-[#115acf] transition-colors duration-200 hover:bg-[#184a99]">
            <div className="flex flex-row items-center justify-center">
                <p className="text-white font-bold">Add to Cart</p>
                <Image src="/icons/right-arrow.svg" alt="arrow" width={24} height={24} className="inline-block ml-2" />
            </div>
        </button>
    )
}
export default ButtonTwo
