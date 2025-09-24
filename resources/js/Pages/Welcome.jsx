import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Welcome({ auth, featuredBlog, blogCategories, recentPosts, tags }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <>
            <Head title="Aranoz - Accueil" />
            
            {/* Navbar */}
            <nav className="bg-blue-50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-bold text-gray-800">
                                Aranoz.
                            </Link>
                        </div>

                        {/* Menu principal */}
                        <div className="hidden md:flex items-center space-x-8">
    {/* Home - Simple lien */}
    <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
        Home
    </Link>

    {/* Shop - Dropdown */}
    <div className="relative group">
        <button className="text-gray-600 hover:text-gray-900 font-medium flex items-center">
            Shop
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
            <Link href="/shop/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Tous les produits
            </Link>
            <Link href="/shop/new-arrivals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Nouveautés
            </Link>
        </div>
    </div>

    {/* Blog - Dropdown */}
    <div className="relative group">
        <button className="text-gray-600 hover:text-gray-900 font-medium flex items-center">
            Blog
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
            <Link href="/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Nos blogs
            </Link>
        </div>
    </div>

    {/* Contact - Simple lien */}
    <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">
        Contact
    </Link>
</div>

                        {/* User Dropdown */}
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 transition duration-200"
                                    >
                                        <span className="text-lg">👤</span>
                                        <span className="font-medium text-gray-700">{auth.user.first_name}</span>
                                        <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-900">{auth.user.first_name} {auth.user.last_name}</p>
                                                <p className="text-xs text-gray-500">{auth.user.email}</p>
                                                <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                                                    {auth.user.role?.name || 'Utilisateur'}
                                                </span>
                                            </div>
                                            {auth.user.role?.name === 'admin' && (
                                                <>
                                                    <Link href={route('dashboard')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>
                                                        📊 Dashboard
                                                    </Link>
                                                    <Link href={route('admin.users.index')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>
                                                        ⚙️ Gestion Utilisateurs
                                                    </Link>
                                                </>
                                            )}
                                            <Link href={route('profile.edit')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>
                                                👤 Mon Profil
                                            </Link>
                                            <div className="border-t border-gray-100">
                                                <Link href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>
                                                    🚪 Déconnexion
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex space-x-3">
                                    <Link href={route('login')} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium transition duration-200">
                                        Log in
                                    </Link>
                                    <Link href={route('register')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-200">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">Bienvenue chez Aranoz</h1>
                    <p className="text-xl text-gray-600">Découvrez nos produits et actualités</p>
                </div>
            </div>

           <div className="mt-12">
            <div  className="flex px-40 justify-around">
                    <div className="bg-blue-50 w-[700px] h-96">
                            <p className="p-8 font-serif">Premium Quality</p>
                            <h3 className="px-8 font-bold text-3xl">Fauteuils</h3>
                            <img
                                src={`/storage/product/offer_img.png`}
                                className="object-cover -mt-6 ml-auto me-16"
                                />

                    </div>
                    <div  className="bg-blue-50 w-[500px] h-96">
                            <p className="p-8 font-serif">Premium Quality</p>
                            <h3 className="px-8 font-bold text-3xl">Canapés</h3>
                            <img
                                src={`/storage/product/feature_4.png`}
                                className="object-cover ml-auto me-16"
                                />
                    </div>
            </div>
            <div className="flex px-40 justify-around mt-12">  
                    <div className="bg-blue-50 w-[500px] h-96">
                            <p className="p-8 font-serif">Premium Quality</p>
                            <h3 className="px-8 font-bold text-3xl">Fauteuils</h3>
                            <img
                                src={`/storage/product/feature_3.png`}
                                className="object-cover -mt-5 ml-auto me-12"
                                />
                    </div>
                    <div  className="bg-blue-50 w-[700px] h-96">
                            <p className="p-8 font-serif">Premium Quality</p>
                            <h3 className="px-8 font-bold text-3xl">Chaises</h3>
                            <img
                                src={`/storage/product/feature_2.png`}
                                className="object-cover -mt-6 ml-auto me-16"
                                />
                    </div>
            </div>
           </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex justify-center space-x-8 mb-6">
                        <Link href="/" className="hover:text-blue-300">Home</Link>
                        <Link href="/shop" className="hover:text-blue-300">Shop</Link>
                        <Link href="/blog" className="hover:text-blue-300">Blog</Link>
                        <Link href="/contact" className="hover:text-blue-300">Contact</Link>
                    </div>
                    <p className="text-gray-400">© 2024 Aranoz. Tous droits réservés.</p>
                </div>
            </footer>

            {/* Dropdown Overlay */}
            {isDropdownOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
            )}
        </>
    );
}
