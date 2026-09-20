import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowUpDown, Sparkles, Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../../data/products';
import { CIRCLE_CATEGORIES } from '../../data/categories';

export default function FilteredCatalogView({
  selectedCategory,
  searchQuery,
  onResetToHome,
  onQuickView,
  onSelectCategory,
}) {
  const [sortBy, setSortBy] = useState('recommended');

  // Find category meta if selected
  const categoryInfo = useMemo(() => {
    return CIRCLE_CATEGORIES.find(c => c.id === selectedCategory) || {
      name: selectedCategory ? selectedCategory.replace('-', ' ') : 'All Products',
    };
  }, [selectedCategory]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // If search query is active
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchCat = item.categoryName.toLowerCase().includes(q);
        const matchDesc = item.description && item.description.toLowerCase().includes(q);
        if (!matchName && !matchCat && !matchDesc) return false;
      }

      // If category filter is active (and not 'offers' or 'home')
      if (selectedCategory && selectedCategory !== 'home') {
        if (selectedCategory === 'offers') {
          return item.discountPercent >= 18;
        }
        return item.category === selectedCategory;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating') {
      return list.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === 'discount') {
      return list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    }
    return list; // recommended
  }, [filteredProducts, sortBy]);

  return (
    <div className="py-6 sm:py-8 bg-[#f9fafb] min-h-[60vh] select-none w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb and Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <button
              onClick={onResetToHome}
              className="flex items-center gap-1.5 text-emerald-800 hover:text-emerald-950 font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-medium capitalize truncate max-w-[200px] sm:max-w-none">
              {searchQuery ? `Search: "${searchQuery}"` : categoryInfo.name}
            </span>
          </div>

          <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2.5 py-1 rounded-full">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} available
          </span>
        </div>

        {/* Category Header Banner with Sort Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200/80 shadow-xs mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f5132] capitalize">
              {searchQuery ? `Search Results for "${searchQuery}"` : categoryInfo.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              100% farm-fresh, hygienic, and ethically sourced grocery essentials with express doorstep delivery.
            </p>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0 text-xs">
            <ArrowUpDown className="w-4 h-4 text-emerald-700" />
            <span className="text-gray-600 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-800 text-xs font-semibold py-2 px-3 rounded-xl focus:outline-none focus:border-emerald-600"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discounts</option>
            </select>
          </div>
        </div>

        {/* Product Grid: 2 on mobile, 3 on tablet, 4 on laptop, 5 on desktop */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 sm:p-12 text-center border border-gray-200 max-w-md mx-auto my-8 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-gray-800">No matching groceries found</h3>
            <p className="text-xs text-gray-500 mt-1">
              Try searching with a different product name or explore our fresh departments.
            </p>
            <button
              onClick={onResetToHome}
              className="mt-5 bg-[#0f5132] hover:bg-[#0b3d26] text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-colors shadow-sm"
            >
              Return to Best Deals
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
