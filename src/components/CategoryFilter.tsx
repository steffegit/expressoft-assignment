'use client'

import type { MenuCategory } from '../data/menuData'

interface CategoryFilterProps {
  categories: MenuCategory[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory
}: CategoryFilterProps) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex space-x-3 min-w-max">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-5 py-2 rounded-md ${
            selectedCategory === 'all'
              ? 'bg-purple-500 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.category)}
            className={`px-5 py-2 rounded-md ${
              selectedCategory === category.category
                ? 'bg-purple-500 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {category.category}
          </button>
        ))}
      </div>
    </div>
  )
}
