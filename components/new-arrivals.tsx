'use client'

import React, { useState } from 'react'
import { Heart, ShoppingBag } from 'lucide-react'
import { QuickViewModal, Product } from './quick-view-modal'

const productsData: (Product & { isNew?: boolean })[] = [
  {
    id: '1',
    name: 'Desert Pearl Silk Abaya',
    category: 'Abayas',
    price: 'AED 349',
    fabric: 'Silk Blend',
    isNew: true,
    rating: 4.9,
    reviewsCount: 24,
    image:
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    description: 'Lightweight open-front silk blend abaya with soft fluid drape.',
    sizes: ['S', 'M', 'L'],
    colors: [{ name: 'Desert Pearl', hex: '#E5D9C8' }],
    inStock: true,
  },
  {
    id: '2',
    name: 'Soft Sand Satin Set',
    category: 'Sets',
    price: 'AED 289',
    fabric: 'Satin Silk',
    rating: 4.8,
    reviewsCount: 18,
    image:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    description: 'Two-piece satin silk relaxed shirt & wide-leg trouser lounge set.',
    sizes: ['S', 'M', 'L'],
    colors: [{ name: 'Soft Sand', hex: '#F4EEE5' }],
    inStock: true,
  },
  {
    id: '3',
    name: 'Evening Ivory Kaftan',
    category: 'Kaftans',
    price: 'AED 429',
    fabric: 'Pure Silk',
    rating: 5.0,
    reviewsCount: 31,
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
    description: 'Floor-sweeping 100% pure silk kaftan for warm evening gatherings.',
    sizes: ['Free Size', 'Custom'],
    colors: [{ name: 'Ivory', hex: '#FBF8F3' }],
    inStock: true,
  },
  {
    id: '4',
    name: 'Rose Dune Wrap Dress',
    category: 'Dresses',
    price: 'AED 319',
    fabric: 'Silk Blend',
    rating: 4.7,
    reviewsCount: 15,
    image:
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop',
    hoverImage:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    description: 'Versatile wrap dress tailored from breathable silk blend weave.',
    sizes: ['S', 'M', 'L'],
    colors: [{ name: 'Rose Dune', hex: '#C8A06B' }],
    inStock: true,
  },
]

interface BestSellersProps {
  onAddToCart?: (product: Product, size: string, color: string) => void
}

export function NewArrivals({ onAddToCart }: BestSellersProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({})

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleAddToCart = (product: Product, size: string, color: string) => {
    if (onAddToCart) {
      onAddToCart(product, size, color)
    }
  }

  return (
    <section id="bestsellers" className="bg-[#FBF8F3] pt-[86px] pb-[66px]">
      <div className="max-w-[1180px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="font-cormorant text-[38px] text-[#241A12] font-normal tracking-normal border-b border-[#E5D9C8] pb-3 inline-block">
              Best Sellers
            </h2>
          </div>
          <a
            href="#collections"
            className="font-inter text-xs font-normal text-[#241A12] hover:text-[#C8A06B] nav-link-underline pb-0.5 self-start sm:self-auto"
          >
            View All Best Sellers
          </a>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsData.map((product) => (
            <div
              key={product.id}
              className="bg-[#FBF8F3] border border-[#E5D9C8] rounded-[10px] overflow-hidden shadow-2xs flex flex-col justify-between"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] bg-[#F4EEE5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />

                {/* Small 'New' Badge on one product only */}
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-[#241A12] text-[#FBF8F3] text-[10px] font-inter uppercase font-medium px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-1.5 bg-[#FBF8F3]/90 border border-[#E5D9C8] rounded-full text-[#241A12] hover:text-[#C8A06B] transition-colors"
                  title="Add to Wishlist"
                >
                  <Heart
                    className={`w-3.5 h-3.5 stroke-[1.5] ${
                      wishlist[product.id] ? 'fill-[#C8A06B] text-[#C8A06B]' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-4 bg-[#FBF8F3] border-t border-[#E5D9C8] flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="font-inter text-[11px] uppercase tracking-[0.15em] text-[#5E5145] font-normal block">
                    {product.fabric}
                  </span>
                  <h3
                    onClick={() => setQuickViewProduct(product)}
                    className="font-cormorant text-xl text-[#241A12] font-normal cursor-pointer hover:text-[#C8A06B] transition-colors leading-snug line-clamp-2"
                  >
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E5D9C8]">
                  <span className="font-inter text-sm text-[#241A12] font-medium">
                    {product.price}
                  </span>

                  <button
                    onClick={() => handleAddToCart(product, product.sizes[0] || 'M', product.colors[0]?.name || '')}
                    className="h-[36px] px-3.5 bg-[#241A12] hover:bg-[#C8A06B] text-[#FAF8F5] font-inter font-normal text-xs rounded-full transition-colors duration-180 flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3 h-3 stroke-[1.5]" />
                    <span>Add to bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
