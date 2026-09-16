import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-stone-900 rounded-2xl border border-stone-800 shadow-2xl animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200 transition-colors border border-stone-700"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Section */}
        <div className="relative h-56 sm:h-72 bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,53,15,0.15),transparent_70%)]" />
          <div className="text-8xl sm:text-9xl relative z-10">{product.image}</div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-900 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                {product.name}
              </h2>
              <p className="text-sm text-stone-500 mt-1.5 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {product.origin}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-amber-400">${product.price.toFixed(2)}</p>
              <p className="text-xs text-stone-500">{product.weight}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-800 text-stone-300 border border-stone-700">
              {product.roast} Roast
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-stone-800 text-stone-400 border border-stone-700">
              {product.category}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          {/* Flavor Profile */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">Flavor Profile</h3>
            <div className="flex flex-wrap gap-2">
              {product.flavor.map((f) => (
                <span key={f} className="px-3 py-1.5 rounded-full text-sm bg-stone-800 text-stone-300 border border-stone-700">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Brewing Suggestions */}
          <div className="mb-8 p-4 bg-stone-800/60 rounded-xl border border-stone-700/50">
            <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Brewing Suggestions</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              {product.roast === 'Light' && 'Best enjoyed as pour-over or AeroPress to highlight its delicate floral and fruity notes. Water temperature: 93-96°C.'}
              {product.roast === 'Medium' && 'Versatile for any brewing method. Excellent as drip coffee, French press, or AeroPress. Water temperature: 90-94°C.'}
              {product.roast === 'Dark' && 'Perfect for espresso, moka pot, or French press. Bold flavors shine with immersion brewing. Water temperature: 88-92°C.'}
            </p>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => {
              onAddToCart(product, 1);
              onClose();
            }}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-900/20 transition-all duration-300 text-base"
          >
            Add to Cart — ${product.price.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
