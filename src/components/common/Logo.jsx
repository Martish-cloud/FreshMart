import React from 'react';

export default function Logo({ size = 'default', showTagline = true, onClick }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 text-left group transition-transform duration-200 active:scale-98 select-none"
    >
      {/* Organic Leaf Emblem matching reference */}
      <div className={`relative shrink-0 flex items-center justify-center ${isLarge ? 'w-10 h-10' : isSmall ? 'w-7 h-7' : 'w-8 h-8'}`}>
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm group-hover:scale-105 transition-transform"
        >
          {/* Main Leaf */}
          <path
            d="M6 30C6 16 16 6 30 6C30 20 20 30 6 30Z"
            fill="#16a34a"
          />
          {/* Secondary overlap leaf */}
          <path
            d="M12 28C12 17.5 19.5 10 30 10C30 20.5 22.5 28 12 28Z"
            fill="#22c55e"
            opacity="0.9"
          />
          {/* Central spine vein */}
          <path
            d="M9 27C16 23 22 17 28 9"
            stroke="#0b3d26"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Small side leaf accent */}
          <path
            d="M16 18C14 15 13 13 11 12"
            stroke="#0b3d26"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Title & Tagline */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-extrabold tracking-tight text-[#0f5132] font-sans ${
            isLarge ? 'text-2xl' : isSmall ? 'text-lg' : 'text-xl'
          }`}
        >
          Fresh<span className="text-[#16a34a]">Mart</span>
        </span>
        {showTagline && (
          <span className="text-[9.5px] font-medium text-gray-500 tracking-wide mt-0.5">
            Fresh Today . Healthier Tomorrow
          </span>
        )}
      </div>
    </button>
  );
}
