import { ArrowLeft, User as UserIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { MenuCategory, menuData, Product } from '@/data/menuData'
import ProductCard from '@/components/ProductCard'

const Menu = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<MenuCategory[]>(menuData)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const allProducts: Product[] = []
    categories.forEach((category) => {
      allProducts.push(...category.products)
    })
    setProducts(allProducts)
  }, [categories])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={() => navigate('/')} variant="ghost" size="icon">
              <ArrowLeft />
            </Button>
            <h1 className="text-xl font-bold text-purple-800">Menu</h1>
            <Button variant="ghost" size="icon">
              <UserIcon />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu
