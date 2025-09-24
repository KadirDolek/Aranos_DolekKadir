import { Head, Link } from '@inertiajs/react';

export default function BlogCategory({ category, blogs, blogCategories, recentPosts }) {
    return (
        <>
            <Head title={`${category.name} - Aranoz Blog`} />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Catégorie: {category.name}</h1>
                    <p className="text-lg text-gray-600">{blogs.total} article(s) trouvé(s)</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Articles List */}
                    <div className="lg:col-span-3">
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

                        {/* Pagination */}
                        {blogs.links && (
                            <div className="mt-8 flex justify-center">
                                <div dangerouslySetInnerHTML={{ __html: blogs.links }} />
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Categories */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Catégories</h3>
                            <ul className="space-y-2">
                                {blogCategories.map((cat) => (
                                    <li key={cat.id} className="flex justify-between">
                                        <Link 
                                            href={route('blog.category', cat.id)} 
                                            className={`text-gray-700 hover:text-blue-600 ${cat.id === category.id ? 'font-bold text-blue-600' : ''}`}
                                        >
                                            {cat.name}
                                        </Link>
                                        <span className="text-gray-500">({cat.blogs_count})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Recent Posts */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Articles Récents</h3>
                            <ul className="space-y-3">
                                {recentPosts.map((post) => (
                                    <li key={post.id}>
                                        <Link href={route('blog.show', post.id)} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded">
                                            <img
                                                src={`/storage/blog/${post.image}`}
                                                alt={post.title}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <div>
                                                <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{post.title}</h4>
                                                <p className="text-gray-500 text-xs">
                                                    {new Date(post.created_at).toLocaleDateString('fr-FR')}
                                                </p>
                                            </div>
                                        </Link>
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