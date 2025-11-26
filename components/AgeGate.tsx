import React from 'react';
import { useAppStore } from '../context/AppContext';
import { ShieldAlert, LogOut } from 'lucide-react';

export const AgeGate = () => {
  const { verifyAge } = useAppStore();

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm px-4">
      <div className="max-w-2xl w-full bg-dark-800 border border-red-900/50 rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-red-900/20 p-6 border-b border-red-900/30 flex items-center gap-4">
          <ShieldAlert className="w-12 h-12 text-red-500" />
          <h1 className="text-3xl font-serif text-red-100">RESTRICTED ACCESS</h1>
        </div>
        
        <div className="p-8 space-y-6">
          <p className="text-lg text-gray-300 leading-relaxed font-serif">
            This website contains sexually explicit adult material intended for individuals of legal age as dictated by regional law.
          </p>
          <div className="bg-red-950/30 p-4 border-l-4 border-red-600 rounded">
            <p className="text-red-200 font-semibold">
              If you are not a legal adult, if you find adult material offensive, or if you are accessing this site from any country or region where adult material is specifically prohibited by law, <span className="underline font-bold">DO NOT PROCEED!</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={handleExit}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded transition-colors uppercase tracking-widest text-sm font-bold"
            >
              <LogOut size={18} />
              Exit Website
            </button>
            <button 
              onClick={verifyAge}
              className="flex-1 px-6 py-4 bg-red-800 hover:bg-red-700 text-white rounded transition-colors uppercase tracking-widest text-sm font-bold shadow-[0_0_15px_rgba(220,38,38,0.5)]"
            >
              I am 18+ & Proceed
            </button>
          </div>
          
          <p className="text-xs text-center text-gray-500 mt-4">
            By entering, you agree to our Terms of Service and confirm you are of legal age in your jurisdiction.
          </p>
        </div>
      </div>
    </div>
  );
};
