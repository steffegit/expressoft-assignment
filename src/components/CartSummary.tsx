'use client'

import { useState } from 'react'
import type { Product } from '@/data/menuData'
import { Button } from '@/components/ui/button'
import { ArrowUp, ChevronUp, Minus, Plus, ShoppingCart, X } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

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
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false)

  const getItemSubtotal = (item: CartItem) => {
    return item.product.price * item.quantity
  }

  const totalPrice = cartItems.reduce((total, item) => {
    return total + getItemSubtotal(item)
  }, 0)

  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  const handleCheckout = () => {
    setIsCheckoutDialogOpen(true)
  }

  const processOrder = () => {
    setIsProcessing(true)

    const orderItems = cartItems.map((item) => ({
      id: item.product.id,
      qty: item.quantity
    }))

    const orderData = encodeURIComponent(JSON.stringify(orderItems))

    setTimeout(() => {
      navigate(`/order-summary?items=${orderData}`)
    }, 1500)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
      <div className="container mx-auto px-4">
        <div
          className="flex items-center justify-between py-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-4 group transition-transform duration-200 ease-in-out group">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-orange-500" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <span className="font-medium">Your Order</span>
            <ChevronUp
              className={`h-5 w-5 transition-transform ${
                isExpanded
                  ? 'rotate-180 group-hover:translate-y-1'
                  : 'group-hover:-translate-y-1'
              }`}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">
              {formatCurrency(totalPrice)}
            </span>
            <Button
              className="bg-orange-500 hover:bg-orange-600"
              onClick={(e) => {
                e.stopPropagation()
                handleCheckout()
              }}
            >
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

      <Dialog
        open={isCheckoutDialogOpen}
        onOpenChange={setIsCheckoutDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Order</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-medium">Order Summary</h3>
              <div className="space-y-1">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.quantity}× {item.product.name}
                    </span>
                    <span>{formatCurrency(getItemSubtotal(item))}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Payment Method</h3>
              <div className="flex items-center gap-2 border rounded-md p-3">
                <div className="h-8 w-12 bg-blue-100 rounded flex items-center justify-center text-xs font-bold text-blue-800">
                  VISA
                </div>
                <span>•••• 4242</span>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsCheckoutDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={processOrder}
              className="bg-orange-500 hover:bg-orange-600"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Complete Order'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
