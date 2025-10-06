import { useState } from "react";
import Nav from "@/Components/Nav";
import Footer from "@/Components/Footer";
import { router } from "@inertiajs/react";

export default function Default({ produit, prixFinal, reduction, specifications, bannerImage }) {
  const [activeTab, setActiveTab] = useState("description");
  const [activeImage, setActiveImage] = useState(produit.images[0] || "/placeholder.png");
  const [fade, setFade] = useState(false);

  const handleThumbnailClick = (img) => {
    setFade(true);
    setTimeout(() => {
      setActiveImage(img);
      setFade(false);
    }, 200);
  };

  const handleAddToCart = (id) => {
    router.post(route("cart.store"), { produit_id: id });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      {/* Header Section */}
      <div className="bg-[#E8FAFA] flex justify-between items-center py-8 px-4 md:px-8 lg:px-16">
        <div className="ml-4 md:ml-8 lg:ml-16">
          <h2 className="font-medium text-2xl md:text-3xl lg:text-4xl">Shop Single</h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">Home - Shop Single</p>
        </div>
        <div className="mr-4 md:mr-8 lg:mr-16">
          <img 
            className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-contain" 
            src={bannerImage} 
            alt="Product Details Banner" 
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto my-8 md:my-12 lg:my-16 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 px-4 md:px-6">
          {/* === Images produit === */}
          <div className="flex flex-col items-center space-y-6">
            {/* Main Image */}
            <div className="w-full max-w-md lg:max-w-lg bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <img
                src={activeImage}
                alt={produit.nom}
                className={`w-full h-64 md:h-80 object-contain transition-opacity duration-300 ease-in-out ${
                  fade ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>
            
            {/* Thumbnails */}
            <div className="flex flex-wrap justify-center gap-3">
              {produit.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => handleThumbnailClick(img)}
                  className={`p-1 rounded-lg border-2 transition-all duration-200 ${
                    img === activeImage 
                      ? "border-pink-500 bg-pink-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* === Infos produit === */}
          <div className="space-y-6 md:space-y-8">
            {/* Product Title */}
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {produit.nom}
              </h1>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-4 flex-wrap">
              {reduction ? (
                <>
                  <span className="text-gray-500 line-through text-lg md:text-xl">
                    {Number(produit.prix).toFixed(2)} €
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-red-600">
                    {Number(prixFinal).toFixed(2)} €
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    -{reduction}%
                  </span>
                </>
              ) : (
                <span className="text-2xl md:text-3xl font-bold text-red-600">
                  {Number(produit.prix).toFixed(2)} €
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <div>
              <button
                type="button"
                className="w-full md:w-auto px-8 py-3 bg-[#f72585] text-white rounded-lg font-bold cursor-pointer hover:bg-[#d61c6e] transform hover:-translate-y-1 active:translate-y-0 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => handleAddToCart(produit.id)}
              >
                Add to Cart
              </button>
            </div>

            {/* Product Meta */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Category:</span>
                <span className="text-gray-900">{produit.categorie?.nom}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Availability:</span>
                <span className={produit.stock > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {produit.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-1 md:space-x-4">
                {["description", "specification", "comments"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 md:px-6 py-3 text-sm md:text-base font-medium rounded-t-lg transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-black text-white border-b-2 border-black"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
              {activeTab === "description" && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {produit.description}
                  </p>
                </div>
              )}

              {activeTab === "specification" && specifications.length > 0 && (
                <div className="space-y-4">
                  {specifications.map((spec, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Width:</span>
                          <span className="ml-2 text-gray-900">{spec.width} cm</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Height:</span>
                          <span className="ml-2 text-gray-900">{spec.height} cm</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Depth:</span>
                          <span className="ml-2 text-gray-900">{spec.depth} cm</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Weight:</span>
                          <span className="ml-2 text-gray-900">{spec.weight} kg</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Quality Check:</span>
                          <span className="ml-2 text-gray-900">
                            {spec.quality_check ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "comments" && (
                <form className="space-y-4 bg-gray-50 rounded-lg p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Name" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                    <input 
                      type="email" 
                      placeholder="Email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Phone number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                  <textarea 
                    rows="4" 
                    placeholder="Message"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-vertical"
                  ></textarea>
                  <button 
                    type="submit" 
                    className="w-full md:w-auto px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
                  >
                    Submit Comment
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}