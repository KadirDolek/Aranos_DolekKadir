import { Link, usePage } from '@inertiajs/react'
import { FaBars, FaChevronDown, FaHome, FaSignOutAlt } from "react-icons/fa";
import { useState } from 'react';

export default function NavAdmin() {
  const { auth } = usePage().props; 
  const user = auth?.user;
  const initials = (user?.pseudo?.charAt(0) || user?.nom?.charAt(0) || 'U').toUpperCase();
  const username = user?.pseudo || user?.nom || 'User';

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <header className="bg-gradient-to-r from-[#FD3266] to-[#FF6B9D] shadow-xl relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo + Badge */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <h1 className="text-2xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform duration-200">
                Aranoz.
              </h1>
              <span className="bg-white text-[#FD3266] py-1.5 px-3 rounded-full text-xs font-bold shadow-lg">
                ADMIN
              </span>
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
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 py-3 px-4 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 group">
                Categories
                <FaChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 bg-white rounded-xl py-3 min-w-48 z-50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100">
                <Link 
                  href="/admin/categories"
                  className="block py-3 px-4 text-gray-700 text-sm font-medium no-underline hover:bg-gradient-to-r hover:from-[#FD3266] hover:to-[#FF6B9D] hover:text-white transition-all duration-200 rounded-lg mx-2"
                >
                  Categories
                </Link>
              </div>
            </div>

            {/* Users Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 py-3 px-4 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 group">
                Users
                <FaChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 bg-white rounded-xl py-3 min-w-48 z-50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100">
                <Link 
                  href="/admin/users"
                  className="block py-3 px-4 text-gray-700 text-sm font-medium no-underline hover:bg-gradient-to-r hover:from-[#FD3266] hover:to-[#FF6B9D] hover:text-white transition-all duration-200 rounded-lg mx-2"
                >
                  Users
                </Link>
              </div>
            </div>

            {/* Orders Link */}
            <Link 
              href="/admin/orders"
              className="py-3 px-4 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              Orders
            </Link>

            {/* Blog Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 py-3 px-4 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 group">
                Blog
                <FaChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 bg-white rounded-xl py-3 min-w-48 z-50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100">
                <Link 
                  href="/admin/blogs"
                  className="block py-3 px-4 text-gray-700 text-sm font-medium no-underline hover:bg-gradient-to-r hover:from-[#FD3266] hover:to-[#FF6B9D] hover:text-white transition-all duration-200 rounded-lg mx-2"
                >
                  Blogs
                </Link>
              </div>
            </div>

            {/* Products Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 py-3 px-4 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 group">
                Products
                <FaChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 bg-white rounded-xl py-3 min-w-48 z-50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100">
                <Link 
                  href="/admin/products"
                  className="block py-3 px-4 text-gray-700 text-sm font-medium no-underline hover:bg-gradient-to-r hover:from-[#FD3266] hover:to-[#FF6B9D] hover:text-white transition-all duration-200 rounded-lg mx-2"
                >
                  Products
                </Link>
              </div>
            </div>

            {/* Mailbox Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 py-3 px-4 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 group">
                Mailbox
                <FaChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 bg-white rounded-xl py-3 min-w-48 z-50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100">
                <Link 
                  href="/admin/messages"
                  className="block py-3 px-4 text-gray-700 text-sm font-medium no-underline hover:bg-gradient-to-r hover:from-[#FD3266] hover:to-[#FF6B9D] hover:text-white transition-all duration-200 rounded-lg mx-2"
                >
                  Messages
                </Link>
              </div>
            </div>

          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 py-2 px-4 rounded-xl transition-all duration-200 group border border-white/20">
                <div className="w-10 h-10 bg-white text-[#FD3266] font-bold text-base rounded-full flex items-center justify-center shadow-lg">
                  {initials}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-white text-sm font-semibold">{username}</span>
                  <span className="text-white/80 text-xs">Administrator</span>
                </div>
                <FaChevronDown className="text-white text-xs transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div className="absolute top-full right-0 bg-white rounded-xl py-3 min-w-48 z-50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100">
                <Link 
                  href="/" 
                  className="flex items-center gap-3 py-3 px-4 text-gray-700 text-sm font-medium no-underline hover:bg-gradient-to-r hover:from-[#FD3266] hover:to-[#FF6B9D] hover:text-white transition-all duration-200 rounded-lg mx-2"
                >
                  <FaHome className="text-sm" />
                  Back Home
                </Link>
                <Link 
                  href={route ? route('logout') : '/logout'} 
                  method="post" 
                  as="button" 
                  className="flex items-center gap-3 py-3 px-4 text-gray-700 text-sm font-medium no-underline hover:bg-gradient-to-r hover:from-[#FD3266] hover:to-[#FF6B9D] hover:text-white transition-all duration-200 rounded-lg mx-2 w-full text-left"
                >
                  <FaSignOutAlt className="text-sm" />
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}>
          <nav className="flex flex-col gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            
            {/* Mobile Menu Items */}
            {[
              { name: "Categories", href: "/admin/categories" },
              { name: "Users", href: "/admin/users" },
              { name: "Orders", href: "/admin/orders" },
              { name: "Blog", href: "/admin/blogs" },
              { name: "Products", href: "/admin/products" },
              { name: "Mailbox", href: "/admin/messages" },
            ].map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="block py-3 px-4 text-white text-sm font-semibold bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 border border-white/10"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile User Menu */}
            <div className="border-t border-white/20 pt-3 mt-2">
              <Link 
                href="/" 
                className="flex items-center gap-3 py-3 px-4 text-white text-sm font-semibold bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 border border-white/10"
                onClick={() => setMenuOpen(false)}
              >
                <FaHome className="text-sm" />
                Back Home
              </Link>
              <Link 
                href={route ? route('logout') : '/logout'} 
                method="post" 
                as="button" 
                className="flex items-center gap-3 py-3 px-4 text-white text-sm font-semibold bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 border border-white/10 w-full text-left"
                onClick={() => setMenuOpen(false)}
              >
                <FaSignOutAlt className="text-sm" />
                Logout
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}