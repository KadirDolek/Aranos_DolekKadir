import React, { useState } from 'react'
import { useForm, router } from '@inertiajs/react'

export default function CategoriesSection({ categories }) {
  const { data, setData, post, reset } = useForm({
    nom: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route('categories.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset()
        alert('Catégorie créée !')
      }
    })
  }

  const handleDelete = (id) => {
    if (confirm('Supprimer cette catégorie ?')) {
      router.delete(route('categories.destroy', id), {
        preserveScroll: true
      })
    }
  }

  return (
    <div className="my-10 mx-auto max-w-[600px] py-2.5">
      <h2 className="mb-4 text-[22px] font-bold text-[#FD3266] border-b-2 border-[#FD3266] pb-1.5">
        Catégories
      </h2>

      <ul className="list-none p-0 mb-4">
        {categories.map((cat) => (
          <li 
            key={cat.id}
            className="flex justify-between items-center py-1.5 px-2.5 mb-1.5 bg-white border border-[#ddd] rounded"
          >
            <span>{cat.nom}</span>
            <button
              onClick={() => handleDelete(cat.id)}
              className="bg-[#FD3266] text-white border-none py-1 px-2.5 text-[13px] rounded cursor-pointer hover:bg-[#c81f4a]"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2.5 mt-2.5">
        <input
          type="text"
          value={data.nom}
          onChange={(e) => setData('nom', e.target.value)}
          placeholder="Nouvelle catégorie"
          className="flex-1 py-1.5 px-2 border border-[#ccc] rounded"
        />
        <button
          onClick={handleSubmit}
          className="bg-[#28a745] text-white border-none py-1.5 px-3 text-[13px] rounded cursor-pointer hover:bg-[#1e7e34]"
        >
          Create
        </button>
      </div>
    </div>
  )
}