'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ShoppingBag, Check, ShieldCheck, Star } from 'lucide-react'

export interface Product {
  id: string
  name: string
  category: string
  price: string
  originalPrice?: string
  fabric: string
  image: string
  hoverImage: string
  description: string
  sizes: string[]
  colors: { name: string; hex: string }[]
  rating: number
  reviewsCount: number
  inStock: boolean
}

interface QuickViewModalProps {
  product: Product | null
  onClose: () => void
  onAddToCart: (product: Product, size: string, color: string) => void
  onToggleWishlist: (productId: string) => void
  isWishlisted: boolean
}

export function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('M')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [addedToast, setAddedToast] = useState<boolean>(false)

  if (!product) return null

  const images = [product.image, product.hoverImage]
  const currentColor = selectedColor || product.colors[0]?.name

  const handleAdd = () => {
    onAddToCart(product, selectedSize, currentColor)
    setAddedToast(true)
    setTimeout(() => setAddedToast(false), 2500)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container: White background #FFFFFF, border #E5E7EB */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white border border-[#E5E7EB] rounded-sm shadow-2xl overflow-hidden z-10 my-auto text-[#1A1A1A]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-[#4B5563] hover:text-[#DE7B3D] bg-white/80 backdrop-blur-md rounded-full border border-[#E5E7EB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image View */}
            <div className="relative h-[380px] md:h-[540px] bg-[#FAFAF8] flex flex-col">
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />

              {/* Thumbnails Overlay */}
              <div className="absolute bottom-4 left-4 flex space-x-2 z-10">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-14 rounded-xs overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#DE7B3D]' : 'border-white opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-[#00A758] text-white text-[10px] uppercase font-bold tracking-widest rounded-xs shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Right Details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#DE7B3D] font-mono tracking-widest uppercase">
                  <span>ATELIER REF: SK-{product.id}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#DE7B3D] text-[#DE7B3D]" />
                    <span className="text-[#1A1A1A] font-sans font-medium">{product.rating} ({product.reviewsCount})</span>
                  </div>
                </div>

                <h2 className="font-cormorant text-3xl sm:text-4xl text-[#1A1A1A] font-light leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-sans text-[#DE7B3D] font-medium tracking-wide">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-sans text-[#6B7280] line-through">
                      {product.originalPrice}
                    </span>
                  )}
                  <span className="text-[10px] text-[#6B7280] uppercase tracking-widest font-sans ml-auto">
                    Taxes Included
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#4B5563] font-sans font-light leading-relaxed">
                  {product.description}
                </p>

                {/* Fabric Spec */}
                <div className="p-3 bg-[#FAFAF8] border border-[#E5E7EB] rounded-xs flex items-center justify-between text-xs">
                  <span className="text-[#6B7280] uppercase tracking-wider font-sans">Composition:</span>
                  <span className="text-[#00A758] font-semibold">{product.fabric}</span>
                </div>

                {/* Size Selector */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#1A1A1A] font-sans">
                    <span className="uppercase tracking-wider font-medium">Select Size:</span>
                    <button className="text-[#DE7B3D] underline hover:text-[#00A758]">
                      Dubai Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2 text-xs font-sans font-medium uppercase tracking-wider border rounded-xs transition-all ${
                          selectedSize === sz
                            ? 'bg-[#DE7B3D] text-white border-[#DE7B3D]'
                            : 'bg-white text-[#1A1A1A] border-[#D1D5DB] hover:border-[#DE7B3D]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors Selector */}
                <div className="space-y-2">
                  <span className="text-xs text-[#1A1A1A] font-sans uppercase tracking-wider font-medium block">
                    Color Tone: <span className="text-[#DE7B3D]">{currentColor}</span>
                  </span>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          currentColor === c.name ? 'scale-110 border-[#DE7B3D]' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions: Primary Button #DE7B3D (hover #C96A30) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-4 bg-[#DE7B3D] hover:bg-[#C96A30] text-white font-sans font-medium text-xs uppercase tracking-[0.2em] rounded-xs transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-4 border rounded-xs transition-colors ${
                      isWishlisted
                        ? 'bg-rose-50 border-rose-500 text-rose-500'
                        : 'border-[#D1D5DB] text-[#1A1A1A] hover:border-[#DE7B3D]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Success Toast with #00A758 Green */}
                {addedToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-[#00A758] bg-[#00A758]/10 border border-[#00A758]/30 p-2 rounded-xs text-center flex items-center justify-center gap-1.5 font-sans font-medium"
                  >
                    <Check className="w-3.5 h-3.5 text-[#00A758]" /> Added to your shopping bag!
                  </motion.div>
                )}

                <div className="flex items-center justify-center gap-4 text-[11px] text-[#6B7280] pt-1 font-sans">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00A758]" /> 100% Authentic Guarantee
                  </span>
                  <span>•</span>
                  <span>Free Dubai Express Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
