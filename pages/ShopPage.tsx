import React, { useState, useMemo } from 'react';
import { useAppStore } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { SUPPORTED_TITLES } from '../types';
import { Filter, Search } from 'lucide-react';

export const ShopPage = () => {
  const { products, isLoading } = useAppStore();
  
  // Filter States
  const [selectedTitle, setSelectedTitle] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [keyword, setKeyword] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30]);

  // Dynamically calculate years from actual product data
  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(products.map(p => p.year))).sort((a, b) => Number(b) - Number(a));
    return uniqueYears;
  }, [products]);

  const countries = useMemo(() => {
    return Array.from(new Set(products.map(p => p.country))).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchTitle = selectedTitle === 'All' || p.title.toLowerCase().includes(selectedTitle.toLowerCase()) || (selectedTitle === 'Other' && !SUPPORTED_TITLES.includes(p.title as any));
      const matchYear = selectedYear === 'All' || p.year.toString() === selectedYear;
      const matchCountry = selectedCountry === 'All' || p.country === selectedCountry;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchKeyword = keyword === '' || 
                           p.title.toLowerCase().includes(keyword.toLowerCase()) || 
                           p.description.toLowerCase().includes(keyword.toLowerCase()) ||
                           p.actors?.some(a => a.toLowerCase().includes(keyword.toLowerCase()));

      return matchTitle && matchYear && matchCountry && matchPrice && matchKeyword;
    });
  }, [products, selectedTitle, selectedYear, selectedCountry, priceRange, keyword]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Advanced Search Header */}
      <div className="mb-8 p-6 bg-dark-800 border border-dark-700 rounded-lg">
          <h2 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
            <Search size={20} className="text-gold-500"/> Advanced Search
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <div className="md:col-span-2">
                 <input 
                    type="text" 
                    placeholder="Search titles, actors, descriptions..." 
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-600 text-white p-3 rounded focus:border-gold-500 outline-none"
                 />
             </div>
             <div>
                <div className="text-xs text-gray-400 mb-1">Price Min: ${priceRange[0]}</div>
                <input 
                    type="range" 
                    min="0" max="500" 
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-gold-500"
                />
             </div>
             <div>
                <div className="text-xs text-gray-400 mb-1">Price Max: ${priceRange[1]}</div>
                <input 
                    type="range" 
                    min="0" max="1000" 
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-gold-500"
                />
             </div>
          </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div className="flex items-center gap-2 text-gold-500 border-b border-dark-700 pb-2">
            <Filter size={18} />
            <h2 className="font-serif text-lg">Categories</h2>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold">Magazine Title</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="title" 
                  checked={selectedTitle === 'All'}
                  onChange={() => setSelectedTitle('All')}
                  className="accent-gold-500"
                />
                <span className={`text-sm ${selectedTitle === 'All' ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>All Titles</span>
              </label>
              {SUPPORTED_TITLES.map(title => (
                <label key={title} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="title" 
                    checked={selectedTitle === title}
                    onChange={() => setSelectedTitle(title)}
                    className="accent-gold-500"
                  />
                  <span className={`text-sm ${selectedTitle === title ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>{title}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold">Year (Era)</h3>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-dark-800 border border-dark-600 text-gray-300 text-sm rounded p-2 focus:border-gold-500 focus:outline-none"
            >
              <option value="All">All Years</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold">Country</h3>
             <select 
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-dark-800 border border-dark-600 text-gray-300 text-sm rounded p-2 focus:border-gold-500 focus:outline-none"
            >
              <option value="All">All Regions</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-serif text-white">Catalog Results</h1>
            <span className="text-gray-500 text-sm">{filteredProducts.length} issues found</span>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500 mb-4"></div>
               <p>Consulting archives...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-500 border border-dashed border-dark-700 rounded">
                  No issues found matching your criteria.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};