import React from 'react';
import PromoBannerLeft from './PromoBannerLeft';
import PromoBannerRight from './PromoBannerRight';
import BestDeals from './BestDeals';

export default function MainDealsSection({ onQuickView, onViewAll, onSelectCategory }) {
  return (
    <section className="py-8 bg-[#f9fafb] w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* 3-Column Layout matching reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_240px] xl:grid-cols-[270px_1fr_270px] gap-4 items-stretch">
          {/* Left Promotional Banner */}
          <div className="w-full">
            <PromoBannerLeft onShopNow={onSelectCategory} />
          </div>

          {/* Center: Best Deals Section */}
          <div className="w-full min-w-0">
            <BestDeals onQuickView={onQuickView} onViewAll={onViewAll} />
          </div>

          {/* Right Promotional Banner */}
          <div className="w-full">
            <PromoBannerRight onShopNow={onSelectCategory} />
          </div>
        </div>
      </div>
    </section>
  );
}
