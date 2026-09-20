import React from 'react';
import { Heart, ShoppingCart, Star, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const quantityInCart = getItemQuantity(product.id);
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added ${product.name} to cart!`);
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
      className="group relative bg-white rounded-xl sm:rounded-2xl border border-gray-200/90 hover:border-emerald-500/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 p-2.5 sm:p-3 xl:p-3.5 flex flex-col justify-between cursor-pointer select-none"
    >
      {/* Top Row: Discount Badge & Wishlist Button */}
      <div className="flex items-center justify-between gap-1 mb-1.5">
        {product.discount ? (
          <span className="bg-[#15803d] text-white text-[9.5px] sm:text-[10.5px] font-bold px-1.5 py-0.5 rounded tracking-tight">
            {product.discount}
          </span>
        ) : (
          <span />
        )}

        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`p-1 rounded-full transition-all ${
            wishlisted
              ? 'text-rose-500 bg-rose-50'
              : 'text-gray-400 hover:text-rose-500 hover:bg-gray-100'
          }`}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Image Frame */}
      <div className="relative w-full h-24 sm:h-28 lg:h-24 xl:h-32 flex items-center justify-center p-1 overflow-hidden rounded-lg bg-[#fafbfc]">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300 drop-shadow-xs"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="mt-2 space-y-0.5">
        <h3 className="font-semibold text-gray-900 text-xs sm:text-[13px] line-clamp-1 group-hover:text-emerald-800 transition-colors">
          {product.name}
        </h3>
        <p className="text-[11px] text-gray-500">
          ({product.unit})
        </p>

        {/* Price Row */}
        <div className="flex items-baseline gap-1.5 pt-0.5">
          <span className="font-bold text-gray-900 text-xs sm:text-sm xl:text-base">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-[10.5px] sm:text-xs text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Rating Row matching reference: ★ 4.5 (1.2k) */}
        <div className="flex items-center gap-1 text-[10.5px] sm:text-[11px] text-gray-600 pt-0.5">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-gray-800">{product.rating}</span>
          <span className="text-gray-400">({product.reviews})</span>
        </div>
      </div>

      {/* Add to Cart / Quantity Stepper Button matching reference */}
      <div className="mt-2.5 pt-1.5 border-t border-gray-100">
        {quantityInCart === 0 ? (
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full bg-[#0f5132] hover:bg-[#0b3d26] active:bg-[#072a1a] text-white py-1 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-lg px-1.5 py-0.5 text-emerald-950"
          >
            <button
              type="button"
              onClick={handleDecrease}
              className="w-5 h-5 rounded bg-white border border-emerald-300 flex items-center justify-center text-emerald-800 hover:bg-emerald-100 active:scale-95 transition-all"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-bold px-1">{quantityInCart}</span>
            <button
              type="button"
              onClick={handleIncrease}
              className="w-5 h-5 rounded bg-[#0f5132] text-white flex items-center justify-center hover:bg-[#0b3d26] active:scale-95 transition-all"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
