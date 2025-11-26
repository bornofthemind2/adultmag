import React from 'react';
import { useAppStore } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WishlistPage = () => {
  const { wishlist } = useAppStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8 border-b border-dark-700 pb-4">
        <Heart className="text-red-500" size={32} />
        <h1 className="text-3xl font-serif text-white">My Wishlist</h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center text-gray-600">
                <Heart size={32} />
            </div>
            <h2 className="text-xl text-gray-300">Your wishlist is empty</h2>
            <Link to="/shop" className="text-gold-500 flex items-center gap-2 hover:underline">
                Browse Catalog <ArrowRight size={16} />
            </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};