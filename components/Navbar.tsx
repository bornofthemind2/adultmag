import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../context/AppContext';
import { ShoppingCart, User as UserIcon, LogOut, Menu, X, ShieldCheck, Heart } from 'lucide-react';
import { AuthModal } from './AuthModal';

export const Navbar = () => {
  const { cart, wishlist, user, logout } = useAppStore();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-dark-900/95 backdrop-blur border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gold-600 rounded-sm flex items-center justify-center">
                <span className="font-serif text-dark-900 text-2xl font-bold">V</span>
              </div>
              <span className="font-serif text-2xl text-gold-500 tracking-wider hidden sm:block">VINTAGE VAULT</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link to="/" className="text-gray-300 hover:text-gold-500 transition-colors uppercase text-sm tracking-widest">Home</Link>
              <Link to="/shop" className="text-gray-300 hover:text-gold-500 transition-colors uppercase text-sm tracking-widest">Catalog</Link>
              <Link to="/faq" className="text-gray-300 hover:text-gold-500 transition-colors uppercase text-sm tracking-widest">FAQ</Link>
              <Link to="/contact" className="text-gray-300 hover:text-gold-500 transition-colors uppercase text-sm tracking-widest">Contact</Link>
              
              {user.isAuthenticated && user.isAdmin && (
                <Link to="/admin" className="text-red-400 hover:text-red-300 transition-colors uppercase text-sm tracking-widest flex items-center gap-1">
                  <ShieldCheck size={16} /> Admin
                </Link>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <Link to="/wishlist" className="text-gray-400 hover:text-red-500 transition-colors relative">
                 <Heart size={22} />
                 {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                 )}
              </Link>

              <button 
                onClick={() => user.isAuthenticated ? logout() : setIsAuthOpen(true)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={user.isAuthenticated ? "Logout" : "Login"}
              >
                {user.isAuthenticated ? <LogOut size={22} /> : <UserIcon size={22} />}
              </button>

              <Link to="/checkout" className="relative text-gray-400 hover:text-gold-500 transition-colors">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-600 text-dark-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              <button 
                className="md:hidden text-gray-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-dark-800 border-b border-dark-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/shop" className="block px-3 py-2 text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Catalog</Link>
              <Link to="/faq" className="block px-3 py-2 text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              {user.isAuthenticated && user.isAdmin && (
                 <Link to="/admin" className="block px-3 py-2 text-red-400 hover:text-red-300" onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};