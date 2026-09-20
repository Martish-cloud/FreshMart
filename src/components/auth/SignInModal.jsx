import React, { useState } from 'react';
import { X, User, Phone, Mail, CheckCircle2, ShieldCheck, LogOut, Package } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function SignInModal({ isOpen, onClose, currentUser, onSignIn, onSignOut }) {
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otp, setOtp] = useState('1234');
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setIsOtpStep(true);
    showToast('OTP sent to ' + phoneNumber + ' (Use code: 1234)');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp !== '1234') {
      showToast('Invalid OTP. Please enter 1234 for demo login', 'error');
      return;
    }

    const demoUser = {
      name: 'Rahul Sharma',
      phone: phoneNumber,
      email: 'rahul.sharma@example.com',
      joined: 'September 2026',
      savedAddresses: ['Flat 402, Green Valley Apartments, Bengaluru'],
    };

    onSignIn(demoUser);
    showToast('🎉 Welcome back, Rahul!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in">
      <div
        className="relative bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#0f5132]" />
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              {currentUser ? 'My Profile' : 'Sign In to FreshMart'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          {currentUser ? (
            /* Logged In Profile View */
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
                <div className="w-12 h-12 rounded-full bg-[#0f5132] text-white font-extrabold flex items-center justify-center text-lg shadow-sm">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{currentUser.name}</h3>
                  <p className="text-xs text-gray-500">{currentUser.phone}</p>
                  <p className="text-xs text-emerald-700 font-medium">{currentUser.email}</p>
                </div>
              </div>

              {/* Past Orders Demo */}
              <div className="border border-gray-100 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                  <span className="flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-emerald-600" />
                    <span>Recent Orders</span>
                  </span>
                  <span className="text-emerald-700">1 Delivered</span>
                </div>
                <div className="text-xs bg-gray-50 p-2.5 rounded-lg text-gray-600 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">Order #FM-782109</p>
                    <p className="text-[11px] text-gray-500">Delivered Yesterday • 4 items</p>
                  </div>
                  <span className="font-bold text-gray-800">₹320</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onSignOut();
                  onClose();
                  showToast('You have signed out', 'info');
                }}
                className="w-full flex items-center justify-center gap-2 border border-rose-200 text-rose-600 hover:bg-rose-50 py-2.5 rounded-xl text-xs font-semibold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : !isOtpStep ? (
            /* Phone Number Input */
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="text-center space-y-1">
                <p className="text-sm font-semibold text-gray-800">
                  Enter your mobile number to get started
                </p>
                <p className="text-xs text-gray-500">
                  We will send you a 4-digit verification code
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Mobile Number
                </label>
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600">
                  <span className="bg-gray-100 text-xs font-semibold px-3 py-2.5 text-gray-600 border-r border-gray-200">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="9876543210"
                    maxLength={10}
                    className="flex-1 px-3 py-2.5 text-sm text-gray-800 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0f5132] hover:bg-[#0b3d26] text-white py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-md transition-all"
              >
                Continue with OTP
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Your information is 100% safe with us</span>
              </div>
            </form>
          ) : (
            /* OTP Input */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center space-y-1">
                <p className="text-sm font-semibold text-gray-800">
                  Verify your mobile number
                </p>
                <p className="text-xs text-gray-500">
                  Enter the 4-digit OTP sent to +91 {phoneNumber}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Verification Code (Demo: 1234)
                </label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={4}
                  className="w-full text-center tracking-widest text-lg font-bold px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0f5132] hover:bg-[#0b3d26] text-white py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-md transition-all"
              >
                Verify & Sign In
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => setIsOtpStep(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  Change number
                </button>
                <button
                  type="button"
                  onClick={() => showToast('OTP resent: 1234')}
                  className="text-emerald-700 font-medium hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
