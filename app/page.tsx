import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import Image from "next/image";


const App = () => {
  return (
    <main className="py-2 bg-gray-100">
      {/* Added a hero section it looked empty without it 
        Edit its style */}
      <HeroSection />
      <section className="bg-white h-[600x] rounded-2xl flex flex-col items-center justify-between mx-6 mt-8 border-[#3c85fa] border-6">
        <div className="flex-4 flex flex-col items-center justify-center w-full">
          <ProductCarousel />
        </div>
      </section>
      <section className="bg-white rounded-2xl grid grid-cols-2 gap-4 h-[600px] mt-5 p-4 mx-6">
        <div className=" relative overflow-hidden rounded-sm">
          <Image
            src="/men-wear.jpg"
            alt="Men's wear"
            fill
            className="object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
          />
          <p className="absolute top-1/3 right-1/7 text-3xl font-bold text-white">
            M E N
          </p>
        </div>
        <div className="relative overflow-hidden rounded-sm">
          <Image
            src="/women-wear.jpg"
            alt="Men's wear"
            fill
            className="object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
          />
          <p className="absolute top-1/3 right-1/7 text-3xl font-bold text-white">
            W O M E N
          </p>
        </div>
        <div className="relative overflow-hidden rounded-sm">
          <Image
            src="/hoodie.jpg"
            alt="Men's wear"
            fill
            className="object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
          />
          <p className="absolute top-1/3 right-1/7 text-3xl font-bold text-white">
            H O O D I E S
          </p>
        </div>
        <div className="relative overflow-hidden rounded-sm">
          <Image
            src="/shoes.jpg"
            alt="Men's wear"
            fill
            className="object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
          />
          <p className="absolute top-1/3 right-1/7 text-3xl font-bold text-white">
            S H O E S
          </p>
        </div>
      </section>
    </main>
  );
};

export default App;
