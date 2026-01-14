
import React, { useState } from 'react';
import { BRAND_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  wishlistCount: number;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange, wishlistCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'shop' },
    { name: 'Wishlist', id: 'wishlist' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
    { name: 'Policies', id: 'policies' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => onPageChange('home')}>
              <h1 className="text-2xl font-bold tracking-widest text-gray-900 brand-font">{BRAND_NAME}</h1>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-rose-400 flex items-center gap-1 ${
                    currentPage === item.id ? 'text-rose-500 border-b-2 border-rose-500' : 'text-gray-600'
                  }`}
                >
                  {item.name.toUpperCase()}
                  {item.id === 'wishlist' && wishlistCount > 0 && (
                    <span className="bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Nav Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-4 text-base font-medium flex justify-between items-center ${
                  currentPage === item.id ? 'text-rose-500' : 'text-gray-600'
                }`}
              >
                {item.name}
                {item.id === 'wishlist' && wishlistCount > 0 && (
                  <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-xl font-bold tracking-widest brand-font mb-4">{BRAND_NAME}</h2>
              <p className="text-gray-500 max-w-xs mb-6">
                Premium quality women's fashion and fitness wear designed for the modern woman who embraces style and strength.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors"><i className="fab fa-instagram text-xl"></i></a>
                <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors"><i className="fab fa-facebook text-xl"></i></a>
                <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors"><i className="fab fa-pinterest text-xl"></i></a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-widest">Quick Links</h3>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><button onClick={() => onPageChange('shop')} className="hover:text-rose-400">New Arrivals</button></li>
                <li><button onClick={() => onPageChange('shop')} className="hover:text-rose-400">Fitness Sets</button></li>
                <li><button onClick={() => onPageChange('about')} className="hover:text-rose-400">Our Story</button></li>
                <li><button onClick={() => onPageChange('contact')} className="hover:text-rose-400">Contact Us</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-widest">Support</h3>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><button onClick={() => onPageChange('policies')} className="hover:text-rose-400">Shipping Policy</button></li>
                <li><button onClick={() => onPageChange('policies')} className="hover:text-rose-400">Returns & Refunds</button></li>
                <li><button onClick={() => onPageChange('policies')} className="hover:text-rose-400">Privacy Policy</button></li>
                <li><button onClick={() => onPageChange('contact')} className="hover:text-rose-400">Wholesale</button></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-50 text-center text-gray-400 text-xs">
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved. Designed for Elegance.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
