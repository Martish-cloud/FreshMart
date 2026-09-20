import React from 'react';
import { Truck, Smartphone, MapPin, HelpCircle } from 'lucide-react';

export default function AnnouncementBar({ onOpenTrackOrder, onOpenHelp, onOpenAppModal }) {
  return (
    <div className="bg-[#0b532e] text-white text-xs py-2 px-4 border-b border-[#084223] select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Free delivery notice */}
        <div className="flex items-center gap-1.5 font-medium tracking-wide text-emerald-100">
          <Truck className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>Free delivery on orders above <span className="text-white font-semibold">₹499</span></span>
        </div>

        {/* Center: Brand motto */}
        <div className="hidden md:flex items-center gap-3 text-emerald-100/90 text-[11px] font-medium tracking-wide">
          <span>Fresh Food</span>
          <span className="text-emerald-400/60">|</span>
          <span>Better Health</span>
          <span className="text-emerald-400/60">|</span>
          <span>Happier You</span>
        </div>

        {/* Right: Utility links */}
        <div className="flex items-center gap-3 text-[11px] font-medium text-emerald-100">
          <button
            onClick={onOpenAppModal}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
            <span>Download App</span>
          </button>
          <span className="text-emerald-400/60">|</span>
          <button
            onClick={onOpenTrackOrder}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-300" />
            <span>Track Order</span>
          </button>
          <span className="text-emerald-400/60">|</span>
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-300" />
            <span>Help & Support</span>
          </button>
        </div>
      </div>
    </div>
  );
}
