'use client'

import { Coffee, Pizza, Utensils, BeefIcon as Burger } from 'lucide-react'
import type { MenuCategory } from '../data/menuData'

interface CategoryFilterProps {
  categories: MenuCategory[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'pizza':
      return <Pizza className="h-4 w-4" />
    case 'burgers':
      return <Burger className="h-4 w-4" />
    case 'drinks':
      return <Coffee className="h-4 w-4" />
    default:
      return <Utensils className="h-4 w-4" />
  }
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory
}: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex gap-2 md:gap-4 min-w-max">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-5 py-2 rounded-full ${
            selectedCategory === 'all'
              ? 'bg-purple-500 text-white font-semibold'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="flex gap-2 items-center">
            {getCategoryIcon('all')}
            <span>All</span>
          </div>
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.category)}
            className={`px-5 py-2 rounded-full ${
              selectedCategory === category.category
                ? 'bg-purple-500 text-white font-semibold'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex gap-2 items-center font">
              {getCategoryIcon(category.category.toLowerCase())}
              <span>{category.category}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
