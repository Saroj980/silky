'use client'

import React, { useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { CategoryShowcase } from '@/components/category-showcase'
import { NewArrivals } from '@/components/new-arrivals'
import { BrandStory } from '@/components/brand-story'
import { WhySilky } from '@/components/why-silky'
import { Lookbook } from '@/components/lookbook'
import { Testimonials } from '@/components/testimonials'
import { SocialGallery } from '@/components/social-gallery'
import { Newsletter } from '@/components/newsletter'
import { SiteFooter } from '@/components/site-footer'
import { CartDrawer, CartItem } from '@/components/cart-drawer'
import { SearchModal } from '@/components/search-modal'
import { Product } from '@/components/quick-view-modal'

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [wishlistCount, setWishlistCount] = useState(3)

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: {
        id: '1',
        name: 'Royal Mulberry Silk Evening Gown',
        category: 'Womenswear',
        price: 'Dh 4,850',
        fabric: '100% Organic Dubai Mulberry Silk',
        image:
          'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
        hoverImage:
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
        description: 'Architectural silhouette with floor-sweeping silk cape.',
        sizes: ['S', 'M'],
        colors: [{ name: 'Midnight Navy', hex: '#0B1320' }],
        rating: 4.9,
        reviewsCount: 28,
        inStock: true,
      },
      size: 'M',
      color: 'Midnight Navy',
      quantity: 1,
    },
    {
      product: {
        id: '2',
        name: 'Super 150s Wool Double-Breasted Suit',
        category: 'Menswear',
        price: 'Dh 5,200',
        fabric: 'Super 150s Italian Merino Wool',
        image:
          'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
        hoverImage:
          'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
        description: 'Tailored with peak lapels & horn buttons.',
        sizes: ['50R'],
        colors: [{ name: 'Deep Onyx', hex: '#111827' }],
        rating: 5.0,
        reviewsCount: 42,
        inStock: true,
      },
      size: '50R',
      color: 'Deep Onyx',
      quantity: 1,
    },
  ])

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === product.id && i.size === size && i.color === color
      )
      if (existingIdx > -1) {
        const updated = [...prev]
        updated[existingIdx].quantity += 1
        return updated
      }
      return [...prev, { product, size, color, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      const updated = [...prev]
      const newQty = updated[index].quantity + delta
      if (newQty <= 0) {
        return prev.filter((_, idx) => idx !== index)
      }
      updated[index].quantity = newQty
      return updated
    })
  }

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index))
  }

  return (
    <div className="bg-[#FAFAF8] text-[#1A1A1A] font-sans antialiased min-h-screen relative selection:bg-[#DE7B3D] selection:text-white">
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#DE7B3D] focus:text-white text-xs uppercase tracking-widest font-semibold rounded-xs"
      >
        Skip to main content
      </a>

      {/* Floating Sticky Header */}
      <SiteHeader
        cartCount={totalCartCount}
        wishlistCount={wishlistCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => alert('Wishlist Drawer: 3 Saved Couture Items')}
      />

      {/* Main Page Content */}
      <main id="main-content" className="relative z-0">
        {/* Section 2: Hero Slider */}
        <Hero />

        {/* Section 3: Category Showcase */}
        <CategoryShowcase />

        {/* Section 4: New Arrivals Carousel */}
        <NewArrivals onAddToCart={handleAddToCart} />

        {/* Section 5: Brand Story Split */}
        <BrandStory />

        {/* Section 6: Why Choose Silky */}
        <WhySilky />

        {/* Section 7: Editorial Lookbook */}
        <Lookbook />

        {/* Section 8: Testimonials */}
        <Testimonials />

        {/* Section 9: Instagram Social Gallery */}
        <SocialGallery />

        {/* Section 10: Luxury Newsletter */}
        <Newsletter />
      </main>

      {/* Section 11: Premium Footer */}
      <SiteFooter />

      {/* Slide-over Drawers & Overlays */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  )
}
