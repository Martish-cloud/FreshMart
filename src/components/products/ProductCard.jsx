import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Plus, Minus, Check, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import ProductImage from '../common/ProductImage';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [wishlistAnimate, setWishlistAnimate] = useState(false);

  const quantityInCart = getItemQuantity(product.id);
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isAdding) return;

    setIsAdding(true);

    setTimeout(() => {
      addToCart(product, 1);
      setIsAdding(false);
      setJustAdded(true);
      showToast(`Added ${product.name} to cart!`);

      setTimeout(() => {
        setJustAdded(false);
      }, 1000);
    }, 350);
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, quantityInCart + 1);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, quantityInCart - 1);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    setWishlistAnimate(true);
    setTimeout(() => setWishlistAnimate(false), 500);

    toggleWishlist(product);
    if (!wishlisted) {
      showToast(`Saved ${product.name} to wishlist!`);
    } else {
      showToast(`Removed from wishlist`, 'info');
    }
  };

  return (
    <div
      onClick={() => onQuickView && onQuickView(product)}
      className="group relative bg-white rounded-2xl border border-gray-200/80 hover:border-emerald-500/70 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 p-3 flex flex-col justify-between cursor-pointer select-none h-full"
    >
      {/* Top Row: Discount Badge & Wishlist Button */}
      <div className="flex items-center justify-between gap-1 mb-1.5 h-6">
        {product.discount ? (
          <span className="bg-[#15803d] text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-tight shadow-2xs">
            {product.discount}
          </span>
        ) : (
          <span />
        )}

        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`p-1.5 rounded-full transition-all duration-200 active:scale-90 ${
            wishlisted
              ? 'text-rose-500 bg-rose-50'
              : 'text-gray-400 hover:text-rose-500 hover:bg-gray-100'
          } ${wishlistAnimate ? 'scale-125' : ''}`}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 transition-all duration-200 ${wishlisted ? 'fill-rose-500 stroke-rose-500' : ''}`} />
        </button>
      </div>

      {/* Standardized Isolated Product Image Container (Consistent Scale, Transparent, No Scenery) */}
      <div className="relative w-full h-32 sm:h-36 flex items-center justify-center p-2 overflow-hidden rounded-xl bg-transparent">
        <div className="w-full h-full flex items-center justify-center transform group-hover:scale-106 group-hover:-translate-y-1 transition-transform duration-300 ease-out">
          <ProductImage
            src={product.image}
            alt={product.name}
            productName={product.name}
            category={product.category}
          />
        </div>
      </div>

      {/* Product Details with Locked Heights for Perfect Grid Alignment */}
      <div className="mt-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Title with Strict 2-line height locking */}
          <div className="h-9 sm:h-10 flex items-start">
            <h3
              className="font-semibold text-gray-900 text-xs sm:text-[13px] leading-tight line-clamp-2 group-hover:text-emerald-800 transition-colors"
              title={product.name}
            >
              {product.name}
            </h3>
          </div>

          {/* Unit / Weight */}
          <p className="text-[11px] text-gray-500 font-medium">
            {product.unit}
          </p>

          {/* Price Row */}
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="font-extrabold text-gray-900 text-sm sm:text-base">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Star Rating Row */}
          <div className="flex items-center gap-1 text-[11px] text-gray-600 mt-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span className="font-bold text-gray-800">{product.rating}</span>
            <span className="text-gray-400">({product.reviews})</span>
          </div>
        </div>

        {/* Bottom Pinned Add to Cart / Interactive Stepper Button */}
        <div className="mt-3 pt-2 border-t border-gray-100">
          {quantityInCart === 0 && !justAdded ? (
            <button
              type="button"
              disabled={isAdding}
              onClick={handleAddToCart}
              className="w-full bg-[#0f5132] hover:bg-[#0b3d26] active:bg-[#072a1a] text-white py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-xs hover:shadow active:scale-98"
            >
              {isAdding ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          ) : justAdded ? (
            <div className="w-full bg-emerald-600 text-white py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 animate-in zoom-in-95">
              <Check className="w-3.5 h-3.5 stroke-3" />
              <span>Added</span>
            </div>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-xl px-2 py-1 text-emerald-950"
            >
              <button
                type="button"
                onClick={handleDecrease}
                className="w-6 h-6 rounded-lg bg-white border border-emerald-300 flex items-center justify-center text-emerald-800 hover:bg-emerald-100 active:scale-95 transition-all"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold px-1.5">{quantityInCart}</span>
              <button
                type="button"
                onClick={handleIncrease}
                className="w-6 h-6 rounded-lg bg-[#0f5132] text-white flex items-center justify-center hover:bg-[#0b3d26] active:scale-95 transition-all"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
