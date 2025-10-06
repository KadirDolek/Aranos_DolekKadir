import React from "react";
import { FaFacebookF, FaTwitter, FaGlobe, FaBehance } from "react-icons/fa";
import { Link } from "@inertiajs/react";

export default function Footer(){
  return(
    <>
    <footer className="bg-white py-15 px-10 border-t border-gray-200">
      <div className="flex flex-wrap justify-between gap-10 max-w-7xl mx-auto">
        {/* Colonne 1 */}
        <div className="flex-1 min-w-45">
          <h4 className="text-base font-semibold mb-4 text-black">Top Products</h4>
          <ul className="list-none p-0">
            <li className="text-sm text-gray-600 mb-2.5 cursor-pointer hover:text-[#ff2c72] transition-colors duration-300">
              Managed Website
            </li>
            <li className="text-sm text-gray-600 mb-2.5 cursor-pointer hover:text-[#ff2c72] transition-colors duration-300">
              Manage Reputation
            </li>
            <li className="text-sm text-gray-600 mb-2.5 cursor-pointer hover:text-[#ff2c72] transition-colors duration-300">
              Power Tools
            </li>
            <li className="text-sm text-gray-600 mb-2.5 cursor-pointer hover:text-[#ff2c72] transition-colors duration-300">
              Marketing Service
            </li>
          </ul>
        </div>

        {/* Colonne 2 */}
        <div className="flex-1 min-w-45">
          <h4 className="text-base font-semibold mb-4 text-black">Quick Links</h4>
          <ul className="list-none p-0">
            <li className="text-sm text-gray-600 mb-2.5 cursor-pointer hover:text-[#ff2c72] transition-colors duration-300">
              Jobs
            </li>
            <li className="text-sm text-gray-600 mb-2.5 cursor-pointer hover:text-[#ff2c72] transition-colors duration-300">
              Brand Assets
            </li>
            <li className="text-sm text-gray-600 mb-2.5 cursor-pointer hover:text-[#ff2c72] transition-colors duration-300">
              Investor Relations
            </li>
            <li className="text-sm text-gray-600 mb-2.5 cursor-pointer hover:text-[#ff2c72] transition-colors duration-300">
              Terms of Service
            </li>
          </ul>
        </div>

        {/* Colonne 3 */}
        <div className="flex-1 min-w-45">
          <h4 className="text-base font-semibold mb-4 text-black">Features</h4>
          <ul className="list-none p-0">
            <li className="text-sm text-gray-600 mb-2.5 cursor-pointer hover:text-[#ff2c72] transition-colors duration-300">
              Jobs
            </li>
            <li className="text-sm text-gray-600 mb-2.5 cursor-pointer hover:text-[#ff2c72] transition-colors duration-300">
              Brand Assets
            </li>
            <li className="text-sm text-gray-600 mb-2.5 cursor-pointer hover:text-[#ff2c72] transition-colors duration-300">
              Investor Relations
            </li>
            <li className="text-sm text-gray-600 mb-2.5 cursor-pointer hover:text-[#ff2c72] transition-colors duration-300">
              Terms of Service
            </li>
          </ul>
        </div>

        {/* Colonne 4 */}
        <div className="flex-1 min-w-45">
          <h4 className="text-base font-semibold mb-4 text-black">Resources</h4>
          <ul className="list-none p-0">
            <li className="text-sm text-gray-600 mb-2.5 cursor-pointer hover:text-[#ff2c72] transition-colors duration-300">
              Guides
            </li>
            <li className="text-sm text-gray-600 mb-2.5 cursor-pointer hover:text-[#ff2c72] transition-colors duration-300">
              Research
            </li>
            <li className="text-sm text-gray-600 mb-2.5 cursor-pointer hover:text-[#ff2c72] transition-colors duration-300">
              Experts
            </li>
            <li className="text-sm text-gray-600 mb-2.5 cursor-pointer hover:text-[#ff2c72] transition-colors duration-300">
              Agencies
            </li>
          </ul>
        </div>

        {/* Colonne Newsletter */}
        <div className="flex-1 min-w-45">
          <h4 className="text-base font-semibold mb-4 text-black">Newsletter</h4>
          <p className="text-sm text-gray-800 mb-4">
            Heaven fruitful doesn&apos;t over lesser in days.
            <br /> Appear creeping
          </p>
          <div className="flex items-center">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="flex-1 px-2.5 py-2.5 border border-gray-300 outline-none rounded-l"
            />
            <button className="bg-[#ff2c72] text-white border-none px-4 py-2.5 rounded-r cursor-pointer hover:bg-[#e0215f] transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="mt-10 pt-5 border-t border-gray-200 flex justify-between items-center flex-wrap max-w-7xl mx-auto">
        <p className="text-xs text-gray-600">
          Copyright ©2025 All rights reserved | This template is made with ♡ by Arthur
        </p>
        <div className="flex">
          <a href="#" className="ml-4 text-lg text-gray-600 hover:text-[#ff2c72] transition-colors duration-300">
            <FaFacebookF />
          </a>
          <a href="#" className="ml-4 text-lg text-gray-600 hover:text-[#ff2c72] transition-colors duration-300">
            <FaTwitter />
          </a>
          <a href="#" className="ml-4 text-lg text-gray-600 hover:text-[#ff2c72] transition-colors duration-300">
            <FaGlobe />
          </a>
          <a href="#" className="ml-4 text-lg text-gray-600 hover:text-[#ff2c72] transition-colors duration-300">
            <FaBehance />
          </a>
        </div>
      </div>
    </footer>
    </>
  )
}