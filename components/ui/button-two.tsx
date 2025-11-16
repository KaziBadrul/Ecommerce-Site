"use client";
import { addToCart } from "@/utils/addToCart";
import Image from "next/image";
import { toast } from "sonner";

interface Props {
  id: string;
  name: string;
  price: number;
  image_url?: string;
}

const ButtonTwo = ({ id, name, image_url, price }: Props) => {
  const handleAddToCart = () => {
    // Your add to cart logic
    toast.success("Product added to cart!");
  };
  return (
    <button
      onClick={() => {
        addToCart({ id, name, image_url, price });
        handleAddToCart();
      }}
      className="w-[200px] p-4 rounded-4xl cursor-pointer bg-[#115acf] transition-colors duration-200 hover:bg-[#184a99]"
    >
      <div className="flex flex-row items-center justify-center">
        <p className="text-white font-bold">Add to Cart</p>
        <Image
          src="/icons/right-arrow.svg"
          alt="arrow"
          width={24}
          height={24}
          className="inline-block ml-2"
        />
      </div>
    </button>
  );
};
export default ButtonTwo;
