import { ArrowLeft, User as UserIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Menu = () => {
  const navigate = useNavigate()

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
    </div>
  )
}

export default Menu
