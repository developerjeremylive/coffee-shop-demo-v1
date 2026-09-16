import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] z-[60] bg-stone-900 border-l border-stone-800 shadow-2xl transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-xl font-serif font-bold text-stone-100">Your Cart</h2>
            {itemCount > 0 && (
              <span className="px-2.5 py-0.5 bg-stone-800 text-stone-400 text-xs rounded-full border border-stone-700">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200 transition-colors border border-stone-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-5xl mb-4">🛒</span>
              <p className="text-stone-300 text-lg font-medium">Your cart is empty</p>
              <p className="text-stone-500 text-sm mt-1">Add some amazing coffees!</p>
              <button
                onClick={onClose}
                className="mt-6 px-5 py-2.5 bg-stone-800 text-stone-300 rounded-xl text-sm font-medium hover:bg-stone-700 transition-colors border border-stone-700"
              >
                Browse Coffees
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3.5 bg-stone-800/60 rounded-xl border border-stone-800 hover:border-stone-700 transition-colors"
              >
                {/* Product Image */}
                <div className="w-14 h-14 flex-shrink-0 bg-stone-800 rounded-lg flex items-center justify-center text-2xl border border-stone-700">
                  {item.product.image}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-stone-200 truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    ${item.product.price.toFixed(2)} each
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2.5">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-stone-800 text-stone-300 hover:bg-amber-900/30 hover:text-amber-300 transition-colors text-sm font-bold border border-stone-700"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium text-stone-200 w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-stone-800 text-stone-300 hover:bg-amber-900/30 hover:text-amber-300 transition-colors text-sm font-bold border border-stone-700"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="ml-auto text-stone-600 hover:text-red-400 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <p className="text-sm font-bold text-amber-400">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-stone-900 border-t border-stone-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-stone-400 font-medium">Total</span>
              <span className="text-2xl font-bold text-stone-100">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3.5 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-900/20 transition-all duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
