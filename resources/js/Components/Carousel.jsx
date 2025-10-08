import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function Carousel({ bannerProducts, imageBaseUrl }) {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % bannerProducts.length);
    };

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? bannerProducts.length - 1 : prev - 1
        );
    };

    return (
        <div className="relative w-full h-[80vh] overflow-hidden bg-[#e9fafa] flex items-center justify-center">
            {bannerProducts.map((product, index) => (
                <Link key={product.id} href={route("details.show", product.id)}>
                    <div
                        key={product.id}
                        className={`absolute top-0 w-full h-full flex items-center justify-between px-24 transition-all duration-600 ease-in-out ${
                            index === current 
                                ? "left-0 opacity-100" 
                                : "left-full opacity-0"
                        }`}
                    >
                        <div className="flex-1">
                            <h1 className="text-5xl font-bold mb-4">
                                {product.nom}
                            </h1>
                            <p className="text-base text-gray-800 max-w-[500px]">
                                {product.description}
                            </p>
                        </div>
                        <div className="flex-1 flex justify-end">
                            <img
                                src={product.image_url}  // ← Changé ici
                                alt={product.nom}
                                className="max-w-[400px] h-auto object-contain"
                            />
                        </div>
                    </div>
                </Link>
            ))}
            
            <button 
                className="absolute bottom-5 right-28 bg-white border-none py-2.5 px-5 font-bold cursor-pointer hover:bg-gray-100 transition-colors rounded-l-xl"
                onClick={prevSlide}
            >
                Previous
            </button>
            <button 
                className="absolute bottom-5 right-10 bg-white border-none py-2.5 px-5 font-bold cursor-pointer hover:bg-gray-100 transition-colors rounded-r-xl"
                onClick={nextSlide}
            >
                Next
            </button>
        </div>
    );
}