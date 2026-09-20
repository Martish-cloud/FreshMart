import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronRight, Sparkles, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import ProductImage from './ProductImage';

export default function SearchBar({ onSelectProduct, onSearchSubmit, currentSearchQuery = '' }) {
  const [query, setQuery] = useState(currentSearchQuery);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const POPULAR_SEARCHES = [
    'Chicken Breast',
    'Fresh Apple',
    'Cow Ghee',
    'Rohu Fish',
    'Amul Fresh Milk',
    'Country Eggs',
    'Basmati Rice',
    'Fresh Tomato',
  ];

  useEffect(() => {
    setQuery(currentSearchQuery);
  }, [currentSearchQuery]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmed = query.trim().toLowerCase();
  const suggestions = trimmed
    ? PRODUCTS.filter(
        p =>
          p.name.toLowerCase().includes(trimmed) ||
          p.categoryName.toLowerCase().includes(trimmed) ||
          (p.description && p.description.toLowerCase().includes(trimmed))
      ).slice(0, 6)
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(query.trim());
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    if (onSearchSubmit) {
      onSearchSubmit('');
    }
    setIsOpen(false);
  };

  const handleSuggestionClick = (term) => {
    setQuery(term);
    if (onSearchSubmit) {
      onSearchSubmit(term);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative flex-1 flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search fresh groceries, meat, dairy..."
            className="w-full bg-[#f4f7f5] text-gray-800 text-xs sm:text-sm pl-3.5 pr-8 py-2 rounded-l-xl border border-r-0 border-gray-200 focus:outline-none focus:border-[#16a34a] focus:bg-white placeholder-gray-400 transition-all shadow-inner-xs"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 text-gray-400 hover:text-gray-600 p-0.5"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#0f5132] hover:bg-[#0b3d26] active:bg-[#072a1a] text-white px-3.5 py-2 rounded-r-xl flex items-center justify-center transition-colors border border-[#0f5132] shrink-0"
          title="Search"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {/* Auto-suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 max-h-80 overflow-y-auto">
          {trimmed ? (
            suggestions.length > 0 ? (
              <div>
                <div className="px-3.5 py-2 bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>Matching Fresh Products</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        onSelectProduct(product);
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2.5 flex items-center gap-3 hover:bg-emerald-50/50 transition-colors group"
                    >
                      <div className="w-9 h-9 shrink-0 flex items-center justify-center p-0.5 bg-gray-50 rounded-lg">
                        <ProductImage
                          src={product.image}
                          alt={product.name}
                          productName={product.name}
                          category={product.category}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate group-hover:text-emerald-700">
                          {product.name}
                        </p>
                        <p className="text-[10.5px] text-gray-400">
                          {product.unit} • {product.categoryName}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-gray-900">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="block text-[10px] text-gray-400 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-2.5 bg-emerald-50 text-emerald-800 text-xs font-bold text-center hover:bg-emerald-100 transition-colors border-t border-emerald-100"
                >
                  View all results for "{query}"
                </button>
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-gray-500">
                No products found for "<span className="font-semibold text-gray-700">{query}</span>"
              </div>
            )
          ) : (
            /* Popular Trending Searches Prompt on Focus */
            <div className="p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SEARCHES.map((term, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(term)}
                    className="px-2.5 py-1 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 text-xs rounded-full border border-gray-200/80 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
