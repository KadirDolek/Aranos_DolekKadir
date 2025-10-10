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
    <div className="min-h-screen bg-gray-50">
      <NavAdmin/>
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#FD3266] to-[#FF6B9D] flex justify-between items-center py-8 px-6 lg:px-12">
        <div>
          <h2 className="font-bold text-3xl lg:text-4xl text-white">Categories Settings</h2>
          <p className="text-white/80 mt-2 text-lg">Aranoz - Shop System</p>
        </div>
        <div className="hidden md:block">
          <img className="w-48 h-32 object-contain" src={bannerImage} alt="Categories Banner" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto my-10 space-y-8 px-4 lg:px-6">
        
        {/* PRODUITS Categories */}
        <section className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#FD3266]">
              Produits Categories
            </h2>
            <form onSubmit={handleProduitSubmit} className="flex gap-3 w-full lg:w-auto">
              <input 
                type="text" 
                placeholder="New category..." 
                value={produitForm.data.nom} 
                onChange={(e) => produitForm.setData("nom", e.target.value)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD3266] focus:border-transparent bg-gray-50"
              />
              <button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg whitespace-nowrap">
                Add Category
              </button>
            </form>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {produitsCategories.map((cat) => (
              <div key={cat.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl hover:shadow-md transition-all">
                <span className="font-semibold text-gray-800">{cat.nom}</span>
                <button 
                  onClick={() => produitForm.delete(route('categories.produits.destroy', cat.id), { preserveScroll: true, preserveState: true })}
                  className="bg-gradient-to-r from-[#FD3266] to-[#FF6B9D] text-white py-2 px-4 text-sm font-medium rounded-lg hover:from-[#e02e5c] hover:to-[#e55a87] transition-all shadow-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* BLOG Categories */}
        <section className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#FD3266]">
              Blog Categories
            </h2>
            <form onSubmit={handleBlogSubmit} className="flex gap-3 w-full lg:w-auto">
              <input 
                type="text" 
                placeholder="New blog category..." 
                value={blogForm.data.nom} 
                onChange={(e) => blogForm.setData("nom", e.target.value)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD3266] focus:border-transparent bg-gray-50"
              />
              <button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg whitespace-nowrap">
                Add Category
              </button>
            </form>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogCategories.map((cat) => (
              <div key={cat.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl hover:shadow-md transition-all">
                <span className="font-semibold text-gray-800">{cat.nom}</span>
                <button 
                  onClick={() => blogForm.delete(route('categories.blog.destroy', cat.id), { preserveScroll: true, preserveState: true })}
                  className="bg-gradient-to-r from-[#FD3266] to-[#FF6B9D] text-white py-2 px-4 text-sm font-medium rounded-lg hover:from-[#e02e5c] hover:to-[#e55a87] transition-all shadow-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* TAGS */}
        <section className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#FD3266]">
              Tags
            </h2>
            <form onSubmit={handleTagSubmit} className="flex gap-3 w-full lg:w-auto">
              <input 
                type="text" 
                placeholder="New tag..." 
                value={tagForm.data.nom} 
                onChange={(e) => tagForm.setData("nom", e.target.value)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FD3266] focus:border-transparent bg-gray-50"
              />
              <button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg whitespace-nowrap">
                Add Tag
              </button>
            </form>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tags.map((tag) => (
              <div key={tag.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl hover:shadow-md transition-all">
                <span className="font-semibold text-gray-800">{tag.nom}</span>
                <button 
                  onClick={() => tagForm.delete(route('categories.tags.destroy', tag.id), { preserveScroll: true, preserveState: true })}
                  className="bg-gradient-to-r from-[#FD3266] to-[#FF6B9D] text-white py-2 px-4 text-sm font-medium rounded-lg hover:from-[#e02e5c] hover:to-[#e55a87] transition-all shadow-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>

      <Footer/>
    </div>
  )
}