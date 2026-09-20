import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function WishlistDrawer({ isOpen, onClose, onQuickView }) {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleMoveToCart = (item) => {
    addToCart(item, 1);
    removeFromWishlist(item.id);
    showToast(`Moved ${item.name} to cart!`);
  };

  const handleMoveAllToCart = () => {
    wishlistItems.forEach(item => addToCart(item, 1));
    wishlistItems.forEach(item => removeFromWishlist(item.id));
    showToast(`Moved all items to your cart!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              My Wishlist
            </h2>
            <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {wishlistItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {wishlistItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-400 mb-4">
              <Heart className="w-10 h-10 stroke-1" />
            </div>
            <h3 className="text-base font-bold text-gray-800">Your Wishlist is Empty</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xs">
              Save your favorite fresh vegetables, dairy, and fruits here for quick ordering later.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-[#0f5132] hover:bg-[#0b3d26] text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-colors shadow-sm"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100 custom-scrollbar">
            {wishlistItems.map((item) => (
              <div key={item.id} className="py-3.5 flex items-center gap-3 group">
                <img
                  src={item.image}
                  alt={item.name}
                  onClick={() => { onQuickView(item); onClose(); }}
                  className="w-16 h-16 object-cover rounded-xl border border-gray-100 bg-gray-50 shrink-0 cursor-pointer"
                />

                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => { onQuickView(item); onClose(); }}
                    className="text-xs sm:text-sm font-semibold text-gray-800 truncate cursor-pointer hover:text-emerald-700"
                  >
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-gray-500">{item.unit}</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      ₹{item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-[11px] text-gray-400 line-through">
                        ₹{item.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-gray-300 hover:text-rose-500 transition-colors p-1"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-[#0f5132] px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-emerald-200 transition-colors"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    <span>Move</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer actions */}
        {wishlistItems.length > 0 && (
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={handleMoveAllToCart}
              className="w-full bg-[#0f5132] hover:bg-[#0b3d26] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Move All to Cart ({wishlistItems.length})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
