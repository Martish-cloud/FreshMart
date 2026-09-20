import React from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { PRODUCTS } from '../../data/products';

export default function BestDeals({ onQuickView, onViewAll }) {
  const bestDealProducts = PRODUCTS.filter(p => p.isBestDeal);

  return (
    <div className="flex flex-col h-full">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3.5 px-0.5">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Best Deals
        </h2>
        <button
          onClick={onViewAll}
          className="text-xs sm:text-sm font-semibold text-[#15803d] hover:text-[#0f5132] flex items-center gap-1 transition-colors group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* 5 Product Cards matching reference */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 xl:gap-3 flex-1">
        {bestDealProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </div>
  );
}
