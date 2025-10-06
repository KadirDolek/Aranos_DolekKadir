export default function ServerError() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-50 text-gray-800">
      <h1 className="text-8xl font-bold text-red-500 mb-4">500</h1>
      <p className="text-xl mb-6">Oups... Une erreur interne est survenue.</p>
      <a 
        href="/" 
        className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
      >
        Retour à l'accueil
      </a>
    </div>
  )
}