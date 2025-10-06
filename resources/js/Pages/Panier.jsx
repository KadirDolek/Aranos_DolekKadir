import { useState } from 'react'
import { usePage, router } from '@inertiajs/react'
import Nav from '@/Components/Nav'
import Footer from '@/Components/Footer'

export default function Panier() {
  const { paniers } = usePage().props

  // Champs d'adresse
  const [name, setName] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [postal, setPostal] = useState('')
  const [country, setCountry] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('bancontact')

  const handleUpdate = (id, quantite) => {
    router.put(route('cart.update', id), { quantite })
  }

  const handleDelete = (id) => {
    router.delete(route('cart.destroy', id))
  }

  const total = paniers.reduce(
    (acc, p) => acc + ((p.produit.promo_prix ?? p.produit.prix) * p.quantite),
    0
  )

  const handleCheckout = (e) => {
    e.preventDefault()
    router.post(route('cart.checkout'), {
      billing_address: {
        name,
        street,
        city,
        postal,
        country,
      },
      payment_method: paymentMethod,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-grow">
        <div className="max-w-5xl mx-auto my-10 p-5 bg-[#EBFDFC] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <h2 className="text-center mb-5 font-bold text-gray-800 text-2xl">Votre Panier</h2>

          {paniers.length > 0 ? (
            <>
              {/* === Tableau Panier === */}
              <table className="w-full border-collapse mb-5">
                <thead>
                  <tr>
                    <th className="border-b border-gray-300 py-3 px-3 text-center bg-[#d9f5f5] font-bold">Produit</th>
                    <th className="border-b border-gray-300 py-3 px-3 text-center bg-[#d9f5f5] font-bold">Prix</th>
                    <th className="border-b border-gray-300 py-3 px-3 text-center bg-[#d9f5f5] font-bold">Quantité</th>
                    <th className="border-b border-gray-300 py-3 px-3 text-center bg-[#d9f5f5] font-bold">Total</th>
                    <th className="border-b border-gray-300 py-3 px-3 text-center bg-[#d9f5f5] font-bold"></th>
                  </tr>
                </thead>
                <tbody>
                  {paniers.map((item) => {
                    const prix = Number(item.produit.promo_prix ?? item.produit.prix)
                    return (
                      <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-3 text-center">{item.produit.nom}</td>
                        <td className="py-3 px-3 text-center">{prix.toFixed(2)} €</td>
                        <td className="py-3 px-3 text-center">
                          <input
                            type="number"
                            min="1"
                            value={item.quantite}
                            onChange={(e) => handleUpdate(item.id, e.target.value)}
                            className="w-15 px-1.5 py-1.5 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="py-3 px-3 text-center">{(prix * item.quantite).toFixed(2)} €</td>
                        <td className="py-3 px-3 text-center">
                          <button
                            className="bg-transparent border-none text-red-500 cursor-pointer text-base hover:text-red-700"
                            onClick={() => handleDelete(item.id)}
                          >
                            ❌
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {/* === Formulaire Adresse + Paiement === */}
              <div className="bg-white p-5 rounded-lg border border-[#cdecec] mt-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">Adresse de livraison</h3>
                <form onSubmit={handleCheckout}>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Nom complet"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ac1c1] focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Rue"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ac1c1] focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Ville"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ac1c1] focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Code postal"
                      value={postal}
                      onChange={(e) => setPostal(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ac1c1] focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Pays"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ac1c1] focus:border-transparent"
                    />
                  </div>

                  <h3 className="mt-6 mb-4 text-lg font-semibold text-gray-800">Méthode de paiement</h3>
                  <div className="flex flex-col gap-4 my-5">
                    <label className="flex items-center justify-start w-50 min-h-11 px-3.5 py-2 border-2 border-[#cdecec] rounded-lg cursor-pointer bg-[#f8fefe] hover:border-[#4ac1c1] hover:bg-[#EBFDFC] transition-all duration-200 gap-8">
                      <input
                        type="radio"
                        name="payment"
                        value="bancontact"
                        checked={paymentMethod === 'bancontact'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-[#4ac1c1] flex-shrink-0"
                      />
                      <span className="text-sm text-gray-800 flex-grow">Bancontact</span>
                    </label>
                    <label className="flex items-center justify-start w-50 min-h-11 px-3.5 py-2 border-2 border-[#cdecec] rounded-lg cursor-pointer bg-[#f8fefe] hover:border-[#4ac1c1] hover:bg-[#EBFDFC] transition-all duration-200 gap-8">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-[#4ac1c1] flex-shrink-0"
                      />
                      <span className="text-sm text-gray-800 flex-grow">PayPal</span>
                    </label>
                  </div>

                  <div className="text-right mt-5">
                    <h3 className="mb-4 text-lg font-semibold">Total: {total.toFixed(2)} €</h3>
                    <button 
                      type="submit" 
                      className="px-5 py-2.5 bg-[#4ac1c1] border-none text-white rounded-lg font-bold cursor-pointer hover:bg-[#38a3a3] transition-colors duration-200"
                    >
                      Payer
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600 py-8">Votre panier est vide</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}