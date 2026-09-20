import React from 'react';
import { Leaf } from 'lucide-react';
import Logo from '../common/Logo';

export default function Footer({ onOpenInfoModal }) {
  const links = [
    { label: 'About Us', id: 'about' },
    { label: 'Contact Us', id: 'contact' },
    { label: 'Terms & Conditions', id: 'terms' },
    { label: 'Privacy Policy', id: 'privacy' },
    { label: 'Return Policy', id: 'returns' },
    { label: 'Careers', id: 'careers' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200/80 pt-10 pb-6 text-gray-600 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-gray-100">
          {/* Left Column: Logo & Tagline (4 cols) */}
          <div className="md:col-span-4 space-y-2">
            <Logo size="large" />
            <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
              Your neighborhood online grocery store delivering fresh farm produce, dairy, bakery, and daily essentials right to your doorstep.
            </p>
          </div>

          {/* Center Column: Navigation Links & Social Media (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            {/* Quick Links matching reference */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-gray-600">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onOpenInfoModal && onOpenInfoModal(link.id, link.label)}
                  className="hover:text-[#16a34a] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Social Media Row matching reference */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-700">Follow Us:</span>
              <div className="flex items-center gap-2">
                {/* Facebook */}
                <a
                  href="#facebook"
                  onClick={(e) => e.preventDefault()}
                  className="w-7 h-7 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:opacity-90 transition-opacity text-xs font-bold"
                  title="Facebook"
                  aria-label="Facebook"
                >
                  f
                </a>
                {/* Instagram */}
                <a
                  href="#instagram"
                  onClick={(e) => e.preventDefault()}
                  className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:opacity-90 transition-opacity text-xs font-bold"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  📸
                </a>
                {/* YouTube */}
                <a
                  href="#youtube"
                  onClick={(e) => e.preventDefault()}
                  className="w-7 h-7 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:opacity-90 transition-opacity text-xs font-bold"
                  title="YouTube"
                  aria-label="YouTube"
                >
                  ▶
                </a>
                {/* Twitter / X */}
                <a
                  href="#twitter"
                  onClick={(e) => e.preventDefault()}
                  className="w-7 h-7 rounded-full bg-[#0f1419] text-white flex items-center justify-center hover:opacity-90 transition-opacity text-xs font-bold"
                  title="Twitter / X"
                  aria-label="Twitter"
                >
                  𝕏
                </a>
                {/* LinkedIn */}
                <a
                  href="#linkedin"
                  onClick={(e) => e.preventDefault()}
                  className="w-7 h-7 rounded-full bg-[#0a66c2] text-white flex items-center justify-center hover:opacity-90 transition-opacity text-xs font-bold"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  in
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Decorative Branding 'Good Food Better Tomorrow' matching reference */}
          <div className="md:col-span-3 flex justify-start md:justify-end items-center">
            <div className="flex items-center gap-2 text-right">
              <div className="flex flex-col items-end">
                <span className="font-handwriting text-2xl font-bold text-[#114227] leading-tight">
                  Good Food
                </span>
                <span className="font-handwriting text-2xl font-bold text-[#16a34a] leading-tight">
                  Better Tomorrow
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-[#16a34a]">
                <Leaf className="w-4 h-4 transform rotate-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-2">
          <p>© {new Date().getFullYear()} FreshMart Grocery Retail Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>FSSAI Lic. No: 10019043000921</span>
            <span>Made with 💚 for healthy living</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
