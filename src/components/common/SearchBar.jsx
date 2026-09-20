import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export default function SearchBar({ onSelectProduct, onSearchSubmit, currentSearchQuery = '' }) {
  const [query, setQuery] = useState(currentSearchQuery);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(currentSearchQuery);
  }, [currentSearchQuery]);

  // Click outside to close
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
          p.description.toLowerCase().includes(trimmed)
      ).slice(0, 5)
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

  return (
    <div className="relative w-full max-w-xs md:max-w-sm" ref={dropdownRef}>
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
            placeholder="Search for fresh products..."
            className="w-full bg-[#f1f4f2] text-gray-800 text-xs sm:text-sm pl-3.5 pr-8 py-2 rounded-l-md border border-r-0 border-gray-200 focus:outline-none focus:border-[#16a34a] focus:bg-white placeholder-gray-400 transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 text-gray-400 hover:text-gray-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#0f5132] hover:bg-[#0b3d26] active:bg-[#072a1a] text-white px-3.5 py-2 rounded-r-md flex items-center justify-center transition-colors border border-[#0f5132]"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {/* Auto-suggestions Dropdown */}
      {isOpen && trimmed && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1">
          {suggestions.length > 0 ? (
            <div>
              <div className="px-3 py-1.5 bg-gray-50 text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Matching Products</span>
              </div>
              <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      onSelectProduct(product);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2.5 flex items-center gap-3 hover:bg-emerald-50/50 transition-colors group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-lg bg-gray-100 shrink-0 border border-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate group-hover:text-emerald-700">
                        {product.name}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {product.unit} • <span className="text-gray-400">{product.categoryName}</span>
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
                className="w-full py-2 bg-emerald-50 text-emerald-800 text-xs font-semibold text-center hover:bg-emerald-100 transition-colors border-t border-emerald-100"
              >
                View all results for "{query}"
              </button>
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-gray-500">
              No products found for "<span className="font-medium text-gray-700">{query}</span>"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
