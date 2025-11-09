import { useUser } from "@/hooks/useUser";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const App = () => {
  return (
    <main className="px-6 py-2">
      <section className="bg-white h-120 rounded-2xl flex flex-col items-center justify-between">
        <div className="bg-amber-900 flex-1 flex flex-col items-center justify-center w-full">
          <p className="font-bold text-5xl">New Drop</p>
        </div>
        <div className="bg-amber-700 flex-4 flex flex-col items-center justify-center w-full">
          hello
        </div>
      </section>
    </main>
  );
};

export default App;
