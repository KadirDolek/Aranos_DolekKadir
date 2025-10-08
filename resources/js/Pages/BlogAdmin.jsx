import Footer from '@/Components/Footer'
import NavAdmin from '@/Components/NavAdmin'
import { usePage, router, useForm } from '@inertiajs/react'
import { useState } from 'react'

export default function BlogAdmin({ bannerImage }) {
  const { blogs, categories } = usePage().props
  const [editingId, setEditingId] = useState(null)
  const [showingId, setShowingId] = useState(null)

  const { data, setData, post, reset, processing, errors } = useForm({
    titre: '',
    description: '',
    blogcategorie_id: '',
    blog_path: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route('blogs.store'), {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        reset()
        alert('Blog créé avec succès !')
      },
      onError: (errors) => {
        console.error('Erreurs:', errors)
        alert('Erreur lors de la création: ' + JSON.stringify(errors))
      }
    })
  }

  const handleEdit = (blog) => {
    setEditingId(blog.id)
    setData({
      titre: blog.titre,
      description: blog.description,
      blogcategorie_id: blog.blogcategorie_id,
      blog_path: null
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('titre', data.titre)
    formData.append('description', data.description)
    formData.append('blogcategorie_id', data.blogcategorie_id)
    if (data.blog_path) {
      formData.append('blog_path', data.blog_path)
    }
    
    router.post(route('blogs.update', editingId), formData, {
      preserveScroll: true,
      onSuccess: () => {
        setEditingId(null)
        reset()
        alert('Blog mis à jour avec succès !')
      },
      onError: (errors) => {
        console.error('Erreurs:', errors)
        alert('Erreur lors de la mise à jour: ' + JSON.stringify(errors))
      }
    })
  }

  const handleDelete = (id) => {
    if (confirm('Supprimer ce blog ?')) {
      router.delete(route('blogs.destroy', id), {
        preserveScroll: true,
        onSuccess: () => {
          alert('Blog supprimé avec succès !')
        }
      })
    }
  }

  const handleShow = (id) => {
    setShowingId(showingId === id ? null : id)
  }

  const cancelEdit = () => {
    setEditingId(null)
    reset()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavAdmin />
      
      {/* Header Section */}
      <div className="bg-[#FEDADA] flex justify-between items-center px-8 py-6 rounded-b-2xl shadow-sm">
        <div className="flex-1">
          <h2 className="font-bold text-3xl text-gray-800">Blogs Settings</h2>
          <p className="text-gray-600 mt-1 text-lg">Aranoz - Shop System</p>
        </div>
        <div className="flex-1 flex justify-end">
          <img 
            className="w-64 h-32 object-contain transform hover:scale-105 transition-transform duration-300" 
            src={bannerImage} 
            alt="Blog Admin Banner" 
          />
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Add New Blog Button */}
        <div className="mb-8">
          <button className="bg-[#0d9488] text-white py-3 px-6 rounded-xl font-semibold border-none shadow-lg hover:bg-[#0f766e] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex items-center gap-2">
            <span className="text-xl">+</span>
            Add a New Blog
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Picture</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Blog</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Categorie</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">User Role</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Details</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Modification</th>
                <th className="text-left py-4 px-6 font-bold text-gray-700 text-sm uppercase tracking-wider">Delete</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <>
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
                    <td className="py-4 px-6">
                      {b.blog_path && (
                        <img 
                          src={`/${b.blog_path}`} 
                          alt="" 
                          className="w-16 h-12 object-cover rounded-lg shadow-sm border border-gray-200" 
                        />
                      )}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-800">{b.titre}</td>
                    <td className="py-4 px-6">
                      <span className="bg-blue-50 text-blue-700 py-1.5 px-2 rounded-full text-sm font-medium border border-blue-200">
                        {b.categorie?.nom}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-red-500 text-white py-1.5 px-4 rounded-full text-sm font-semibold shadow-sm">
                        {b.user?.name || 'admin'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button 
                        onClick={() => handleShow(b.id)} 
                        className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-200 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                      >
                        {showingId === b.id ? 'Hide' : 'Show'}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <button 
                        onClick={() => handleEdit(b)} 
                        className="bg-[#0ea5e9] text-white py-2 px-4 rounded-lg border-none cursor-pointer hover:bg-[#0284c7] transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <button 
                        onClick={() => handleDelete(b.id)} 
                        className="bg-red-500 text-white py-2 px-4 rounded-lg border-none cursor-pointer hover:bg-red-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {/* Details Row */}
                  {showingId === b.id && (
                    <tr className="bg-gray-50 border-b border-gray-200 last:border-b-0">
                      <td 
                        colSpan="7" 
                        className="p-6"
                      >
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                          <strong className="block text-lg text-gray-800 mb-3 font-semibold">Description complète:</strong>
                          <p className="text-gray-700 leading-relaxed text-justify">{b.description}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Form */}
        {editingId && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
            <form onSubmit={handleUpdate} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="bg-[#0ea5e9] text-white p-2 rounded-lg">✏️</span>
                Edit blog #{editingId}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Titre</label>
                  <input 
                    type="text" 
                    value={data.titre} 
                    placeholder="Titre du blog" 
                    onChange={(e) => setData('titre', e.target.value)} 
                    required 
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Catégorie</label>
                  <select 
                    value={data.blogcategorie_id} 
                    onChange={(e) => setData('blogcategorie_id', e.target.value)} 
                    required
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Choisir une catégorie</option>
                    {categories?.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nom}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <textarea 
                  value={data.description} 
                  placeholder="Description du blog" 
                  onChange={(e) => setData('description', e.target.value)} 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent transition-all duration-200 min-h-[120px] resize-y"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Image du blog</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setData('blog_path', e.target.files[0])} 
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0ea5e9] file:text-white hover:file:bg-[#0284c7]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="submit" 
                  disabled={processing}
                  className="bg-[#2563eb] text-white py-3 px-8 rounded-xl border-none cursor-pointer hover:bg-[#1d4ed8] transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {processing ? '🔄 Saving...' : '💾 Update'}
                </button>
                <button 
                  type="button" 
                  onClick={cancelEdit} 
                  className="bg-gray-500 text-white py-3 px-8 rounded-xl border-none cursor-pointer hover:bg-gray-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Annuler
                </button>
              </div>

              {errors && Object.keys(errors).length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
                  <div className="text-red-600 font-semibold">
                    {Object.values(errors).map((err, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span>⚠️</span>
                        <span>{err}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Add Blog Form */}
        {!editingId && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                
                Ajouter un nouveau blog
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Titre</label>
                  <input 
                    type="text" 
                    value={data.titre} 
                    placeholder="Titre du blog" 
                    onChange={(e) => setData('titre', e.target.value)} 
                    required 
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0d9488] focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Catégorie</label>
                  <select 
                    value={data.blogcategorie_id} 
                    onChange={(e) => setData('blogcategorie_id', e.target.value)} 
                    required
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0d9488] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Choisir une catégorie</option>
                    {categories?.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nom}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <textarea 
                  value={data.description} 
                  placeholder="Description du blog" 
                  onChange={(e) => setData('description', e.target.value)} 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0d9488] focus:border-transparent transition-all duration-200 min-h-[120px] resize-y"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Image du blog</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setData('blog_path', e.target.files[0])} 
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0d9488] focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0d9488] file:text-white hover:file:bg-[#0f766e]"
                />
              </div>

              <button 
                type="submit" 
                disabled={processing}
                className="bg-[#15553a] text-white py-3 px-8 rounded-xl border-none cursor-pointer hover:bg-[#1d4ed8] transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center gap-2"
              >
                {processing ? 'Saving...' : 'Save Blog'}
              </button>

              {errors && Object.keys(errors).length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
                  <div className="text-red-600 font-semibold">
                    {Object.values(errors).map((err, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span>{err}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}