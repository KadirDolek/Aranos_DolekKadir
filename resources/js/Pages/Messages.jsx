import { useState, useEffect } from 'react'
import NavAdmin from '@/Components/NavAdmin'
import Footer from '@/Components/Footer'
import { usePage, router } from '@inertiajs/react'
import { IoSearch, IoTrash, IoEye, IoEyeOff } from "react-icons/io5"
import {  IoMdMail } from "react-icons/io"

export default function Messages() { // ⚠️ SUPPRIMEZ les paramètres
  const { bannerImage, messages } = usePage().props // ⚠️ Récupérez tout de usePage()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredMessages, setFilteredMessages] = useState(messages || [])
  const [selectedMessage, setSelectedMessage] = useState(null)

  // Filtrer les messages basé sur la recherche
  useEffect(() => {
    if (!messages) return
    
    const filtered = messages.filter(message =>
      message.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredMessages(filtered)
  }, [searchTerm, messages])

  const handleDelete = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      router.delete(route('messages.destroy', id), {
        preserveScroll: true,
        onSuccess: () => {
          if (selectedMessage?.id === id) {
            setSelectedMessage(null)
          }
        }
      })
    }
  }

  const markAsRead = (id) => {
    router.put(route('messages.update', id), {
      read: true
    }, {
      preserveScroll: true
    })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div>
      <NavAdmin />
      
      {/* Header Section */}
      <div className="bg-[#FEDADA] flex justify-center gap-12 items-center py-8">
        <div className="ml-[15%]">
          <h2 className="font-medium text-4xl">Messages Reçus</h2>
          <p className="text-gray-600 mt-2">Home - Messages</p>
        </div>
        <div>
          <img className="w-full max-w-xs h-auto" src={bannerImage} alt="Messages Banner" />
        </div>
      </div>

      {/* Container principal */}
      <div className="w-[90%] mx-auto my-10">
        
        {/* Barre de recherche et statistiques */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-80">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          
          <div className="text-sm text-gray-600">
            {filteredMessages.length} message(s) trouvé(s)
            {messages && ` • ${messages.filter(m => !m.read).length} non lu(s)`}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Liste des messages */}
          <div className="lg:col-span-1 space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-sm text-center text-gray-500">
                Aucun message trouvé
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`bg-white p-4 rounded-xl shadow-sm border-l-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedMessage?.id === message.id 
                      ? 'border-pink-500 bg-pink-50' 
                      : message.read 
                        ? 'border-gray-300' 
                        : 'border-pink-500 bg-pink-25'
                  }`}
                  onClick={() => {
                    setSelectedMessage(message)
                    if (!message.read) {
                      markAsRead(message.id)
                    }
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {message.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {!message.read && (
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(message.id)
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <IoTrash size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-1 truncate">
                    {message.subject}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{formatDate(message.created_at)}</span>
                    <span className="truncate max-w-[120px]">{message.email}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Détails du message sélectionné */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white p-6 rounded-xl shadow-sm h-full">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedMessage.subject}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <IoMdMail size={16} />
                        <span>{selectedMessage.email}</span>
                      </div>
                      {selectedMessage.phone && (
                        <div className="flex items-center gap-1">
                          
                          <span>{selectedMessage.phone}</span>
                        </div>
                      )}
                      <span>{formatDate(selectedMessage.created_at)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                  >
                    <IoTrash size={16} />
                    Supprimer
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Message :</h3>
                  <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                {selectedMessage.additional_data && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Informations supplémentaires :</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="text-sm">{JSON.stringify(selectedMessage.additional_data, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-sm h-full flex flex-col items-center justify-center text-gray-500">
                <IoEye size={48} className="mb-4 text-gray-300" />
                <p className="text-lg">Sélectionnez un message pour voir son contenu</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}