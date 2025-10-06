import { useState } from 'react'
import { usePage, router } from '@inertiajs/react'
import Nav from '@/Components/Nav'
import Footer from '@/Components/Footer'

export default function Track() {
  const { commande, error } = usePage().props
  const [numRandom, setNumRandom] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    router.get(route('track'), { numRandom })
  }

  return (
    <div>
      <Nav />
      <div className="max-w-6xl mx-auto my-10 p-5">
        <h2 className="text-[#f72585] font-bold text-3xl text-center mb-5">Suivi de commande</h2>
        <form onSubmit={handleSubmit} className="flex justify-center mb-8 gap-3">
          <input
            type="text"
            placeholder="Entrez votre numéro de commande"
            value={numRandom}
            onChange={(e) => setNumRandom(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg w-80"
          />
          <button 
            type="submit"
            className="px-5 py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors cursor-pointer"
          >
            Suivre
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        {commande && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bloc Infos Commande */}
            <div className="bg-cyan-50 p-5 rounded-xl border border-cyan-200 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Order Info</h3>
              <p className="my-1 text-sm"><strong>Order Number:</strong> {commande.numRandom}</p>
              <p className="my-1 text-sm"><strong>Total:</strong> {commande.prix} €</p>
              <p className="my-1 text-sm"><strong>Status:</strong> {commande.status}</p>
              <p className="my-1 text-sm"><strong>Payment Method:</strong> {commande.payment_method}</p>
            </div>

            {/* Bloc Adresse de livraison */}
            <div className="bg-cyan-50 p-5 rounded-xl border border-cyan-200 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Billing Address</h3>
              {commande.billing_address ? (
                <>
                  <p className="my-1 text-sm"><strong>Nom:</strong> {commande.billing_address.name}</p>
                  <p className="my-1 text-sm"><strong>Rue:</strong> {commande.billing_address.street}</p>
                  <p className="my-1 text-sm"><strong>Ville:</strong> {commande.billing_address.city}</p>
                  <p className="my-1 text-sm"><strong>Code postal:</strong> {commande.billing_address.postal}</p>
                  <p className="my-1 text-sm"><strong>Pays:</strong> {commande.billing_address.country}</p>
                </>
              ) : (
                <p>Pas d'adresse enregistrée</p>
              )}
            </div>

            {/* Bloc Produits */}
            <div className="bg-cyan-50 p-5 rounded-xl border border-cyan-200 shadow-sm md:col-span-2">
              <h3 className="text-lg font-bold mb-4">Produits</h3>
              <ul>
                {commande.produits.map((p) => (
                  <li key={p.id} className="my-1 text-sm">
                    {p.nom} x {p.pivot.quantite} → {p.pivot.prix} €
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}