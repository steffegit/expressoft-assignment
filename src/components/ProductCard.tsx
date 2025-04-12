import { Product } from '@/data/menuData'
import React from 'react'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return <div>{JSON.stringify(product)}</div>
}

export default ProductCard
