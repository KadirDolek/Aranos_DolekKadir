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
  const [showUser, setShowUser] = useState(null) // pour "Show"

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
    const baseClasses = "px-2 py-1 rounded-full text-xs text-white"
    const role = (roleName || '').toLowerCase().replace(/\s+/g, '-')
    
    switch(role) {
      case 'admin': return `${baseClasses} bg-red-600`
      case 'user': return `${baseClasses} bg-gray-600`
      case 'community-manager': return `${baseClasses} bg-cyan-500`
      case 'agent': return `${baseClasses} bg-yellow-400 text-black`
      case 'webmaster': return `${baseClasses} bg-blue-600`
      case 'public': return `${baseClasses} bg-gray-800`
      default: return `${baseClasses} bg-gray-500`
    }
  }

  return (
    <div>
      <NavAdmin/>
      {/* Header Section */}
      <div className="bg-pink-100 flex justify-center items-center gap-12 pt-10 pb-10">
        <div className="ml-15">
          <h2 className="font-medium text-4xl">Users Settings</h2>
          <p className="text-gray-600 mt-2">Aranoz - Shop System</p>
        </div>
        <div>
          <img className="w-64 h-32 object-cover rounded-lg" src={bannerImage} alt="Users banner" />
        </div>
      </div>

      {/* CREATE Section */}
      <section className="max-w-4xl mx-auto my-10">
        <h2 className="text-xl text-pink-500 border-b-2 border-pink-500 pb-1.5 mb-4">Add User</h2>
        <form onSubmit={handleCreate} className="flex flex-col gap-4 max-w-md mx-auto">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Nom</label>
            <input
              placeholder="Nom"
              value={createForm.data.nom}
              onChange={e => createForm.setData('nom', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Prénom</label>
            <input
              placeholder="Prénom"
              value={createForm.data.prenom}
              onChange={e => createForm.setData('prenom', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Pseudo</label>
            <input
              placeholder="Pseudo"
              value={createForm.data.pseudo}
              onChange={e => createForm.setData('pseudo', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={createForm.data.email}
              onChange={e => createForm.setData('email', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={createForm.data.password}
              onChange={e => createForm.setData('password', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={createForm.data.password_confirmation}
              onChange={e => createForm.setData('password_confirmation', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-1">Rôle</label>
            <select
              value={createForm.data.role_id}
              onChange={e => createForm.setData('role_id', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">(défaut: User)</option>
              {roles?.map(r => (
                <option key={r.id} value={r.id}>{r.nom}</option>
              ))}
            </select>
          </div>
          <button 
            type="submit" 
            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create
          </button>
        </form>

        {Object.values(createForm.errors || {}).length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            {Object.values(createForm.errors).map((err, i) => (
              <p key={i} className="text-red-600 text-sm">{err}</p>
            ))}
          </div>
        )}
      </section>

      {/* LIST Section */}
      <section className="max-w-6xl mx-auto my-10 px-4">
        <h2 className="text-xl text-pink-500 border-b-2 border-pink-500 pb-1.5 mb-4">All Users</h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Nom</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Prénom</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Pseudo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Rôle</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b" colSpan="3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 border-b">
                  <td className="px-4 py-3 text-sm">{u.nom}</td>
                  <td className="px-4 py-3 text-sm">{u.prenom}</td>
                  <td className="px-4 py-3 text-sm">{u.pseudo}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{u.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={getRoleBadgeClass(u.role?.nom)}>
                      {u.role?.nom || '—'}
                    </span>
                  </td>

                  {/* Actions: Show */}
                  <td className="px-4 py-3">
                    <button 
                      className="text-blue-600 hover:text-blue-800 text-sm"
                      onClick={() => setShowUser(u)}
                    >
                      Show
                    </button>
                  </td>

                  {/* Actions: Edit */}
                  <td className="px-4 py-3">
                    {editingUserId === u.id ? (
                      <form onSubmit={handleUpdate} className="flex flex-col gap-2 bg-blue-50 p-3 rounded-lg">
                        <input 
                          value={editForm.data.nom} 
                          onChange={e=>editForm.setData('nom', e.target.value)} 
                          placeholder="Nom"
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <input 
                          value={editForm.data.prenom} 
                          onChange={e=>editForm.setData('prenom', e.target.value)} 
                          placeholder="Prénom"
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <input 
                          value={editForm.data.pseudo} 
                          onChange={e=>editForm.setData('pseudo', e.target.value)} 
                          placeholder="Pseudo"
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <input 
                          type="email" 
                          value={editForm.data.email} 
                          onChange={e=>editForm.setData('email', e.target.value)} 
                          placeholder="Email"
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <select 
                          value={editForm.data.role_id} 
                          onChange={e=>editForm.setData('role_id', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          {roles?.map(r => <option key={r.id} value={r.id}>{r.nom}</option>)}
                        </select>
                        <input 
                          type="password" 
                          placeholder="New password (optional)"
                          value={editForm.data.password}
                          onChange={e=>editForm.setData('password', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <input 
                          type="password" 
                          placeholder="Confirm (optional)"
                          value={editForm.data.password_confirmation}
                          onChange={e=>editForm.setData('password_confirmation', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <div className="flex gap-2 mt-2">
                          <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                            Save
                          </button>
                          <button 
                            type="button" 
                            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                            onClick={()=>setEditingUserId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button 
                        className="text-blue-600 hover:text-blue-800 text-sm"
                        onClick={() => startEdit(u)}
                      >
                        Edit
                      </button>
                    )}
                  </td>

                  {/* Actions: Delete */}
                  <td className="px-4 py-3">
                    <button 
                      className="px-3 py-1 bg-pink-500 text-white rounded text-sm hover:bg-pink-600 transition-colors"
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
            className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-4">User details</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Nom:</strong> {showUser.nom}</p>
              <p><strong>Prénom:</strong> {showUser.prenom}</p>
              <p><strong>Pseudo:</strong> {showUser.pseudo}</p>
              <p><strong>Email:</strong> {showUser.email}</p>
              <p><strong>Rôle:</strong> {showUser.role?.nom || '—'}</p>
            </div>
            <div className="mt-6">
              <button 
                onClick={() => setShowUser(null)} 
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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