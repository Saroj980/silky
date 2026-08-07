'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Eye, ShoppingBag } from 'lucide-react'
import { QuickViewModal, Product } from './quick-view-modal'

const productsData: Product[] = [
  {
    id: '1',
    name: 'Royal Mulberry Silk Evening Gown',
    category: 'Womenswear',
    price: 'Dh 4,850',
    originalPrice: 'Dh 5,400',
    fabric: '100% Organic Dubai Mulberry Silk (24 Momme)',
    image:
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    description:
      'Architectural silhouette featuring floor-sweeping silk draped cape, custom brooch detail, and fluid movement designed for Dubai galas.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Midnight Navy', hex: '#0B1320' },
      { name: 'Imperial Copper', hex: '#DE7B3D' },
      { name: 'Ivory Cream', hex: '#FAFAF8' },
    ],
    rating: 4.9,
    reviewsCount: 28,
    inStock: true,
  },
  {
    id: '2',
    name: 'Super 150s Wool Double-Breasted Suit',
    category: 'Menswear',
    price: 'Dh 5,200',
    fabric: 'Super 150s Italian Merino Wool & Pure Silk Lining',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    description:
      'Tailored with hand-stitched peak lapels, horn buttons, and breathable tropical weight weave optimized for the GCC climate.',
    sizes: ['48R', '50R', '52R', '54R', 'Bespoke'],
    colors: [
      { name: 'Deep Onyx', hex: '#111827' },
      { name: 'Royal Navy', hex: '#0F172A' },
    ],
    rating: 5.0,
    reviewsCount: 42,
    inStock: true,
  },
  {
    id: '3',
    name: 'Emirati Signature Silk-Blend Abaya Coat',
    category: 'Womenswear',
    price: 'Dh 3,950',
    fabric: 'Japanese Silk-Chiffon & Organza Accent',
    image:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    description:
      'Modern open-front couture overlay with metallic thread embroidery along sleeves and hemline.',
    sizes: ['54', '56', '58', '60'],
    colors: [
      { name: 'Obsidian', hex: '#000000' },
      { name: 'Desert Dune', hex: '#D4B996' },
    ],
    rating: 4.8,
    reviewsCount: 19,
    inStock: true,
  },
  {
    id: '4',
    name: 'Executive Pilot & Concierge Uniform Set',
    category: 'Uniforms',
    price: 'Dh 2,450',
    fabric: 'Crease-Resistant Tech-Wool Blend',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop',
    description:
      'Engineered for 12+ hour comfort, stain resistance, and sleek corporate authority for private jet operators & 5-star concierge teams.',
    sizes: ['S', 'M', 'L', 'XL', 'Custom Corporate Bulk'],
    colors: [
      { name: 'Aviation Navy', hex: '#0A192F' },
      { name: 'Slate Gray', hex: '#334155' },
    ],
    rating: 4.9,
    reviewsCount: 56,
    inStock: true,
  },
  {
    id: '5',
    name: 'Pure Linen & Mulberry Silk Summer Jacket',
    category: 'Menswear',
    price: 'Dh 3,600',
    originalPrice: 'Dh 4,100',
    fabric: '55% Irish Linen / 45% Raw Mulberry Silk',
    image:
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
    description:
      'Unstructured relaxed shoulder tailoring designed for yacht cruises and Dubai rooftop evenings.',
    sizes: ['48R', '50R', '52R', '54R'],
    colors: [
      { name: 'Ivory Sand', hex: '#E5E0D8' },
      { name: 'Sage Green', hex: '#4A5D4E' },
    ],
    rating: 4.7,
    reviewsCount: 15,
    inStock: true,
  },
  {
    id: '6',
    name: 'Bespoke Atelier Silk Tuxedo Jacket',
    category: 'Bespoke',
    price: 'Dh 6,500',
    fabric: 'Heavyweight Silk Barathea & Velvet Collar',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
    description:
      'Handcrafted over 45 hours in our DIFC workshop. Features custom monogrammed silk lining.',
    sizes: ['Tailored to Measure'],
    colors: [
      { name: 'Midnight Navy', hex: '#0B1320' },
      { name: 'Onyx Black', hex: '#000000' },
    ],
    rating: 5.0,
    reviewsCount: 31,
    inStock: true,
  },
]

interface NewArrivalsProps {
  onAddToCart?: (product: Product, size: string, color: string) => void
}

export function NewArrivals({ onAddToCart }: NewArrivalsProps) {
  const [activeTab, setActiveTab] = useState<string>('All')
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({})
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const tabs = ['All', 'Menswear', 'Womenswear', 'Uniforms', 'Bespoke']

  const filteredProducts =
    activeTab === 'All'
      ? productsData
      : productsData.filter((p) => p.category === activeTab)

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleAddToCart = (product: Product, size: string, color: string) => {
    if (onAddToCart) {
      onAddToCart(product, size, color)
    }
  }

  return (
    <section id="new-arrivals" className="py-24 sm:py-32 bg-[#FFFFFF] relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-3">
            <div className="text-[#00A758] text-xs uppercase tracking-[0.3em] font-semibold">
              THE NEW CHAPTER
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-[#1A1A1A]">
              New <span className="text-[#DE7B3D] italic font-serif">Arrivals & Couture</span>
            </h2>
          </div>

          {/* Filter Tabs: Active #DE7B3D, Hover #00A758 */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-3 border-b border-[#E5E7EB] pb-2 max-w-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 relative ${
                  activeTab === tab
                    ? 'text-[#DE7B3D]'
                    : 'text-[#4B5563] hover:text-[#00A758]'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeArrivalTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#DE7B3D]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Slider / Grid: White card background #FFFFFF, border #E5E7EB, hover border #DE7B3D */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-[#FFFFFF] border border-[#E5E7EB] rounded-xs overflow-hidden hover:border-[#DE7B3D] transition-all duration-500 hover:shadow-xl flex flex-col"
              >
                {/* Image Container with Hover Image Swap */}
                <div className="relative h-[420px] bg-[#FAFAF8] overflow-hidden">
                  {/* Primary Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
                  />

                  {/* Secondary Image (Hover Swap) */}
                  <img
                    src={product.hoverImage}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100"
                  />

                  {/* Category Tag Badge: Secondary Green #00A758 */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-[#00A758] text-white text-[10px] uppercase font-semibold tracking-[0.2em] rounded-xs shadow-sm">
                      {product.category}
                    </span>
                  </div>

                  {/* Wishlist Heart Icon */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-md text-[#1A1A1A] hover:text-rose-500 border border-[#E5E7EB] rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-sm"
                    title="Add to Wishlist"
                  >
                    <motion.div whileTap={{ scale: 1.3 }}>
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          wishlist[product.id] ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                    </motion.div>
                  </button>

                  {/* Quick View Button Slide-Up: Primary #DE7B3D (hover #C96A30) */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="w-full py-3 bg-[#DE7B3D] hover:bg-[#C96A30] text-white font-sans font-medium text-xs uppercase tracking-[0.25em] rounded-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="text-[11px] text-[#00A758] font-mono tracking-widest uppercase font-medium">
                      {product.fabric.split('(')[0]}
                    </div>

                    <h3
                      onClick={() => setQuickViewProduct(product)}
                      className="font-cormorant text-2xl text-[#1A1A1A] font-light cursor-pointer hover:text-[#DE7B3D] transition-colors leading-tight line-clamp-1"
                    >
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-sans text-[#DE7B3D] font-medium tracking-wide">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs font-sans text-[#6B7280] line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product, 'M', product.colors[0]?.name || '')}
                      className="text-xs text-[#1A1A1A] hover:text-[#DE7B3D] font-sans uppercase tracking-widest flex items-center gap-1.5 transition-colors font-medium"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#DE7B3D]" />
                      <span>Bag</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quick View Modal Render */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(prod, sz, col) => handleAddToCart(prod, sz, col)}
        onToggleWishlist={(id) => toggleWishlist(id)}
        isWishlisted={!!(quickViewProduct && wishlist[quickViewProduct.id])}
      />
    </section>
  )
}
