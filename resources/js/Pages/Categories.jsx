import Footer from '@/Components/Footer'
import NavAdmin from '@/Components/NavAdmin'
import React from 'react'
import { useForm } from '@inertiajs/react'

export default function Categories({ bannerImage, produitsCategories, blogCategories, tags }) {
  // forms
  const produitForm = useForm({ nom: "" })
  const blogForm = useForm({ nom: "" })
  const tagForm = useForm({ nom: "" })

  const handleProduitSubmit = (e) => {
    e.preventDefault()
    produitForm.post(route('categories.produits.store'), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => produitForm.reset(),
    })
  }

  const handleBlogSubmit = (e) => {
    e.preventDefault()
    blogForm.post(route('categories.blog.store'), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => blogForm.reset(),
    })
  }

  const handleTagSubmit = (e) => {
    e.preventDefault()
    tagForm.post(route('categories.tags.store'), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => tagForm.reset(),
    })
  }

  return (
    <div>
      <NavAdmin/>
      {/* Header Section */}
      <div className="bg-[#FEDADA] flex justify-center gap-12 items-center pt-4 pb-4">
        <div className="ml-[15%]">
          <h2 className="font-medium text-4xl">Categories Settings</h2>
          <p className="text-gray-600 mt-2">Aranoz - Shop System</p>
        </div>
        <div>
          <img className="w-full max-w-xs h-auto" src={bannerImage} alt="Categories Banner" />
        </div>
      </div>

      {/* PRODUITS Categories */}
      <section className="my-10 mx-auto max-w-2xl py-2.5">
        <h2 className="mb-4 text-xl font-bold text-[#FD3266] border-b-2 border-[#FD3266] pb-1.5">
          Produits Categories
        </h2>
        <ul className="list-none p-0 mb-4">
          {produitsCategories.map((cat) => (
            <li key={cat.id} className="flex justify-between items-center py-1.5 px-2.5 mb-1.5 bg-white border border-gray-300 rounded">
              {cat.nom}
              <button 
                onClick={() => produitForm.delete(route('categories.produits.destroy', cat.id), { preserveScroll: true, preserveState: true })}
                className="bg-[#FD3266] text-white border-none py-1 px-2.5 text-sm rounded cursor-pointer hover:bg-[#c81f4a] transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleProduitSubmit} className="flex gap-2.5 mt-2.5">
          <input 
            type="text" 
            placeholder="New category..." 
            value={produitForm.data.nom} 
            onChange={(e) => produitForm.setData("nom", e.target.value)}
            className="flex-1 py-1.5 px-2 border border-gray-300 rounded text-sm"
          />
          <button type="submit" className="bg-[#28a745] text-white border-none py-1.5 px-3 text-sm rounded cursor-pointer hover:bg-[#1e7e34] transition-colors">
            Create
          </button>
        </form>
      </section>

      {/* BLOG Categories */}
      <section className="my-10 mx-auto max-w-2xl py-2.5">
        <h2 className="mb-4 text-xl font-bold text-[#FD3266] border-b-2 border-[#FD3266] pb-1.5">
          Blog Categories
        </h2>
        <ul className="list-none p-0 mb-4">
          {blogCategories.map((cat) => (
            <li key={cat.id} className="flex justify-between items-center py-1.5 px-2.5 mb-1.5 bg-white border border-gray-300 rounded">
              {cat.nom}
              <button 
                onClick={() => blogForm.delete(route('categories.blog.destroy', cat.id), { preserveScroll: true, preserveState: true })}
                className="bg-[#FD3266] text-white border-none py-1 px-2.5 text-sm rounded cursor-pointer hover:bg-[#c81f4a] transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleBlogSubmit} className="flex gap-2.5 mt-2.5">
          <input 
            type="text" 
            placeholder="New blog category..." 
            value={blogForm.data.nom} 
            onChange={(e) => blogForm.setData("nom", e.target.value)}
            className="flex-1 py-1.5 px-2 border border-gray-300 rounded text-sm"
          />
          <button type="submit" className="bg-[#28a745] text-white border-none py-1.5 px-3 text-sm rounded cursor-pointer hover:bg-[#1e7e34] transition-colors">
            Create
          </button>
        </form>
      </section>

      {/* TAGS */}
      <section className="my-10 mx-auto max-w-2xl py-2.5">
        <h2 className="mb-4 text-xl font-bold text-[#FD3266] border-b-2 border-[#FD3266] pb-1.5">
          Tags
        </h2>
        <ul className="list-none p-0 mb-4">
          {tags.map((tag) => (
            <li key={tag.id} className="flex justify-between items-center py-1.5 px-2.5 mb-1.5 bg-white border border-gray-300 rounded">
              {tag.nom}
              <button 
                onClick={() => tagForm.delete(route('categories.tags.destroy', tag.id), { preserveScroll: true, preserveState: true })}
                className="bg-[#FD3266] text-white border-none py-1 px-2.5 text-sm rounded cursor-pointer hover:bg-[#c81f4a] transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleTagSubmit} className="flex gap-2.5 mt-2.5">
          <input 
            type="text" 
            placeholder="New tag..." 
            value={tagForm.data.nom} 
            onChange={(e) => tagForm.setData("nom", e.target.value)}
            className="flex-1 py-1.5 px-2 border border-gray-300 rounded text-sm"
          />
          <button type="submit" className="bg-[#28a745] text-white border-none py-1.5 px-3 text-sm rounded cursor-pointer hover:bg-[#1e7e34] transition-colors">
            Create
          </button>
        </form>
      </section>

      <Footer/>
    </div>
  )
}