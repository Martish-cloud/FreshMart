import React from 'react';
import { CIRCLE_CATEGORIES } from '../../data/categories';

export default function CategoryCircleNav({ activeCategory, onSelectCategory }) {
  return (
    <section className="bg-white py-6 border-b border-gray-100 select-none">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Horizontal Row on Desktop, Horizontal Scroll on Mobile */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2 pt-1">
          {CIRCLE_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="flex flex-col items-center group shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl p-1 transition-all duration-200"
                style={{ width: '80px' }}
              >
                {/* Circular image frame matching reference */}
                <div
                  className={`w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full flex items-center justify-center p-2 transition-all duration-300 transform group-hover:scale-108 ${
                    isSelected
                      ? 'bg-emerald-100 ring-2 ring-emerald-600 shadow-md scale-105'
                      : 'bg-[#f4f7f5] group-hover:bg-emerald-50 group-hover:shadow-sm'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain group-hover:rotate-3 transition-transform"
                    loading="lazy"
                  />
                </div>

                {/* Category label underneath */}
                <span
                  className={`text-[11.5px] sm:text-xs font-medium text-center leading-tight mt-2 transition-colors line-clamp-2 max-w-[76px] ${
                    isSelected
                      ? 'text-[#0f5132] font-bold'
                      : 'text-gray-700 group-hover:text-[#16a34a]'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
