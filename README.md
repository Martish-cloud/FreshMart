# FreshMart - Fresh Today. Healthier Tomorrow.

A modern, responsive grocery e-commerce web application built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons**.

![FreshMart Preview](https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Features

- **Top Announcement Bar**: Free delivery alert, brand slogan, app download, order tracking, and support triggers.
- **Header & Navigation**: Responsive sticky navigation, leaf branding, search autocomplete dropdown, cart counter, and wishlist badges.
- **Hero Section**: Farm-fresh aesthetic with floating leaves, organic brush badges (`Good Food Brighter Days`), and trust guarantees.
- **12 Category Circular Navigation**: Horizontal quick-navigation row on desktop with touch-scroll on mobile.
- **3-Column Deals Section**:
  - *Left*: Promotional banner for farm-fresh produce with discount badge.
  - *Center*: Best Deals showcase with 5 primary grocery cards (Fresh Apple, Banana, Tomato, Amul Fresh Milk, Country Eggs) featuring pricing, ratings, discount tags, and quantity steppers.
  - *Right*: Promotional banner for healthy snacks.
- **Featured Categories**: Photographic category grid covering vegetables, fruits, dairy, snacks, beverages, personal care, and more.
- **Trust & USP Strip**: Farm-fresh quality, free delivery over ₹499, hassle-free returns, multi-payment options, and 24/7 support.
- **Newsletter Subscription**: Working email validation with success states.
- **Footer**: Brand positioning, quick links, social media integration, and copyright information.

### 🛒 Full E-Commerce Interactions
- **Cart Drawer**: Slide-out cart with quantity increment/decrement, free delivery progress bar, and coupon discount engine (`FRESH30`, `WELCOME`).
- **Wishlist Drawer**: Save favorite groceries and move items to cart with one click.
- **Product Detail Modal**: Quick view with high-res imagery, nutrition specs, pack sizes, and "Buy Now".
- **Multi-Step Checkout**: Address form, delivery slot selection (Express, Evening, Morning), payment method selection (UPI, Card, COD), and celebratory confetti upon order placement.
- **User Authentication**: Demo OTP login with profile view and simulated past order history.
- **Persistence**: All cart and wishlist items persist locally using `localStorage`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Martish-cloud/FreshMart.git

# Navigate to project folder
cd FreshMart

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will start at `http://localhost:3000`.

### Production Build
```bash
npm run build
```

---

## 🛠️ Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Celebrations**: Canvas Confetti
