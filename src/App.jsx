import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';

// Layout
import AnnouncementBar from './components/layout/AnnouncementBar';
import Header from './components/layout/Header';
import NavigationDrawer from './components/layout/NavigationDrawer';
import Footer from './components/layout/Footer';

// Home Sections matching Reference Image
import HeroSection from './components/hero/HeroSection';
import CategoryCircleNav from './components/categories/CategoryCircleNav';
import MainDealsSection from './components/deals/MainDealsSection';
import FeaturedCategories from './components/categories/FeaturedCategories';
import TrustAndNewsletterSection from './components/trust/TrustAndNewsletterSection';

// Catalog & Modals
import FilteredCatalogView from './components/products/FilteredCatalogView';
import ProductDetailModal from './components/products/ProductDetailModal';
import CartDrawer from './components/cart/CartDrawer';
import WishlistDrawer from './components/wishlist/WishlistDrawer';
import CheckoutModal from './components/cart/CheckoutModal';
import SignInModal from './components/auth/SignInModal';
import InfoModal from './components/common/InfoModal';

export default function App() {
  // Navigation & View State
  const [activeNav, setActiveNav] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [infoModal, setInfoModal] = useState({ isOpen: false, type: '', title: '' });

  // User State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('freshmart_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleSignIn = (user) => {
    setCurrentUser(user);
    localStorage.setItem('freshmart_user', JSON.stringify(user));
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('freshmart_user');
  };

  // Nav Click Handler
  const handleNavClick = (navId) => {
    setActiveNav(navId);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category Select from Circular nav or Featured cards
  const handleSelectCategory = (catId) => {
    setActiveNav(catId);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search submission
  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setActiveNav('search');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetToHome = () => {
    setActiveNav('home');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHomeView = activeNav === 'home' && !searchQuery;

  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-[#f9fafb] text-gray-800 antialiased">
            {/* Top Announcement Bar matching Reference */}
            <AnnouncementBar
              onOpenAppModal={() => setInfoModal({ isOpen: true, type: 'app', title: 'Download FreshMart App' })}
              onOpenTrackOrder={() => setInfoModal({ isOpen: true, type: 'track', title: 'Track Order' })}
              onOpenHelp={() => setInfoModal({ isOpen: true, type: 'help', title: 'Help & Support' })}
            />

            {/* Main Sticky Header matching Reference */}
            <Header
              activeNav={activeNav}
              onNavClick={handleNavClick}
              onOpenCart={() => setIsCartOpen(true)}
              onOpenWishlist={() => setIsWishlistOpen(true)}
              onOpenSignIn={() => setIsSignInOpen(true)}
              onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
              onSelectProduct={(product) => setSelectedProduct(product)}
              onSearchSubmit={handleSearchSubmit}
              currentSearchQuery={searchQuery}
              currentUser={currentUser}
            />

            {/* Mobile Navigation Drawer */}
            <NavigationDrawer
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
              activeNav={activeNav}
              onNavClick={handleNavClick}
              onOpenCart={() => setIsCartOpen(true)}
              onOpenWishlist={() => setIsWishlistOpen(true)}
              onOpenSignIn={() => setIsSignInOpen(true)}
              currentUser={currentUser}
              onSignOut={handleSignOut}
            />

            {/* Main Body Content */}
            <main className="flex-1">
              {isHomeView ? (
                <>
                  {/* Hero Section matching Reference */}
                  <HeroSection onShopNow={() => handleNavClick('fruits-vegetables')} />

                  {/* 12 Category Circular Nav matching Reference */}
                  <CategoryCircleNav
                    activeCategory={activeNav}
                    onSelectCategory={handleSelectCategory}
                  />

                  {/* 3-Column Deals Section matching Reference: Left Banner + Best Deals + Right Banner */}
                  <MainDealsSection
                    onQuickView={(product) => setSelectedProduct(product)}
                    onViewAll={() => handleNavClick('offers')}
                    onSelectCategory={handleSelectCategory}
                  />

                  {/* 12 Featured Categories matching Reference */}
                  <FeaturedCategories onSelectCategory={handleSelectCategory} />

                  {/* Trust USP Strip + Mint Newsletter Box matching Reference */}
                  <TrustAndNewsletterSection />
                </>
              ) : (
                <>
                  {/* Category Circle Bar for easy switching */}
                  <CategoryCircleNav
                    activeCategory={activeNav}
                    onSelectCategory={handleSelectCategory}
                  />

                  {/* Filtered Products View with Sorting & Search */}
                  <FilteredCatalogView
                    selectedCategory={activeNav}
                    searchQuery={searchQuery}
                    onResetToHome={handleResetToHome}
                    onQuickView={(product) => setSelectedProduct(product)}
                    onSelectCategory={handleSelectCategory}
                  />

                  {/* Trust & Newsletter */}
                  <TrustAndNewsletterSection />
                </>
              )}
            </main>

            {/* Footer matching Reference */}
            <Footer
              onOpenInfoModal={(id, label) => setInfoModal({ isOpen: true, type: 'info', title: label })}
            />

            {/* Interactive Drawers & Modals */}
            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              onCheckout={() => setIsCheckoutOpen(true)}
            />

            <WishlistDrawer
              isOpen={isWishlistOpen}
              onClose={() => setIsWishlistOpen(false)}
              onQuickView={(product) => setSelectedProduct(product)}
            />

            <CheckoutModal
              isOpen={isCheckoutOpen}
              onClose={() => setIsCheckoutOpen(false)}
            />

            <ProductDetailModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onOpenCheckout={() => setIsCheckoutOpen(true)}
            />

            <SignInModal
              isOpen={isSignInOpen}
              onClose={() => setIsSignInOpen(false)}
              currentUser={currentUser}
              onSignIn={handleSignIn}
              onSignOut={handleSignOut}
            />

            <InfoModal
              isOpen={infoModal.isOpen}
              type={infoModal.type}
              title={infoModal.title}
              onClose={() => setInfoModal({ isOpen: false, type: '', title: '' })}
            />
          </div>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}
