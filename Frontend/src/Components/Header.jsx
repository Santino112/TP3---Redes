// src/components/Header.jsx
import React from 'react';

function Header() {
  return (
    <header className="sticky top-0 z-50 p-4 md:p-6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-md border-b border-gray-700/30">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          ClarityFlow
        </div>
        <ul className="hidden md:flex space-x-8 text-lg">
          <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Overview</a></li>
          <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Locations</a></li>
          <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">History</a></li>
        </ul>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
          Settings
        </button>
      </nav>
    </header>
  );
}

export default Header;