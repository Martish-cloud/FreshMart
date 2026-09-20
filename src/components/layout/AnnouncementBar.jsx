import React from 'react';
import { Truck, Smartphone, MapPin, HelpCircle } from 'lucide-react';

export default function AnnouncementBar({ onOpenTrackOrder, onOpenHelp, onOpenAppModal }) {
  return (
    <div className="bg-[#0b532e] text-white text-xs py-2 px-3 sm:px-6 border-b border-[#084223] select-none w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Free delivery notice - always visible and prioritized */}
        <div className="flex items-center gap-1.5 font-medium tracking-wide text-emerald-100 text-[11px] sm:text-xs shrink-0">
          <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 shrink-0" />
          <span>
            Free delivery on orders above <span className="text-white font-bold">₹499</span>
          </span>
        </div>

        {/* Center: Brand motto - hidden on mobile and tablet to prevent overcrowding */}
        <div className="hidden lg:flex items-center gap-3 text-emerald-100/90 text-[11.5px] font-medium tracking-wide shrink-0">
          <span>Fresh Food</span>
          <span className="text-emerald-400/60">|</span>
          <span>Better Health</span>
          <span className="text-emerald-400/60">|</span>
          <span>Happier You</span>
        </div>

        {/* Right: Utility links - responsive layout */}
        <div className="flex items-center gap-2 sm:gap-3 text-[10.5px] sm:text-[11.5px] font-medium text-emerald-100 shrink-0">
          <button
            onClick={onOpenAppModal}
            className="hidden sm:flex items-center gap-1 hover:text-white transition-colors"
          >
            <Smartphone className="w-3 h-3 text-emerald-300" />
            <span>App</span>
          </button>
          <span className="hidden sm:inline text-emerald-400/50">|</span>
          <button
            onClick={onOpenTrackOrder}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <MapPin className="w-3 h-3 text-emerald-300" />
            <span>Track</span>
          </button>
          <span className="text-emerald-400/50">|</span>
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <HelpCircle className="w-3 h-3 text-emerald-300" />
            <span>Help</span>
          </button>
        </div>
      </div>
    </div>
  );
}
