'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react'
import { Product } from './quick-view-modal'

export interface CartItem {
  product: Product
  size: string
  color: string
  quantity: number
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (index: number, delta: number) => void
  onRemoveItem: (index: number) => void
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const subtotal = items.reduce((acc, item) => {
    const numericPrice = parseInt(item.product.price.replace(/[^\d]/g, ''), 10) || 0
    return acc + numericPrice * item.quantity
  }, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-inter">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#241A12]/40 backdrop-blur-xs"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="w-screen max-w-md bg-[#FBF8F3] border-l border-[#E5D9C8] text-[#241A12] shadow-xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E5D9C8] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4 text-[#241A12] stroke-[1.5]" />
                  <h3 className="font-cormorant text-2xl font-normal text-[#241A12]">
                    Shopping Bag <span className="text-sm font-inter text-[#5E5145]">({items.length})</span>
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-[#5E5145] hover:text-[#241A12] rounded-full transition-colors"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-3 text-[#5E5145]">
                    <ShoppingBag className="w-8 h-8 stroke-1 mx-auto opacity-40 text-[#241A12]" />
                    <p className="font-cormorant text-2xl text-[#241A12]">Your bag is empty</p>
                    <p className="text-xs font-inter text-[#5E5145]">Explore our lightweight silk pieces designed in the UAE.</p>
                  </div>
                ) : (
                  items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#FBF8F3] border border-[#E5D9C8] rounded-[10px] flex gap-4 items-center shadow-2xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-20 object-cover rounded-[6px] border border-[#E5D9C8]"
                      />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-cormorant text-base text-[#241A12] font-normal leading-tight line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-[#5E5145]">
                          Size: {item.size} | Color: {item.color}
                        </div>
                        <div className="text-xs font-inter text-[#241A12] font-medium pt-0.5">
                          {item.product.price}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 pt-2">
                          <div className="flex items-center border border-[#E5D9C8] rounded-full bg-[#F4EEE5] px-2 py-0.5">
                            <button
                              onClick={() => onUpdateQuantity(idx, -1)}
                              className="px-1.5 text-xs text-[#241A12] hover:text-[#C8A06B]"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-inter text-[#241A12]">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(idx, 1)}
                              className="px-1.5 text-xs text-[#241A12] hover:text-[#C8A06B]"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-[#5E5145] hover:text-rose-600 p-1 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4 stroke-[1.5]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Summary & Checkout */}
              {items.length > 0 && (
                <div className="p-6 border-t border-[#E5D9C8] bg-[#F4EEE5] space-y-4">
                  <div className="space-y-2 text-xs font-inter text-[#5E5145]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#241A12] font-medium">AED {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>Free UAE Courier Shipping</span>
                      <span className="text-[#241A12] font-medium">Complimentary</span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert('Proceeding to Secure UAE Checkout')}
                    className="w-full h-[46px] bg-[#C8A06B] hover:bg-[#B38C58] text-[#FBF8F3] font-inter font-medium text-sm rounded-full transition-colors flex items-center justify-center gap-2 shadow-2xs"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-[#5E5145] pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#241A12]" /> Encrypted UAE Secure Checkout
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
