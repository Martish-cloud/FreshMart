import React, { useState } from 'react';
import { Leaf, Package } from 'lucide-react';

export default function ProductImage({
  src,
  alt,
  className = '',
  category = 'grocery',
  productName = '',
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center select-none bg-transparent">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#16a34a] shadow-xs mb-1.5">
          <Leaf className="w-8 h-8" />
        </div>
        <span className="text-[11px] font-bold text-gray-700 line-clamp-1 max-w-[130px]">
          {productName || alt || 'Fresh Product'}
        </span>
        <span className="text-[9.5px] text-emerald-700 font-semibold uppercase tracking-wider">
          FreshMart Quality
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-transparent">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-600 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt || productName || 'FreshMart Grocery Product'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading="lazy"
        className={`max-h-full max-w-full object-contain bg-transparent transition-all duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
}
