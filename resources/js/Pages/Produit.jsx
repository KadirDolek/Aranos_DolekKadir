import { Link, usePage, router } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import Nav from '@/Components/Nav';

export default function Produit({ bannerImage }) {
  const { produits, categories, filters } = usePage().props;

  const handleAddToCart = (id) => {
    router.post(route("cart.store"), { produit_id: id });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      {/* Header Section */}
      <div className="bg-[#E8FAFA] flex justify-center gap-12 items-center py-8">
        <div className="ml-[15%]">
          <h2 className="font-medium text-4xl">Shop Category</h2>
          <p className="text-gray-600 mt-2">Home - Shop Category</p>
        </div>
        <div>
          <img className="w-full max-w-xs h-auto" src={bannerImage} alt="Shop Category Banner" />
        </div>
      </div>

      <div className="flex-grow p-5">
        {/* === Barre de recherche === */}
        <form method="get" className="my-8 text-center flex justify-center gap-2.5">
          <input
            type="text"
            name="search"
            defaultValue={filters.search || ""}
            placeholder="Rechercher un produit..."
            className="w-[60%] px-3.5 py-3 border border-gray-300 rounded text-sm transition-all focus:outline-none focus:border-[#f72585] focus:ring-2 focus:ring-[#f72585] focus:ring-opacity-20"
          />
          <button 
            type="submit"
            className="px-5 py-3 bg-[#f72585] text-white border-none rounded font-bold cursor-pointer hover:bg-[#d61c6e] transition-colors"
          >
            Rechercher
          </button>
        </form>

        <div className="flex gap-8 max-w-7xl mx-auto">
          {/* === Sidebar Filtres === */}
          <aside className="w-60 bg-gray-50 p-5 rounded-lg border border-gray-300 flex flex-col gap-6">
            <h3 className="font-bold text-lg">Filtres</h3>

            <div className="pb-4 border-b border-gray-200">
              <h4 className="font-bold text-gray-900 uppercase text-sm mb-2.5">Catégories</h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-2">
                  <Link 
                    href={route("produits")} 
                    method="get"
                    className="text-gray-600 hover:text-[#f72585] transition-colors"
                  >
                    Toutes
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id} className="mb-2">
                    <Link
                      href={route("produits")}
                      method="get"
                      data={{ categorie: cat.id, search: filters.search }}
                      className={`transition-colors ${
                        Number(filters.categorie) === cat.id 
                          ? "text-[#f72585] font-bold" 
                          : "text-gray-600 hover:text-[#f72585]"
                      }`}
                    >
                      {cat.nom}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pb-4 border-b border-gray-200">
              <h4 className="font-bold text-gray-900 uppercase text-sm mb-2.5">Couleur</h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-2">
                  <Link 
                    href={route("produits")} 
                    method="get"
                    className="text-gray-600 hover:text-[#f72585] transition-colors"
                  >
                    Toutes
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href={route("produits")}
                    method="get"
                    data={{ couleur: "Blanc", search: filters.search }}
                    className={`transition-colors ${
                      filters.couleur === "Blanc" 
                        ? "text-[#f72585] font-bold" 
                        : "text-gray-600 hover:text-[#f72585]"
                    }`}
                  >
                    Blanc
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href={route("produits")}
                    method="get"
                    data={{ couleur: "Noir", search: filters.search }}
                    className={`transition-colors ${
                      filters.couleur === "Noir" 
                        ? "text-[#f72585] font-bold" 
                        : "text-gray-600 hover:text-[#f72585]"
                    }`}
                  >
                    Noir
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          {/* === Liste Produits === */}
          <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {produits.data.length > 0 ? (
              produits.data.map((p) => (
                <div 
                  key={p.id} 
                  className="bg-white border border-gray-200 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
                >
                  <img 
                    src={p.image_url} 
                    alt={p.nom} 
                    className="w-full h-56 object-cover rounded-lg mb-4" 
                  />
                  <div className="produit-info">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{p.nom}</h3>

                    {/* Prix avec promo si dispo */}
                    {p.reduction ? (
                      <p className="mb-3">
                        <span className="text-gray-500 line-through mr-2">
                          {Number(p.prix).toFixed(2)} €
                        </span>
                        <span className="text-[#f72585] font-bold">
                          {Number(p.prixFinal).toFixed(2)} €
                        </span>
                        <span className="text-green-600 text-sm ml-2">(-{p.reduction}%)</span>
                      </p>
                    ) : (
                      <p className="text-[#f72585] font-bold mb-3">{p.prix} €</p>
                    )}

                    <div className="flex justify-center gap-2.5 mt-2">
                      <Link
                        href={route("details.show", p.id)}
                        className="flex-1 min-w-25 px-3.5 py-2 bg-white text-[#f72585] border-2 border-[#f72585] rounded text-sm font-bold no-underline text-center hover:bg-[#f72585] hover:text-white hover:-translate-y-0.5 transition-all"
                      >
                        EXPLORE NOW →
                      </Link>
                      <button
                        type="button"
                        className="flex-1 min-w-25 px-3.5 py-2 bg-[#f72585] text-white border-none rounded text-sm font-bold cursor-pointer hover:bg-[#d61c6e] hover:-translate-y-0.5 active:translate-y-0 transition-all"
                        onClick={() => handleAddToCart(p.id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-full py-8">Aucun produit trouvé</p>
            )}
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}