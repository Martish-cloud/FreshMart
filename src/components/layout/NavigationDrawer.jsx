import React from 'react';
import { X, ChevronRight, Heart, ShoppingBag, User, LogOut, Truck, ShieldCheck } from 'lucide-react';
import Logo from '../common/Logo';

export default function NavigationDrawer({
  isOpen,
  onClose,
  activeNav,
  onNavClick,
  onOpenCart,
  onOpenWishlist,
  onOpenSignIn,
  currentUser,
  onSignOut,
}) {
  if (!isOpen) return null;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'fruits-vegetables', label: 'Fruits & Vegetables' },
    { id: 'dairy-eggs', label: 'Dairy & Eggs' },
    { id: 'meat-seafood', label: 'Meat & Seafood' },
    { id: 'staples', label: 'Grains & Staples' },
    { id: 'ghee-oils', label: 'Ghee & Oils' },
    { id: 'snacks', label: 'Snacks & Munchies' },
    { id: 'beverages', label: 'Beverages' },
    { id: 'personal-care', label: 'Personal Care' },
    { id: 'household', label: 'Household' },
    { id: 'organic', label: 'Organic Products' },
    { id: 'offers', label: 'Offers & Discounts' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <Logo size="small" onClick={() => { onNavClick('home'); onClose(); }} />
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 bg-emerald-50/70 border-b border-emerald-100/60">
          {currentUser ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.phone || currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={onSignOut}
                className="text-gray-400 hover:text-red-600 p-1.5"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onOpenSignIn();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#0f5132] text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-[#0b3d26] transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <p className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            All Departments
          </p>
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavClick(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-emerald-100 text-[#0f5132]'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-gray-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Bottom Drawer Quick Actions */}
        <div className="p-3 border-t border-gray-100 bg-gray-50 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenWishlist();
                onClose();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Heart className="w-4 h-4 text-emerald-600" />
              <span>Wishlist</span>
            </button>
            <button
              onClick={() => {
                onOpenCart();
                onClose();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#0f5132] text-white rounded-xl text-xs font-semibold hover:bg-[#0b3d26]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>My Cart</span>
            </button>
          </div>
          <div className="flex items-center justify-around pt-1 text-[11px] text-gray-500">
            <span className="flex items-center gap-1"><Truck className="w-3 h-3 text-emerald-600" /> Free Delivery</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-600" /> Safe Pay</span>
          </div>
        </div>
      </div>
    </div>
  );
}
