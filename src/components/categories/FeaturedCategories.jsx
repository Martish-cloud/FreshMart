import React from 'react';
import { FEATURED_CATEGORIES } from '../../data/categories';

export default function FeaturedCategories({ onSelectCategory }) {
  return (
    <section className="py-8 bg-white border-t border-b border-gray-100 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Featured Categories
          </h2>
        </div>

        {/* 12 Category Cards Grid matching reference */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2.5 sm:gap-3">
          {FEATURED_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.categoryId)}
              className="group flex flex-col bg-[#fbfcfb] hover:bg-emerald-50/50 rounded-xl sm:rounded-2xl border border-gray-200/90 hover:border-emerald-400/80 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300 overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              {/* Card Photography */}
              <div className="relative w-full h-24 sm:h-28 overflow-hidden bg-gray-50">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
              </div>

              {/* Bottom White Tag with Category Name */}
              <div className="p-2 sm:p-2.5 bg-white border-t border-gray-100 flex-1 flex items-center justify-center text-center">
                <span className="text-[11.5px] sm:text-xs font-semibold text-gray-800 group-hover:text-[#0f5132] transition-colors line-clamp-2 leading-snug">
                  {cat.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
