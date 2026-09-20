import React from 'react';
import { X, Smartphone, MapPin, HelpCircle, CheckCircle2, ShieldCheck, Mail, Phone } from 'lucide-react';

export default function InfoModal({ type, title, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in">
      <div
        className="relative bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 p-6 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'app' && (
          <div className="text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-[#0f5132] rounded-full flex items-center justify-center mx-auto shadow-xs">
              <Smartphone className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Download FreshMart App</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Enjoy express 15-minute grocery deliveries, exclusive app-only discounts, and real-time order tracking on iOS and Android!
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <div className="border border-gray-200 rounded-xl p-3 bg-gray-50 flex-1 text-center">
                <span className="block text-[10px] text-gray-500 font-medium">Available on</span>
                <span className="font-bold text-xs text-gray-800">Apple App Store</span>
              </div>
              <div className="border border-gray-200 rounded-xl p-3 bg-gray-50 flex-1 text-center">
                <span className="block text-[10px] text-gray-500 font-medium">Get it on</span>
                <span className="font-bold text-xs text-gray-800">Google Play Store</span>
              </div>
            </div>
          </div>
        )}

        {type === 'track' && (
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-[#0f5132] rounded-full flex items-center justify-center mx-auto">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center">Track Your Order</h3>
            <div className="space-y-2 text-xs">
              <label className="block text-gray-600 font-medium">Enter Order ID or Mobile Number</label>
              <input
                type="text"
                placeholder="e.g. FM-984210 or 9876543210"
                defaultValue="FM-782109"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
              <button
                onClick={() => alert('Order #FM-782109: Out for delivery with delivery partner Rajesh (ETA 25 mins)')}
                className="w-full bg-[#0f5132] hover:bg-[#0b3d26] text-white py-2.5 rounded-lg font-semibold text-xs transition-colors mt-2"
              >
                Track Live Status
              </button>
            </div>
          </div>
        )}

        {type === 'help' && (
          <div className="space-y-4 text-xs">
            <div className="w-12 h-12 bg-emerald-50 text-[#0f5132] rounded-full flex items-center justify-center mx-auto">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center">Help & 24/7 Support</h3>
            <div className="space-y-2 text-gray-600">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-gray-800">Toll-Free Helpline</p>
                  <p className="text-[11px]">1800-419-FRESH (1800 419 3737)</p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-gray-800">Customer Support Email</p>
                  <p className="text-[11px]">support@freshmart.com</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === 'info' && (
          <div className="space-y-3 text-xs text-gray-600">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <p className="leading-relaxed">
              At FreshMart, we are committed to delivering 100% farm-fresh produce and daily household goods right to your doorstep with maximum hygiene, eco-friendly packaging, and seamless customer care.
            </p>
            <p className="leading-relaxed">
              All items are sourced directly from verified agricultural cooperatives and certified manufacturers, ensuring consistent purity, transparent prices, and ethical trade practices.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified 100% Fresh & Authentic</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
