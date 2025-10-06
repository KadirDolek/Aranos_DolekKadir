import Carousel from "@/Components/Carousel";
import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Footer from "@/Components/Footer";

export default function Home({ bannerProducts, featuredProducts, shopProducts, offerProduct, categories, imageBaseUrl, awesomeProducts, bestSellers }) {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 2) % awesomeProducts.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) =>
      (prev - 2 + awesomeProducts.length) % awesomeProducts.length
    );
  };

  // Produits affichés (8 visibles → 2 lignes de 4)
  const visibleProducts = awesomeProducts
    .slice(startIndex, startIndex + 8)
    .concat(
      startIndex + 8 > awesomeProducts.length
        ? awesomeProducts.slice(0, (startIndex + 8) % awesomeProducts.length)
        : []
    );

    // USEEFFECT SALE
    const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d;
  });
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        const next = new Date();
        next.setTime(now + 5 * 24 * 60 * 60 * 1000);
        setTargetDate(next);
        setTimeLeft({ days: 5, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, "0");

    return (
        <>
          <Nav/>
          <Carousel bannerProducts={bannerProducts} imageBaseUrl={imageBaseUrl} />
          
          {/* SECTION 1 - Featured Category */}
          <section className="py-12">
            <h2 className="text-3xl font-bold text-center mb-10">Featured Category</h2>

            <div className="max-w-6xl mx-auto px-4 space-y-6">
             
              <div className="flex gap-6">
                {/* Card 1 */}
                <div className="flex-1 basis-[55%] bg-[#f9fafb] rounded-xl p-5 shadow-[0_2px_6px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow duration-300 group">
                  <div className="flex items-center justify-between h-[200px]">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold capitalize">{featuredProducts[0].nom}</h3>
                      <Link
                        href={route("details.show", featuredProducts[0].id)}
                        className="font-bold text-[#ec4899] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        EXPLORE NOW →
                      </Link>
                    </div>
                    <img
                      src={featuredProducts[0].image_url}
                      alt={featuredProducts[0].nom}
                      className="max-h-[120px] object-contain ml-4"
                    />
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex-1 basis-[45%] bg-[#f9fafb] rounded-xl p-5 shadow-[0_2px_6px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow duration-300 group">
                  <div className="flex items-center justify-between h-[200px]">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold capitalize">{featuredProducts[1].nom}</h3>
                      <Link
                        href={route("details.show", featuredProducts[1].id)}
                        className="font-bold text-[#ec4899] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        EXPLORE NOW →
                      </Link>
                    </div>
                    <img
                      src={featuredProducts[1].image_url}
                      alt={featuredProducts[1].nom}
                      className="max-h-[120px] object-contain ml-4"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                {/* Card 3 */}
                <div className="flex-1 basis-[45%] bg-[#f9fafb] rounded-xl p-5 shadow-[0_2px_6px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow duration-300 group">
                  <div className="flex items-center justify-between h-[200px]">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold capitalize">{featuredProducts[2].nom}</h3>
                      <Link
                        href={route("details.show", featuredProducts[2].id)}
                        className="font-bold text-[#ec4899] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        EXPLORE NOW →
                      </Link>
                    </div>
                    <img
                      src={featuredProducts[2].image_url}
                      alt={featuredProducts[2].nom}
                      className="max-h-[120px] object-contain ml-4"
                    />
                  </div>
                </div>

                {/* Card 4 */}
                <div className="flex-1 basis-[55%] bg-[#f9fafb] rounded-xl p-5 shadow-[0_2px_6px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow duration-300 group">
                  <div className="flex items-center justify-between h-[200px]">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold capitalize">{featuredProducts[3].nom}</h3>
                      <Link
                        href={route("details.show", featuredProducts[3].id)}
                        className="font-bold text-[#ec4899] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        EXPLORE NOW →
                      </Link>
                    </div>
                    <img
                      src={featuredProducts[3].image_url}
                      alt={featuredProducts[3].nom}
                      className="max-h-[120px] object-contain ml-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2 - Awesome Shop */}
          <section className="py-12">
            <div className="max-w-[1200px] mx-auto px-4">
              <div className="flex items-center justify-between mb-6 mx-4">
                <div className="flex gap-8 items-center">
                  <h2 className="text-2xl font-bold">Awesome</h2>
                  <span className="text-gray-500 font-bold">Shop</span>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={prevSlide}
                    className="font-bold ml-2 cursor-pointer bg-none border-none text-base"
                  >
                    Prev
                  </button>
                  <span className="mx-1"> |</span>
                  <button 
                    onClick={nextSlide}
                    className="font-bold ml-2 cursor-pointer bg-none border-none text-base"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {visibleProducts.map((p) => (
                  <div key={p.id} className="text-center transition-transform duration-300 cursor-pointer group hover:-translate-y-1">
                    <img 
                      src={p.image_url} 
                      alt={p.nom} 
                      className="max-h-40 object-contain mx-auto mb-4" 
                    />
                    <h3 className="font-bold text-base mb-1">{p.nom}</h3>
                    <p className="text-gray-600 text-sm mb-2">${Number(p.prix).toFixed(2)}</p>
                    <Link
                      href={route("details.show", p.id)}
                      className="block mt-2 text-[#ec4899] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      EXPLORE NOW →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3 - Weekly Sale */}
          <section className="bg-[#e9fafa] w-full py-16">
            <div className="max-w-[1200px] mx-auto flex justify-end">
              <div className="w-1/2 text-left">
                <h2 className="text-[1.8rem] font-bold mb-6">Weekly Sale On 60% Off All Products</h2>

                <div className="flex gap-6 text-xl font-bold mb-8 text-black">
                  <div className="text-center">
                    <span className="block text-[2rem] text-black">{pad(timeLeft.days)}</span>
                    Days
                  </div>
                  <div className="text-center">
                    <span className="block text-[2rem] text-black">{pad(timeLeft.hours)}</span>
                    Hrs
                  </div>
                  <div className="text-center">
                    <span className="block text-[2rem] text-black">{pad(timeLeft.minutes)}</span>
                    Min
                  </div>
                  <div className="text-center">
                    <span className="block text-[2rem] text-black">{pad(timeLeft.seconds)}</span>
                    Sec
                  </div>
                </div>

                <div className="flex max-w-[400px]">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 py-3 px-4 border border-[#ccc] rounded-l-lg text-base"
                  />
                  <button className="font-bold border-none px-6 rounded-r-lg cursor-pointer hover:opacity-90 transition-opacity duration-300 bg-gradient-to-tr from-[#ff0000] to-[#ff9900] text-white">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4 - Best Sellers */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Best Sellers</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                {bestSellers.map((produit) => (
                  <div
                    key={produit.id}
                    className="group p-4 flex flex-col items-center justify-center rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={produit.image_url}
                      alt={produit.nom}
                      className="max-h-40 object-contain"
                    />
                    <h3 className="mt-4 font-bold text-center">{produit.nom}</h3>
                    <p className="text-gray-600 text-center">${Number(produit.prix).toFixed(2)}</p>
                    <a
                      href={route("details.show", produit.id)}
                      className="mt-2 opacity-0 group-hover:opacity-100 transition duration-300 text-pink-600 font-bold"
                    >
                      EXPLORE NOW →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5 - Newsletter */}
          <section className="h-auto flex flex-col text-center bg-[#F6F8FE]">
            <h3 className="mt-[8%] text-[#c70d0d]">JOIN OUR NEWSLETTER</h3>
            <h1 className="font-bold text-[30px] mb-[2%] mt-[1%]">Subscribe to get Updated with new offers</h1>
            <div className="mb-[8%]">
              <input 
                placeholder="Enter Email Address" 
                type="email"
                className="border-none w-[300px] rounded-[5%] p-2"
              />
              <button className="bg-gradient-to-tr from-[#ff0000] to-[#ff9900] py-2.5 px-4 rounded-[5px] text-white text-xs ml-[1%]">
                SUBSCRIBE NOW
              </button>
            </div>
          </section>
          
          <Footer/>
        </>
    );
}