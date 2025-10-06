export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-50 text-gray-800">
      <h1 className="text-8xl font-bold text-purple-500 mb-4">404</h1>
      <p className="text-xl mb-6">Oups... La page que vous cherchez n'existe pas.</p>
      <a 
        href="/" 
        className="inline-block px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300"
      >
        Retour à l'accueil
      </a>
    </div>
  )
}