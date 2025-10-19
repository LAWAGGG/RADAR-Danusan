import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-green-800 text-white shadow-lg"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-800 font-bold text-sm">ر</span>
            </div>
            <h1 className="text-xl font-bold">RADAR-DANUSAN</h1>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.a 
              whileHover={{ scale: 1.1 }}
              href="/" 
              className="hover:text-green-200 transition-colors"
            >
              Beranda
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1 }}
              href="#produk" 
              className="hover:text-green-200 transition-colors"
            >
              Produk
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1 }}
              href="#tentang" 
              className="hover:text-green-200 transition-colors"
            >
              Tentang
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden mt-4 space-y-2"
          >
            <a href="/" className="block py-2 hover:text-green-200">Beranda</a>
            <a href="#produk" className="block py-2 hover:text-green-200">Produk</a>
            <a href="#tentang" className="block py-2 hover:text-green-200">Tentang</a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}