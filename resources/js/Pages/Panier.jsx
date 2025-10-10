import { useState } from 'react'
import { usePage, router } from '@inertiajs/react'
import Nav from '@/Components/Nav'
import Footer from '@/Components/Footer'
import { FaTrash, FaShoppingBag, FaTruck, FaCreditCard, FaPaypal } from "react-icons/fa";

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Nav />
      <div className="flex-grow py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Votre Panier</h1>
            <p className="text-gray-600">Gérez vos articles et procédez au paiement</p>
          </div>

          {paniers.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FaShoppingBag className="text-[#4ac1c1] text-xl" />
                    <h2 className="text-xl font-bold text-gray-800">Articles dans votre panier</h2>
                  </div>

                  {/* Cart Items */}
                  <div className="space-y-4">
                    {paniers.map((item) => {
                      const prix = Number(item.produit.promo_prix ?? item.produit.prix)
                      return (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#4ac1c1] transition-all duration-200">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{item.produit.nom}</h3>
                            <p className="text-[#4ac1c1] font-bold text-lg">{prix.toFixed(2)} €</p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              min="1"
                              value={item.quantite}
                              onChange={(e) => handleUpdate(item.id, e.target.value)}
                              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ac1c1] focus:border-transparent text-center"
                            />
                            
                            <div className="text-right min-w-20">
                              <p className="font-bold text-gray-800">{(prix * item.quantite).toFixed(2)} €</p>
                            </div>
                            
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <FaTrash className="text-lg" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column - Checkout Form */}
              <div className="space-y-6">
                
                {/* Address Form */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FaTruck className="text-[#4ac1c1] text-xl" />
                    <h3 className="text-lg font-bold text-gray-800">Adresse de livraison</h3>
                  </div>
                  
                  <form onSubmit={handleCheckout}>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Nom complet"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ac1c1] focus:border-transparent bg-gray-50"
                      />
                      <input
                        type="text"
                        placeholder="Rue et numéro"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ac1c1] focus:border-transparent bg-gray-50"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Ville"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ac1c1] focus:border-transparent bg-gray-50"
                        />
                        <input
                          type="text"
                          placeholder="Code postal"
                          value={postal}
                          onChange={(e) => setPostal(e.target.value)}
                          required
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ac1c1] focus:border-transparent bg-gray-50"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Pays"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ac1c1] focus:border-transparent bg-gray-50"
                      />
                    </div>
                  </form>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FaCreditCard className="text-[#4ac1c1] text-xl" />
                    <h3 className="text-lg font-bold text-gray-800">Méthode de paiement</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#4ac1c1] hover:bg-blue-50 transition-all duration-200">
                      <input
                        type="radio"
                        name="payment"
                        value="bancontact"
                        checked={paymentMethod === 'bancontact'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-[#4ac1c1] scale-125"
                      />
                      <FaCreditCard className="text-[#4ac1c1] text-lg" />
                      <span className="text-gray-800 font-medium flex-1">Bancontact</span>
                    </label>
                    
                    <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#4ac1c1] hover:bg-blue-50 transition-all duration-200">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-[#4ac1c1] scale-125"
                      />
                      <FaPaypal className="text-blue-500 text-lg" />
                      <span className="text-gray-800 font-medium flex-1">PayPal</span>
                    </label>
                  </div>
                </div>

                {/* Total & Checkout */}
                <div className="bg-gradient-to-r from-[#4ac1c1] to-[#6ad3d3] rounded-2xl shadow-lg p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Total</h3>
                    <p className="text-3xl font-bold text-white">{total.toFixed(2)} €</p>
                  </div>
                  
                  <button 
                    type="submit" 
                    onClick={handleCheckout}
                    className="w-full py-4 bg-white text-[#4ac1c1] text-lg font-bold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Procéder au paiement
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Votre panier est vide</h3>
                <p className="text-gray-600 mb-6">Ajoutez quelques articles pour commencer vos achats</p>
                <Link 
                  href="/produits" 
                  className="inline-block bg-gradient-to-r from-[#4ac1c1] to-[#6ad3d3] text-white py-3 px-8 rounded-xl font-bold hover:shadow-lg transition-all duration-200"
                >
                  Découvrir les produits
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}