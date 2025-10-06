import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const submit = (e) => {
    e.preventDefault()
    post(route('login'), {
      onFinish: () => reset('password'),
    })
  }

  return (
    <GuestLayout>
      <Head title="Login" />

      <div className="max-w-md mx-auto mt-20 mb-20 bg-white p-8 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] sm:mx-4 sm:mt-10 sm:mb-10 sm:p-6">
        <h1 className="text-2xl text-center text-[#f72585] mb-6">Login</h1>

        {status && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
            {status}
          </div>
        )}

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f72585] focus:ring-2 focus:ring-[#f72585] focus:ring-opacity-20 transition-all"
              required
              autoFocus
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f72585] focus:ring-2 focus:ring-[#f72585] focus:ring-opacity-20 transition-all"
              required
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            {canResetPassword && (
              <Link
                href={route('password.request')}
                className="text-sm text-gray-600 underline hover:text-[#f72585] transition-colors"
              >
                Forgot your password?
              </Link>
            )}

            <button
              type="submit"
              disabled={processing}
              className="bg-[#f72585] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#d61c6e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </form>
      </div>
    </GuestLayout>
  )
}