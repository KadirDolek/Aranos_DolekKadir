import { Link, usePage } from '@inertiajs/react'
import { FaShoppingCart, FaBars, FaChevronDown, FaHome, FaStore, FaBlog, FaEnvelope } from "react-icons/fa";
import { useState } from 'react';

export default function Nav() {
  const { auth, cartCount } = usePage().props; 
  const user = auth?.user;
  const initials = (user?.pseudo?.charAt(0) || user?.nom?.charAt(0) || 'U').toUpperCase();
  const username = user?.pseudo || user?.nom || 'User';
  
  const roleId = user?.role_id;
  const roleName = user?.role?.nom;

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const canAccessBackoffice = user && roleId && ![1, 2].includes(roleId);

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <header className="bg-gradient-to-r from-[#4ac1c1] to-[#6ad3d3] shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="group">
              <h1 className="text-2xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform duration-200">
                Aranoz.
              </h1>
            </Link>
          </div>

          {/* Menu Burger (mobile only) */}
          <button 
            className="md:hidden p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/20"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars className="text-white text-lg" />
          </button>

          {/* Desktop Navigation Center */}
          <nav className="hidden md:flex items-center gap-1">
            
            {/* Home Link */}
            <Link 
              href="/"
              className="flex items-center gap-2 py-3 px-4 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              <FaHome className="text-sm" />
              Home
            </Link>

            {/* Shop Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 py-3 px-4 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 group">
                <FaStore className="text-sm" />
                Shop
                <FaChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 bg-white rounded-xl py-3 min-w-48 z-50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100">
                <Link 
                  href="/produits"
                  className="block py-3 px-4 text-gray-700 text-sm font-medium no-underline hover:bg-gradient-to-r hover:from-[#4ac1c1] hover:to-[#6ad3d3] hover:text-white transition-all duration-200 rounded-lg mx-2"
                >
                  Shop Category
                </Link>
                <Link 
                  href="/track"
                  className="block py-3 px-4 text-gray-700 text-sm font-medium no-underline hover:bg-gradient-to-r hover:from-[#4ac1c1] hover:to-[#6ad3d3] hover:text-white transition-all duration-200 rounded-lg mx-2"
                >
                  Track Your Order
                </Link>
              </div>
            </div>

            {/* Blog Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 py-3 px-4 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 group">
                <FaBlog className="text-sm" />
                Blog
                <FaChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 bg-white rounded-xl py-3 min-w-48 z-50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100">
                <Link 
                  href="/blog"
                  className="block py-3 px-4 text-gray-700 text-sm font-medium no-underline hover:bg-gradient-to-r hover:from-[#4ac1c1] hover:to-[#6ad3d3] hover:text-white transition-all duration-200 rounded-lg mx-2"
                >
                  Blogs Table
                </Link>
              </div>
            </div>

            {/* Contact Link */}
            <Link 
              href="/contact"
              className="flex items-center gap-2 py-3 px-4 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              <FaEnvelope className="text-sm" />
              Contact
            </Link>

          </nav>

          {/* Desktop Navigation Right */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Cart */}
            <Link href="/cart" className="relative p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/20 group">
              <FaShoppingCart className="text-white text-lg" />
              {Number(cartCount) > 0 && (
                <span 
                  className="absolute -top-2 -right-2 min-w-6 h-6 inline-flex items-center justify-center bg-[#FF6B9D] text-white text-xs font-bold rounded-full shadow-lg"
                  aria-live="polite"
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu or Auth Buttons */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 py-2 px-4 rounded-xl transition-all duration-200 group border border-white/20">
                  <div className="w-10 h-10 bg-white text-[#4ac1c1] font-bold text-base rounded-full flex items-center justify-center shadow-lg">
                    {initials}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-white text-sm font-semibold">{username}</span>
                    <span className="text-white/80 text-xs">Member</span>
                  </div>
                  <FaChevronDown className="text-white text-xs transition-transform duration-200 group-hover:rotate-180" />
                </button>

                <div className="absolute top-full right-0 bg-white rounded-xl py-3 min-w-48 z-50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100">
                  <Link 
                    href="/orders" 
                    className="block py-3 px-4 text-gray-700 text-sm font-medium no-underline hover:bg-gradient-to-r hover:from-[#4ac1c1] hover:to-[#6ad3d3] hover:text-white transition-all duration-200 rounded-lg mx-2"
                  >
                    Mes commandes
                  </Link>
                  
                  {/* Admin Access */}
                  {canAccessBackoffice && (
                    <Link 
                      href="/admin" 
                      className="block py-3 px-4 text-gray-700 text-sm font-medium no-underline hover:bg-gradient-to-r hover:from-[#4ac1c1] hover:to-[#6ad3d3] hover:text-white transition-all duration-200 rounded-lg mx-2"
                    >
                      Admin Panel
                    </Link>
                  )}
                  
                  <Link 
                    href={route ? route('logout') : '/logout'} 
                    method="post" 
                    as="button" 
                    className="block py-3 px-4 text-gray-700 text-sm font-medium no-underline hover:bg-gradient-to-r hover:from-[#4ac1c1] hover:to-[#6ad3d3] hover:text-white transition-all duration-200 rounded-lg mx-2 w-full text-left"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/login" 
                  className="py-2.5 px-5 text-[#4ac1c1] text-sm font-semibold bg-white rounded-lg hover:bg-gray-100 hover:shadow-md transition-all duration-200 border border-white"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="py-2.5 px-5 bg-white text-[#4ac1c1] text-sm font-semibold rounded-lg hover:bg-gray-100 hover:shadow-md transition-all duration-200 border border-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}>
          <nav className="flex flex-col gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            
            {/* Mobile Menu Items */}
            <Link 
              href="/"
              className="flex items-center gap-3 py-3 px-4 text-white text-sm font-semibold bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 border border-white/10"
              onClick={() => setMenuOpen(false)}
            >
              <FaHome className="text-sm" />
              Home
            </Link>

            {/* Mobile Shop Dropdown */}
            <div>
              <button 
                onClick={() => handleDropdownToggle('shop')}
                className="flex items-center justify-between w-full py-3 px-4 text-white text-sm font-semibold bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <FaStore className="text-sm" />
                  Shop
                </div>
                <FaChevronDown className={`text-xs transition-transform duration-200 ${
                  activeDropdown === 'shop' ? 'rotate-180' : ''
                }`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${
                activeDropdown === 'shop' ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="ml-4 mt-1 flex flex-col gap-1">
                  <Link 
                    href="/produits"
                    className="block py-2 px-4 text-white/80 text-sm no-underline bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Shop Category
                  </Link>
                  <Link 
                    href="/track"
                    className="block py-2 px-4 text-white/80 text-sm no-underline bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Track Your Order
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Blog Dropdown */}
            <div>
              <button 
                onClick={() => handleDropdownToggle('blog')}
                className="flex items-center justify-between w-full py-3 px-4 text-white text-sm font-semibold bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <FaBlog className="text-sm" />
                  Blog
                </div>
                <FaChevronDown className={`text-xs transition-transform duration-200 ${
                  activeDropdown === 'blog' ? 'rotate-180' : ''
                }`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${
                activeDropdown === 'blog' ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="ml-4 mt-1 flex flex-col gap-1">
                  <Link 
                    href="/blog"
                    className="block py-2 px-4 text-white/80 text-sm no-underline bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Blogs Table
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              href="/contact"
              className="flex items-center gap-3 py-3 px-4 text-white text-sm font-semibold bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 border border-white/10"
              onClick={() => setMenuOpen(false)}
            >
              <FaEnvelope className="text-sm" />
              Contact
            </Link>

            {/* Mobile Cart */}
            <Link 
              href="/cart"
              className="flex items-center gap-3 py-3 px-4 text-white text-sm font-semibold bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 border border-white/10 relative"
              onClick={() => setMenuOpen(false)}
            >
              <FaShoppingCart className="text-sm" />
              Cart
              {Number(cartCount) > 0 && (
                <span className="ml-auto bg-[#FF6B9D] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="flex gap-2 pt-2">
                <Link 
                  href="/login" 
                  className="flex-1 py-2.5 text-center text-[#4ac1c1] text-sm font-semibold bg-white rounded-lg hover:bg-gray-100 transition-all duration-200 border border-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="flex-1 py-2.5 text-center text-[#4ac1c1] text-sm font-semibold bg-white rounded-lg hover:bg-gray-100 transition-all duration-200 border border-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}