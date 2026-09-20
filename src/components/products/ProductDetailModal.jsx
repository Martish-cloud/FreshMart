import React, { useState } from 'react';
import { X, Star, Heart, ShoppingCart, ShieldCheck, Truck, RotateCcw, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import ProductImage from '../common/ProductImage';

export default function ProductDetailModal({ product, onClose, onOpenCheckout }) {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`Added ${quantity}x ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onClose();
    if (onOpenCheckout) {
      onOpenCheckout();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in select-none">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image & Badges */}
          <div className="relative bg-[#f8faf9] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
            {product.discount && (
              <span className="absolute top-4 left-4 bg-[#15803d] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                {product.discount}
              </span>
            )}
            <div className="w-56 h-56 flex items-center justify-center">
              <ProductImage
                src={product.image}
                alt={product.name}
                productName={product.name}
                category={product.category}
                className="drop-shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Right: Info & Controls */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Origin */}
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 uppercase tracking-wide">
                <span>{product.categoryName}</span>
                {product.origin && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500 normal-case">{product.origin}</span>
                  </>
                )}
              </div>

              {/* Title & Unit */}
              <h2 className="text-xl font-bold text-gray-900 mt-1">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500 font-medium mt-0.5">
                Pack Size: <span className="text-gray-800 font-semibold">{product.unit}</span>
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-xs font-bold text-amber-800 border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {product.reviews} customer reviews
                </span>
                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" /> In Stock
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-2xl font-extrabold text-gray-900">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Save ₹{product.originalPrice - product.price} ({product.discountPercent}% OFF)
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                {product.description || 'Farm-fresh quality grocery product rigorously quality checked and hygienically packed for your family.'}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100 text-[11px] text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Express 2-hr delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Instant doorstep returns</span>
                </div>
              </div>
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-gray-300 rounded-lg p-1 bg-gray-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-md bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-md bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => {
                    toggleWishlist(product);
                    showToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
                  }}
                  className={`p-2.5 rounded-lg border transition-colors ${
                    wishlisted
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-gray-200 text-gray-600 hover:text-rose-600 hover:bg-gray-50'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#0f5132] hover:bg-[#0b3d26] text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
