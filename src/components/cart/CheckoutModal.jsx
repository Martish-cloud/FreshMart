import React, { useState } from 'react';
import { X, CheckCircle2, Truck, ShieldCheck, CreditCard, Banknote, Smartphone, MapPin, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cartItems, cartCount, finalTotal, subtotal, deliveryFee, clearCart } = useCart();
  const { showToast } = useToast();

  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [orderId, setOrderId] = useState('');

  // Form State
  const [address, setAddress] = useState({
    fullName: 'Rahul Sharma',
    phone: '9876543210',
    street: 'Flat 402, Green Valley Apartments, MG Road',
    city: 'Bengaluru',
    pincode: '560001',
  });

  const [deliverySlot, setDeliverySlot] = useState('express'); // 'express' | 'evening' | 'morning'
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod'
  const [upiId, setUpiId] = useState('rahul@okhdfcbank');

  if (!isOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!address.fullName || !address.phone || !address.street || !address.pincode) {
      showToast('Please fill in all address fields', 'error');
      return;
    }

    // Generate simulated order ID
    const newOrderId = 'FM-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    setStep('success');
    clearCart();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#16a34a', '#22c55e', '#0f5132', '#f59e0b', '#3b82f6'],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 animate-in zoom-in-95 custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0f5132]" />
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              {step === 'success' ? 'Order Confirmation' : 'Checkout & Delivery'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'success' ? (
          /* Order Success State */
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0f5132] flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                Order Placed Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Order ID: <span className="font-bold text-emerald-800">{orderId}</span>
              </p>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#0f5132] font-semibold">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Estimated Delivery: Today in 45-60 Minutes</span>
              </div>
              <p className="text-gray-600">
                Delivering to: <span className="font-medium text-gray-800">{address.street}, {address.city} - {address.pincode}</span>
              </p>
              <p className="text-gray-600">
                Payment: <span className="font-semibold text-gray-800 uppercase">{paymentMethod}</span> (Paid: ₹{finalTotal})
              </p>
            </div>

            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              We've dispatched a notification to <span className="font-semibold text-gray-700">{address.phone}</span>. Fresh produce is currently being handpicked from our farm hub!
            </p>

            <div className="pt-3">
              <button
                onClick={handleClose}
                className="bg-[#0f5132] hover:bg-[#0b3d26] text-white px-8 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-md transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="p-5 sm:p-6 space-y-6">
            {/* Section 1: Delivery Address */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>1. Delivery Address</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 font-medium mb-1">Street Address / Flat No.</label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Slot */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>2. Delivery Slot</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <label
                  className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    deliverySlot === 'express'
                      ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="slot"
                    checked={deliverySlot === 'express'}
                    onChange={() => setDeliverySlot('express')}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">Express Delivery</span>
                    <span className="text-[10px] bg-emerald-700 text-white px-1.5 py-0.5 rounded font-bold">Fast</span>
                  </div>
                  <span className="text-gray-500 mt-1">Within 45-60 Mins</span>
                </label>

                <label
                  className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    deliverySlot === 'evening'
                      ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="slot"
                    checked={deliverySlot === 'evening'}
                    onChange={() => setDeliverySlot('evening')}
                    className="sr-only"
                  />
                  <span className="font-bold text-gray-900">Today Evening</span>
                  <span className="text-gray-500 mt-1">6:00 PM - 8:30 PM</span>
                </label>

                <label
                  className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    deliverySlot === 'morning'
                      ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="slot"
                    checked={deliverySlot === 'morning'}
                    onChange={() => setDeliverySlot('morning')}
                    className="sr-only"
                  />
                  <span className="font-bold text-gray-900">Tomorrow Morning</span>
                  <span className="text-gray-500 mt-1">7:00 AM - 9:30 AM</span>
                </label>
              </div>
            </div>

            {/* Section 3: Payment Method */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>3. Payment Method</span>
              </div>
              <div className="space-y-2 text-xs">
                {/* UPI */}
                <label
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="text-emerald-600"
                    />
                    <Smartphone className="w-4 h-4 text-emerald-700" />
                    <div>
                      <p className="font-bold text-gray-900">UPI (Google Pay / PhonePe / Paytm)</p>
                      <p className="text-gray-500 text-[11px]">Instant & zero transaction fee</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                    Popular
                  </span>
                </label>

                {/* Cards */}
                <label
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-emerald-600"
                    />
                    <CreditCard className="w-4 h-4 text-emerald-700" />
                    <div>
                      <p className="font-bold text-gray-900">Credit / Debit Card</p>
                      <p className="text-gray-500 text-[11px]">Visa, MasterCard, RuPay, Maestro</p>
                    </div>
                  </div>
                </label>

                {/* COD */}
                <label
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-emerald-600"
                    />
                    <Banknote className="w-4 h-4 text-emerald-700" />
                    <div>
                      <p className="font-bold text-gray-900">Cash on Delivery</p>
                      <p className="text-gray-500 text-[11px]">Pay via Cash or QR at your doorstep</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs space-y-1.5">
              <div className="flex justify-between text-gray-600">
                <span>Items Subtotal ({cartCount} items)</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                {deliveryFee === 0 ? (
                  <span className="text-emerald-700 font-bold">FREE</span>
                ) : (
                  <span>₹{deliveryFee}</span>
                )}
              </div>
              <div className="flex justify-between font-extrabold text-sm text-gray-900 pt-2 border-t border-gray-200">
                <span>Total to Pay</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              className="w-full bg-[#0f5132] hover:bg-[#0b3d26] text-white py-3.5 px-4 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              Place Order • ₹{finalTotal}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
