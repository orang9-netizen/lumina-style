
import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { WHATSAPP_NUMBER, GOOGLE_FORM_URL, PRODUCTS } from '../constants';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, isWishlisted, onToggleWishlist, onViewProduct }) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  // Cross-selling logic: Find 3 products in the same or related categories
  const recommendations = useMemo(() => {
    return PRODUCTS
      .filter(p => p.id !== product.id && (p.category === product.category || Math.random() > 0.5))
      .slice(0, 3);
  }, [product.id, product.category]);

  const handleWhatsAppOrder = () => {
    const text = `Hi Lumina Style! I'd like to order: \n\nProduct: ${product.name}\nSize: ${selectedSize}\nColor: ${selectedColor}\nPrice: ${product.price}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl relative scrollbar-hide">
        <button 
          onClick={onClose}
          className="fixed md:absolute top-4 right-4 text-gray-400 hover:text-gray-900 z-[70] p-2 bg-white/80 rounded-full md:bg-transparent"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image */}
          <div className="h-[400px] md:h-full bg-gray-50 relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <button 
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-6 left-6 z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all ${
                isWishlisted ? 'bg-rose-500 text-white' : 'bg-white text-gray-400 hover:text-rose-500'
              }`}
            >
              <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart text-xl`}></i>
            </button>
          </div>

          {/* Right: Info */}
          <div className="p-8 md:p-12 space-y-8">
            <div>
              <p className="text-sm text-rose-500 font-semibold tracking-widest uppercase mb-2">{product.category}</p>
              <h2 className="text-3xl font-bold text-gray-900 brand-font">{product.name}</h2>
              <p className="text-2xl text-gray-700 mt-2 font-light">{product.price}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Selection Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 flex items-center justify-center border text-xs transition-all ${
                        selectedSize === size 
                        ? 'border-gray-900 bg-gray-900 text-white' 
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-2 border text-[10px] tracking-widest transition-all ${
                        selectedColor === color 
                        ? 'border-gray-900 bg-gray-900 text-white' 
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {color.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
              <button 
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#25D366] text-white py-4 font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                ORDER VIA WHATSAPP
              </button>
              <a 
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full border-2 border-gray-900 text-gray-900 py-4 font-bold tracking-widest uppercase text-center hover:bg-gray-900 hover:text-white transition-all"
              >
                ORDER VIA GOOGLE FORM
              </a>
            </div>
          </div>
        </div>

        {/* Cross-selling Section */}
        <div className="bg-gray-50 p-8 md:p-12 border-t border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 brand-font mb-8">Complete The Look</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendations.map(item => (
              <div 
                key={item.id} 
                className="group cursor-pointer bg-white p-3 border border-transparent hover:border-rose-200 transition-all shadow-sm"
                onClick={() => onViewProduct(item)}
              >
                <div className="aspect-[4/5] overflow-hidden mb-3">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-500">{item.price}</p>
                  <span className="text-[10px] text-rose-500 font-bold uppercase tracking-tighter">View Item</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
