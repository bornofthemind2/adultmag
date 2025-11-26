import React, { useState } from 'react';
import { useAppStore } from '../context/AppContext';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAppStore();
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    login(email);
    
    if (email.toLowerCase().includes('admin')) {
      navigate('/admin');
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-dark-800 border border-dark-600 rounded-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-serif text-gold-500 mb-6 text-center">Member Access</h2>
        
        <div className="flex gap-4 mb-6 border-b border-dark-600 pb-1">
            <button 
                className={`flex-1 pb-2 text-sm uppercase tracking-wide ${method === 'email' ? 'text-white border-b border-gold-500' : 'text-gray-500'}`}
                onClick={() => setMethod('email')}
            >
                Email
            </button>
            <button 
                className={`flex-1 pb-2 text-sm uppercase tracking-wide ${method === 'phone' ? 'text-white border-b border-gold-500' : 'text-gray-500'}`}
                onClick={() => setMethod('phone')}
            >
                Phone
            </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                {method === 'email' ? 'Email Address' : 'Phone Number'}
            </label>
            <input 
              type={method === 'email' ? 'email' : 'tel'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-900 border border-dark-600 text-white px-4 py-3 rounded focus:outline-none focus:border-gold-500 transition-colors"
              placeholder={method === 'email' ? 'collector@example.com' : '+1 (555) 000-0000'}
            />
          </div>
          
          <div className="text-xs text-gray-500 italic">
             For admin access demo, use email containing "admin".
          </div>

          <button 
            type="submit"
            className="w-full bg-gold-600 hover:bg-gold-500 text-dark-900 font-bold py-3 rounded uppercase tracking-widest transition-colors"
          >
            Enter Vault
          </button>
        </form>
      </div>
    </div>
  );
};