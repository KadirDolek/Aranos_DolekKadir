import Footer from '@/Components/Footer'
import NavAdmin from '@/Components/NavAdmin'
import { usePage, router } from '@inertiajs/react'

export default function OrderAdmin({ bannerImage }) {
  const { commandes } = usePage().props

  const handleValidate = (id) => {
    router.put(route('orders.confirm', id))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavAdmin />
      
      {/* Header Section */}
      <div className="bg-[#FEDADA] flex justify-center gap-12 items-center pt-4 pb-4">
        <div className="ml-[15%]">
          <h2 className="font-medium text-4xl">Orders Settings</h2>
          <p className="text-gray-600 mt-2">Aranoz - Shop System</p>
        </div>
        <div>
          <img className="w-full max-w-xs h-auto" src={bannerImage} alt="Orders Admin Banner" />
        </div>
      </div>

      <div className="w-[90%] mx-auto my-10 flex-grow">
        {/* Pending Orders Section */}
        <h3 className="text-xl font-bold my-8 text-gray-900">Pending orders</h3>
        <table className="w-full border-collapse mb-10 bg-white rounded-lg overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left border-b border-gray-200 bg-gray-50 font-semibold">User</th>
              <th className="px-4 py-3 text-left border-b border-gray-200 bg-gray-50 font-semibold">Email</th>
              <th className="px-4 py-3 text-left border-b border-gray-200 bg-gray-50 font-semibold">Products</th>
              <th className="px-4 py-3 text-left border-b border-gray-200 bg-gray-50 font-semibold">Price</th>
              <th className="px-4 py-3 text-left border-b border-gray-200 bg-gray-50 font-semibold">Order N°</th>
              <th className="px-4 py-3 text-left border-b border-gray-200 bg-gray-50 font-semibold">Date</th>
              <th className="px-4 py-3 text-left border-b border-gray-200 bg-gray-50 font-semibold">Status</th>
              <th className="px-4 py-3 text-left border-b border-gray-200 bg-gray-50 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {commandes.filter(c => c.status === 'pending').map(c => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 border-b border-gray-200">{c.user.name}</td>
                <td className="px-4 py-3 border-b border-gray-200">{c.user.email}</td>
                <td className="px-4 py-3 border-b border-gray-200">
                  {c.produits.map((p, i) => (
                    <div key={i} className="text-sm text-gray-700">
                      {p.nom} x {p.pivot.quantite} — {Number(p.pivot.prix).toFixed(2)} €
                    </div>
                  ))}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">{Number(c.prix).toFixed(2)} €</td>
                <td className="px-4 py-3 border-b border-gray-200">{c.numRandom}</td>
                <td className="px-4 py-3 border-b border-gray-200">
                  {new Date(c.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  <button
                    onClick={() => handleValidate(c.id)}
                    className="px-3.5 py-2 bg-blue-600 text-white border-none rounded text-sm font-medium cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    Validate?
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Validated Orders Section */}
        <h3 className="text-xl font-bold my-8 text-gray-900">Validated orders</h3>
        <table className="w-full border-collapse mb-10 bg-white rounded-lg overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left border-b border-gray-200 bg-gray-50 font-semibold">User</th>
              <th className="px-4 py-3 text-left border-b border-gray-200 bg-gray-50 font-semibold">Email</th>
              <th className="px-4 py-3 text-left border-b border-gray-200 bg-gray-50 font-semibold">Products</th>
              <th className="px-4 py-3 text-left border-b border-gray-200 bg-gray-50 font-semibold">Price</th>
              <th className="px-4 py-3 text-left border-b border-gray-200 bg-gray-50 font-semibold">Order N°</th>
              <th className="px-4 py-3 text-left border-b border-gray-200 bg-gray-50 font-semibold">Date</th>
              <th className="px-4 py-3 text-left border-b border-gray-200 bg-gray-50 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {commandes.filter(c => c.status === 'confirmed').map(c => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 border-b border-gray-200">{c.user.name}</td>
                <td className="px-4 py-3 border-b border-gray-200">{c.user.email}</td>
                <td className="px-4 py-3 border-b border-gray-200">
                  {c.produits.map((p, i) => (
                    <div key={i} className="text-sm text-gray-700">
                      {p.nom} x {p.pivot.quantite}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">{Number(c.prix).toFixed(2)} €</td>
                <td className="px-4 py-3 border-b border-gray-200">{c.numRandom}</td>
                <td className="px-4 py-3 border-b border-gray-200">
                  {new Date(c.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                    Confirmed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  )
}