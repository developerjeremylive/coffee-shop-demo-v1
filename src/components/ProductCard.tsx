import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const roastColor = {
    Light: 'from-yellow-200 to-yellow-400',
    Medium: 'from-amber-400 to-amber-600',
    Dark: 'from-amber-800 to-stone-900',
  };

  return (
    <div className="group relative bg-gradient-to-br from-stone-800/80 to-stone-900/90 rounded-2xl border border-amber-900/20 overflow-hidden hover:border-amber-700/40 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-900/20 hover:-translate-y-1">
      {/* Product Image Area */}
      <div className="relative h-48 sm:h-56 bg-gradient-to-br from-stone-700/50 to-stone-800/50 flex items-center justify-center overflow-hidden">
        <div className="text-6xl sm:text-7xl transform group-hover:scale-110 transition-transform duration-500">
          {product.image}
        </div>
        {/* Roast Level Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${roastColor[product.roast]} text-white shadow-lg`}>
            {product.roast} Roast
          </span>
        </div>
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-stone-900/70 text-amber-300 border border-amber-800/30">
            {product.category}
          </span>
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base sm:text-lg font-serif font-bold text-amber-100 group-hover:text-amber-50 transition-colors">
            {product.name}
          </h3>
          <span className="text-lg font-bold text-amber-400 whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-xs text-amber-600/80 mb-2 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {product.origin} • {product.weight}
        </p>

        {/* Flavor Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.flavor.slice(0, 3).map((f) => (
            <span key={f} className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs bg-amber-900/30 text-amber-300/80 border border-amber-800/20">
              {f}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 px-3 py-2 text-xs sm:text-sm font-medium text-amber-300 border border-amber-800/40 rounded-lg hover:bg-amber-900/30 hover:border-amber-700/50 transition-all duration-300"
          >
            Details
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 px-3 py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-amber-700 to-amber-800 rounded-lg hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-900/30 hover:shadow-amber-800/40 transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
