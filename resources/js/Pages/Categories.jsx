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
      <div className="bg-[#FEDADA] flex justify-center gap-12 items-center py-8">
        <div className="ml-[15%]">
          <h2 className="font-medium text-4xl">Categories Settings</h2>
          <p className="text-gray-600 mt-2">Aranoz - Shop System</p>
        </div>
        <div>
          <img className="w-full max-w-xs h-auto" src={bannerImage} alt="Categories Banner" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto my-10 space-y-8 px-6">
        
        {/* PRODUITS Categories */}
        <section className="bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <h2 className="text-xl text-[#FD3266] border-b-2 border-[#FD3266] pb-2 mb-6 font-semibold">
            Produits Categories
          </h2>
          <div className="space-y-3 mb-6">
            {produitsCategories.map((cat) => (
              <div key={cat.id} className="flex justify-between items-center py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium text-gray-800">{cat.nom}</span>
                <button 
                  onClick={() => produitForm.delete(route('categories.produits.destroy', cat.id), { preserveScroll: true, preserveState: true })}
                  className="bg-[#FD3266] text-white py-2 px-4 text-sm font-medium rounded-lg hover:bg-[#e02e5c] transition-colors shadow-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <form onSubmit={handleProduitSubmit} className="flex gap-3">
            <input 
              type="text" 
              placeholder="New category..." 
              value={produitForm.data.nom} 
              onChange={(e) => produitForm.setData("nom", e.target.value)}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD3266] focus:border-transparent"
            />
            <button type="submit" className="bg-[#28a745] text-white py-3 px-6 text-sm font-medium rounded-lg hover:bg-[#218838] transition-colors shadow-md">
              Create
            </button>
          </form>
        </section>

        {/* BLOG Categories */}
        <section className="bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <h2 className="text-xl text-[#FD3266] border-b-2 border-[#FD3266] pb-2 mb-6 font-semibold">
            Blog Categories
          </h2>
          <div className="space-y-3 mb-6">
            {blogCategories.map((cat) => (
              <div key={cat.id} className="flex justify-between items-center py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium text-gray-800">{cat.nom}</span>
                <button 
                  onClick={() => blogForm.delete(route('categories.blog.destroy', cat.id), { preserveScroll: true, preserveState: true })}
                  className="bg-[#FD3266] text-white py-2 px-4 text-sm font-medium rounded-lg hover:bg-[#e02e5c] transition-colors shadow-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <form onSubmit={handleBlogSubmit} className="flex gap-3">
            <input 
              type="text" 
              placeholder="New blog category..." 
              value={blogForm.data.nom} 
              onChange={(e) => blogForm.setData("nom", e.target.value)}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD3266] focus:border-transparent"
            />
            <button type="submit" className="bg-[#28a745] text-white py-3 px-6 text-sm font-medium rounded-lg hover:bg-[#218838] transition-colors shadow-md">
              Create
            </button>
          </form>
        </section>

        {/* TAGS */}
        <section className="bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <h2 className="text-xl text-[#FD3266] border-b-2 border-[#FD3266] pb-2 mb-6 font-semibold">
            Tags
          </h2>
          <div className="space-y-3 mb-6">
            {tags.map((tag) => (
              <div key={tag.id} className="flex justify-between items-center py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium text-gray-800">{tag.nom}</span>
                <button 
                  onClick={() => tagForm.delete(route('categories.tags.destroy', tag.id), { preserveScroll: true, preserveState: true })}
                  className="bg-[#FD3266] text-white py-2 px-4 text-sm font-medium rounded-lg hover:bg-[#e02e5c] transition-colors shadow-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <form onSubmit={handleTagSubmit} className="flex gap-3">
            <input 
              type="text" 
              placeholder="New tag..." 
              value={tagForm.data.nom} 
              onChange={(e) => tagForm.setData("nom", e.target.value)}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD3266] focus:border-transparent"
            />
            <button type="submit" className="bg-[#28a745] text-white py-3 px-6 text-sm font-medium rounded-lg hover:bg-[#218838] transition-colors shadow-md">
              Create
            </button>
          </form>
        </section>

      </div>

      <Footer/>
    </div>
  )
}