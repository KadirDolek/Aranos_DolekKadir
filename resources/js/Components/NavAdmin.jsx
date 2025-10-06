import { Link, usePage } from '@inertiajs/react'
import { FaBars } from "react-icons/fa";
import { useState } from 'react';

export default function NavAdmin() {
  const { auth } = usePage().props; 
  const user = auth?.user;
  const initials = (user?.pseudo?.charAt(0) || user?.nom?.charAt(0) || 'U').toUpperCase();
  const username = user?.pseudo || user?.nom || 'User';
  const cartCount = auth?.cartCount || 0;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center bg-[#FEDADA] py-3 px-15 relative z-50">
      {/* Logo + Badge */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <h1 className="text-xl font-bold ml-2.5">Aranoz.</h1>
        </Link>
        <span className="bg-red-500 text-white py-1 px-2.5 rounded-full text-xs font-bold">
          admin
        </span>
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
          ? 'absolute top-15 left-0 bg-[#FEDADA] w-full py-4 px-4 flex flex-col gap-2.5 sm:flex md:hidden' 
          : 'hidden md:flex'
      }`}>
        
        {/* Admin Dropdown */}
        <div className="relative group">
          <span className="text-sm text-black no-underline cursor-pointer flex items-center gap-1 hover:text-gray-700">
            Categories ▾
          </span>
          <div className="absolute top-full left-0 bg-[#FD3266] rounded-lg py-2 min-w-40 z-50 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <Link href="/admin/categories" className="block py-2 px-4 text-white text-sm no-underline whitespace-nowrap rounded hover:bg-white hover:text-[#FD3266] transition-all duration-300">
              Categories
            </Link>
          </div>
        </div>

        {/* Users Dropdown */}
        <div className="relative group">
          <span className="text-sm text-black no-underline cursor-pointer flex items-center gap-1 hover:text-gray-700">
            Users ▾
          </span>
          <div className="absolute top-full left-0 bg-[#FD3266] rounded-lg py-2 min-w-40 z-50 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <Link href="/admin/users" className="block py-2 px-4 text-white text-sm no-underline whitespace-nowrap rounded hover:bg-white hover:text-[#FD3266] transition-all duration-300">
              Users
            </Link>
          </div>
        </div>

        {/* Orders Link */}
        <Link href="/admin/orders" className="text-sm text-black no-underline cursor-pointer hover:text-gray-700">
          Orders
        </Link>

        {/* Blog Dropdown */}
        <div className="relative group">
          <span className="text-sm text-black no-underline cursor-pointer flex items-center gap-1 hover:text-gray-700">
            Blog ▾
          </span>
          <div className="absolute top-full left-0 bg-[#FD3266] rounded-lg py-2 min-w-40 z-50 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <Link href="/admin/blogs" className="block py-2 px-4 text-white text-sm no-underline whitespace-nowrap rounded hover:bg-white hover:text-[#FD3266] transition-all duration-300">
              Blogs
            </Link>
          </div>
        </div>

        {/* Products Dropdown */}
        <div className="relative group">
          <span className="text-sm text-black no-underline cursor-pointer flex items-center gap-1 hover:text-gray-700">
            Products ▾
          </span>
          <div className="absolute top-full left-0 bg-[#FD3266] rounded-lg py-2 min-w-40 z-50 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <Link href="/admin/produits" className="block py-2 px-4 text-white text-sm no-underline whitespace-nowrap rounded hover:bg-white hover:text-[#FD3266] transition-all duration-300">
              Products
            </Link>
          </div>
        </div>

        {/* Mailbox Dropdown */}
        <div className="relative group">
          <span className="text-sm text-black no-underline cursor-pointer flex items-center gap-1 hover:text-gray-700">
            Mailbox ▾
          </span>
          <div className="absolute top-full left-0 bg-[#FD3266] rounded-lg py-2 min-w-40 z-50 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <Link href="/messages" className="block py-2 px-4 text-white text-sm no-underline whitespace-nowrap rounded hover:bg-white hover:text-[#FD3266] transition-all duration-300">
              Messages
            </Link>
          </div>
        </div>
      </nav>

      {/* Navigation Right */}
      <div className="flex items-center gap-5 mr-5">
        {/* User Menu */}
        <div className="relative group">
          <div 
            className="text-sm text-black no-underline cursor-pointer flex items-center gap-2" 
            role="button" 
            tabIndex={0}
          >
            <div className="w-8 h-8 bg-[#ff3366] text-white font-bold text-sm rounded-full flex items-center justify-center">
              {initials}
            </div>
            <span className="text-sm hidden sm:block">{username}</span>
            <span className="text-xs">▾</span>
          </div>

          <div className="absolute top-full right-0 bg-[#FD3266] rounded-lg py-2 min-w-40 z-50 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <Link href="/" className="block py-2 px-4 text-white text-sm no-underline whitespace-nowrap rounded hover:bg-white hover:text-[#FD3266] transition-all duration-300 w-full text-left bg-transparent">
              Back Home
            </Link>
            <Link 
              href={route ? route('logout') : '/logout'} 
              method="post" 
              as="button" 
              className="block py-2 px-4 text-white text-sm no-underline whitespace-nowrap rounded hover:bg-white hover:text-[#FD3266] transition-all duration-300 w-full text-left bg-transparent"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}