import React from 'react';
import { User, Heart, ShoppingCart, Menu, Sparkles } from 'lucide-react';
import Logo from '../common/Logo';
import SearchBar from '../common/SearchBar';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Header({
  activeNav,
  onNavClick,
  onOpenCart,
  onOpenWishlist,
  onOpenSignIn,
  onOpenMobileMenu,
  onSelectProduct,
  onSearchSubmit,
  currentSearchQuery,
  currentUser,
}) {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'fruits-vegetables', label: 'Fruits & Vegetables' },
    { id: 'dairy-eggs', label: 'Dairy & Eggs' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'beverages', label: 'Beverages' },
    { id: 'personal-care', label: 'Personal Care' },
    { id: 'household', label: 'Household' },
    { id: 'organic', label: 'Organic' },
    { id: 'offers', label: 'Offers', badge: 'Hot' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-[70px] gap-2 md:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-1.5 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* FreshMart Logo */}
          <div className="shrink-0">
            <Logo onClick={() => onNavClick('home')} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-[13.5px] font-medium text-gray-700">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavClick(item.id)}
                  className={`relative py-2 transition-colors flex items-center gap-1 ${
                    isActive
                      ? 'text-[#16a34a] font-semibold'
                      : 'text-gray-700 hover:text-[#16a34a]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold leading-none">
                      {item.badge}
                    </span>
                  )}
                  {/* Exact active green underline indicator matching reference */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#16a34a] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
            {/* Search Bar on Desktop & Tablet */}
            <div className="hidden sm:block">
              <SearchBar
                onSelectProduct={onSelectProduct}
                onSearchSubmit={onSearchSubmit}
                currentSearchQuery={currentSearchQuery}
              />
            </div>

            {/* Account Button */}
            <button
              onClick={onOpenSignIn}
              className="flex items-center gap-1.5 text-gray-700 hover:text-[#0f5132] px-2 py-1.5 rounded-lg hover:bg-emerald-50/60 transition-colors text-xs sm:text-sm font-medium"
            >
              <User className="w-5 h-5 text-gray-600" />
              <span className="hidden xl:inline">
                {currentUser ? currentUser.name : 'Sign In'}
              </span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-lg transition-colors"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 text-gray-600" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#ea580c] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button with circular badge matching reference */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-lg transition-colors flex items-center gap-1"
              aria-label="Shopping Cart"
              title="View Cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {/* Reference shows small green cart quantity badge on top right */}
              <span className="absolute -top-0.5 -right-0.5 bg-[#16a34a] text-white text-[11px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row (visible on small screens) */}
        <div className="sm:hidden pb-3">
          <SearchBar
            onSelectProduct={onSelectProduct}
            onSearchSubmit={onSearchSubmit}
            currentSearchQuery={currentSearchQuery}
          />
        </div>
      </div>
    </header>
  );
}
