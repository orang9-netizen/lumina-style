
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (e: React.MouseEvent, product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, isWishlisted, onToggleWishlist }) => {
  return (
    <div className="group cursor-pointer relative" onClick={() => onViewDetails(product)}>
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100 mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Wishlist Heart Icon */}
        <button 
          onClick={(e) => onToggleWishlist(e, product)}
          className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 text-gray-400 hover:text-rose-500 backdrop-blur-sm'
          }`}
        >
          <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart`}></i>
        </button>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
          <button className="bg-white text-gray-900 px-6 py-2 text-sm font-medium tracking-wide shadow-lg">
            VIEW DETAILS
          </button>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-rose-400 uppercase tracking-widest font-semibold">{product.category}</p>
        <h3 className="text-gray-900 font-medium group-hover:text-rose-500 transition-colors">{product.name}</h3>
        <p className="text-gray-600 font-light">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
