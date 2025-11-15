"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { products } from "@/lib/products"
import ProductCard from "@/components/ProductCard"

const ProductCarousel = () => {
    return (
        <div className="w-full max-w-7xl mx-auto py-10 relative">
            <h2 className="font-bold text-3xl mb-6">
                <p>New Drops</p>
            </h2>

            <Carousel
                className="w-full"
                opts={{
                    loop: true,
                    containScroll: "trimSnaps",
                    align: "start",
                }}
            >
                <CarouselContent className="-ml-[600px]">
                    {products.map((product) => (
                        <CarouselItem
                            key={product.name}
                            className="basis-1/5"
                        >
                            <ProductCard {...product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>


                <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 bg-[#115acf]  text-white border-none cursor-pointer" />
                <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 bg-[#115acf]
                text-white border-none cursor-pointer
                " />
            </Carousel>
        </div>
    )
}

export default ProductCarousel



