import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const roastGradient = {
    Light: 'from-amber-200/20 to-yellow-100/10',
    Medium: 'from-amber-600/20 to-orange-400/10',
    Dark: 'from-amber-900/30 to-stone-800/20',
  };

  const roastBadge = {
    Light: 'bg-amber-200/20 text-amber-300 border-amber-400/20',
    Medium: 'bg-amber-600/20 text-amber-400 border-amber-600/30',
    Dark: 'bg-stone-700/40 text-stone-300 border-stone-600/30',
  };

  return (
    <div className="group relative bg-stone-900/80 backdrop-blur-sm rounded-2xl border border-stone-800 overflow-hidden hover:border-amber-800/40 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-900/10 hover:-translate-y-1">
      {/* Product Image Area */}
      <div className={`relative h-44 sm:h-52 bg-gradient-to-br ${roastGradient[product.roast]} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0),rgba(0,0,0,0.3))]" />
        <div className="text-6xl sm:text-7xl transform group-hover:scale-110 transition-transform duration-500 relative z-10">
          {product.image}
        </div>
        
        {/* Roast Level Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${roastBadge[product.roast]}`}>
            {product.roast}
          </span>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-stone-900/70 text-stone-300 border border-stone-700/50 backdrop-blur-sm">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-base sm:text-lg font-serif font-bold text-stone-100 group-hover:text-amber-200 transition-colors leading-tight">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-amber-400">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-stone-500">/ {product.weight}</span>
        </div>

        <p className="text-xs text-stone-500 mb-3 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-stone-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {product.origin}
        </p>

        {/* Flavor Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.flavor.slice(0, 3).map((f) => (
            <span key={f} className="px-2 py-0.5 rounded-full text-[10px] bg-stone-800/80 text-stone-400 border border-stone-700/50">
              {f}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 px-3 py-2.5 text-xs sm:text-sm font-medium text-stone-300 bg-stone-800/80 border border-stone-700 rounded-lg hover:bg-stone-700 hover:text-stone-100 hover:border-stone-600 transition-all duration-300"
          >
            Details
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 px-3 py-2.5 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-amber-700 to-amber-800 rounded-lg hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-900/20 transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
