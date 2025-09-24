import { Head, Link } from '@inertiajs/react';

export default function BlogSearch({ blogs, query, blogCategories, recentPosts }) {
    return (
        <>
            <Head title={`Résultats pour "${query}" - Aranoz Blog`} />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Résultats de recherche</h1>
                    <p className="text-lg text-gray-600">
                        {blogs.total} article(s) trouvé(s) pour "{query}"
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Search Results */}
                    <div className="lg:col-span-3">
                        {blogs.data.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {blogs.data.map((blog) => (
                                    <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <img
                                            src={`/storage/blog/${blog.image}`}
                                            alt={blog.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="font-bold text-gray-900 mb-2">{blog.title}</h3>
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{blog.description}</p>
                                            <Link href={route('blog.show', blog.id)} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                                                Lire la suite →
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">Aucun article trouvé pour "{query}"</p>
                                <Link href={route('blog.index')} className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
                                    Retour au blog
                                </Link>
                            </div>
                        )}

                        {/* Pagination */}
                        {blogs.links && blogs.data.length > 0 && (
                            <div className="mt-8 flex justify-center">
                                <div dangerouslySetInnerHTML={{ __html: blogs.links }} />
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Search Box */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Nouvelle recherche</h3>
                            <form action={route('blog.search')} method="GET" className="flex">
                                <input
                                    type="text"
                                    name="keyword"
                                    placeholder="Mot-clé..."
                                    defaultValue={query}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
                                    🔍
                                </button>
                            </form>
                        </div>

                        {/* Categories */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Catégories</h3>
                            <ul className="space-y-2">
                                {blogCategories.map((category) => (
                                    <li key={category.id} className="flex justify-between">
                                        <Link href={route('blog.category', category.id)} className="text-gray-700 hover:text-blue-600">
                                            {category.name}
                                        </Link>
                                        <span className="text-gray-500">({category.blogs_count})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}