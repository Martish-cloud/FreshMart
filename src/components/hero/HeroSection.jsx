import React from 'react';
import { ArrowRight, Leaf, Truck, ShieldCheck } from 'lucide-react';

export default function HeroSection({ onShopNow }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#edf7f0] via-[#e5f5ea] to-[#ddf1e3] py-8 sm:py-12 lg:py-14 border-b border-emerald-100/60 select-none">
      {/* Decorative ambient background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none" />

      {/* Floating decorative leaves */}
      <div className="absolute top-4 left-6 w-8 h-8 text-emerald-500/40 transform -rotate-45 pointer-events-none hidden md:block animate-float">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
        </svg>
      </div>
      <div className="absolute bottom-8 left-1/3 w-6 h-6 text-emerald-600/30 transform rotate-12 pointer-events-none hidden lg:block animate-pulse-subtle">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
        </svg>
      </div>
      <div className="absolute top-10 right-12 w-10 h-10 text-emerald-500/30 transform rotate-45 pointer-events-none hidden md:block">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left Column: Hero Text Content (Columns 1-6) */}
          <div className="lg:col-span-6 z-10 space-y-5 lg:pr-4 text-center lg:text-left">
            {/* Small uppercase heading */}
            <div className="inline-block">
              <span className="text-[#15803d] font-bold text-xs sm:text-[13px] tracking-[0.2em] uppercase">
                FRESHER. HEALTHIER. HAPPIER.
              </span>
            </div>

            {/* Main display heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-[#114227] tracking-tight leading-[1.12]">
              Fresh Groceries<br />
              <span className="text-[#134e2e]">Delivered to Your Door</span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
              Farm fresh fruits, vegetables, dairy, and more.<br className="hidden sm:inline" />
              Quality you can trust, delivered with care.
            </p>

            {/* CTA Button */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <button
                onClick={onShopNow}
                className="group inline-flex items-center gap-2.5 bg-[#0f5132] hover:bg-[#0b3d26] active:bg-[#072a1a] text-white px-7 py-3.5 rounded-full font-medium text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* 3 Trust Badges Row */}
            <div className="pt-6 border-t border-emerald-200/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {/* Feature 1 */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white shadow-xs border border-emerald-100 flex items-center justify-center shrink-0">
                  <Leaf className="w-4 h-4 text-[#16a34a]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 leading-tight">
                    100% Fresh Products
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
                    Direct from farms
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white shadow-xs border border-emerald-100 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-[#16a34a]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 leading-tight">
                    Fast & Reliable Delivery
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
                    On time, every time
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white shadow-xs border border-emerald-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 leading-tight">
                    Safe & Secure Payments
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
                    Your trust, our priority
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Grocery Basket Composition & Brush Stamp (Columns 7-12) */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px]">
              {/* Wooden table surface base effect */}
              <div className="absolute -bottom-2 inset-x-8 h-8 bg-amber-900/10 rounded-full blur-md" />

              {/* High-fidelity produce basket visual */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl border border-white/60 bg-white/40 backdrop-blur-xs">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=85"
                  alt="Fresh groceries basket brimming with organic vegetables and fruits"
                  className="w-full h-[320px] sm:h-[380px] lg:h-[400px] object-cover object-center transform hover:scale-102 transition-transform duration-700"
                />

                {/* Subtle soft-gradient overlay matching reference */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Stylized Green Brush Stamp: 'Good Food Brighter Days' matching reference */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-20">
                <div className="relative bg-[#166534] text-white px-5 py-6 rounded-[2.5rem] shadow-xl border-2 border-white/80 transform rotate-6 hover:rotate-3 transition-transform duration-300 flex flex-col items-center justify-center text-center select-none backdrop-blur-xs">
                  {/* Organic texture background */}
                  <div className="absolute -top-1 right-2 text-emerald-400/80">
                    <Leaf className="w-4 h-4 transform rotate-45" />
                  </div>
                  <span className="font-handwriting text-xl sm:text-2xl font-bold leading-tight tracking-wide text-white drop-shadow-sm">
                    Good<br />
                    Food<br />
                    Brighter<br />
                    Days
                  </span>
                  {/* Bottom leaf accent */}
                  <div className="w-8 h-0.5 bg-emerald-400/60 rounded-full mt-1" />
                </div>
              </div>

              {/* Quality Guarantee Mini Tag */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-emerald-100 flex items-center gap-2 z-20">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-semibold text-emerald-950">100% Farm Fresh Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
