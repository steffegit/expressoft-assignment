'use client'

import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  User as UserIcon
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { MenuCategory, menuData, Product } from '@/data/menuData'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/CategoryFilter'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import CartSummary from '@/components/CartSummary'
import ProductModal from '@/components/ProductModal'

const Menu = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<MenuCategory[]>(menuData)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortOption, setSortOption] = useState<string>('default')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [cartItems, setCartItems] = useState<
    { product: Product; quantity: number }[]
  >([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false)

  const toggleAvailability = (productId: string) => {
    const updatedCategories = categories.map((category) => ({
      ...category,
      products: category.products.map((product) =>
        product.id === productId
          ? { ...product, available: !product.available }
          : product
      )
    }))

    setCategories(updatedCategories)
  }

  const filteredProducts = categories.flatMap((category) => {
    if (selectedCategory !== 'all' && category.category !== selectedCategory) {
      return []
    }

    return category.products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      )

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevItems, { product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    )
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setShowModal(true)
  }

  const closeProductModal = () => {
    setShowModal(false)
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/10 to-orange-100/10">
      <header className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={() => navigate('/')} variant="ghost" size="icon">
              <ArrowLeft />
            </Button>
            <h1 className="text-xl font-bold text-orange-800">Menu</h1>
            <Button variant="ghost" size="icon">
              <UserIcon />
            </Button>
          </div>
        </div>
        <div>
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-auto">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Sort</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 flex justify-center w-full">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      <div className="container mx-auto px-4 pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToggleAvailability={toggleAvailability}
              onAddToCart={addToCart}
              onViewDetails={openProductModal}
            />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <CartSummary
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={showModal}
          onClose={closeProductModal}
          onAddToCart={addToCart}
        />
      )}
    </div>
  )
}

export default Menu
