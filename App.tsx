
import React, { useState, useEffect, useMemo, useRef } from 'react';
import Layout from './components/Layout';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import AISuggestionTool from './components/AISuggestionTool';
import { PRODUCTS, TAGLINE, BRAND_NAME, GOOGLE_FORM_URL } from './constants';
import { Category, Product } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // Filtering States
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const allColors = useMemo(() => {
    const colors = new Set<string>();
    PRODUCTS.forEach(p => p.colors.forEach(c => colors.add(c)));
    return Array.from(colors);
  }, []);

  // Load wishlist from local storage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('lumina_wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to local storage on change
  useEffect(() => {
    localStorage.setItem('lumina_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Handle focus for mobile drawer
  useEffect(() => {
    if (isFilterDrawerOpen && drawerRef.current) {
      const closeButton = drawerRef.current.querySelector('button');
      closeButton?.focus();
    }
  }, [isFilterDrawerOpen]);

  const toggleWishlist = (e: React.MouseEvent | null, product: Product) => {
    if (e) e.stopPropagation();
    setWishlist(prev => 
      prev.includes(product.id) 
        ? prev.filter(id => id !== product.id) 
        : [...prev, product.id]
    );
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAIViewProduct = (productName: string) => {
    const product = PRODUCTS.find(p => p.name.toLowerCase() === productName.toLowerCase());
    if (product) {
      setSelectedProduct(product);
    }
  };

  const wishlistedProducts = useMemo(() => {
    return PRODUCTS.filter(p => wishlist.includes(p.id));
  }, [wishlist]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const sizeMatch = selectedSizes.length === 0 || true; 
      const colorMatch = selectedColors.length === 0 || product.colors.some(c => selectedColors.includes(c));
      return categoryMatch && sizeMatch && colorMatch;
    });
  }, [selectedCategories, selectedSizes, selectedColors]);

  const toggleFilter = (list: any[], item: any, setter: React.Dispatch<React.SetStateAction<any[]>>) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const renderHome = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1920&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover brightness-75 scale-105"
          />
        </div>
        <div className="relative z-10 text-center px-4 space-y-6">
          <p className="text-white text-sm tracking-[0.4em] uppercase font-medium drop-shadow-md">New Season Collection</p>
          <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tight leading-tight brand-font drop-shadow-lg">
            {TAGLINE}
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button 
              onClick={() => setCurrentPage('shop')}
              className="bg-white text-gray-900 px-12 py-4 font-bold tracking-widest hover:bg-rose-500 hover:text-white transition-all w-full sm:w-auto"
            >
              SHOP NEW ARRIVALS
            </button>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <p className="text-rose-500 font-bold uppercase tracking-[0.2em] text-xs">The Latest</p>
            <h2 className="text-4xl font-bold text-gray-900 brand-font">New Arrivals</h2>
          </div>
          <button 
            onClick={() => setCurrentPage('shop')}
            className="text-sm font-bold tracking-widest uppercase border-b-2 border-gray-900 pb-1 hover:text-rose-500 hover:border-rose-500 transition-all"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.slice(0, 4).map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={handleViewProduct} 
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* Trending Categories Grid */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <p className="text-rose-500 font-bold uppercase tracking-[0.2em] text-xs">Shop by Category</p>
            <h2 className="text-4xl font-bold text-gray-900 brand-font">Curated For You</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Lingerie Feature */}
            <div 
              className="relative h-[600px] group cursor-pointer overflow-hidden rounded-sm lg:row-span-2" 
              onClick={() => {
                setSelectedCategories([Category.LINGERIE]);
                setCurrentPage('shop');
              }}
            >
              <img src="https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=800&auto=format&fit=crop" alt="Lingerie" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
                <p className="text-white/80 text-xs tracking-widest uppercase mb-2">Ethereal Pieces</p>
                <h3 className="text-white text-3xl font-bold tracking-widest brand-font mb-4">LINGERIE & BRA</h3>
                <span className="text-white text-xs font-bold border-b border-white self-start pb-1">EXPLORE COLLECTION</span>
              </div>
            </div>

            {/* Jumpsuits Feature */}
            <div 
              className="relative h-[290px] group cursor-pointer overflow-hidden rounded-sm" 
              onClick={() => {
                setSelectedCategories([Category.JUMPSUITS]);
                setCurrentPage('shop');
              }}
            >
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" alt="Jumpsuits" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex flex-col justify-center items-center text-center p-6">
                <h3 className="text-white text-2xl font-bold tracking-widest brand-font">CHIC JUMPSUITS</h3>
                <p className="text-white/90 text-xs mt-2 font-medium tracking-widest">ONE-PIECE WONDERS</p>
              </div>
            </div>

            {/* Activewear Feature */}
            <div 
              className="relative h-[290px] group cursor-pointer overflow-hidden rounded-sm" 
              onClick={() => {
                setSelectedCategories([Category.GYM_WEAR]);
                setCurrentPage('shop');
              }}
            >
              <img src="https://images.unsplash.com/photo-1541533232115-9c8491866442?q=80&w=800&auto=format&fit=crop" alt="Fitness" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex flex-col justify-center items-center text-center p-6">
                <h3 className="text-white text-2xl font-bold tracking-widest brand-font">ACTIVEWEAR</h3>
                <p className="text-white/90 text-xs mt-2 font-medium tracking-widest">STYLE MEETS STRENGTH</p>
              </div>
            </div>

            {/* Dresses Feature */}
            <div 
              className="relative h-[290px] group cursor-pointer overflow-hidden rounded-sm lg:col-span-2" 
              onClick={() => {
                setSelectedCategories([Category.DRESSES]);
                setCurrentPage('shop');
              }}
            >
              <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop" alt="Dresses" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex flex-col justify-center items-center text-center p-6">
                <h3 className="text-white text-4xl font-bold tracking-widest brand-font">SUMMER DRESSES</h3>
                <p className="text-white/90 text-sm mt-2 font-medium tracking-widest">EFFORTLESS ELEGANCE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Brand Statement */}
      <section className="py-24 max-w-4xl mx-auto px-4 text-center space-y-8">
        <div className="w-16 h-px bg-rose-500 mx-auto"></div>
        <h3 className="text-3xl font-bold text-gray-900 brand-font italic">"Elegance is the only beauty that never fades."</h3>
        <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto">
          Lumina Style is dedicated to the modern woman. Whether you're conquering a morning workout or attending a gala, our pieces are designed to move with you, embodying grace and resilience in every stitch.
        </p>
        <button 
          onClick={() => setCurrentPage('about')}
          className="text-xs font-bold tracking-[0.3em] uppercase text-gray-900 hover:text-rose-500 transition-colors"
        >
          Discover Our Heritage
        </button>
      </section>
    </div>
  );

  const FilterSidebar = () => (
    <nav aria-label="Product filters" className="space-y-10">
      <div role="group" aria-labelledby="category-filter-label">
        <h4 id="category-filter-label" className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6">Categories</h4>
        <div className="space-y-3">
          {Object.values(Category).map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 accent-rose-500 border-gray-300 rounded focus:ring-2 focus:ring-rose-500"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleFilter(selectedCategories, cat, setSelectedCategories)}
              />
              <span className={`text-sm tracking-wide transition-colors ${selectedCategories.includes(cat) ? 'text-rose-500 font-medium' : 'text-gray-500 group-hover:text-gray-900'}`}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div role="group" aria-labelledby="size-filter-label">
        <h4 id="size-filter-label" className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6">Size</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map(size => (
            <button
              key={size}
              aria-pressed={selectedSizes.includes(size)}
              onClick={() => toggleFilter(selectedSizes, size, setSelectedSizes)}
              className={`w-10 h-10 text-xs border transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-rose-500 ${selectedSizes.includes(size) ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div role="group" aria-labelledby="color-filter-label">
        <h4 id="color-filter-label" className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6">Color</h4>
        <div className="flex flex-wrap gap-3">
          {allColors.map(color => (
            <button
              key={color}
              aria-pressed={selectedColors.includes(color)}
              onClick={() => toggleFilter(selectedColors, color, setSelectedColors)}
              className={`px-3 py-1.5 text-[10px] border tracking-widest uppercase transition-all focus:outline-none focus:ring-2 focus:ring-rose-500 ${selectedColors.includes(color) ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {(selectedCategories.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0) && (
        <button 
          onClick={() => {
            setSelectedCategories([]);
            setSelectedSizes([]);
            setSelectedColors([]);
          }}
          className="text-xs font-bold text-rose-500 hover:text-rose-600 underline tracking-widest uppercase focus:ring-2 focus:ring-rose-500 focus:outline-none"
        >
          Clear All Filters
        </button>
      )}
    </nav>
  );

  const renderShop = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-gray-900 brand-font">Shop All</h2>
            <p className="text-gray-500 text-sm tracking-wide" aria-live="polite">Showing {filteredProducts.length} items</p>
          </div>
          
          <button 
            onClick={() => setIsFilterDrawerOpen(true)}
            aria-expanded={isFilterDrawerOpen}
            aria-controls="mobile-filter-drawer"
            className="md:hidden flex items-center gap-2 px-6 py-3 border border-gray-200 text-sm font-bold tracking-widest uppercase hover:bg-gray-50 focus:ring-2 focus:ring-rose-500 focus:outline-none"
          >
            <i className="fas fa-sliders-h" aria-hidden="true"></i>
            Filter
          </button>
        </div>

        <div className="flex gap-12">
          <aside className="hidden md:block w-64 shrink-0">
            <FilterSidebar />
          </aside>

          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onViewDetails={setSelectedProduct} 
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={toggleWishlist}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-gray-50 border-2 border-dashed border-gray-100 rounded-lg">
                <i className="fas fa-search text-4xl text-gray-200 mb-4" aria-hidden="true"></i>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {isFilterDrawerOpen && (
          <div 
            id="mobile-filter-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            className="fixed inset-0 z-[100] md:hidden"
            ref={drawerRef}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsFilterDrawerOpen(false)}></div>
            <div className="absolute right-0 top-0 h-full w-[80%] bg-white p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
              <div className="flex justify-between items-center mb-10">
                <h3 id="drawer-title" className="text-xl font-bold brand-font">Filters</h3>
                <button 
                  onClick={() => setIsFilterDrawerOpen(false)}
                  aria-label="Close filters"
                  className="focus:ring-2 focus:ring-rose-500 p-2"
                >
                  <i className="fas fa-times text-xl" aria-hidden="true"></i>
                </button>
              </div>
              <FilterSidebar />
              <button 
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full bg-gray-900 text-white py-4 mt-12 font-bold tracking-widest uppercase focus:ring-2 focus:ring-rose-500"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderWishlist = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 animate-in fade-in duration-500">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-gray-900 brand-font">Your Wishlist</h2>
          <p className="text-gray-500">Items you've saved for later</p>
        </div>

        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {wishlistedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={setSelectedProduct} 
                isWishlisted={true}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <i className="far fa-heart text-5xl text-gray-200 mb-6" aria-hidden="true"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-8">Start exploring and save your favorites!</p>
            <button 
              onClick={() => setCurrentPage('shop')}
              className="bg-gray-900 text-white px-8 py-3 font-bold tracking-widest uppercase hover:bg-rose-500 transition-all focus:ring-2 focus:ring-rose-500"
            >
              GO SHOPPING
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderAbout = () => (
    <div className="animate-in fade-in duration-500">
      <section className="h-[40vh] relative flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd15?q=80&w=1920&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover brightness-50" alt="About cover" />
        <h2 className="relative z-10 text-5xl font-bold text-white brand-font tracking-widest">OUR STORY</h2>
      </section>
      
      <section className="max-w-4xl mx-auto px-4 py-24 space-y-16">
        <div className="space-y-6 text-center">
          <h3 className="text-3xl font-bold text-gray-900 brand-font">Crafted for Confidence</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            {BRAND_NAME} was founded with a simple yet powerful mission: to bridge the gap between high-fashion aesthetics and athletic performance. We believe that style should never be sacrificed for strength, and vice versa.
          </p>
        </div>
      </section>
    </div>
  );

  const renderContact = () => (
    <div className="max-w-7xl mx-auto px-4 py-24 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 brand-font mb-4">Connect With Us</h2>
            <p className="text-gray-500 text-lg">We'd love to hear from you. Our concierge team is available for styling advice and order support.</p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 shadow-2xl border border-gray-50 rounded-lg">
          <h3 className="text-2xl font-bold brand-font mb-8">Send a Message</h3>
          <div className="space-y-6">
            <div className="p-12 border-2 border-dashed border-gray-200 rounded-lg text-center">
              <i className="fas fa-file-alt text-4xl text-gray-200 mb-4" aria-hidden="true"></i>
              <a 
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-rose-500 text-white px-8 py-4 font-bold tracking-widest uppercase hover:bg-gray-900 transition-all focus:ring-2 focus:ring-rose-500"
              >
                OPEN INQUIRY FORM
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPolicies = () => (
    <div className="max-w-4xl mx-auto px-4 py-24 animate-in fade-in duration-500 space-y-16">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 brand-font">Store Policies</h2>
      </div>

      <div className="space-y-12">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <i className="fas fa-truck text-rose-500" aria-hidden="true"></i>
            Shipping Policy
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We offer standard shipping (3-5 business days). Free shipping over $150. All orders are packed with eco-friendly materials.
          </p>
        </div>
      </div>
    </div>
  );

  const getPageContent = () => {
    switch (currentPage) {
      case 'home': return renderHome();
      case 'shop': return renderShop();
      case 'wishlist': return renderWishlist();
      case 'about': return renderAbout();
      case 'contact': return renderContact();
      case 'policies': return renderPolicies();
      default: return renderHome();
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      onPageChange={setCurrentPage} 
      wishlistCount={wishlist.length}
    >
      {getPageContent()}
      
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          isWishlisted={wishlist.includes(selectedProduct.id)}
          onToggleWishlist={(p) => toggleWishlist(null, p)}
          onViewProduct={handleViewProduct}
        />
      )}

      <AISuggestionTool 
        onViewProduct={handleAIViewProduct} 
        wishlistItems={wishlistedProducts}
      />
    </Layout>
  );
};

export default App;
