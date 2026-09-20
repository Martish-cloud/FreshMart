import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function CartDrawer({ isOpen, onClose, onCheckout }) {
  const {
    cartItems,
    cartCount,
    subtotal,
    productSavings,
    couponDiscount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    deliveryFee,
    isFreeDelivery,
    amountNeededForFreeDelivery,
    freeDeliveryProgress,
    finalTotal,
    totalSavings,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage(res);
    if (res.success) {
      showToast(res.message);
      setCouponInput('');
    }
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
            <ShoppingBag className="w-5 h-5 text-[#0f5132]" />
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              My Cart
            </h2>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Tracker */}
        <div className="px-4 py-3 bg-emerald-50 border-b border-emerald-100">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            {isFreeDelivery && cartCount > 0 ? (
              <span className="text-emerald-800 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                🎉 You've unlocked FREE Delivery!
              </span>
            ) : (
              <span className="text-emerald-900">
                Add <span className="font-bold text-[#0f5132]">₹{amountNeededForFreeDelivery}</span> more for <span className="font-bold">FREE Delivery</span>
              </span>
            )}
            <span className="text-emerald-700 font-bold">{freeDeliveryProgress}%</span>
          </div>
          <div className="w-full bg-emerald-200/70 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#16a34a] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
              <ShoppingBag className="w-10 h-10 stroke-1" />
            </div>
            <h3 className="text-base font-bold text-gray-800">Your Cart is Empty</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xs">
              Looks like you haven't added any fresh groceries to your cart yet.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-[#0f5132] hover:bg-[#0b3d26] text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-colors shadow-sm"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100 custom-scrollbar">
            {cartItems.map((item) => (
              <div key={item.id} className="py-3.5 flex items-center gap-3 group">
                {/* Thumbnail */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl border border-gray-100 bg-gray-50 shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-gray-500">{item.unit}</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      ₹{item.price * item.quantity}
                    </span>
                    {item.originalPrice && (
                      <span className="text-[11px] text-gray-400 line-through">
                        ₹{item.originalPrice * item.quantity}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stepper & Remove */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-300 hover:text-rose-500 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center font-bold text-xs text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-[#0f5132] text-white flex items-center justify-center hover:bg-[#0b3d26] transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Bill & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-3">
            {/* Coupon Code Section */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon <span className="font-bold">{appliedCoupon.code}</span> applied!</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-rose-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Promo code (e.g. FRESH30)"
                    className="flex-1 bg-white text-xs px-3 py-1.5 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-600 uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponMessage && !appliedCoupon && (
                <p className={`text-[11px] mt-1 ${couponMessage.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {couponMessage.message}
                </p>
              )}
            </div>

            {/* Bill Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-200 pt-2">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-medium text-gray-800">₹{subtotal}</span>
              </div>

              {totalSavings > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Total Savings</span>
                  <span>-₹{totalSavings}</span>
                </div>
              )}

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span>-₹{couponDiscount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                {deliveryFee === 0 ? (
                  <span className="text-emerald-700 font-bold">FREE</span>
                ) : (
                  <span className="font-medium text-gray-800">₹{deliveryFee}</span>
                )}
              </div>

              <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-2 border-t border-gray-200">
                <span>To Pay</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full bg-[#0f5132] hover:bg-[#0b3d26] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
