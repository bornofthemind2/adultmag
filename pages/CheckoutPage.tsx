import React, { useState } from 'react';
import { useAppStore } from '../context/AppContext';
import { Trash2, Lock, CreditCard, Bitcoin, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export const CheckoutPage = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, user } = useAppStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); 
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const hasPhysical = cart.some(item => item.variant === 'physical');
  const shipping = hasPhysical ? 15.00 : 0; 
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!user.isAuthenticated) {
        toast.error("Please login to proceed to checkout");
        return;
    }
    setStep(2);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate Processing
    setTimeout(() => {
        setIsProcessing(false);
        clearCart();
        toast.success(paymentMethod === 'crypto' ? "Crypto Payment Confirmed" : "Order Placed Successfully!");
        setStep(3); 
    }, 2000);
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-serif text-gray-300">Your collection is empty.</h2>
        <Link to="/shop" className="px-6 py-3 bg-gold-600 text-dark-900 font-bold uppercase tracking-widest text-sm rounded hover:bg-gold-500">
            Browse Catalog
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center px-4">
            <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center text-green-500 mb-4 border border-green-500/50">
                <Lock size={40} />
            </div>
            <h2 className="text-3xl font-serif text-white">Order Confirmed</h2>
            <p className="text-gray-400 max-w-md">
                {hasPhysical 
                    ? "Thank you for your purchase. Your items will be shipped in discreet, unmarked packaging within 48 hours."
                    : "Digital assets have been transferred to your wallet/account."
                }
            </p>
            <Link to="/" className="text-gold-500 underline hover:text-white">Return Home</Link>
        </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-serif text-white mb-8 border-b border-dark-700 pb-4">
        {step === 1 ? 'Your Collection' : 'Secure Checkout'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
            {step === 1 ? (
                // Cart Items View
                <div className="space-y-4">
                    {cart.map(item => (
                    <div key={`${item.id}-${item.variant}`} className="flex gap-4 bg-dark-800 p-4 rounded border border-dark-700">
                        <img src={item.imageUrl} alt={item.title} className="w-20 h-28 object-cover rounded bg-dark-900" />
                        <div className="flex-grow flex flex-col justify-between">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-lg font-serif text-white">{item.title}</h3>
                                    <p className="text-sm text-gray-500">{item.issueDate}</p>
                                    <span className={`text-xs uppercase px-2 py-0.5 rounded ${item.variant === 'digital' ? 'bg-purple-900 text-purple-200' : 'bg-gray-700 text-gray-300'}`}>
                                        {item.variant === 'digital' ? 'NFT / Digital' : 'Physical Copy'}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="font-mono text-gray-300 block">${(item.price * item.quantity).toFixed(2)}</span>
                                    {item.variant === 'digital' && <span className="text-xs text-green-500">50% Off Applied</span>}
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-end">
                                <div className="flex items-center gap-3">
                                    <select 
                                        value={item.quantity}
                                        onChange={(e) => updateCartQuantity(item.id, item.variant, parseInt(e.target.value))}
                                        className="bg-dark-900 border border-dark-600 text-gray-300 rounded p-1 text-sm"
                                    >
                                        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                    <button onClick={() => removeFromCart(item.id, item.variant)} className="text-gray-500 hover:text-red-400 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            ) : (
                // Checkout Form
                <div className="space-y-6 bg-dark-800 p-6 rounded border border-dark-700">
                    <h3 className="text-xl text-white font-serif mb-4">Select Payment Method</h3>
                    
                    <div className="flex gap-4 mb-6">
                        <button 
                            onClick={() => setPaymentMethod('card')}
                            className={`flex-1 p-4 border rounded flex flex-col items-center gap-2 ${paymentMethod === 'card' ? 'border-gold-500 bg-gold-600/10 text-white' : 'border-dark-600 text-gray-500'}`}
                        >
                            <CreditCard size={24} />
                            <span className="text-sm font-bold">Credit Card</span>
                        </button>
                        <button 
                            onClick={() => setPaymentMethod('crypto')}
                            className={`flex-1 p-4 border rounded flex flex-col items-center gap-2 ${paymentMethod === 'crypto' ? 'border-purple-500 bg-purple-600/10 text-white' : 'border-dark-600 text-gray-500'}`}
                        >
                            <div className="flex gap-1"><Bitcoin size={24} /><Coins size={24}/></div>
                            <span className="text-sm font-bold">Crypto (BTC/ETH)</span>
                        </button>
                    </div>
                    
                    {paymentMethod === 'card' ? (
                        <div className="space-y-4 animate-fade-in">
                            <div className="p-4 border border-gray-600 rounded bg-dark-900 text-gray-500">
                                Credit Card Number
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 border border-gray-600 rounded bg-dark-900 text-gray-500">MM / YY</div>
                                <div className="p-4 border border-gray-600 rounded bg-dark-900 text-gray-500">CVC</div>
                            </div>
                        </div>
                    ) : (
                         <div className="space-y-4 animate-fade-in text-center py-4">
                             <p className="text-gray-400 text-sm mb-4">Scan QR code or copy address to send payment.</p>
                             <div className="w-32 h-32 bg-white mx-auto p-2 rounded">
                                 {/* Mock QR */}
                                 <div className="w-full h-full bg-black"></div>
                             </div>
                             <div className="font-mono text-xs text-gray-500 break-all bg-dark-900 p-2 rounded">
                                 0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                             </div>
                         </div>
                    )}
                </div>
            )}
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-1">
            <div className="bg-dark-800 p-6 rounded border border-dark-700 sticky top-24">
                <h3 className="text-lg font-serif text-white mb-6">Order Summary</h3>
                <div className="space-y-3 text-sm text-gray-400 pb-4 border-b border-dark-600">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping {hasPhysical ? '(Discreet)' : ''}</span>
                        <span>{hasPhysical ? `$${shipping.toFixed(2)}` : 'Free'}</span>
                    </div>
                </div>
                <div className="flex justify-between text-white font-bold text-lg pt-4 mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                {step === 1 ? (
                    <button 
                        onClick={handleCheckout}
                        className="w-full py-4 bg-gold-600 hover:bg-gold-500 text-dark-900 font-bold uppercase tracking-widest rounded transition-colors"
                    >
                        Proceed to Checkout
                    </button>
                ) : (
                    <div className="space-y-3">
                        <button 
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full py-4 bg-gold-600 hover:bg-gold-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-dark-900 font-bold uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-2"
                        >
                            {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                        </button>
                        <button onClick={() => setStep(1)} className="w-full text-center text-gray-500 text-sm hover:text-gray-300">
                            Back to Cart
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};