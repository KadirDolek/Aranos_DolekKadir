import Footer from '@/Components/Footer'
import NavAdmin from '@/Components/NavAdmin'
import { usePage, router, useForm } from '@inertiajs/react'
import { useState } from 'react'

export default function BlogAdmin({ bannerImage }) {
  const { blogs, categories } = usePage().props
  const [editingId, setEditingId] = useState(null)
  const [showingId, setShowingId] = useState(null)

  // Utilisation de useForm d'Inertia pour une meilleure gestion
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
    <div>
      <NavAdmin />
      {/* Header Section */}
      <div className="bg-[#FEDADA] flex justify-center gap-12 items-center pt-4 pb-4">
        <div className="ml-[15%]">
          <h2 className="font-medium text-4xl">Blogs Settings</h2>
          <p className="text-gray-600 mt-2">Aranoz - Shop System</p>
        </div>
        <div>
          <img className="w-full max-w-xs h-auto" src={bannerImage} alt="Blog Admin Banner" />
        </div>
      </div>

      {/* Main Container */}
      <div className="w-[90%] mx-auto my-10">
        <button className="bg-[#0d9488] text-white py-2.5 px-5 rounded font-bold border-none mb-5 cursor-pointer hover:bg-[#0f766e] transition-colors">
          + Add a New blog
        </button>

        {/* Table */}
        <table className="w-full border-collapse mb-10 bg-white rounded-lg overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 border-b border-gray-200 bg-gray-50 font-semibold">Picture</th>
              <th className="text-left py-3 px-4 border-b border-gray-200 bg-gray-50 font-semibold">Blog</th>
              <th className="text-left py-3 px-4 border-b border-gray-200 bg-gray-50 font-semibold">Categorie</th>
              <th className="text-left py-3 px-4 border-b border-gray-200 bg-gray-50 font-semibold">User Role</th>
              <th className="text-left py-3 px-4 border-b border-gray-200 bg-gray-50 font-semibold">Details</th>
              <th className="text-left py-3 px-4 border-b border-gray-200 bg-gray-50 font-semibold">Modification</th>
              <th className="text-left py-3 px-4 border-b border-gray-200 bg-gray-50 font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <>
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 border-b border-gray-200">
                    {b.blog_path && (
                      <img 
                        src={`/${b.blog_path}`} 
                        alt="" 
                        className="w-15 h-10 object-cover rounded" 
                      />
                    )}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">{b.titre}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{b.categorie?.nom}</td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <span className="bg-red-500 text-white py-1 px-2.5 text-sm rounded-full">
                      {b.user?.name || 'admin'}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <button 
                      onClick={() => handleShow(b.id)} 
                      className="bg-gray-100 text-gray-900 py-1.5 px-3 rounded border-none cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      {showingId === b.id ? 'Hide' : 'Show'}
                    </button>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <button 
                      onClick={() => handleEdit(b)} 
                      className="bg-[#0ea5e9] text-white py-1.5 px-3 rounded border-none cursor-pointer hover:bg-[#0284c7] transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <button 
                      onClick={() => handleDelete(b.id)} 
                      className="bg-red-500 text-white py-1.5 px-3 rounded border-none cursor-pointer hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {/* Ligne de détails */}
                {showingId === b.id && (
                  <tr>
                    <td 
                      colSpan="7" 
                      className="p-5 bg-gray-50 border-b border-gray-200"
                    >
                      <strong className="block mb-2">Description complète:</strong>
                      <p className="text-gray-700">{b.description}</p>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>

        {/* Formulaire modification */}
        {editingId && (
          <form onSubmit={handleUpdate} className="flex flex-col gap-3 bg-white p-5 rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
            <h3 className="text-lg font-semibold mb-2">Edit blog #{editingId}</h3>
            <input 
              type="text" 
              value={data.titre} 
              placeholder="Titre" 
              onChange={(e) => setData('titre', e.target.value)} 
              required 
              className="p-2.5 border border-gray-300 rounded"
            />
            <textarea 
              value={data.description} 
              placeholder="Description" 
              onChange={(e) => setData('description', e.target.value)} 
              required 
              className="p-2.5 border border-gray-300 rounded min-h-[100px] resize-y"
            />
            <select 
              value={data.blogcategorie_id} 
              onChange={(e) => setData('blogcategorie_id', e.target.value)} 
              required
              className="p-2.5 border border-gray-300 rounded"
            >
              <option value="">Choisir une catégorie</option>
              {categories?.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nom}</option>
              ))}
            </select>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setData('blog_path', e.target.files[0])} 
              className="p-2.5 border border-gray-300 rounded"
            />
            <div className="flex gap-2.5 mt-2">
              <button 
                type="submit" 
                disabled={processing}
                className="bg-[#2563eb] text-white py-2.5 px-5 rounded border-none cursor-pointer hover:bg-[#1d4ed8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Saving...' : 'Update'}
              </button>
              <button 
                type="button" 
                onClick={cancelEdit} 
                className="bg-gray-500 text-white py-2.5 px-5 rounded border-none cursor-pointer hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
            {errors && Object.keys(errors).length > 0 && (
              <div className="text-red-500 mt-2.5">
                {Object.values(errors).map((err, i) => (
                  <div key={i}>{err}</div>
                ))}
              </div>
            )}
          </form>
        )}

        {/* Formulaire ajout blog */}
        {!editingId && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-5 rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
            <h3 className="text-lg font-semibold mb-2">Add new blog</h3>
            <input 
              type="text" 
              value={data.titre} 
              placeholder="Titre" 
              onChange={(e) => setData('titre', e.target.value)} 
              required 
              className="p-2.5 border border-gray-300 rounded"
            />
            <textarea 
              value={data.description} 
              placeholder="Description" 
              onChange={(e) => setData('description', e.target.value)} 
              required 
              className="p-2.5 border border-gray-300 rounded min-h-[100px] resize-y"
            />
            <select 
              value={data.blogcategorie_id} 
              onChange={(e) => setData('blogcategorie_id', e.target.value)} 
              required
              className="p-2.5 border border-gray-300 rounded"
            >
              <option value="">Choisir une catégorie</option>
              {categories?.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nom}</option>
              ))}
            </select>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setData('blog_path', e.target.files[0])} 
              className="p-2.5 border border-gray-300 rounded"
            />
            <button 
              type="submit" 
              disabled={processing}
              className="bg-[#2563eb] text-white py-2.5 px-5 rounded border-none cursor-pointer hover:bg-[#1d4ed8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {processing ? 'Saving...' : 'Save'}
            </button>
            {errors && Object.keys(errors).length > 0 && (
              <div className="text-red-500 mt-2.5">
                {Object.values(errors).map((err, i) => (
                  <div key={i}>{err}</div>
                ))}
              </div>
            )}
          </form>
        )}
      </div>

      <Footer />
    </div>
  )
}