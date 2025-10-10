import { Link, usePage, router } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import Nav from '@/Components/Nav';

export default function Produit({ bannerImage, featuredProducts }) {
  const { produits, categories, filters } = usePage().props;

  const handleAddToCart = (id) => {
  const formData = new FormData();
  formData.append('produit_id', id);
  
  router.post(route("cart.store"), formData);
};

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Nav />
      
      {/* Header Section */}
      <div className="bg-[#E8FAFA] flex justify-between items-center px-8 py-12 rounded-b-2xl shadow-sm">
        <div className="flex-1">
          <h2 className="font-bold text-4xl text-gray-800">Shop Category</h2>
          <p className="text-gray-600 mt-2 text-lg">Home - Shop Category</p>
        </div>
        <div className="flex-1 flex justify-end">
          <img 
            className="w-80 h-40 object-contain transform hover:scale-105 transition-transform duration-300" 
            src="/storage/banner/banner_img.png" 
            alt="Shop Category Banner" 
          />
        </div>
      </div>

      <div className="flex-grow p-8 max-w-7xl mx-auto w-full">
        {/* === Barre de recherche === */}
        <form method="get" className="my-12 text-center flex justify-center gap-4">
          <div className="relative w-[70%]">
            <input
              type="text"
              name="search"
              defaultValue={filters.search || ""}
              placeholder="Rechercher un produit..."
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-base transition-all focus:outline-none focus:border-[#f72585] focus:ring-4 focus:ring-[#f72585] focus:ring-opacity-20 shadow-sm"
            />
          </div>
          <button 
            type="submit"
            className="px-8 py-4 bg-[#f72585] text-white border-none rounded-2xl font-bold cursor-pointer hover:bg-[#d61c6e] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Rechercher
          </button>
        </form>

        <div className="flex gap-8">
          {/* === Sidebar Filtres === */}
          <aside className="w-72 bg-white p-6 rounded-2xl border border-gray-200 flex flex-col gap-6 shadow-lg">
            <h3 className="font-bold text-xl text-gray-800 border-b border-gray-200 pb-4">Filtres</h3>

            <div className="pb-6 border-b border-gray-200">
              <h4 className="font-bold text-gray-900 uppercase text-sm mb-4 tracking-wider">Catégories</h4>
              <ul className="list-none p-0 m-0 space-y-3">
                <li>
                  <Link 
                    href={route("produits")} 
                    method="get"
                    className="flex items-center gap-3 text-gray-600 hover:text-[#f72585] transition-all duration-200 py-2 px-3 rounded-lg hover:bg-pink-50 group"
                  >
                    <span className="w-2 h-2 bg-gray-400 rounded-full group-hover:bg-[#f72585] transition-colors"></span>
                    Toutes
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={route("produits")}
                      method="get"
                      data={{ categorie: cat.id, search: filters.search }}
                      className={`flex items-center gap-3 transition-all duration-200 py-2 px-3 rounded-lg group ${
                        Number(filters.categorie) === cat.id 
                          ? "text-[#f72585] font-bold bg-pink-50" 
                          : "text-gray-600 hover:text-[#f72585] hover:bg-pink-50"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full transition-colors ${
                        Number(filters.categorie) === cat.id ? "bg-[#f72585]" : "bg-gray-400 group-hover:bg-[#f72585]"
                      }`}></span>
                      {cat.nom}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pb-6 border-b border-gray-200">
              <h4 className="font-bold text-gray-900 uppercase text-sm mb-4 tracking-wider">Couleur</h4>
              <ul className="list-none p-0 m-0 space-y-3">
                <li>
                  <Link 
                    href={route("produits")} 
                    method="get"
                    className="flex items-center gap-3 text-gray-600 hover:text-[#f72585] transition-all duration-200 py-2 px-3 rounded-lg hover:bg-pink-50 group"
                  >
                    <span className="w-4 h-4 border-2 border-gray-400 rounded-full group-hover:border-[#f72585] transition-colors"></span>
                    Toutes
                  </Link>
                </li>
                <li>
                  <Link
                    href={route("produits")}
                    method="get"
                    data={{ couleur: "Blanc", search: filters.search }}
                    className={`flex items-center gap-3 transition-all duration-200 py-2 px-3 rounded-lg group ${
                      filters.couleur === "Blanc" 
                        ? "text-[#f72585] font-bold bg-pink-50" 
                        : "text-gray-600 hover:text-[#f72585] hover:bg-pink-50"
                    }`}
                  >
                    <span className={`w-4 h-4 border-2 rounded-full transition-colors ${
                      filters.couleur === "Blanc" ? "border-[#f72585] bg-white" : "border-gray-400 group-hover:border-[#f72585] bg-white"
                    }`}></span>
                    Blanc
                  </Link>
                </li>
                <li>
                  <Link
                    href={route("produits")}
                    method="get"
                    data={{ couleur: "Noir", search: filters.search }}
                    className={`flex items-center gap-3 transition-all duration-200 py-2 px-3 rounded-lg group ${
                      filters.couleur === "Noir" 
                        ? "text-[#f72585] font-bold bg-pink-50" 
                        : "text-gray-600 hover:text-[#f72585] hover:bg-pink-50"
                    }`}
                  >
                    <span className={`w-4 h-4 border-2 rounded-full transition-colors ${
                      filters.couleur === "Noir" ? "border-[#f72585] bg-gray-800" : "border-gray-400 group-hover:border-[#f72585] bg-gray-800"
                    }`}></span>
                    Noir
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          {/* === Liste Produits === */}
          <main className="flex-1">
            {produits.data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {produits.data.map((p) => (
                  <div 
                    key={p.id} 
                    className="bg-white border border-gray-200 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default group"
                  >
                    <div className="relative overflow-hidden rounded-xl mb-6">
                      <img 
                        src={p.image_url} 
                        alt={p.nom} 
                        className="w-full h-64 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" 
                      />
                      {p.reduction && (
                        <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          -{p.reduction}%
                        </span>
                      )}
                    </div>
                    
                    <div className="produit-info">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{p.nom}</h3>

                      {/* Prix avec promo si dispo */}
                      {p.reduction ? (
                        <div className="mb-4">
                          <div className="flex items-center justify-center gap-3">
                            <span className="text-gray-500 line-through text-lg">
                              {Number(p.prix).toFixed(2)} €
                            </span>
                            <span className="text-[#f72585] font-bold text-2xl">
                              {Number(p.prixFinal).toFixed(2)} €
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[#f72585] font-bold text-2xl mb-4">{p.prix} €</p>
                      )}

                      <div className="flex gap-3 mt-4">
                        <Link
                          href={route("details.show", p.id)}
                          className="flex-1 px-4 py-3 bg-white text-[#f72585] border-2 border-[#f72585] rounded-xl text-sm font-bold no-underline text-center hover:bg-[#f72585] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          <span>👁️</span>
                          EXPLORE
                        </Link>
                        <button
                          type="button"
                          className="flex-1 px-2 w-6 py-3 bg-[#f72585] text-white border-none rounded-xl text-sm font-bold cursor-pointer hover:bg-[#d61c6e] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                          onClick={() => handleAddToCart(p.id)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">😔</div>
                <p className="text-gray-600 text-xl mb-2">Aucun produit trouvé</p>
                <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </main>
        </div>

        {/* Pagination */}
        {produits.data.length > 0 && produits.links && produits.links.length > 3 && (
          <div className="flex justify-center mt-12">
            <div className="flex gap-2 bg-white p-4 rounded-2xl shadow-lg">
              {produits.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url || '#'}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    link.active
                      ? 'bg-[#f72585] text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-[#f72585]'
                  } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}