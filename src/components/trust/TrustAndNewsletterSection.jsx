import React, { useState } from 'react';
import { Leaf, Truck, RotateCcw, CreditCard, Headphones, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function TrustAndNewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubscribed(true);
    showToast('🎉 Thank you for subscribing! Check your inbox for 10% off.');
  };

  const trustItems = [
    {
      icon: Leaf,
      title: 'Farm Fresh Quality',
      subtitle: 'Directly from trusted farms',
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      subtitle: 'On orders above ₹499',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      subtitle: 'Hassle free within 7 days',
    },
    {
      icon: CreditCard,
      title: 'Multiple Payment Options',
      subtitle: 'UPI, Cards, COD & more',
    },
    {
      icon: Headphones,
      title: '24/7 Customer Support',
      subtitle: "We're always here to help",
    },
  ];

  return (
    <section className="py-8 bg-white select-none overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: 5 Trust Features (7 or 8 columns on desktop) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#16a34a]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Newsletter Box (4 columns on desktop) matching reference */}
          <div className="lg:col-span-4 bg-[#e8f6ed] rounded-2xl p-4 sm:p-5 border border-emerald-200/80 shadow-xs">
            <div className="mb-2">
              <h3 className="text-sm sm:text-[15px] font-bold text-[#0f5132] leading-snug">
                Get Exclusive Offers & Updates
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Subscribe to our newsletter
              </p>
            </div>

            {isSubscribed ? (
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-lg border border-emerald-300 text-emerald-800 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Subscribed! Check your inbox for exclusive promo codes.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter your email address"
                    className="flex-1 bg-white text-gray-800 text-xs px-3.5 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#16a34a] placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="bg-[#0f5132] hover:bg-[#0b3d26] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shrink-0"
                  >
                    Subscribe
                  </button>
                </div>
                {error && (
                  <p className="text-[11px] text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
