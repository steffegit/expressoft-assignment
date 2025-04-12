'use client'

import type { Product } from '@/data/menuData'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { ShoppingCart, X } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product) => void
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart
}: ProductModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
          <img
            src={`https://placehold.co/400x200/?text=${encodeURIComponent(
              product.name
            )}`}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-6 space-y-5">
          <DialogHeader className="p-0 space-y-1">
            <DialogTitle className="text-xl">{product.name}</DialogTitle>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${
                    product.available ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></span>
                <span className="text-sm">
                  {product.available ? 'Available' : 'Not Available'}
                </span>
              </div>
              <div className="text-xl font-bold text-orange-600">
                {formatCurrency(product.price)}
              </div>
            </div>
          </DialogHeader>

          <p className="text-gray-700">{product.description}</p>

          <Button
            onClick={() => {
              onAddToCart(product)
              onClose()
            }}
            disabled={!product.available}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
