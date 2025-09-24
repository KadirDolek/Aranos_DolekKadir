import { Head, Link } from '@inertiajs/react';

export default function BlogShow({ blog, blogCategories, recentPosts }) {
    return (
        <>
            <Head title={`${blog.title} - Aranoz`} />
            
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Article Content */}
                    <div className="lg:col-span-3">
                        <article className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={`/storage/blog/${blog.image}`}
                                alt={blog.title}
                                className="w-full h-96 object-cover"
                            />
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-gray-500">
                                        Par {blog.user?.first_name} {blog.user?.last_name}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(blog.created_at).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                                
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
                                
                                <div className="flex items-center space-x-4 mb-6">
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                        {blog.category?.name}
                                    </span>
                                    <div className="flex space-x-2">
                                        {blog.tags?.map((tag) => (
                                            <span key={tag.id} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                                #{tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="prose max-w-none text-gray-700">
                                    <p className="text-lg leading-relaxed">{blog.description}</p>
                                    {/* Ajoutez ici le contenu complet de l'article */}
                                </div>

                                {/* Comments Section */}
                                <div className="mt-8 border-t pt-6">
                                    <h3 className="text-xl font-bold mb-4">Commentaires ({blog.comments?.length || 0})</h3>
                                    {/* Ajoutez ici le système de commentaires */}
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
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