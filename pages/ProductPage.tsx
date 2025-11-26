import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppStore } from '../context/AppContext';
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Download, Gem } from 'lucide-react';

export const ProductPage = () => {
  const { id } = useParams();
  const { products, addToCart } = useAppStore();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
            <h2 className="text-2xl text-white">Issue Not Found</h2>
            <Link to="/shop" className="text-gold-500 underline">Return to Catalog</Link>
        </div>
    );
  }

  const digitalPrice = product.price * 0.5;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/shop" className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image */}
        <div className="relative">
             <div className="aspect-[3/4] bg-dark-800 rounded-lg overflow-hidden border border-dark-700 shadow-2xl">
                <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                />
             </div>
             {product.isFeatured && (
                 <div className="absolute top-4 left-4 bg-gold-600 text-dark-900 font-bold px-3 py-1 rounded shadow-lg uppercase tracking-wider text-sm">
                     Featured Item
                 </div>
             )}
        </div>

        {/* Right: Details */}
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">{product.title}</h1>
                <p className="text-xl text-gold-500 font-light uppercase tracking-widest mb-4">
                    {product.issueDate} • {product.year}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="px-3 py-1 bg-dark-800 border border-dark-600 rounded">Region: {product.country}</span>
                    <span className="px-3 py-1 bg-dark-800 border border-dark-600 rounded">Condition: Very Good+</span>
                </div>
            </div>

            <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 space-y-4">
                <h3 className="text-white font-serif text-xl border-b border-dark-600 pb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
                
                {product.collectibleReason && (
                    <div className="flex gap-3 items-start p-3 bg-blue-900/20 border border-blue-800/50 rounded">
                        <Star className="text-blue-400 shrink-0 mt-1" size={18} />
                        <div>
                            <span className="text-blue-200 font-bold block text-sm uppercase">Collector's Note</span>
                            <span className="text-gray-400 text-sm">{product.collectibleReason}</span>
                        </div>
                    </div>
                )}
            </div>

            {product.actors && product.actors.length > 0 && (
                <div>
                    <h3 className="text-gray-400 text-sm uppercase tracking-widest font-bold mb-3">Featured Models</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.actors.map((actor, idx) => (
                            <span key={idx} className="px-4 py-2 bg-dark-800 text-gray-200 border border-dark-600 rounded-full text-sm">
                                {actor}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Purchase Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-dark-700">
                {/* Physical Option */}
                <div className="p-4 border border-gold-600/30 bg-gold-600/5 rounded hover:bg-gold-600/10 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-white">Physical Copy</h4>
                        <span className="text-xl text-gold-500 font-serif">${product.price.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">Original vintage magazine. Discreet shipping included.</p>
                    <button 
                        onClick={() => addToCart(product, 'physical')}
                        className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-dark-900 font-bold uppercase tracking-widest text-sm rounded flex items-center justify-center gap-2"
                    >
                        <ShoppingCart size={16} /> Add Physical
                    </button>
                </div>

                {/* Digital NFT Option */}
                <div className="p-4 border border-purple-500/30 bg-purple-900/5 rounded hover:bg-purple-900/10 transition-colors">
                     <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-purple-200 flex items-center gap-2">
                            <Gem size={16} className="text-purple-400"/> Digital NFT
                        </h4>
                        <span className="text-xl text-purple-400 font-serif">${digitalPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">Verified digital ownership. Blockchain secured. 50% Off.</p>
                    <button 
                         onClick={() => addToCart(product, 'digital')}
                         className="w-full py-3 bg-dark-700 hover:bg-purple-900/40 text-purple-200 border border-purple-900 hover:border-purple-500 font-bold uppercase tracking-widest text-sm rounded flex items-center justify-center gap-2"
                    >
                        <Download size={16} /> Mint Digital
                    </button>
                </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={14} /> Authenticity Guaranteed by Vintage Vault
            </div>
        </div>
      </div>
    </div>
  );
};