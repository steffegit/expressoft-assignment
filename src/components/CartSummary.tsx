'use client'

import { useState } from 'react'
import type { Product } from '@/data/menuData'
import { Button } from '@/components/ui/button'
import { Minus, Plus, ShoppingCart, X } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface CartItem {
  product: Product
  quantity: number
}

interface CartSummaryProps {
  cartItems: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
}

export default function CartSummary({
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}: CartSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getItemSubtotal = (item: CartItem) => {
    return item.product.price * item.quantity
  }

  const totalPrice = cartItems.reduce((total, item) => {
    return total + getItemSubtotal(item)
  }, 0)

  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
      <div className="container mx-auto px-4">
        <div
          className="flex items-center justify-between py-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-orange-500" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <span className="font-medium">Your Order</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">
              {formatCurrency(totalPrice)}
            </span>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Checkout
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="py-3 border-t border-gray-200 max-h-[40vh] overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex-1 pr-4">
                  <h4 className="font-medium">{item.product.name}</h4>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(item.product.price)} each
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 p-0"
                      disabled={item.quantity <= 1}
                      onClick={(e) => {
                        e.stopPropagation()
                        onUpdateQuantity(item.product.id, item.quantity - 1)
                      }}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 p-0"
                      disabled={item.quantity >= 20}
                      onClick={(e) => {
                        e.stopPropagation()
                        onUpdateQuantity(item.product.id, item.quantity + 1)
                      }}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="w-20 text-right font-medium">
                    {formatCurrency(getItemSubtotal(item))}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemoveItem(item.product.id)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
