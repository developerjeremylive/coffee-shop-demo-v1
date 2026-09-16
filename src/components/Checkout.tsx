import { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderComplete: () => void;
}

export default function Checkout({ isOpen, onClose, cartItems, onOrderComplete }: CheckoutProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = total > 50 ? 0 : 5.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const handleClose = () => {
    setStep('form');
    setFormData({ name: '', email: '', address: '', city: '', zip: '', cardNumber: '', expiry: '', cvv: '' });
    onClose();
  };

  const handleComplete = () => {
    onOrderComplete();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={handleClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-stone-900 rounded-2xl border border-stone-800 shadow-2xl animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200 transition-colors border border-stone-700"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {step === 'form' && (
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-serif font-bold text-stone-100 mb-1">Checkout</h2>
            <p className="text-sm text-stone-500 mb-6">Complete your order</p>

            {/* Order Summary */}
            <div className="mb-6 p-4 bg-stone-800/60 rounded-xl border border-stone-800">
              <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">Order Summary</h3>
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center py-1.5">
                  <span className="text-sm text-stone-300">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="text-sm text-stone-200 font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-stone-700 mt-3 pt-3 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="text-stone-300">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Shipping</span>
                  <span className="text-stone-300">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Tax</span>
                  <span className="text-stone-300">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-stone-700">
                  <span className="text-stone-200">Total</span>
                  <span className="text-amber-400">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-200 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-800/50 focus:ring-1 focus:ring-amber-800/30 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-200 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-800/50 focus:ring-1 focus:ring-amber-800/30 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-200 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-800/50 focus:ring-1 focus:ring-amber-800/30 transition-all"
                  placeholder="123 Coffee Street"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-200 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-800/50 focus:ring-1 focus:ring-amber-800/30 transition-all"
                    placeholder="Portland"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-200 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-800/50 focus:ring-1 focus:ring-amber-800/30 transition-all"
                    placeholder="97201"
                  />
                </div>
              </div>

              {/* Payment (simulated) */}
              <div className="pt-4 border-t border-stone-800">
                <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">Payment Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Card Number</label>
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full px-4 py-2.5 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-200 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-800/50 focus:ring-1 focus:ring-amber-800/30 transition-all"
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Expiry</label>
                      <input
                        type="text"
                        required
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        className="w-full px-4 py-2.5 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-200 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-800/50 focus:ring-1 focus:ring-amber-800/30 transition-all"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">CVV</label>
                      <input
                        type="text"
                        required
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        className="w-full px-4 py-2.5 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-200 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-800/50 focus:ring-1 focus:ring-amber-800/30 transition-all"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-6 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-900/20 transition-all duration-300"
              >
                Place Order — ${grandTotal.toFixed(2)}
              </button>
            </form>
          </div>
        )}

        {step === 'processing' && (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 border-4 border-stone-700 border-t-amber-500 rounded-full animate-spin mb-6" />
            <h3 className="text-xl font-serif font-bold text-stone-100 mb-2">Processing Order</h3>
            <p className="text-stone-500 text-sm">Please wait while we prepare your coffee...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 border border-emerald-800/30">
              <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-100 mb-2">Order Confirmed!</h3>
            <p className="text-stone-400 text-sm mb-2">Thank you for your purchase.</p>
            <p className="text-stone-500 text-xs mb-6">
              Order #AC-{Math.random().toString(36).substr(2, 8).toUpperCase()}
            </p>
            <p className="text-stone-400 text-sm mb-8">
              Your specialty coffee is being freshly roasted and will be on its way soon ☕
            </p>
            <button
              onClick={handleComplete}
              className="px-8 py-3 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
