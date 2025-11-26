import React, { useState } from 'react';
import { useAppStore } from '../context/AppContext';
import { RefreshCw, Star, StarOff, List, Edit2, Trash2, Plus, X } from 'lucide-react';
import { Product, SUPPORTED_TITLES } from '../types';

export const AdminPage = () => {
  const { products, toggleFeatured, refreshCatalog, isLoading, addProduct, updateProduct, deleteProduct } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct({
        title: SUPPORTED_TITLES[0],
        price: 0,
        year: 1990,
        issueDate: '',
        description: '',
        imageUrl: 'https://picsum.photos/400/550',
        country: 'USA',
        isFeatured: false
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if ('id' in editingProduct) {
        updateProduct(editingProduct as Product);
    } else {
        addProduct(editingProduct as Omit<Product, 'id'>);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8 border-b border-dark-700 pb-4">
        <div>
          <h1 className="text-3xl font-serif text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1">Manage catalog and featured items</p>
        </div>
        <div className="flex gap-4">
            <button 
                onClick={handleAddNew}
                className="flex items-center gap-2 bg-gold-600 hover:bg-gold-500 text-dark-900 font-bold px-4 py-2 rounded transition-colors"
            >
                <Plus size={18} /> Add New Issue
            </button>
            <button 
            onClick={refreshCatalog}
            disabled={isLoading}
            className="flex items-center gap-2 bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded transition-colors"
            >
            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
            {isLoading ? 'Fetching...' : 'Refresh AI'}
            </button>
        </div>
      </div>

      <div className="bg-dark-800 rounded-lg overflow-hidden border border-dark-700">
        <div className="p-4 bg-dark-900 border-b border-dark-700 flex items-center gap-2">
            <List size={20} className="text-gold-500" />
            <h2 className="text-lg font-medium text-white">Inventory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-dark-900 text-gray-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Value</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-dark-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.imageUrl} alt="" className="w-8 h-10 object-cover rounded bg-dark-600" />
                      <span className="text-gray-200 font-medium">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{product.issueDate}</td>
                  <td className="px-6 py-4 text-green-400 font-mono">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleFeatured(product.id)}
                      className={`px-2 py-1 text-xs rounded-full border transition-colors ${product.isFeatured ? 'bg-gold-600/20 text-gold-500 border-gold-600/30' : 'bg-gray-700 text-gray-400 border-gray-600 hover:border-gray-500'}`}
                    >
                       {product.isFeatured ? 'Featured' : 'Standard'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                    <button 
                      onClick={() => toggleFeatured(product.id)}
                      className="text-gray-400 hover:text-gold-500 transition-colors"
                      title="Toggle Feature"
                    >
                      {product.isFeatured ? <StarOff size={18} /> : <Star size={18} />}
                    </button>
                    <button 
                      onClick={() => handleEdit(product)}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => { if(confirm('Delete this item?')) deleteProduct(product.id) }}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-dark-800 w-full max-w-2xl rounded-lg border border-dark-600 shadow-2xl overflow-y-auto max-h-[90vh]">
                <div className="p-6 border-b border-dark-700 flex justify-between items-center">
                    <h2 className="text-xl font-serif text-white">
                        {('id' in editingProduct) ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X /></button>
                </div>
                <form onSubmit={handleSave} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase text-gray-400 mb-1">Title</label>
                            <select 
                                className="w-full bg-dark-900 border border-dark-600 text-white p-2 rounded"
                                value={editingProduct.title}
                                onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})}
                            >
                                {SUPPORTED_TITLES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-gray-400 mb-1">Price ($)</label>
                            <input 
                                type="number" step="0.01"
                                className="w-full bg-dark-900 border border-dark-600 text-white p-2 rounded"
                                value={editingProduct.price}
                                onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase text-gray-400 mb-1">Issue Date</label>
                            <input 
                                type="text"
                                className="w-full bg-dark-900 border border-dark-600 text-white p-2 rounded"
                                value={editingProduct.issueDate}
                                onChange={(e) => setEditingProduct({...editingProduct, issueDate: e.target.value})}
                                placeholder="e.g., March 1990"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-gray-400 mb-1">Year</label>
                            <input 
                                type="number"
                                className="w-full bg-dark-900 border border-dark-600 text-white p-2 rounded"
                                value={editingProduct.year}
                                onChange={(e) => setEditingProduct({...editingProduct, year: parseInt(e.target.value)})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs uppercase text-gray-400 mb-1">Description</label>
                        <textarea 
                            className="w-full bg-dark-900 border border-dark-600 text-white p-2 rounded h-24"
                            value={editingProduct.description}
                            onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase text-gray-400 mb-1">Image URL</label>
                        <input 
                            type="text"
                            className="w-full bg-dark-900 border border-dark-600 text-white p-2 rounded"
                            value={editingProduct.imageUrl}
                            onChange={(e) => setEditingProduct({...editingProduct, imageUrl: e.target.value})}
                        />
                    </div>
                     <div>
                        <label className="block text-xs uppercase text-gray-400 mb-1">Featured Actors (comma separated)</label>
                        <input 
                            type="text"
                            className="w-full bg-dark-900 border border-dark-600 text-white p-2 rounded"
                            value={editingProduct.actors?.join(', ')}
                            onChange={(e) => setEditingProduct({...editingProduct, actors: e.target.value.split(',').map(s => s.trim())})}
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-gold-600 text-dark-900 font-bold rounded hover:bg-gold-500">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};