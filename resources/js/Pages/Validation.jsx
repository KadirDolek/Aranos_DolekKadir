import { usePage, Link } from '@inertiajs/react'
import Nav from '@/Components/Nav'
import Footer from '@/Components/Footer'

export default function Validation() {
  const { commande } = usePage().props

  // Fonction pour obtenir les classes du badge de statut
  const getStatusBadgeClass = (status) => {
    const baseClasses = "px-3 py-1 rounded-lg font-semibold capitalize"
    switch(status?.toLowerCase()) {
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'confirmed':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'shipped':
        return `${baseClasses} bg-blue-100 text-blue-800`
      case 'delivered':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  return (
    <div>
      <Nav />
      <div className="flex justify-center items-center min-h-[70vh] p-8">
        <div className="bg-white rounded-xl p-8 md:p-12 text-center shadow-lg animate-fade-in-up max-w-md w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
            Merci pour votre commande
          </h2>
          <p className="text-gray-600 mb-3">
            Votre numéro de commande est : <strong className="text-gray-800">{commande.numRandom}</strong>
          </p>
          <p className="text-gray-600 mb-3">
            Montant payé : <strong className="text-gray-800">{Number(commande.prix).toFixed(2)} €</strong>
          </p>
          <p className="text-gray-600 mb-4">
            Statut : <span className={getStatusBadgeClass(commande.status)}>{commande.status}</span>
          </p>
          <Link 
            href={route('track')} 
            className="inline-block mt-6 px-6 py-3 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition-colors duration-300"
          >
            Suivre ma commande
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}