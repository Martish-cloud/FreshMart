import React, { useState, useEffect, useRef } from 'react';
import { User, Heart, ShoppingCart, Menu, ChevronDown } from 'lucide-react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef(null);

  // Scroll detection for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close more dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'fruits-vegetables', label: 'Fruits & Vegetables' },
    { id: 'dairy-eggs', label: 'Dairy & Eggs' },
    { id: 'meat-seafood', label: 'Meat & Seafood' },
    { id: 'staples', label: 'Staples' },
    { id: 'offers', label: 'Offers', badge: 'Hot' },
  ];

  const secondaryNavItems = [
    { id: 'ghee-oils', label: 'Ghee & Oils' },
    { id: 'snacks', label: 'Snacks & Munchies' },
    { id: 'beverages', label: 'Beverages' },
    { id: 'personal-care', label: 'Personal Care' },
    { id: 'household', label: 'Household' },
    { id: 'organic', label: 'Organic Products' },
  ];

  const isSecondaryActive = secondaryNavItems.some(item => item.id === activeNav);

  return (
    <header
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b transition-all duration-300 w-full ${
        isScrolled
          ? 'border-gray-200 shadow-md py-1'
          : 'border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-[68px] gap-2 sm:gap-4">
          {/* Mobile Menu Hamburger */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors shrink-0"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* FreshMart Logo - Always fully visible and anchored */}
          <div className="shrink-0 flex items-center">
            <Logo onClick={() => onNavClick('home')} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-[13.5px] font-medium text-gray-700 shrink-0">
            {primaryNavItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavClick(item.id)}
                  className={`relative py-2 transition-colors flex items-center gap-1 shrink-0 ${
                    isActive
                      ? 'text-[#16a34a] font-semibold'
                      : 'text-gray-700 hover:text-[#16a34a]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9.5px] bg-red-100 text-red-600 px-1.5 py-0.2 rounded-full font-bold leading-none">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#16a34a] rounded-full" />
                  )}
                </button>
              );
            })}

            {/* More Categories Dropdown */}
            <div className="relative shrink-0" ref={moreRef}>
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`py-2 flex items-center gap-1 transition-colors ${
                  isSecondaryActive
                    ? 'text-[#16a34a] font-semibold'
                    : 'text-gray-700 hover:text-[#16a34a]'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreOpen ? 'rotate-180 text-emerald-600' : 'text-gray-400'}`} />
                {isSecondaryActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#16a34a] rounded-full" />
                )}
              </button>

              {isMoreOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                  {secondaryNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavClick(item.id);
                        setIsMoreOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors flex items-center justify-between ${
                        activeNav === item.id
                          ? 'bg-emerald-50 text-[#0f5132]'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-700'
                      }`}
                    >
                      <span>{item.label}</span>
                      {activeNav === item.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Section: Search & Utility Actions */}
          <div className="flex items-center gap-2 sm:gap-3 xl:gap-4 shrink-0 flex-1 lg:flex-none justify-end min-w-0">
            {/* Desktop & Tablet Search Bar */}
            <div className="hidden sm:block w-full max-w-[220px] md:max-w-[260px] xl:max-w-[320px]">
              <SearchBar
                onSelectProduct={onSelectProduct}
                onSearchSubmit={onSearchSubmit}
                currentSearchQuery={currentSearchQuery}
              />
            </div>

            {/* Account Profile Trigger */}
            <button
              onClick={onOpenSignIn}
              className="flex items-center gap-1.5 text-gray-700 hover:text-[#0f5132] px-2 py-1.5 rounded-xl hover:bg-emerald-50/70 transition-colors text-xs sm:text-sm font-medium shrink-0"
              aria-label="Account"
            >
              <User className="w-5 h-5 text-gray-600" />
              <span className="hidden xl:inline">
                {currentUser ? currentUser.name : 'Sign In'}
              </span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-xl transition-colors shrink-0"
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

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-xl transition-colors flex items-center gap-1 shrink-0"
              aria-label="Shopping Cart"
              title="View Cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              <span className="absolute -top-0.5 -right-0.5 bg-[#16a34a] text-white text-[11px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Only shown on small screens below 640px) */}
        <div className="sm:hidden pb-3 pt-1">
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
