export default function Forbidden() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-50 text-gray-800">
      <h1 className="text-8xl font-bold text-orange-500 mb-4">403</h1>
      <p className="text-xl mb-6">Accès refusé. Vous n'avez pas la permission de voir cette page.</p>
      <a 
        href="/" 
        className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300"
      >
        Retour à l'accueil
      </a>
    </div>
  )
}