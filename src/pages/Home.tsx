'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import RestaurantLogo from '@/assets/orange-logo.svg'

interface LanguageOption {
  value: string
  label: string
}
const languageOptions: LanguageOption[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' }
]

const Home = () => {
  const navigation = useNavigate()
  const [language, setLanguage] = useState(languageOptions[0].value)

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
  }

  const startOrder = () => {
    navigation('/menu')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50/20 to-orange-100/40 flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur shadow-xl">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="rounded-full bg-orange-100 p-5 border-2 border-orange-200">
              <img
                src={RestaurantLogo}
                alt="Restaurant Logo"
                className="h-20 w-20"
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-orange-800">
                Dining Menu
              </h1>
              <p className="text-gray-600">Delicious food, delivered fast</p>
            </div>

            <div className="w-full flex items-center gap-2 border rounded-md p-3">
              <Globe className="ml-2 h-5 w-5 text-orange-500" />
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="border-none shadow-none focus:ring-0">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={startOrder}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
            >
              Start Your Order
            </Button>

            <p className="text-sm text-gray-500">
              Browse our menu and add order your favorite items now!
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default Home
