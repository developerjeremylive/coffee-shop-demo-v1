import { useState, useEffect, useCallback, Suspense } from 'react';
import ThreeBackground from './components/ThreeBackground';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { products, categories, roastLevels } from './data/products';
import { Product, CartItem } from './types';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRoast, setSelectedRoast] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Scroll tracking for Three.js
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.flavor.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesRoast = selectedRoast === 'All' || product.roast === selectedRoast;
    return matchesSearch && matchesCategory && matchesRoast;
  });

  // Cart functions
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 2500);
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const removeItem = useCallback((productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-amber-100">
      {/* Three.js Background */}
      <Suspense fallback={null}>
        <ThreeBackground scrollY={scrollY} />
      </Suspense>

      {/* Header */}
      <Header
        cartItems={cartItems}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-24 right-4 z-[80] animate-slideIn">
          <div className="flex items-center gap-2 px-4 py-3 bg-green-900/80 border border-green-700/40 rounded-xl backdrop-blur-md shadow-lg">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-green-200 font-medium">{notification}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-amber-100 mb-4 leading-tight">
            Exceptional Coffee,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Crafted for You
            </span>
          </h2>
          <p className="text-amber-400/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our curated selection of single-origin and artisan blend coffees,
            sourced from the world's finest growing regions and roasted to perfection.
          </p>
        </section>

        {/* Filters */}
        <section className="mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-amber-700/80 text-white shadow-lg shadow-amber-900/30'
                      : 'bg-stone-800/60 text-amber-400/70 border border-amber-900/20 hover:bg-stone-700/60 hover:text-amber-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Roast Level Filter */}
            <div className="flex flex-wrap gap-2">
              {roastLevels.map((roast) => (
                <button
                  key={roast}
                  onClick={() => setSelectedRoast(roast)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    selectedRoast === roast
                      ? 'bg-amber-800/60 text-amber-200 border border-amber-600/40'
                      : 'bg-stone-800/40 text-amber-500/60 border border-amber-900/15 hover:bg-stone-700/40 hover:text-amber-400'
                  }`}
                >
                  {roast === 'All' ? 'All Roasts' : `${roast} Roast`}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="mt-4 text-sm text-amber-600/60">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'coffee' : 'coffees'}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </section>

        {/* Products Grid */}
        <section>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p) => addToCart(p)}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-5xl mb-4 block">🔍</span>
              <p className="text-xl text-amber-300/60 font-medium">No coffees found</p>
              <p className="text-amber-600/50 text-sm mt-2">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedRoast('All');
                }}
                className="mt-4 px-5 py-2 bg-amber-900/30 text-amber-300 rounded-full text-sm hover:bg-amber-800/40 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-amber-900/15 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-2xl">☕</span>
            <span className="text-lg font-serif font-bold text-amber-200">Artisan Roast</span>
          </div>
          <p className="text-amber-600/50 text-sm">
            Specialty coffee roasted with passion. Every bean tells a story.
          </p>
          <p className="text-amber-800/40 text-xs mt-3">
            © 2026 Artisan Roast. All rights reserved.
          </p>
        </footer>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}

export default App;
