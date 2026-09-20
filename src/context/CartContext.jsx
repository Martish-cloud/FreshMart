import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('freshmart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('freshmart_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'FRESH30') {
      setAppliedCoupon({ code: 'FRESH30', discountPercent: 30, description: '30% Off Fresh Special' });
      return { success: true, message: 'Coupon FRESH30 applied! 30% discount added.' };
    }
    if (cleanCode === 'FRESH50' || cleanCode === 'WELCOME') {
      setAppliedCoupon({ code: cleanCode, flatDiscount: 50, description: '₹50 Flat Off Welcome Offer' });
      return { success: true, message: `Coupon ${cleanCode} applied! ₹50 discount added.` };
    }
    return { success: false, message: 'Invalid coupon code. Try FRESH30 or WELCOME.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculations
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const originalSubtotal = cartItems.reduce((sum, item) => {
    const orig = item.originalPrice || item.price;
    return sum + orig * item.quantity;
  }, 0);

  const productSavings = Math.max(0, originalSubtotal - subtotal);

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      couponDiscount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.flatDiscount) {
      couponDiscount = Math.min(subtotal, appliedCoupon.flatDiscount);
    }
  }

  const FREE_DELIVERY_THRESHOLD = 499;
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD || cartCount === 0;
  const deliveryFee = isFreeDelivery ? 0 : 40;
  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const finalTotal = Math.max(0, subtotal - couponDiscount + deliveryFee);
  const totalSavings = productSavings + couponDiscount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        originalSubtotal,
        productSavings,
        couponDiscount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        deliveryFee,
        isFreeDelivery,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        amountNeededForFreeDelivery,
        freeDeliveryProgress,
        finalTotal,
        totalSavings,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
