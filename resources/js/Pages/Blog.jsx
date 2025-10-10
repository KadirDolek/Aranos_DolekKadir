import Footer from '@/Components/Footer'
import Nav from '@/Components/Nav'
import React from 'react'
import { Link, router, usePage } from '@inertiajs/react'

export default function Blog({bannerImage}) {
  const { blogs, categories, tags, filters } = usePage().props
  const [search, setSearch] = React.useState(filters.search || '')

  const handleSearch = (e) => {
    e.preventDefault()
    router.get(route('blog'), { search })
  }

  const filterByCategory = (cat) => {
    router.get(route('blog'), { categorie: cat })
  }

  const filterByTag = (tag) => {
    router.get(route('blog'), { tag })
  }

  return (
    <div>
      <Nav />
      {/* Bannière */}
      <div className="bg-[#E8FAFA] flex justify-center gap-12 items-center py-8">
        <div className="ml-[15%]">
          <h2 className="font-medium text-4xl">Discover our Blogs</h2>
          <p className="text-gray-600 mt-2">Blog - Blogs table</p>
        </div>
        <div>
          <img className="w-full max-w-xs h-auto" src={bannerImage} alt="Blog Banner" />
        </div>
      </div>

      {/* Container principal */}
      <div className="flex justify-between mx-[15%] my-10 gap-8">
        {/* Partie gauche : blogs */}
        <div className="flex-2 flex flex-col gap-8">
          {blogs.map((blog, index) => {
            const date = new Date(blog.created_at);
            const day = date.getDate();
            const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();

            return (
              <div className="bg-white rounded-lg overflow-hidden relative shadow-[0_2px_8px_rgba(0,0,0,0.1)]" key={index}>
                <Link href={route('blog.show', blog.id)}>
                  <img src={blog.blog_path} alt={blog.titre} className="w-full h-auto" />
                </Link>
                <div className="absolute top-5 left-5 bg-[#f72585] text-white p-2.5 rounded text-center">
                  <span className="font-bold text-lg block">{day}</span>
                  <span className="text-sm">{month}</span>
                </div>
                <div className="p-5">
                  <h3>
                    <Link className="font-bold hover:text-[#f72585] transition-colors" href={route('blog.show', blog.id)}>
                      {blog.titre}
                    </Link>
                  </h3>
                  <p className="mt-2 text-gray-700">{blog.description.substring(0, 150)}...</p>
                  <div className="mt-2.5 text-sm text-gray-600">
                    <span>Catégorie: {blog.categorie?.nom}</span>
                    <span> | {blog.commentaires?.length ?? 1} Commentaires</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Partie droite : sidebar */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Search */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search Keyword"
                className="w-full p-2.5 mb-2.5 border border-gray-300 rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                <li 
                  key={i} 
                  onClick={() => filterByCategory(cat.nom)} 
                  className="py-1.5 border-b border-gray-200 cursor-pointer hover:text-[#f72585] transition-colors last:border-b-0"
                >
                  {cat.nom} ({cat.blogs_count})
                </li>
              ))}
            </ul>
          </div>

          {/* Posts récents */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h4 className="font-bold mb-3">Recent Post</h4>
            <ul className="list-none p-0 m-0">
              {blogs.slice(0, 3).map((post, i) => {
                const date = new Date(post.created_at);
                const day = date.getDate();
                const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                const year = date.getFullYear().toString().slice(-2);

                return (
                  <li key={i} className="py-1.5 border-b border-gray-200 last:border-b-0">
                    <span className="hover:text-[#f72585] transition-colors cursor-pointer">{post.titre.substring(0, 25)}...</span>
                    <br />
                    <small className="text-gray-500 text-sm">{month} {day}, {year}</small>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Tags */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h4 className="font-bold mb-3">Tag Clouds</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-200 py-1.5 px-3 rounded text-sm cursor-pointer hover:text-[#f72585] transition-colors"
                  onClick={() => filterByTag(tag.nom)}
                >
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