import { CartItem } from '../types';

interface HeaderProps {
  cartItems: CartItem[];
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ cartItems, onCartClick, searchQuery, onSearchChange }: HeaderProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-stone-900/95 to-stone-900/80 backdrop-blur-md border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">☕</span>
            <div>
              <h1 className="text-lg sm:text-xl font-serif font-bold text-amber-100 tracking-wide">
                Artisan Roast
              </h1>
              <p className="text-[10px] sm:text-xs text-amber-400/70 tracking-widest uppercase hidden sm:block">
                Specialty Coffee
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search coffees..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-stone-800/60 border border-amber-900/30 rounded-full text-amber-100 placeholder-amber-600/50 text-sm focus:outline-none focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/30 transition-all"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-amber-900/40 hover:bg-amber-800/50 border border-amber-700/30 rounded-full transition-all duration-300 group"
          >
            <svg className="w-5 h-5 text-amber-300 group-hover:text-amber-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="hidden sm:inline text-sm text-amber-200 font-medium">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search coffees..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-stone-800/60 border border-amber-900/30 rounded-full text-amber-100 placeholder-amber-600/50 text-sm focus:outline-none focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/30 transition-all"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
