'use client'

import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock,
  MapPin,
  Receipt
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { menuData, type Product } from '@/data/menuData'
import { formatCurrency, generateOrderId } from '@/lib/utils'

interface OrderItem {
  product: Product
  quantity: number
}

export default function OrderSummaryPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [orderData, setOrderData] = useState<{
    id: string
    items: OrderItem[]
    total: number
    estimatedTime: number
  } | null>(null)

  useEffect(() => {
    // This function will only run once when the component mounts
    // or when searchParams changes
    const initializeOrder = () => {
      const orderParamData = searchParams.get('items')

      if (!orderParamData) {
        // If no order data, redirect back to menu
        navigate('/menu')
        return
      }

      try {
        const parsedItems: { id: string; qty: number }[] = JSON.parse(
          decodeURIComponent(orderParamData)
        )

        // Find products from menu data
        const items: OrderItem[] = []
        let total = 0
        let prepTime = 15 // Base preparation time in minutes

        parsedItems.forEach((item) => {
          // Find the product in menu data
          for (const category of menuData) {
            const product = category.products.find((p) => p.id === item.id)
            if (product) {
              items.push({ product, quantity: item.qty })
              total += product.price * item.qty

              // Add time based on quantity and product type
              if (category.category === 'Pizza') {
                prepTime += 5 * item.qty
              } else {
                prepTime += 2 * item.qty
              }
              break
            }
          }
        })

        // Set all state at once to avoid multiple renders
        setOrderData({
          id: generateOrderId(),
          items: items,
          total: total,
          estimatedTime: Math.min(prepTime, 45) // Cap at 45 minutes
        })
      } catch (error) {
        console.error('Failed to parse order data:', error)
        navigate('/menu')
      }
    }

    initializeOrder()
  }, [searchParams])

  // Early return if data is not loaded yet
  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
          <p className="text-lg font-medium text-gray-700">
            Loading your order...
          </p>
        </div>
      </div>
    )
  }

  const getSubtotal = () => orderData.total
  const getTax = () => orderData.total * 0.0825 // 8.25% tax
  const getTotal = () => getSubtotal() + getTax()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/menu')}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-orange-800">Order Summary</h1>
            <div className="w-8"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl flex flex-col gap-4">
        {/* Order Confirmation */}
        <Card className="border-green-500 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-800">
                  Order Confirmed!
                </h2>
                <p className="text-green-700">
                  Your order has been received and is being prepared.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Order Details</h2>
              <span className="text-sm text-gray-500">#{orderData.id}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Order Status */}
            <div className="flex items-center gap-2 text-sm text-orange-600">
              <Clock className="h-4 w-4" />
              <span>
                Estimated preparation time: {orderData.estimatedTime} minutes
              </span>
            </div>

            {/* Delivery Address */}
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
              <div>
                <p className="font-medium">Pickup at Restaurant</p>
                <p className="text-gray-500">123 Main Street, Anytown, USA</p>
              </div>
            </div>

            <Separator />

            {/* Order Items */}
            <div className="space-y-4">
              <h3 className="font-medium">Items</h3>
              <div className="space-y-3">
                {orderData.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3"
                  >
                    <div className="h-16 w-16 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                      <img
                        src={`https://placehold.co/200x200/?text=${encodeURIComponent(
                          item.product.name
                        )}`}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <span>
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>
                          {item.quantity} × {formatCurrency(item.product.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(getSubtotal())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (8.25%)</span>
                <span>{formatCurrency(getTax())}</span>
              </div>
              <div className="flex justify-between font-bold pt-2">
                <span>Total</span>
                <span>{formatCurrency(getTotal())}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Payment</span>
              </div>
              <div className="flex items-center text-sm">
                <span>Paid with Credit Card</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => navigate('/menu')}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Back to Menu
          </Button>
          <Button variant="outline">Need Help?</Button>
        </div>
      </div>
    </div>
  )
}
