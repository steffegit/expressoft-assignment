import React from 'react'
import { Product } from '@/data/menuData'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{product.name}</CardTitle>
        <Badge variant={product.available ? 'success' : 'destructive'}>
          {product.available ? 'Available' : 'Out of Stock'}
        </Badge>
      </CardHeader>
      <CardContent>
        <CardDescription>{product.description}</CardDescription>
        <div className="mt-4 text-lg font-bold">
          {formatCurrency(product.price)}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
