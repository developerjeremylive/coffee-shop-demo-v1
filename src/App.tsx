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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.flavor.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesRoast = selectedRoast === 'All' || product.roast === selectedRoast;
    return matchesSearch && matchesCategory && matchesRoast;
  });

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
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,53,15,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(146,64,14,0.1),transparent_50%)]" />
      </div>

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
          <div className="flex items-center gap-2 px-4 py-3 bg-emerald-900/90 border border-emerald-700/40 rounded-xl backdrop-blur-md shadow-lg">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-emerald-100 font-medium">{notification}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-900/20 border border-amber-800/30 rounded-full mb-6">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-amber-300 tracking-wide uppercase">Freshly Roasted</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-100 mb-5 leading-tight">
            Exceptional Coffee,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
              Crafted for You
            </span>
          </h2>
          
          <p className="text-stone-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our curated selection of single-origin and artisan blend coffees,
            sourced from the world's finest growing regions and roasted to perfection.
          </p>
        </section>

        {/* Filters Section */}
        <section className="mb-10">
          <div className="bg-stone-900/60 backdrop-blur-sm border border-stone-800 rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-center justify-between">
              {/* Category Filter */}
              <div className="flex-1">
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === cat
                          ? 'bg-amber-700 text-white shadow-lg shadow-amber-900/30'
                          : 'bg-stone-800/80 text-stone-400 hover:bg-stone-700 hover:text-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-12 bg-stone-800" />

              {/* Roast Level Filter */}
              <div className="flex-1">
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Roast Level</label>
                <div className="flex flex-wrap gap-2">
                  {roastLevels.map((roast) => (
                    <button
                      key={roast}
                      onClick={() => setSelectedRoast(roast)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                        selectedRoast === roast
                          ? 'bg-amber-800/60 text-amber-200 border border-amber-600/40'
                          : 'bg-stone-800/60 text-stone-500 hover:bg-stone-700/60 hover:text-stone-300'
                      }`}
                    >
                      {roast === 'All' ? 'All Roasts' : roast}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t border-stone-800">
              <p className="text-sm text-stone-500">
                Showing <span className="text-stone-300 font-medium">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'coffee' : 'coffees'}
                {searchQuery && <span> for "<span className="text-amber-400">{searchQuery}</span>"</span>}
              </p>
            </div>
          </div>
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
            <div className="text-center py-20 bg-stone-900/40 backdrop-blur-sm rounded-2xl border border-stone-800">
              <span className="text-5xl mb-4 block">🔍</span>
              <p className="text-xl text-stone-300 font-medium">No coffees found</p>
              <p className="text-stone-500 text-sm mt-2">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedRoast('All');
                }}
                className="mt-6 px-6 py-2.5 bg-amber-800/30 text-amber-300 rounded-full text-sm font-medium hover:bg-amber-700/40 transition-colors border border-amber-800/30"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-stone-900/40 backdrop-blur-sm rounded-2xl border border-stone-800">
            <div className="w-12 h-12 mx-auto mb-4 bg-amber-900/30 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-stone-200 font-semibold mb-2">Free Shipping</h3>
            <p className="text-stone-500 text-sm">On orders over $50</p>
          </div>
          <div className="text-center p-6 bg-stone-900/40 backdrop-blur-sm rounded-2xl border border-stone-800">
            <div className="w-12 h-12 mx-auto mb-4 bg-amber-900/30 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-stone-200 font-semibold mb-2">Fresh Roasted</h3>
            <p className="text-stone-500 text-sm">Roasted within 48 hours</p>
          </div>
          <div className="text-center p-6 bg-stone-900/40 backdrop-blur-sm rounded-2xl border border-stone-800">
            <div className="w-12 h-12 mx-auto mb-4 bg-amber-900/30 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-stone-200 font-semibold mb-2">Quality Guaranteed</h3>
            <p className="text-stone-500 text-sm">100% satisfaction promise</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-stone-800 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-2xl">☕</span>
            <span className="text-lg font-serif font-bold text-stone-200">Artisan Roast</span>
          </div>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            Specialty coffee roasted with passion. Every bean tells a story.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <a href="#" className="text-stone-600 hover:text-amber-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="text-stone-600 hover:text-amber-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
          <p className="text-stone-700 text-xs mt-6">
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
