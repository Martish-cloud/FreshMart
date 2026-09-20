import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function PromoBannerLeft({ onShopNow }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#e8f6ed] to-[#d6f0df] rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-emerald-200/70 shadow-sm group min-h-[380px] select-none">
      {/* Top Discount Badge: Circular badge matching reference */}
      <div className="absolute top-4 right-4 z-10">
        <div className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-[#0f5132] text-white flex flex-col items-center justify-center text-center shadow-lg border-2 border-white transform rotate-6 group-hover:rotate-0 transition-transform">
          <span className="text-[9px] uppercase font-bold tracking-widest leading-none text-emerald-200">
            UP TO
          </span>
          <span className="text-base sm:text-lg font-extrabold leading-none py-0.5">
            30%
          </span>
          <span className="text-[9px] uppercase font-bold tracking-wider leading-none text-emerald-200">
            OFF
          </span>
        </div>
      </div>

      {/* Header & Copy */}
      <div className="space-y-2 pr-16 z-10">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#114227] leading-tight tracking-tight">
          Farm Fresh<br />
          <span className="text-[#16a34a]">Fruits & Vegetables</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-medium">
          Nature's best, delivered fresh.
        </p>

        {/* Shop Now CTA Button */}
        <div className="pt-2">
          <button
            onClick={() => onShopNow('fruits-vegetables')}
            className="inline-flex items-center gap-2 bg-[#0f5132] hover:bg-[#0b3d26] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xs hover:shadow transition-all"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Basket Visual at the Bottom */}
      <div className="relative mt-4 -mx-2 -mb-2 z-0">
        <img
          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
          alt="Fresh vegetables in wooden basket with broccoli, carrots and tomatoes"
          className="w-full h-44 sm:h-48 object-cover rounded-xl shadow-md group-hover:scale-103 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-transparent rounded-xl" />
      </div>
    </div>
  );
}
