import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function PromoBannerRight({ onShopNow }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#fff2e2] to-[#ffe5ca] rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-orange-200/80 shadow-sm group min-h-[380px] select-none">
      {/* Header & Copy */}
      <div className="space-y-2 z-10">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#9a3412] leading-tight tracking-tight">
          Healthy<br />
          <span className="text-[#c2410c]">Snacks</span><br />
          Happier You
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-medium">
          Up to 25% OFF<br className="hidden sm:inline" /> on selected items
        </p>

        {/* Shop Now CTA Button */}
        <div className="pt-2">
          <button
            onClick={() => onShopNow('snacks')}
            className="inline-flex items-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xs hover:shadow transition-all"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Snacks Visual at the Bottom (Lay's, crisps, snacks) */}
      <div className="relative mt-4 -mx-2 -mb-2 z-0">
        <img
          src="https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80"
          alt="Crispy chips and savory snacks assortment"
          className="w-full h-44 sm:h-48 object-cover rounded-xl shadow-md group-hover:scale-103 transition-transform duration-500"
          loading="lazy"
        />
        {/* Floating Snack Tag */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-orange-900 border border-orange-200 shadow-xs">
          Crunch Time
        </div>
      </div>
    </div>
  );
}
