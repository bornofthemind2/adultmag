import React from 'react';
import { useAppStore } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { Lock, Package, Star } from 'lucide-react';

export const HomePage = () => {
  const { products, isLoading } = useAppStore();
  
  // Get featured products, if none, take first 4
  const featured = products.filter(p => p.isFeatured).slice(0, 4);
  const displayProducts = featured.length > 0 ? featured : products.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            {/* Abstract vintage background */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-dark-900/90 to-black z-10"></div>
            <img 
                src="https://picsum.photos/seed/vintage/1920/1080" 
                alt="Vintage Background" 
                className="w-full h-full object-cover opacity-30 grayscale"
            />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-6">
          <span className="text-gold-500 tracking-[0.3em] uppercase text-sm font-bold animate-fade-in">Established Collection 1985-1995</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
            Preserving the <br/>
            <span className="italic text-gold-500">Golden Era</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            A curated marketplace for vintage adult publications. Discover rare issues from Playboy, Penthouse, Hustler, and more.
          </p>
          <div className="pt-8">
            <Link 
              to="/shop"
              className="px-8 py-4 bg-transparent border-2 border-gold-600 text-gold-500 hover:bg-gold-600 hover:text-dark-900 transition-all uppercase tracking-widest text-sm font-bold"
            >
              Enter Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-dark-800 py-12 border-y border-dark-700">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center text-gold-500">
                    <Package size={24} />
                </div>
                <h3 className="text-white font-serif text-xl">Discreet Shipping</h3>
                <p className="text-gray-400 text-sm">Every order arrives in plain, unbranded packaging. Your privacy is our absolute priority.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center text-gold-500">
                    <Star size={24} />
                </div>
                <h3 className="text-white font-serif text-xl">Verified Authenticity</h3>
                <p className="text-gray-400 text-sm">All issues are verified for year, condition, and market value against collector databases.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center text-gold-500">
                    <Lock size={24} />
                </div>
                <h3 className="text-white font-serif text-xl">Secure Transactions</h3>
                <p className="text-gray-400 text-sm">We use top-tier encryption for payment processing. No adult-related descriptors on statements.</p>
            </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-3xl font-serif text-white">Featured Issues</h2>
                <p className="text-gray-400 mt-2 text-sm">Highest market value selections from 1985-1995</p>
            </div>
            <Link to="/shop" className="text-gold-500 hover:text-gold-400 text-sm uppercase tracking-widest border-b border-transparent hover:border-gold-500 pb-1 transition-all">View All</Link>
        </div>

        {isLoading ? (
            <div className="h-64 flex items-center justify-center text-gold-500">Loading Collection...</div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        )}
      </section>
    </div>
  );
};
