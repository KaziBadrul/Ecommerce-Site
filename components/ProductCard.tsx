import Image from "next/image";
import {addToCart} from "@/utils/addToCart";

interface Props {
  name: string;
  image: string;
  slug: string;
  price: number;
}

const ProductCard = ({ name, image, slug, price }: Props) => {
  return (
    <div onClick={() => addToCart({name, image, slug, price})} className="w-[20rem] h-[28rem]
    bg-[#d9d9d9] rounded-3xl
    flex flex-col items-center
    justify-center px-6 py-4
    transform transition-all duration-300 ease-in-out
    hover:bg-[#8c8b8b]
    ">
      <div className="w-full h-[300px] flex items-center justify-center relative">
        <Image
          src={image}
          alt={name}
          loading="lazy"
          fill
          className="object-cover rounded-3xl"
        />
      </div>

      <div className="w-full max-w-full h-22">
        <div className="h-fit">
          <p className="font-bold  mt-3 line-clamp-2 break-words">{name}</p>
        </div>

        <div className="mt-2">
          <p className="font-bold text-2xl">{price.toFixed(2)} BDT</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
