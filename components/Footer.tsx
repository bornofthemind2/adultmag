import React from 'react';
import { useAppStore } from '../context/AppContext';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { products } = useAppStore();
  const sortedProducts = [...products].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <footer className="bg-dark-800 border-t border-dark-700 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-gold-500 font-serif text-xl mb-4">Vintage Vault</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              The premier destination for collectors of vintage adult publications from the golden era (1985-1995). 
              We pride ourselves on discretion, preservation, and authenticity.
            </p>
            <div className="mt-6 p-4 border border-dark-600 bg-dark-900 rounded">
              <h4 className="text-gray-300 text-xs uppercase tracking-widest font-bold mb-2">Discreet Packaging Guarantee</h4>
              <p className="text-gray-500 text-xs">
                All orders are shipped in plain, unmarked packaging. The sender name will appear as "VV Logistics" on your statement.
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-gray-200 font-bold uppercase text-sm tracking-widest mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-gold-500">Catalog</Link></li>
              <li><span className="cursor-pointer hover:text-gold-500">Shipping Policy</span></li>
              <li><span className="cursor-pointer hover:text-gold-500">Returns</span></li>
              <li><span className="cursor-pointer hover:text-gold-500">Privacy & Terms</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-gray-200 font-bold uppercase text-sm tracking-widest mb-4">Secure Payment</h4>
            <div className="flex gap-2 opacity-50">
              {/* Payment Icons Placeholders */}
              <div className="w-10 h-6 bg-gray-600 rounded"></div>
              <div className="w-10 h-6 bg-gray-600 rounded"></div>
              <div className="w-10 h-6 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-700 pt-8 mt-8">
          <h4 className="text-center text-gray-500 text-xs uppercase tracking-widest mb-4">Full Catalog Index</h4>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-600">
            {sortedProducts.map(p => (
              <Link key={p.id} to="/shop" className="hover:text-gold-500 transition-colors">
                {p.title} ({p.issueDate})
              </Link>
            ))}
          </div>
          <p className="text-center text-gray-700 text-xs mt-8">
            &copy; {new Date().getFullYear()} Vintage Vault. 18+ Only. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
