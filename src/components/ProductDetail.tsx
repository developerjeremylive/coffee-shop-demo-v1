import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const roastColor = {
    Light: 'from-yellow-200 to-yellow-400',
    Medium: 'from-amber-400 to-amber-600',
    Dark: 'from-amber-800 to-stone-900',
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl border border-amber-900/30 shadow-2xl shadow-amber-900/20 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-stone-700/80 text-amber-300 hover:bg-stone-600 hover:text-amber-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Section */}
        <div className="relative h-56 sm:h-72 bg-gradient-to-br from-stone-700/50 to-stone-800/50 flex items-center justify-center">
          <div className="text-8xl sm:text-9xl">{product.image}</div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-stone-800 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
                {product.name}
              </h2>
              <p className="text-sm text-amber-500/80 mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {product.origin}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-amber-400">${product.price.toFixed(2)}</p>
              <p className="text-xs text-amber-600/60">{product.weight}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${roastColor[product.roast]} text-white`}>
              {product.roast} Roast
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-900/30 text-amber-300 border border-amber-800/30">
              {product.category}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-amber-200/70 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          {/* Flavor Profile */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-wider mb-3">Flavor Profile</h3>
            <div className="flex flex-wrap gap-2">
              {product.flavor.map((f) => (
                <span key={f} className="px-3 py-1.5 rounded-full text-sm bg-amber-900/30 text-amber-200 border border-amber-800/30">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Brewing Suggestions */}
          <div className="mb-8 p-4 bg-stone-800/50 rounded-xl border border-amber-900/20">
            <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-wider mb-2">Brewing Suggestions</h3>
            <p className="text-amber-200/60 text-sm">
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
            className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-900/30 hover:shadow-amber-800/40 transition-all duration-300 text-base"
          >
            Add to Cart — ${product.price.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
