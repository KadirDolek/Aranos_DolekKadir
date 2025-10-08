import React, { useState } from 'react'
import NavAdmin from '@/Components/NavAdmin'
import Footer from '@/Components/Footer'
import { useForm } from '@inertiajs/react'

export default function Users({ bannerImage, users = [], roles = [] }) {
  // CREATE form
  const createForm = useForm({
    nom: "", prenom: "", pseudo: "", email: "",
    password: "", password_confirmation: "", role_id: ""
  })

  // EDIT form
  const editForm = useForm({
    id: null, nom: "", prenom: "", pseudo: "", email: "", role_id: "", password: "", password_confirmation: ""
  })

  const [editingUserId, setEditingUserId] = useState(null)
  const [showUser, setShowUser] = useState(null)

  const handleCreate = (e) => {
    e.preventDefault()
    createForm.post(route('users.store'), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => createForm.reset(),
    })
  }

  const startEdit = (u) => {
    setEditingUserId(u.id)
    editForm.setData({
      id: u.id,
      nom: u.nom || "",
      prenom: u.prenom || "",
      pseudo: u.pseudo || "",
      email: u.email || "",
      role_id: u.role_id ?? 2,
      password: "",
      password_confirmation: ""
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    editForm.put(route('users.update', editForm.data.id), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setEditingUserId(null),
    })
  }

  const handleDelete = (id) => {
    editForm.delete(route('users.destroy', id), {
      preserveScroll: true,
      preserveState: true,
    })
  }

  // Fonction pour obtenir les classes des badges de rôle
  const getRoleBadgeClass = (roleName) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold"
    const role = (roleName || '').toLowerCase().replace(/\s+/g, '-')
    
    switch(role) {
      case 'admin': return `${baseClasses} bg-red-100 text-red-800 border border-red-200`
      case 'user': return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`
      case 'community-manager': return `${baseClasses} bg-cyan-100 text-cyan-800 border border-cyan-200`
      case 'agent': return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`
      case 'webmaster': return `${baseClasses} bg-blue-100 text-blue-800 border border-blue-200`
      case 'public': return `${baseClasses} bg-gray-800 text-white border border-gray-700`
      default: return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`
    }
  }

  return (
    <div>
      <NavAdmin/>
      
      {/* Header Section */}
      <div className="bg-[#FEDADA] flex justify-center gap-12 items-center py-8">
        <div className="ml-[15%]">
          <h2 className="font-medium text-4xl">Users Settings</h2>
          <p className="text-gray-600 mt-2">Aranoz - Shop System</p>
        </div>
        <div>
          <img className="w-full max-w-xs h-auto" src={bannerImage} alt="Users banner" />
        </div>
      </div>

      {/* CREATE Section */}
      <section className="max-w-4xl mx-auto my-10 p-6">
        <h2 className="text-xl text-[#FD3266] border-b-2 border-[#FD3266] pb-2 mb-6 font-semibold">Add User</h2>
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-2">Nom</label>
              <input
                placeholder="Nom"
                value={createForm.data.nom}
                onChange={e => createForm.setData('nom', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD3266] focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-2">Prénom</label>
              <input
                placeholder="Prénom"
                value={createForm.data.prenom}
                onChange={e => createForm.setData('prenom', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD3266] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-2">Pseudo</label>
              <input
                placeholder="Pseudo"
                value={createForm.data.pseudo}
                onChange={e => createForm.setData('pseudo', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD3266] focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={createForm.data.email}
                onChange={e => createForm.setData('email', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD3266] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={createForm.data.password}
                onChange={e => createForm.setData('password', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD3266] focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={createForm.data.password_confirmation}
                onChange={e => createForm.setData('password_confirmation', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD3266] focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <label className="font-semibold text-gray-700 mb-2">Rôle</label>
            <select
              value={createForm.data.role_id}
              onChange={e => createForm.setData('role_id', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD3266] focus:border-transparent"
            >
              <option value="">(défaut: User)</option>
              {roles?.map(r => (
                <option key={r.id} value={r.id}>{r.nom}</option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#FD3266] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#e02e5c] transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Create User
          </button>
        </form>

        {Object.values(createForm.errors || {}).length > 0 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            {Object.values(createForm.errors).map((err, i) => (
              <p key={i} className="text-red-600 text-sm font-medium">{err}</p>
            ))}
          </div>
        )}
      </section>

      {/* LIST Section */}
      <section className="max-w-6xl mx-auto my-10 px-6">
        <h2 className="text-xl text-[#FD3266] border-b-2 border-[#FD3266] pb-2 mb-6 font-semibold">All Users</h2>
        <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#EBFDFC]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Nom</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Prénom</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Pseudo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Rôle</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200" colSpan="3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{u.nom}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{u.prenom}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{u.pseudo}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={getRoleBadgeClass(u.role?.nom)}>
                      {u.role?.nom || '—'}
                    </span>
                  </td>

                  {/* Actions: Show */}
                  <td className="px-6 py-4">
                    <button 
                      className="text-[#2c7be5] hover:text-[#1a5bb8] text-sm font-medium transition-colors"
                      onClick={() => setShowUser(u)}
                    >
                      Show
                    </button>
                  </td>

                  {/* Actions: Edit */}
                  <td className="px-6 py-4">
                    {editingUserId === u.id ? (
                      <form onSubmit={handleUpdate} className="bg-blue-50 p-4 rounded-lg space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <input 
                            value={editForm.data.nom} 
                            onChange={e=>editForm.setData('nom', e.target.value)} 
                            placeholder="Nom"
                            className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input 
                            value={editForm.data.prenom} 
                            onChange={e=>editForm.setData('prenom', e.target.value)} 
                            placeholder="Prénom"
                            className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <input 
                            value={editForm.data.pseudo} 
                            onChange={e=>editForm.setData('pseudo', e.target.value)} 
                            placeholder="Pseudo"
                            className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input 
                            type="email" 
                            value={editForm.data.email} 
                            onChange={e=>editForm.setData('email', e.target.value)} 
                            placeholder="Email"
                            className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <select 
                          value={editForm.data.role_id} 
                          onChange={e=>editForm.setData('role_id', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {roles?.map(r => <option key={r.id} value={r.id}>{r.nom}</option>)}
                        </select>
                        <div className="grid grid-cols-2 gap-3">
                          <input 
                            type="password" 
                            placeholder="New password (optional)"
                            value={editForm.data.password}
                            onChange={e=>editForm.setData('password', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input 
                            type="password" 
                            placeholder="Confirm (optional)"
                            value={editForm.data.password_confirmation}
                            onChange={e=>editForm.setData('password_confirmation', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 transition-colors">
                            Save
                          </button>
                          <button 
                            type="button" 
                            className="px-4 py-2 bg-gray-500 text-white rounded text-sm font-medium hover:bg-gray-600 transition-colors"
                            onClick={()=>setEditingUserId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button 
                        className="text-[#2c7be5] hover:text-[#1a5bb8] text-sm font-medium transition-colors"
                        onClick={() => startEdit(u)}
                      >
                        Edit
                      </button>
                    )}
                  </td>

                  {/* Actions: Delete */}
                  <td className="px-6 py-4">
                    <button 
                      className="px-4 py-2 bg-[#FD3266] text-white rounded text-sm font-medium hover:bg-[#e02e5c] transition-colors shadow-sm"
                      onClick={() => handleDelete(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal Show */}
      {showUser && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowUser(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-fade-in border border-gray-200"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-[#FD3266] mb-4 border-b pb-2">User Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Nom:</span>
                <span className="text-gray-900">{showUser.nom}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Prénom:</span>
                <span className="text-gray-900">{showUser.prenom}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Pseudo:</span>
                <span className="text-gray-900">{showUser.pseudo}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-900">{showUser.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Rôle:</span>
                <span className={getRoleBadgeClass(showUser.role?.nom)}>
                  {showUser.role?.nom || '—'}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <button 
                onClick={() => setShowUser(null)} 
                className="w-full px-4 py-3 bg-[#FD3266] text-white rounded-lg font-semibold hover:bg-[#e02e5c] transition-colors shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer/>
    </div>
  )
}