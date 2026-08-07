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
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-[#111827] border-l border-gray-800 text-white shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-[#DE7B3D]" />
                  <h3 className="font-cormorant text-2xl font-light text-white">
                    Shopping Bag <span className="text-sm font-sans text-[#DE7B3D]">({items.length})</span>
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-[#DE7B3D] rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-4 text-gray-400">
                    <ShoppingBag className="w-12 h-12 stroke-1 text-[#DE7B3D] mx-auto opacity-50" />
                    <p className="font-cormorant text-2xl text-white">Your bag is empty</p>
                    <p className="text-xs font-sans">Discover our new Mulberry silk & suiting arrivals.</p>
                  </div>
                ) : (
                  items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gray-900 border border-gray-800 rounded-xs flex gap-4 items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover rounded-xs border border-gray-800"
                      />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-cormorant text-lg text-white font-light leading-tight line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-[#DE7B3D] font-mono">
                          Size: {item.size} | Color: {item.color}
                        </div>
                        <div className="text-xs font-sans text-[#DE7B3D] font-medium pt-1">
                          {item.product.price}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 pt-2">
                          <div className="flex items-center border border-gray-800 rounded-xs bg-[#111827]">
                            <button
                              onClick={() => onUpdateQuantity(idx, -1)}
                              className="px-2 py-0.5 text-xs text-white hover:text-[#DE7B3D]"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-mono">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(idx, 1)}
                              className="px-2 py-0.5 text-xs text-white hover:text-[#DE7B3D]"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-gray-500 hover:text-rose-400 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout Summary */}
              {items.length > 0 && (
                <div className="p-6 border-t border-gray-800 bg-gray-900 space-y-4">
                  <div className="space-y-2 text-xs font-sans text-gray-300">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#DE7B3D] font-medium">Dh {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-400">
                      <span>Express UAE Courier</span>
                      <span className="text-[#00A758] font-semibold">Complimentary</span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert('Proceeding to VIP Dubai Checkout & Payment Gateway')}
                    className="w-full py-4 bg-[#DE7B3D] hover:bg-[#C96A30] text-white font-sans font-medium text-xs uppercase tracking-[0.25em] rounded-xs shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>Proceed to VIP Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-sans pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00A758]" /> Secure Dubai Encrypted Checkout
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
