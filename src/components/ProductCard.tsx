'use client'

import { useState } from 'react'
import type { Product } from '../data/menuData'
import { Eye, ShoppingCart } from 'lucide-react'
import { formatCurrency } from '../lib/utils'
import { Button } from './ui/button'

interface ProductCardProps {
  product: Product
  onToggleAvailability: (productId: string) => void
}

export default function ProductCard({
  product,
  onToggleAvailability
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="overflow-hidden transition-all duration-200 hover:shadow-md h-full flex flex-col bg-white rounded-lg border border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 bg-gray-100">
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm shadow-sm">
            <span
              className={`h-2 w-2 rounded-full ${
                product.available ? 'bg-green-500' : 'bg-red-500'
              }`}
            ></span>
            <span>{product.available ? 'Available' : 'Not Available'}</span>
          </div>
        </div>

        <img
          src={`https://placehold.co/400x200/?text=${encodeURIComponent(
            product.name
          )}`}
          alt={product.name}
          className="h-full w-full object-cover"
        />

        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            {/* TODO: Add Modal here */}
            <Button
              variant="outline"
              className="flex items-center gap-1 bg-white text-gray-800 px-3 py-1 rounded-md text-sm font-medium"
            >
              <Eye className="h-4 w-4" />
              View Details
            </Button>
          </div>
        )}
      </div>

      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <div className="text-lg font-bold text-purple-600 whitespace-nowrap">
            {formatCurrency(product.price)}
          </div>
        </div>

        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>
      </div>

      <div className="mt-auto p-5 border-t border-gray-200">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 text-sm"
          onClick={() => onToggleAvailability(product.id)}
        >
          {product.available ? 'Mark as Unavailable' : 'Mark as Available'}
        </Button>
      </div>

      <div className="p-5 pt-0 mt-auto">
        <Button
          variant={product.available ? 'default' : 'secondary'}
          disabled={!product.available}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md flex items-center justify-center disabled:opacity-50"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Order
        </Button>
      </div>
      {/* TODO: Add Cart here */}
    </div>
  )
}
