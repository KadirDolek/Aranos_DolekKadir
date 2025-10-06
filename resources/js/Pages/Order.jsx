import { usePage } from '@inertiajs/react'
import Nav from '@/Components/Nav'
import Footer from '@/Components/Footer'

export default function Order() {
  const { commandes } = usePage().props

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-grow">
        <div className="w-[80%] mx-auto my-8">
          <h2 className="mb-4 text-2xl text-gray-800">Mes commandes</h2>

          {commandes.length > 0 ? (
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
              <thead>
                <tr>
                  <th className="px-3 py-3 border border-gray-300 text-left bg-gray-100 font-bold">Numéro</th>
                  <th className="px-3 py-3 border border-gray-300 text-left bg-gray-100 font-bold">Date</th>
                  <th className="px-3 py-3 border border-gray-300 text-left bg-gray-100 font-bold">Statut</th>
                  <th className="px-3 py-3 border border-gray-300 text-left bg-gray-100 font-bold">Total</th>
                  <th className="px-3 py-3 border border-gray-300 text-left bg-gray-100 font-bold">Produits</th>
                </tr>
              </thead>
              <tbody>
                {commandes.map((cmd) => (
                  <tr key={cmd.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-3 border border-gray-300">{cmd.numRandom}</td>
                    <td className="px-3 py-3 border border-gray-300">
                      {new Date(cmd.created_at).toLocaleDateString()}
                    </td>
                    <td className={`px-3 py-3 border border-gray-300 font-bold ${
                      cmd.status === 'pending' 
                        ? 'text-orange-500' 
                        : cmd.status === 'confirmed' 
                        ? 'text-green-600' 
                        : 'text-gray-600'
                    }`}>
                      {cmd.status}
                    </td>
                    <td className="px-3 py-3 border border-gray-300">
                      {Number(cmd.prix).toFixed(2)} €
                    </td>
                    <td className="px-3 py-3 border border-gray-300">
                      <ul className="list-none p-0 m-0 space-y-1">
                        {cmd.produits.map((p) => (
                          <li key={p.id} className="text-sm text-gray-700">
                            {p.nom} × {p.pivot.quantite} — {Number(p.pivot.prix).toFixed(2)} €
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 text-center py-8">Vous n'avez encore passé aucune commande.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}