import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Welcome({ auth }) {
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
                            <Link
                                href="/"
                                className="text-2xl font-bold text-gray-800"
                            >
                                Aranoz.
                            </Link>
                        </div>

                        {/* Menu principal */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                href="/shop"
                                className="text-gray-600 hover:text-gray-900 font-medium"
                            >
                                Shop
                            </Link>
                            <Link
                                href="/blog"
                                className="text-gray-600 hover:text-gray-900 font-medium"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/contact"
                                className="text-gray-600 hover:text-gray-900 font-medium"
                            >
                                Contact
                            </Link>
                        </div>

                        {/* Côté droit - Dropdown utilisateur ou boutons login/register */}
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <div className="relative">
                                    {/* Bouton dropdown avec emoji */}
                                    <button
                                        onClick={() =>
                                            setIsDropdownOpen(!isDropdownOpen)
                                        }
                                        className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 transition duration-200"
                                    >
                                        <span className="text-lg">👤</span>
                                        <span className="font-medium text-gray-700">
                                            {auth.user.first_name}
                                        </span>
                                        <svg
                                            className={`w-4 h-4 transition-transform ${
                                                isDropdownOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>

                                    {/* Dropdown menu */}
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {auth.user.first_name}{" "}
                                                    {auth.user.last_name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {auth.user.email}
                                                </p>
                                                <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                                                    {auth.user.role?.name ||
                                                        "Utilisateur"}
                                                </span>
                                            </div>
                                            {auth.user.role?.name ===
                                                "admin" && (
                                                <Link
                                                    href={route("dashboard")}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() =>
                                                        setIsDropdownOpen(false)
                                                    }
                                                >
                                                    📊 Dashboard
                                                </Link>
                                            )}

                                            {auth.user.role?.name ===
                                                "admin" && (
                                                <Link
                                                    href={route(
                                                        "admin.users.index"
                                                    )}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() =>
                                                        setIsDropdownOpen(false)
                                                    }
                                                >
                                                    ⚙️ Gestion Utilisateurs
                                                </Link>
                                            )}

                                            <Link
                                                href={route("profile.edit")}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            >
                                                👤 Mon Profil
                                            </Link>

                                            <div className="border-t border-gray-100">
                                                <Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                    onClick={() =>
                                                        setIsDropdownOpen(false)
                                                    }
                                                >
                                                    🚪 Déconnexion
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex space-x-3">
                                    <Link
                                        href={route("login")}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium transition duration-200"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-200"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Discover Our Blogs */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 h-120 flex justify-center">
                <div className="px-6 mt-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Discover Our Blogs
                    </h1>
                    <div className="inline-block px-4 py-2 rounded-lg shadow-sm">
                        <span className="text-gray-700 font-medium">
                            Blog - Blogs table
                        </span>
                    </div>
                </div>
                <div>
                    <img
                        className="mt-12"
                        src={"storage/banner/feature_1.png"}
                        alt="Feature banner"
                    />
                </div>
            </div>
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Colonne principale - Article vedette */}
                        <div className="lg:col-span-3">
                            {/* Article vedette */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="relative">
                                    {/* Date en overlay */}
                                    <div className="absolute top-4 left-4 bg-white p-3 text-center rounded shadow">
                                        <div className="text-2xl font-bold text-gray-800">
                                            30
                                        </div>
                                        <div className="text-sm font-medium text-gray-600">
                                            Apr
                                        </div>
                                    </div>
                                    {/* Image de l'article */}
                                    <img
                                        src="/storage/blog-images/featured.jpg"
                                        alt="Aranoz grand opening party"
                                        className="w-full h-64 object-cover"
                                    />
                                </div>

                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                        Aranoz grand opening party
                                    </h2>
                                    <p className="text-gray-600 mb-4">
                                        MCSE boot camps have its supporters and
                                        its detractors. Some people do not
                                        understand why you should have to spend
                                        money on boot camp when you can get...
                                    </p>

                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>
                                            Housing, World, | Q: 3 Comments
                                        </span>
                                        <Link
                                            href="/blog/1"
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Read More →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar droite */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Barre de recherche - EN HAUT de la sidebar */}
                            <div className="bg-white rounded-lg shadow-md p-6 w-54">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                    Recherche par mots-clés
                                </h3>
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Recherche..."
                                        className="flex-1 px-4 rounded-l-lg focus:outline-none focus:ring-0 border border-gray-300"
                                    />
                                    <button className="bg-blue-600 text-white px-4 rounded-r-lg w-12 h-12">
                                        🔍
                                    </button>
                                </div>
                            </div>

                            {/* Catégories - EN DESSOUS de la recherche */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Category
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex justify-between">
                                        <span className="text-gray-700">
                                            Travel
                                        </span>
                                        <span className="text-gray-500">
                                            (0)
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-gray-700">
                                            Health Care
                                        </span>
                                        <span className="text-gray-500">
                                            (1)
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-gray-700">
                                            Discover
                                        </span>
                                        <span className="text-gray-500">
                                            (1)
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-gray-700">
                                            Fashion
                                        </span>
                                        <span className="text-gray-500">
                                            (1)
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-gray-700">
                                            Business
                                        </span>
                                        <span className="text-gray-500">
                                            (2)
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex justify-center space-x-8 mb-6">
                        <Link href="/" className="hover:text-blue-300">
                            Home
                        </Link>
                        <Link href="/shop" className="hover:text-blue-300">
                            Shop
                        </Link>
                        <Link href="/blog" className="hover:text-blue-300">
                            Blog
                        </Link>
                        <Link href="/contact" className="hover:text-blue-300">
                            Contact
                        </Link>
                    </div>
                    <p className="text-gray-400">
                        © 2024 Aranoz. Tous droits réservés.
                    </p>
                </div>
            </footer>

            {/* Fermer le dropdown quand on clique ailleurs */}
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                />
            )}
        </>
    );
}
