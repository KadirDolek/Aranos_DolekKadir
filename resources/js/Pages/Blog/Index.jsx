import { Head, Link } from '@inertiajs/react';

export default function BlogIndex({ featuredBlog, blogCategories, recentPosts, tags }) {
    return (
        <>
            <Head title="Blog - Aranoz" />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">Discover Our Blogs</h1>
                    <p className="text-xl text-gray-600">Explorez nos derniers articles et découvertes</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Column */}
                    <div className="lg:col-span-3">
                        {/* Featured Blog */}
                        {featuredBlog && (
                            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                                <div className="relative">
                                    <div className="absolute top-4 left-4 bg-white p-3 text-center rounded shadow">
                                        <div className="text-2xl font-bold text-gray-800">
                                            {new Date(featuredBlog.created_at).getDate()}
                                        </div>
                                        <div className="text-sm font-medium text-gray-600">
                                            {new Date(featuredBlog.created_at).toLocaleString('fr-FR', { month: 'short' })}
                                        </div>
                                    </div>
                                    <img
                                        src={`/storage/blog/${featuredBlog.image}`}
                                        alt={featuredBlog.title}
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{featuredBlog.title}</h2>
                                    <p className="text-gray-600 mb-4">{featuredBlog.description}</p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>
                                            {featuredBlog.tags?.map(tag => tag.name).join(', ')} | 
                                            {featuredBlog.comments?.length || 0} Commentaires
                                        </span>
                                        <Link href={route('blog.show', featuredBlog.id)} className="text-blue-600 hover:text-blue-800 font-medium">
                                            Lire la suite →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Recent Posts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {recentPosts.map((post) => (
                                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img
                                        src={`/storage/blog/${post.image}`}
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.description}</p>
                                        <Link href={route('blog.show', post.id)} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                                            Lire la suite →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Search */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Recherche</h3>
                            <form action={route('blog.search')} method="GET" className="flex">
                                <input
                                    type="text"
                                    name="keyword"
                                    placeholder="Mot-clé..."
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

                        {/* Tags */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <Link key={tag.id} href="#" className="bg-gray-100 hover:bg-blue-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                        {tag.name} ({tag.blogs_count})
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}