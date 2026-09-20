import React from 'react';
import { FEATURED_CATEGORIES } from '../../data/categories';

export default function FeaturedCategories({ onSelectCategory }) {
  return (
    <section className="py-8 bg-white border-t border-b border-gray-100 select-none w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              Featured Categories
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Explore our wide selection of fresh everyday groceries</p>
          </div>
        </div>

        {/* 12 Category Cards Grid - 2 rows of 6 on desktop/laptop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {FEATURED_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.categoryId)}
              className="group flex flex-col bg-[#fbfcfb] hover:bg-emerald-50/40 rounded-2xl border border-gray-200/80 hover:border-emerald-500/60 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-card-hover transition-all duration-300 overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              {/* Card Product Cutout */}
              <div className="relative w-full h-28 sm:h-32 flex items-center justify-center p-3 bg-emerald-50/20 group-hover:bg-emerald-50/50 transition-colors">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300"
                  loading="lazy"
                />
                {cat.badge && (
                  <span className="absolute top-2 left-2 bg-emerald-700 text-white text-[9.5px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                    {cat.badge}
                  </span>
                )}
              </div>

              {/* Bottom White Tag with Category Name */}
              <div className="p-2.5 sm:p-3 bg-white border-t border-gray-100 flex-1 flex items-center justify-center text-center">
                <span className="text-xs sm:text-[12.5px] font-bold text-gray-800 group-hover:text-[#0f5132] transition-colors line-clamp-1 leading-snug">
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
