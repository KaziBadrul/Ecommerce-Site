import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import Image from "next/image";
import Link from "next/link";

const App = () => {
  return (
    <main className="py-2 bg-gray-100 overflow-x-clip  mx-auto  mb-16">
      {/* Added a hero section it looked empty without it 
        Edit its style */}
      <HeroSection />
      <section className="bg-[#b3cffc] h-[600x] rounded-2xl flex flex-col items-center justify-between mx-6 mt-8 border-double border-[#3c85fa] border-6">
        <div className="flex-4 flex flex-col items-center justify-center w-full">
          <ProductCarousel />
        </div>
      </section>
      <section className="bg-white rounded-2xl grid grid-cols-2 gap-3 min-h-[500px] mt-16 p-6 mx-6">
        <Link href={`/product-list/Men`}>
          <div className="relative h-64 overflow-hidden rounded-sm">
            <Image
              src="/men-wear.jpg"
              alt="Men's wear"
              fill
              className="object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <p className="absolute top-1/3 left-4 text-xl sm:text-3xl font-bold text-white">
              M E N
            </p>
          </div>
        </Link>

        <Link href={`/product-list/Women`}>
          <div className="relative h-64 overflow-hidden rounded-sm">
            <Image
              src="/women-wear.jpg"
              alt="Women's wear"
              fill
              className="object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <p className="absolute top-1/3 left-4 text-xl sm:text-3xl font-bold text-white">
              W O M E N
            </p>
          </div>
        </Link>

        <Link href={`/product-list/Hoodies`}>
          <div className="relative h-64 overflow-hidden rounded-sm">
            <Image
              src="/hoodie.jpg"
              alt="Hoodies"
              fill
              className="object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <p className="absolute top-1/3 left-4 text-xl sm:text-3xl font-bold text-white">
              H O O D I E S
            </p>
          </div>
        </Link>

        <Link href={`/product-list/Shoes`}>
          <div className="relative h-64 overflow-hidden rounded-sm">
            <Image
              src="/shoes.jpg"
              alt="Shoes"
              fill
              className="object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <p className="absolute top-1/3 left-4 text-xl sm:text-3xl font-bold text-white">
              S H O E S
            </p>
          </div>
        </Link>
      </section>
    </main>
  );
};

export default App;
