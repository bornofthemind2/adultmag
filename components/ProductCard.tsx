import React from 'react';
import { Product } from '../types';
import { useAppStore } from '../context/AppContext';
import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, addToWishlist, wishlist } = useAppStore();
  const isWishlisted = wishlist.some(p => p.id === product.id);

  return (
    <div className="group bg-dark-800 border border-dark-700 hover:border-gold-600/50 transition-all duration-300 rounded overflow-hidden flex flex-col h-full relative">
      <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-dark-900">
        <img 
          src={product.imageUrl} 
          alt={`${product.title} - ${product.issueDate}`}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          loading="lazy"
        />
        {product.isFeatured && (
          <div className="absolute top-2 left-2 bg-gold-600 text-dark-900 text-xs font-bold px-2 py-1 rounded shadow-md uppercase tracking-wide z-10">
            Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60"></div>
      </Link>
      
      <button 
        onClick={(e) => {
            e.preventDefault();
            addToWishlist(product);
        }}
        className={`absolute top-2 right-2 p-2 rounded-full z-20 transition-colors ${isWishlisted ? 'text-red-500 bg-dark-900/80' : 'text-gray-300 bg-dark-900/50 hover:bg-dark-900 hover:text-white'}`}
      >
        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <Link to={`/product/${product.id}`} className="text-gold-500 font-serif text-lg leading-tight group-hover:text-gold-400 transition-colors hover:underline">
                {product.title}
            </Link>
            <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">{product.issueDate} • {product.country}</p>
          </div>
          <span className="text-white font-mono font-bold">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
          {product.description}
        </p>

        <button 
          onClick={() => addToCart(product, 'physical')}
          className="w-full py-2 bg-dark-700 hover:bg-gold-600 hover:text-dark-900 text-white border border-dark-600 hover:border-gold-600 transition-all uppercase text-xs font-bold tracking-widest flex items-center justify-center gap-2"
        >
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};