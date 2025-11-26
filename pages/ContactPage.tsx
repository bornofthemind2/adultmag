import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We will respond shortly.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
            <h1 className="text-3xl font-serif text-white mb-6">Contact Us</h1>
            <p className="text-gray-400 mb-8">
                Have a question about a specific issue or need help with your order? 
                Our team of archivists is here to assist you.
            </p>

            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-dark-800 rounded flex items-center justify-center text-gold-500 shrink-0">
                        <Mail size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase">Email</h3>
                        <p className="text-gray-500">support@vintagevault.com</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-dark-800 rounded flex items-center justify-center text-gold-500 shrink-0">
                        <Phone size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase">Phone</h3>
                        <p className="text-gray-500">+1 (800) 555-0199</p>
                        <p className="text-gray-600 text-xs">Mon-Fri, 9am - 5pm EST</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-dark-800 rounded flex items-center justify-center text-gold-500 shrink-0">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase">Office</h3>
                        <p className="text-gray-500">123 Archivist Lane<br/>Los Angeles, CA 90028</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-dark-800 p-8 rounded-lg border border-dark-700">
            <h2 className="text-xl text-white font-serif mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Name</label>
                    <input 
                        type="text" 
                        required
                        className="w-full bg-dark-900 border border-dark-600 text-white p-3 rounded focus:border-gold-500 outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Email</label>
                    <input 
                        type="email" 
                        required
                        className="w-full bg-dark-900 border border-dark-600 text-white p-3 rounded focus:border-gold-500 outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Message</label>
                    <textarea 
                        required
                        className="w-full bg-dark-900 border border-dark-600 text-white p-3 rounded h-32 focus:border-gold-500 outline-none"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-dark-900 font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2"
                >
                    <Send size={16} /> Send Inquiry
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};