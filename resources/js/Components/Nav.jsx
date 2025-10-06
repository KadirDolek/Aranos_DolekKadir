import { Link, usePage } from '@inertiajs/react'
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { useState } from 'react';

export default function Nav() {
  const { auth, cartCount } = usePage().props; 
  const user = auth?.user;
  const initials = (user?.pseudo?.charAt(0) || user?.nom?.charAt(0) || 'U').toUpperCase();
  const username = user?.pseudo || user?.nom || 'User';
  
  const roleId = user?.role_id;
  const roleName = user?.role?.nom;

  const [menuOpen, setMenuOpen] = useState(false);

  const canAccessBackoffice = user && roleId && ![1, 2].includes(roleId);

  return (
    <header className="flex justify-between items-center bg-[#e9fafa] py-3 px-15 relative z-50">
      {/* Logo */}
      <div className="navbar-left">
        <Link href="/">
          <h1 className="text-xl font-bold ml-2.5">Aranoz.</h1>
        </Link>
      </div>

      {/* Menu Burger (mobile only) */}
      <div 
        className="hidden text-xl cursor-pointer sm:block md:hidden" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FaBars />
      </div>

      {/* Navigation Center */}
      <nav className={`flex gap-6 items-center ${
        menuOpen 
          ? 'absolute top-15 left-0 bg-[#e9fafa] w-full py-4 px-4 flex flex-col gap-2.5 sm:flex md:hidden' 
          : 'hidden md:flex'
      }`}>
        <Link href="/" className="text-sm text-black no-underline cursor-pointer hover:text-gray-700">
          Home
        </Link>

        {/* Shop Dropdown */}
        <div className="relative nav-item group">
          <span className="text-sm text-black no-underline cursor-pointer flex items-center gap-1 hover:text-gray-700">
            Shop ▾
          </span>
          <div className="absolute top-full left-0 bg-[#FD3266] rounded-lg py-2 min-w-40 z-50 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <Link href="/produits" className="block py-2 px-4 text-white text-sm no-underline whitespace-nowrap rounded hover:bg-white hover:text-[#FD3266] transition-all duration-300">
              Shop category
            </Link>
            <Link href="/track" className="block py-2 px-4 text-white text-sm no-underline whitespace-nowrap rounded hover:bg-white hover:text-[#FD3266] transition-all duration-300">
              Track your order
            </Link>
          </div>
        </div>

        {/* Blog Dropdown */}
        <div className="relative nav-item group">
          <span className="text-sm text-black no-underline cursor-pointer flex items-center gap-1 hover:text-gray-700">
            Blog ▾
          </span>
          <div className="absolute top-full left-0 bg-[#FD3266] rounded-lg py-2 min-w-40 z-50 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <Link href="/blog" className="block py-2 px-4 text-white text-sm no-underline whitespace-nowrap rounded hover:bg-white hover:text-[#FD3266] transition-all duration-300">
              Blogs table
            </Link>
          </div>
        </div>

        <Link href="/contact" className="text-sm text-black no-underline cursor-pointer hover:text-gray-700">
          Contact
        </Link>
      </nav>

      {/* Navigation Right */}
      <div className="flex items-center gap-5 mr-5">
        {/* Cart */}
        <Link href="/cart" className="relative inline-flex items-center gap-1.5 no-underline text-black text-sm" aria-label="Cart">
          <span className="text-lg" aria-hidden>
            <FaShoppingCart />
          </span>
          {Number(cartCount) > 0 && (
            <span 
              className="absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 px-1.5 inline-flex items-center justify-center bg-[#ff3366] text-white text-xs rounded-full"
              aria-live="polite"
            >
              {cartCount}
            </span>
          )}
        </Link>

        {/* User Menu or Auth Buttons */}
        {user ? (
          <div className="relative user-menu group">
            <div 
              className="text-sm text-black no-underline cursor-pointer user-trigger flex items-center gap-2" 
              role="button" 
              tabIndex={0}
            >
              <div className="w-8 h-8 bg-[#ff3366] text-white font-bold text-sm rounded-full flex items-center justify-center">
                {initials}
              </div>
              <span className="text-sm username hidden sm:block">{username}</span>
              <span className="chev">▾</span>
            </div>

            <div className="absolute top-full right-0 bg-[#FD3266] rounded-lg py-2 min-w-40 z-50 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <Link href="/orders" className="block py-2 px-4 text-white text-sm no-underline whitespace-nowrap rounded hover:bg-white hover:text-[#FD3266] transition-all duration-300 w-full text-left bg-transparent">
                Mes commandes
              </Link>
              <Link 
                href={route ? route('logout') : '/logout'} 
                method="post" 
                as="button" 
                className="block py-2 px-4 text-white text-sm no-underline whitespace-nowrap rounded hover:bg-white hover:text-[#FD3266] transition-all duration-300 w-full text-left bg-transparent"
              >
                Logout
              </Link>

              {/* Admin Access */}
              {canAccessBackoffice && (
                <Link href="/admin" className="block py-2 px-4 text-white text-sm no-underline whitespace-nowrap rounded hover:bg-white hover:text-[#FD3266] transition-all duration-300 w-full text-left bg-transparent">
                  Admin
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="auth-buttons flex gap-3">
            <Link href="/login" className="text-sm px-4 py-2 bg-transparent border border-gray-300 rounded hover:bg-gray-100 transition-colors">
              Login
            </Link>
            <Link href="/register" className="text-sm px-4 py-2 bg-[#FD3266] text-white rounded hover:bg-[#e02e5c] transition-colors">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}