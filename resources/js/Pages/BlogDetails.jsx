import Footer from '@/Components/Footer'
import Nav from '@/Components/Nav'
import React, { useState } from 'react'
import { usePage, router, Link } from '@inertiajs/react'

export default function BlogDetails({ bannerImage }) {
  const { blog, categories, tags, recentPosts, auth } = usePage().props

  const [form, setForm] = useState({
    message: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    router.post(route('blog.comment', blog.id), form)
    setForm({ message: '' })
  }

  return (
    <div>
      <Nav />
      
      {/* Bannière */}
      <div className="bg-[#E8FAFA] flex justify-center gap-12 items-center py-8">
        <div className="ml-[15%]">
          <h2 className="font-medium text-4xl">Blog Details</h2>
          <p className="text-gray-600 mt-2">{blog.titre}</p>
        </div>
        <div>
          <img className="w-full max-w-xs h-auto" src={bannerImage} alt="Blog Details Banner" />
        </div>
      </div>

      <div className="flex justify-between mx-[15%] my-10 gap-8">
        {/* Partie gauche */}
        <div className="flex-2 flex flex-col gap-8">
          {/* Blog en question */}
          <div className="bg-white rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
            <img src={`/${blog.blog_path}`} alt={blog.titre} className="w-full h-auto" />
            <div className="p-5">
              <h2 className="text-2xl font-bold mb-3">{blog.titre}</h2>
              <p className="text-gray-700 leading-relaxed">{blog.description}</p>
            </div>
          </div>

          {/* Commentaires */}
          <div className="bg-white p-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] mt-10">
            <h3 className="mb-5 text-xl text-gray-800">{blog.commentaires.length} Comments</h3>
            {blog.commentaires.map((comment, i) => (
              <div key={i} className="py-4 border-b border-gray-200 last:border-b-0">
                <p className="mb-1">
                  <strong className="text-[#f72585]">{comment.user?.pseudo}</strong>
                  {" - "}
                  {new Date(comment.created_at).toLocaleDateString()}{" "}
                  {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-gray-700 leading-relaxed">{comment.message}</p>
              </div>
            ))}

            <hr className="my-6" />

            {/* Leave a reply */}
            {auth?.user ? (
              <div className="mt-8">
                <h3 className="mb-4 text-xl text-gray-800">Leave a Reply</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <textarea
                    name="message"
                    placeholder="Write a comment"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="min-h-[120px] p-3 border border-gray-300 rounded resize-y"
                  />
                  <button 
                    type="submit" 
                    className="bg-[#f72585] text-white p-3 rounded font-bold cursor-pointer hover:bg-[#d61c6e] transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            ) : (
              <p className="text-gray-700">
                <Link href={route('login')} className="text-[#f72585] hover:underline">
                  Connectez-vous
                </Link> pour laisser un commentaire.
              </p>
            )}
          </div>
        </div>

        {/* Partie droite : sidebar */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Search */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <form onSubmit={(e) => {
              e.preventDefault()
              const q = e.target.search.value
              router.get(route('blog'), { search: q })
            }}>
              <input
                type="text"
                name="search"
                placeholder="Search Keyword"
                className="w-full p-2.5 mb-2.5 border border-gray-300 rounded"
              />
              <button type="submit" className="bg-[#f72585] text-white p-2.5 w-full rounded cursor-pointer hover:bg-[#d61c6e] transition-colors">
                SEARCH
              </button>
            </form>
          </div>

          {/* Catégories */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h4 className="font-bold mb-3">Category</h4>
            <ul className="list-none p-0 m-0">
              {categories.map((cat, i) => (
                <li key={i} className="py-1.5 border-b border-gray-200 cursor-pointer hover:text-[#f72585] transition-colors last:border-b-0">
                  {cat.nom} ({cat.blogs_count})
                </li>
              ))}
            </ul>
          </div>

          {/* Posts récents */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h4 className="font-bold mb-3">Recent Post</h4>
            <ul className="list-none p-0 m-0">
              {recentPosts.map((post, i) => (
                <li key={i} className="py-1.5 border-b border-gray-200 last:border-b-0">
                  <Link href={route('blog.show', post.id)} className="hover:text-[#f72585] transition-colors">
                    <span>{post.titre.substring(0, 25)}...</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h4 className="font-bold mb-3">Tag Clouds</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span key={i} className="bg-gray-200 py-1.5 px-3 rounded text-sm hover:text-[#f72585] transition-colors cursor-pointer">
                  {tag.nom} ({tag.blogs_count})
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h4 className="font-bold mb-3">Newsletter</h4>
            <input type="email" placeholder="Enter email" className="w-full p-2.5 mb-2.5 border border-gray-300 rounded" />
            <button className="bg-[#f72585] text-white p-2.5 w-full rounded cursor-pointer hover:bg-[#d61c6e] transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}